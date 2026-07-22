import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-resumes-view-component',
  templateUrl: './resumes-view.component.html',
  styleUrl: './resumes-view.component.css',
  standalone: false
})
export class ResumesViewComponent {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);

  resumeForm = this.formBuilder.group({
    name: ['', Validators.required],
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    socialMedias: this.formBuilder.array([]),
    educations: this.formBuilder.array([]),
    experience: this.formBuilder.array([]),
    skillGroup: this.formBuilder.array([])
  });

  onSubmit() {
    console.log(this.resumeForm.value);
  }

  // Social medias
  getSocialMedias() {
    return <FormArray> this.resumeForm.get('socialMedias');
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

  // Educations
  getEducations() {
    return <FormArray>this.resumeForm.get('educations');
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

  // Experience
  getExperience() {
    return this.resumeForm.get('experience') as FormArray;
  }

  addExperience() {
    const control = this.formBuilder.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      experienceDescription: this.formBuilder.array([])
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


  // Experience descriptions
  getExperienceDescription(experienceIndex: number) {
    return this.getExperience()
      .at(experienceIndex)
      .get('experienceDescription') as FormArray;
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

  // Skill group
  getSkillGroup() {
    return this.resumeForm.get('skillGroup') as FormArray;
  }

  addSkillGroup() {
    const control = this.formBuilder.group({
      name: ['', Validators.required],
      skillElement: this.formBuilder.array([])
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


  // Skill element
  getSkillElement(experienceIndex: number) {
    return this.getSkillGroup()
      .at(experienceIndex)
      .get('skillElement') as FormArray;
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
