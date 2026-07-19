import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css',
  standalone: false
})
export class CreateUserFormComponent {
  createUserForm = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  onSubmit() {
    console.log(this.createUserForm.value);
  }
}
