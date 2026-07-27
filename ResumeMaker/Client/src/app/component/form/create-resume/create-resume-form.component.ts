import { Component, inject } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { ResumeRequestService } from "../../../service/request/resume-request.service";
import { CreateResumeEducationRequestModel, CreateResumeExperienceDescriptionRequestModel, CreateResumeExperienceRequestModel, CreateResumeRequestModel, CreateResumeSkillElementRequestModel, CreateResumeSkillGroupRequestModel, CreateResumeSocialMediaRequestModel } from "../../../model/request/create-resume-request.model";
import { AppStore } from "../../../old/app-store";

@Component({
  selector: 'app-create-resume-form-component',
  templateUrl: './create-resume-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateResumeFormComponent {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  resumeRequestService = inject(ResumeRequestService);
  appStore = inject(AppStore);

  createResumeForm = this.formBuilder.group({
    name: ['', Validators.required],
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    socialMedias: this.formBuilder.array<Omit<CreateResumeSocialMediaRequestModel, 'order'>>([]),
    educations: this.formBuilder.array<CreateResumeEducationRequestModel>([]),
    experiences: this.formBuilder.array<CreateResumeExperienceRequestModel>([]),
    skillGroups: this.formBuilder.array<CreateResumeSkillGroupRequestModel>([])
  });

  onSubmit() {
    const { valid } = this.createResumeForm;
    if (!valid) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log(this.createResumeForm.value);
    const userId = this.appStore.user.value?.id ?? -1;
    const { value } = this.createResumeForm;
    const request: CreateResumeRequestModel = {
      name: value.name ?? '',
      jobTitle: value.jobTitle ?? '',
      description: value.description ?? '',
      userId: userId,
      socialMedias: value.socialMedias?.map((socialMedia, index) => ({
        label: socialMedia?.label ?? '',
        link: socialMedia?.link ?? '',
        order: index
      })) ?? [],
      educations: value.educations?.map(education => ({
        institutionName: education?.institutionName ?? '',
        fieldOfStudy: education?.fieldOfStudy ?? '',
        degree: education?.degree ?? '',
        graduationYear: education?.graduationYear ?? 0
      })) ?? [],
      experiences: value.experiences?.map(experience => ({
        companyName: experience?.companyName ?? '',
        jobTitle: experience?.jobTitle ?? '',
        startDate: experience?.startDate ?? new Date(),
        endDate: experience?.endDate ?? new Date(),
        experienceDescriptions: <CreateResumeExperienceDescriptionRequestModel[]><unknown>experience?.experienceDescriptions.map((experienceDescription, index) => ({
            description: experienceDescription.description,
            order: index
        })) ?? []
      })) ?? [],
      skillGroups: value.skillGroups?.map((skillGroup, index) => ({
        name: skillGroup?.name ?? '',
        order: index,
        skillElements: <CreateResumeSkillElementRequestModel[]><unknown>skillGroup?.skillElements.map((skillElement, index) => ({
          name: skillElement.name,
          order: index
        })) ?? []
      })) ?? [],
    };
    this.resumeRequestService.createResume(request);
    this.createResumeForm.reset();
    this.getSocialMedias().clear();
    this.getEducations().clear();
    this.getExperience().clear();
    this.getSkillGroup().clear();
  }

  getSocialMedias() {
    return <FormArray>this.createResumeForm.get('socialMedias');
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
      label: ['', Validators.required],
      link: ['', Validators.required]
    });
    this.getSocialMedias().push(control);
  }

  getEducations() {
    return <FormArray>this.createResumeForm.get('educations');
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
      graduationYear: ['', Validators.required]
    });
    this.getEducations().push(control);
  }

  getExperience() {
    return this.createResumeForm.get('experiences') as FormArray;
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
    return this.createResumeForm.get('skillGroups') as FormArray;
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
