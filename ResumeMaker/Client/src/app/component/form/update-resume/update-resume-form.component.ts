import { Component, inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AppStore } from "../../../store/app-store";
import { ResumeRequestService } from "../../../service/request/resume-request.service";
import {
  CreateResumeEducationRequestModel,
  CreateResumeExperienceRequestModel,
  CreateResumeSkillGroupRequestModel,
  CreateResumeSocialMediaRequestModel
} from "../../../model/request/create-resume-request.model";
import { UpdateResumeExperienceDescriptionRequestModel, UpdateResumeRequestModel, UpdateResumeSkillElementRequestModel } from "../../../model/request/update-resume-request.model";

@Component({
  selector: 'app-update-resume-form-component',
  templateUrl: './update-resume-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateResumeFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  appStore = inject(AppStore);
  resumeRequestService = inject(ResumeRequestService);
  route = inject(ActivatedRoute);

  updateResumeForm = this.formBuilder.group({
    name: ['', Validators.required],
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    socialMedias: this.formBuilder.array<Omit<CreateResumeSocialMediaRequestModel, 'order'>>([]),
    educations: this.formBuilder.array<CreateResumeEducationRequestModel>([]),
    experiences: this.formBuilder.array<CreateResumeExperienceRequestModel>([]),
    skillGroups: this.formBuilder.array<CreateResumeSkillGroupRequestModel>([])
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.resumeRequestService.readResume(id, this.updateResumeForm);
  }

  onSubmit() {
    const { valid } = this.updateResumeForm;
    if (!valid) {
      alert('Please fill in all required fields.');
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const userId = <number><unknown>id ?? -1;
    const { value } = this.updateResumeForm;
    const request: UpdateResumeRequestModel = {
      id: userId,
      name: value.name ?? '',
      jobTitle: value.jobTitle ?? '',
      description: value.description ?? '',
      userId: userId,
      socialMedias: value.socialMedias?.map((socialMedia, index) => ({
        id: socialMedia?.id ?? -1,
        label: socialMedia?.label ?? '',
        link: socialMedia?.link ?? '',
        order: index
      })) ?? [],
      educations: value.educations?.map((education, index) => ({
        id: index,
        institutionName: education?.institutionName ?? '',
        fieldOfStudy: education?.fieldOfStudy ?? '',
        degree: education?.degree ?? '',
        graduationYear: education?.graduationYear ?? 0
      })) ?? [],
      experiences: value.experiences?.map((experience, index) => ({
        id: index,
        companyName: experience?.companyName ?? '',
        jobTitle: experience?.jobTitle ?? '',
        startDate: experience?.startDate ?? new Date(),
        endDate: experience?.endDate ?? new Date(),
        experienceDescriptions: <UpdateResumeExperienceDescriptionRequestModel[]><unknown>experience?.experienceDescriptions.map((experienceDescription, index) => ({
          id: index,
          description: experienceDescription.description,
          order: index
        })) ?? []
      })) ?? [],
      skillGroups: value.skillGroups?.map((skillGroup, index) => ({
        id: index,
        name: skillGroup?.name ?? '',
        order: index,
        skillElements: <UpdateResumeSkillElementRequestModel[]><unknown>skillGroup?.skillElements.map((skillElement, index) => ({
          id: index,
          name: skillElement.name,
          order: index
        })) ?? []
      })) ?? [],
    };
    this.resumeRequestService.updateResume(id, request);
  }

  getSocialMedias() {
    return <FormArray>this.updateResumeForm.get('socialMedias');
  }

  moveSocialMedia(fromIndex: number, toIndex: number) {
    const items = this.getSocialMedias();
    if (toIndex < 0 || toIndex >= items.length) {
      return;
    }
    const control = items.at(fromIndex);
    items.removeAt(fromIndex);
    items.insert(toIndex, control);
  }

  moveSocialMediaUp(index: number) {
    this.moveSocialMedia(index, index - 1);
  }

  moveSodialMediaDown(index: number) {
    this.moveSocialMedia(index, index + 1);
  }

  removeSocialMedia(index: number) {
    this.getSocialMedias().removeAt(index);
  }

  addSocialMedia() {
    const control = this.formBuilder.group({
      id: [0, Validators.required],
      label: ['', Validators.required],
      link: ['', Validators.required]
    });
    this.getSocialMedias().push(control);
  }

  getEducations() {
    return <FormArray>this.updateResumeForm.get('educations');
  }

  moveEducation(fromIndex: number, toIndex: number) {
    const items = this.getEducations();
    if (toIndex < 0 || toIndex >= items.length) {
      return;
    }
    const control = items.at(fromIndex);
    items.removeAt(fromIndex);
    items.insert(toIndex, control);
  }

  moveEducationUp(index: number) {
    this.moveEducation(index, index - 1);
  }

  moveEducationDown(index: number) {
    this.moveEducation(index, index + 1);
  }

  removeEducation(index: number) {
    this.getEducations().removeAt(index);
  }

  addEducation() {
    const control = this.formBuilder.group({
      institutionName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      degree: ['', Validators.required],
      graduationYear: [0, Validators.required]
    });
    this.getEducations().push(control);
  }

  getExperience() {
    return this.updateResumeForm.get('experiences') as FormArray;
  }

  addExperience() {
    const control = this.formBuilder.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      experienceDescriptions: this.formBuilder.array([])
    });
    this.getExperience().push(control);
  }

  moveExperience(fromIndex: number, toIndex: number) {
    const items = this.getExperience();
    if (toIndex < 0 || toIndex >= items.length) {
      return;
    }
    const control = items.at(fromIndex);
    items.removeAt(fromIndex);
    items.insert(toIndex, control);
  }

  moveExperienceUp(index: number) {
    this.moveExperience(index, index - 1);
  }

  moveExperienceDown(index: number) {
    this.moveExperience(index, index + 1);
  }

  removeExperience(index: number) {
    this.getExperience().removeAt(index);
  }

  getExperienceDescription(experienceIndex: number) {
    return this.getExperience()
      .at(experienceIndex)
      .get('experienceDescriptions') as FormArray;
  }

  addExperienceDescription(experienceIndex: number) {
    const descriptions = this.getExperienceDescription(experienceIndex);
    descriptions.push(
      this.formBuilder.group({
        description: ['', Validators.required]
      })
    );
  }

  removeExperienceDescription(experienceIndex: number, descriptionIndex: number) {
    this.getExperienceDescription(experienceIndex).removeAt(descriptionIndex);
  }

  moveExperienceDescription(experienceIndex: number, fromIndex: number, toIndex: number) {
    const descriptions = this.getExperienceDescription(experienceIndex);
    if (toIndex < 0 || toIndex >= descriptions.length) {
      return;
    }
    const control = descriptions.at(fromIndex);
    descriptions.removeAt(fromIndex);
    descriptions.insert(toIndex, control);
  }

  moveExperienceDescriptionUp(experienceIndex: number, descriptionIndex: number) {
    this.moveExperienceDescription(experienceIndex, descriptionIndex, descriptionIndex - 1);
  }


  moveExperienceDescriptionDown(experienceIndex: number, descriptionIndex: number) {
    this.moveExperienceDescription(experienceIndex, descriptionIndex, descriptionIndex + 1);
  }

  getSkillGroup() {
    return this.updateResumeForm.get('skillGroups') as FormArray;
  }

  addSkillGroup() {
    const control = this.formBuilder.group({
      name: ['', Validators.required],
      skillElements: this.formBuilder.array([])
    });

    this.getSkillGroup().push(control);
  }

  moveSkillGroup(fromIndex: number, toIndex: number) {
    const items = this.getSkillGroup();
    if (toIndex < 0 || toIndex >= items.length) {
      return;
    }
    const control = items.at(fromIndex);
    items.removeAt(fromIndex);
    items.insert(toIndex, control);
  }

  moveSkillGroupUp(index: number) {
    this.moveSkillGroup(index, index - 1);
  }

  moveSkillGroupDown(index: number) {
    this.moveSkillGroup(index, index + 1);
  }

  removeSkillGroup(index: number) {
    this.getSkillGroup().removeAt(index);
  }

  getSkillElement(experienceIndex: number) {
    return this.getSkillGroup()
      .at(experienceIndex)
      .get('skillElements') as FormArray;
  }

  addSkillElement(experienceIndex: number) {
    const descriptions = this.getSkillElement(experienceIndex);
    descriptions.push(
      this.formBuilder.group({
        name: ['', Validators.required]
      })
    );

  }

  removeSkillElement(experienceIndex: number, descriptionIndex: number) {
    this.getSkillElement(experienceIndex).removeAt(descriptionIndex);
  }


  moveSkillElement(experienceIndex: number, fromIndex: number, toIndex: number) {
    const descriptions = this.getSkillElement(experienceIndex);
    if (toIndex < 0 || toIndex >= descriptions.length) {
      return;
    }
    const control = descriptions.at(fromIndex);
    descriptions.removeAt(fromIndex);
    descriptions.insert(toIndex, control);
  }

  moveSkillElementUp(experienceIndex: number, descriptionIndex: number) {
    this.moveSkillElement(experienceIndex, descriptionIndex, descriptionIndex - 1);
  }


  moveSkillElementDown(experienceIndex: number, descriptionIndex: number) {
    this.moveSkillElement(experienceIndex, descriptionIndex, descriptionIndex + 1);
  }
}
