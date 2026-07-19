import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css',
  standalone: false
})
export class CreateUserFormComponent {
  formBuilder = inject(FormBuilder);

  createUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  onSubmit() {
    if (!this.createUserForm.valid) return;
    console.log(this.createUserForm.value);
  }
}
