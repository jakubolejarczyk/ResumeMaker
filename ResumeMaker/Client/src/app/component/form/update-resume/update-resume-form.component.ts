import { Component, inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { catchError, combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { ResumeEducationEntityModel, ResumeExperienceEntityModel, ResumeSkillGroupEntityModel, ResumeSocialMediaEntityModel } from "../../../model/entity/resume-entity.model";
import { ResumeRequestModel } from "../../../model/request/resume-request.model";
import { UserService } from "../../../service/user.service";
import { ResumeService } from "../../../service/resume.service";

@Component({
  selector: 'app-update-resume-form-component',
  templateUrl: './update-resume-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateResumeFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  service = inject(ResumeService);
  route = inject(ActivatedRoute);

  updateResumeForm = this.formBuilder.group({
    name: ['', Validators.required],
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    socialMedias: this.formBuilder.array<ResumeSocialMediaEntityModel>([]),
    educations: this.formBuilder.array<ResumeEducationEntityModel>([]),
    experiences: this.formBuilder.array<ResumeExperienceEntityModel>([]),
    skillGroups: this.formBuilder.array<ResumeSkillGroupEntityModel>([])
  });

  ngOnInit() {
    this.resetForm().subscribe();
  }

  onSubmit() {
    combineLatest({
      selectedUser: this.userService.getSelectedUser$(),
      form: of(this.updateResumeForm),
      paramId: of(this.route.snapshot.paramMap.get('id'))
    }).pipe(
      take(1),
      filter(({ form }) => {
        if (form.valid) return true;
        throw new Error('Not all required fields have been set.');
      }),
      map(({ selectedUser, form, paramId }) => {
        if (!paramId) throw new Error('Parameter id was not defined!');
        if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
        const id = parseInt(paramId);
        return { selectedUser, form, id };
      }),
      map(({ selectedUser, form, id }) => ({ selectedUser, value: form.value, id })),
      map(({ selectedUser, value, id }) => {
        const { name, jobTitle, description, socialMedias, educations, experiences, skillGroups } = value;
        if (!name) throw new Error('Name has not been set.');
        if (!jobTitle) throw new Error('Job title name has not been set.');
        if (!description) throw new Error('Description has not been set.');
        if (!socialMedias) throw new Error('Social medias have not been set.');
        if (!educations) throw new Error('Educations have not been set.');
        if (!experiences) throw new Error('Experiences have not been set.');
        if (!skillGroups) throw new Error('Skill groups have not been set.');
        const controls = { name, jobTitle, description, socialMedias, educations, experiences, skillGroups };
        return { selectedUser, controls, id };
      }),
      map(({ selectedUser, controls, id }) => {
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
        return ({ selectedUser, request, id });
      }),
      concatMap(({ selectedUser, request, id }) => this.service.update$(id, request)),
      concatMap(() => this.resetForm()),
      catchError(error => {
        alert(error);
        return of(void 0);
      })
    ).subscribe();
  }

  getSocialMedias() {
    return this.updateResumeForm.get('socialMedias') as FormArray;
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
      id: [null],
      label: ['', Validators.required],
      link: ['', Validators.required]
    });
    this.getSocialMedias().push(control);
  }

  getEducations() {
    return this.updateResumeForm.get('educations') as FormArray;
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
      id: [null],
      institutionName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      degree: ['', Validators.required],
      graduationYear: ['', Validators.required]
    });
    this.getEducations().push(control);
  }

  getExperience() {
    return this.updateResumeForm.get('experiences') as FormArray;
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
      id: [null],
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
        id: [null, Validators.required],
        description: ['', Validators.required]
      })
    );
  }

  getSkillGroup() {
    return this.updateResumeForm.get('skillGroups') as FormArray;
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
      id: [null],
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
        id: [null],
        name: ['', Validators.required]
      })
    );
  }

  private resetForm() {
    return of(this.route.snapshot.paramMap.get('id')).pipe(
      take(1),
      map(paramId => {
        if (!paramId) throw new Error('Parameter id was not defined!');
        if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
        return parseInt(paramId);
      }),
      concatMap(id => {
        return this.service.getResumes$().pipe(
          take(1),
          concatMap(resumes => {
            const resumeToUpdate = resumes.find(resume => resume.id === id);
            if (resumeToUpdate) return of(resumeToUpdate);
            throw new Error('Resume to update does not exist!');
          })
        );
      }),
      tap(() => {
        this.updateResumeForm.reset();
        this.getSocialMedias().clear();
        this.getEducations().clear();
        this.getExperience().clear();
        this.getSkillGroup().clear();
      }),
      map(resumeToUpdate => {
        this.updateResumeForm.controls.name.setValue(resumeToUpdate.name);
        this.updateResumeForm.controls.jobTitle.setValue(resumeToUpdate.jobTitle);
        this.updateResumeForm.controls.description.setValue(resumeToUpdate.description);
        resumeToUpdate.socialMedias.forEach(socialMedia => {
          this.getSocialMedias().push(this.formBuilder.group({
            id: [socialMedia.id],
            label: [socialMedia.label, Validators.required],
            link: [socialMedia.link, Validators.required]
          }));
        });
        resumeToUpdate.educations.forEach(education => {
          this.getEducations().push(this.formBuilder.group({
            id: [education.id],
            institutionName: [education.institutionName, Validators.required],
            fieldOfStudy: [education.fieldOfStudy, Validators.required],
            degree: [education.degree, Validators.required],
            graduationYear: [education.graduationYear, Validators.required]
          }));
        });
        resumeToUpdate.experiences.forEach(experience => {
          this.getExperience().push(this.formBuilder.group({
            id: [experience.id],
            companyName: [experience.companyName, Validators.required],
            jobTitle: [experience.jobTitle, Validators.required],
            startDate: [experience.startDate, Validators.required],
            endDate: [experience.endDate, Validators.required],
            experienceDescriptions: this.formBuilder.array([])
          }));
          experience.experienceDescriptions.forEach((experienceDescription, index) => {
            this.getExperienceDescription(index).push(this.formBuilder.group({
              id: [experienceDescription.id],
              description: [experienceDescription.description, Validators.required]
            }));
          });
        });
        resumeToUpdate.skillGroups.forEach(skillGroup => {
          this.getSkillGroup().push(this.formBuilder.group({
            id: [skillGroup.id],
            name: [skillGroup.name, Validators.required],
            skillElements: this.formBuilder.array([])
          }));
          skillGroup.skillElements.forEach((skillElement, index) => {
            this.getSkillElement(index).push(this.formBuilder.group({
              id: [skillElement.id],
              name: [skillElement.name, Validators.required]
            }));
          });
        });
      })
    )
  }
}
