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
    experienceDescription: this.formBuilder.array([])
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
    return <FormArray>this.resumeForm.get('experience');
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

  addExperience() {
    const control = this.formBuilder.group({
      companyName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.getExperience().push(control);
  }

  // Experience description
  getExperienceDescription() {
    return <FormArray>this.resumeForm.get('experienceDescription');
  }

  moveExperienceDescription(fromIndex: number, toIndex: number) {
    const items = this.getExperienceDescription();
    if (toIndex < 0 || toIndex >= items.length) {
      return;
    }
    const control = items.at(fromIndex);
    items.removeAt(fromIndex);
    items.insert(toIndex, control);
  }

  moveExperienceDescriptionUp(index: number) {
    this.moveExperienceDescription(index, index - 1);
  }

  moveExperiencDescriptioneDown(index: number) {
    this.moveExperienceDescription(index, index + 1);
  }

  removeExperienceDescription(index: number) {
    this.getExperienceDescription().removeAt(index);
  }

  addExperienceDescription() {
    const control = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.getExperienceDescription().push(control);
  }
}
