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
    socialMedias: this.formBuilder.array([])
  });

  onSubmit() {
    console.log(this.resumeForm.value);

    const body: any = this.resumeForm.value;
    body.userId = 0;
    body.socialMedias = body.socialMedias == null ? [] : body.socialMedias.map((i: any) => ({
      ...i,
      order: 0
    }))

    this.httpClient.post('http://localhost:5038/api/resume', this.resumeForm.value).subscribe(response => {
      console.log(response);
    });
  }

  createSocialMedia() {
    return this.formBuilder.group({
      label: [''],
      link: ['']
    });
  }

  getSocialMedias() {
    return this.resumeForm.get('socialMedias') as FormArray;
  }

  addSocialMedia() {
    this.getSocialMedias().push(this.createSocialMedia());
  }

  removeSocialMedia(index: number) {
    this.getSocialMedias().removeAt(index);
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
}
