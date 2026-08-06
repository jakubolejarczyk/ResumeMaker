import { Component, inject } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { catchError, combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

import { ResumeEducationEntityModel, ResumeExperienceEntityModel, ResumeSkillGroupEntityModel, ResumeSocialMediaEntityModel } from "../../../model/entity/resume-entity.model";
import { ResumeRequestModel } from "../../../model/request/resume-request.model";
import { UserService } from "../../../service/user.service";
import { ResumeService } from "../../../service/resume.service";

@Component({
  selector: 'app-create-resume-form-component',
  templateUrl: './create-resume-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateResumeFormComponent {
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  service = inject(ResumeService);

  createResumeForm = this.formBuilder.group({
    name: ['', Validators.required],
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    socialMedias: this.formBuilder.array<ResumeSocialMediaEntityModel>([]),
    educations: this.formBuilder.array<ResumeEducationEntityModel>([]),
    experiences: this.formBuilder.array<ResumeExperienceEntityModel>([]),
    skillGroups: this.formBuilder.array<ResumeSkillGroupEntityModel>([])
  });

  onSubmit() {
    combineLatest({
      selectedUser: this.userService.getSelectedUser$(),
      form: of(this.createResumeForm)
    }).pipe(
      take(1),
      filter(({ form }) => {
        if (form.valid) return true;
        throw new Error('Not all required fields have been set.');
      }),
      map(({ selectedUser, form }) => ({ selectedUser, value: form.value })),
      map(({ selectedUser, value }) => {
        const { name, jobTitle, description, socialMedias, educations, experiences, skillGroups } = value;
        if (!name) throw new Error('Name has not been set.');
        if (!jobTitle) throw new Error('Job title name has not been set.');
        if (!description) throw new Error('Description has not been set.');
        if (!socialMedias) throw new Error('Social medias have not been set.');
        if (!educations) throw new Error('Educations have not been set.');
        if (!experiences) throw new Error('Experiences have not been set.');
        if (!skillGroups) throw new Error('Skill groups have not been set.');
        const controls = { name, jobTitle, description, socialMedias, educations, experiences, skillGroups };
        return { selectedUser, controls };
      }),
      map(({ selectedUser, controls }) => {
        if (!selectedUser) throw new Error('Selected user has not been set.');
        const request: ResumeRequestModel = {
          name: controls.name,
          jobTitle: controls.jobTitle,
          description: controls.description,
          userId: selectedUser.id,
          socialMedias: controls.socialMedias.filter(socialMedia => socialMedia !== null).map((socialMedia, index) => ({
            label: socialMedia.label,
            link: socialMedia.link,
            order: index,
          })),
          educations: controls.educations.filter(education => education !== null).map((education, index) => ({
            institutionName: education.institutionName,
            fieldOfStudy: education.fieldOfStudy,
            degree: education.degree,
            graduationYear: education.graduationYear,
            order: index
          })),
          experiences: controls.experiences.filter(experience => experience !== null).map((experience, index) => ({
            companyName: experience.companyName,
            jobTitle: experience.jobTitle,
            startDate: experience.startDate,
            endDate: experience.endDate,
            order: index,
            experienceDescriptions: experience.experienceDescriptions.filter(experienceDescription => experienceDescription !== null).map((experienceDescription, index) => ({
                description: experienceDescription.description,
                order: index
            }))
          })),
          skillGroups: controls.skillGroups.filter(skillGroup => skillGroup !== null).map((skillGroup, index) => ({
            name: skillGroup.name,
            order: index,
            skillElements: skillGroup.skillElements.filter(skillElement => skillElement !== null).map((skillElement, index) => ({
              name: skillElement.name,
              order: index
            }))
          })),
        };
        return request;
      }),
      concatMap(request => this.service.create$(request)),
      tap(() => {
        this.createResumeForm.reset();
        this.getSocialMedias().clear();
        this.getEducations().clear();
        this.getExperience().clear();
        this.getSkillGroup().clear();
      }),
      catchError(error => {
        alert(error);
        return of(void 0);
      })
    ).subscribe();
  }

  getSocialMedias() {
    return this.createResumeForm.get('socialMedias') as FormArray;
  }

  moveSocialMedia(fromIndex: number, toIndex: number) {
    const items = this.getSocialMedias();
    if (toIndex < 0 || toIndex >= items.length) return;
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
    return this.createResumeForm.get('educations') as FormArray;
  }

  moveEducation(fromIndex: number, toIndex: number) {
    const items = this.getEducations();
    if (toIndex < 0 || toIndex >= items.length) return;
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

  moveExperience(fromIndex: number, toIndex: number) {
    const items = this.getExperience();
    if (toIndex < 0 || toIndex >= items.length) return;
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

  getExperienceDescription(experienceIndex: number) {
    return this.getExperience()
      .at(experienceIndex)
      .get('experienceDescriptions') as FormArray;
  }

  moveExperienceDescription(experienceIndex: number, fromIndex: number, toIndex: number) {
    const descriptions = this.getExperienceDescription(experienceIndex);
    if (toIndex < 0 || toIndex >= descriptions.length) return;
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

  removeExperienceDescription(experienceIndex: number, descriptionIndex: number) {
    this.getExperienceDescription(experienceIndex).removeAt(descriptionIndex);
  }

  addExperienceDescription(experienceIndex: number) {
    const descriptions = this.getExperienceDescription(experienceIndex);
    descriptions.push(
      this.formBuilder.group({
        description: ['', Validators.required]
      })
    );
  }

  getSkillGroup() {
    return this.createResumeForm.get('skillGroups') as FormArray;
  }

  moveSkillGroup(fromIndex: number, toIndex: number) {
    const items = this.getSkillGroup();
    if (toIndex < 0 || toIndex >= items.length) return;
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

  addSkillGroup() {
    const control = this.formBuilder.group({
      name: ['', Validators.required],
      skillElements: this.formBuilder.array([])
    });
    this.getSkillGroup().push(control);
  }

  getSkillElement(experienceIndex: number) {
    return this.getSkillGroup()
      .at(experienceIndex)
      .get('skillElements') as FormArray;
  }

  moveSkillElement(experienceIndex: number, fromIndex: number, toIndex: number) {
    const descriptions = this.getSkillElement(experienceIndex);
    if (toIndex < 0 || toIndex >= descriptions.length) return;
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

  removeSkillElement(experienceIndex: number, descriptionIndex: number) {
    this.getSkillElement(experienceIndex).removeAt(descriptionIndex);
  }

  addSkillElement(experienceIndex: number) {
    const descriptions = this.getSkillElement(experienceIndex);
    descriptions.push(
      this.formBuilder.group({
        name: ['', Validators.required]
      })
    );
  }
}
