import { Component, inject } from "@angular/core";
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-resumes-view-component',
  templateUrl: './resumes-view.component.html',
  styleUrl: './resumes-view.component.css',
  standalone: false
})
export class ResumesViewComponent {
  formBuilder = inject(FormBuilder);
  resumeForm = this.formBuilder.group({
    name: ['', Validators.required],
    jobTitle: ['', Validators.required],
    description: ['', Validators.required],
    socialMedias: this.formBuilder.array([])
  });

  getItems() {
    return this.resumeForm.get('socialMedias') as FormArray;
  }

  addSocialMedia() {
    this.getItems().push(this.createSocialMedia());
  }

  removeItem(index: number) {
    const aaa = this.resumeForm.get('socialMedias') as FormArray;
    aaa.removeAt(index);
  }

  createSocialMedia() {
    return this.formBuilder.group({
      name: [''],
      url: [''],
      description: ['']
    });
  }

  onSubmit() {
    console.log(this.resumeForm.value);
  }

  moveItem(fromIndex: number, toIndex: number) {
    const items = this.getItems();

    if (toIndex < 0 || toIndex >= items.length) {
      return;
    }

    const control = items.at(fromIndex);

    items.removeAt(fromIndex);
    items.insert(toIndex, control);
  }

  moveUp(index: number) {
    this.moveItem(index, index - 1);
  }

  moveDown(index: number) {
    this.moveItem(index, index + 1);
  }
}
