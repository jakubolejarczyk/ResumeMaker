import { Component, inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css',
  standalone: false
})
export class CreateUserFormComponent {
  formBuilder = inject(FormBuilder);

  createUserForm = this.formBuilder.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    city: [''],
    country: [''],
    phoneNumber: ['']
  });

  onSubmit() {
    console.log(this.createUserForm.value);
  }
}
