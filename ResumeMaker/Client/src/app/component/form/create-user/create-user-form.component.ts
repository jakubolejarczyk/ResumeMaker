import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { AppStore } from "../../../store/app-store";
import { UserRequestService } from "../../../service/request/user-request.service";
import { CreateUserRequestModel } from "../../../model/request/create-user-request.model";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateUserFormComponent {
  formBuilder = inject(FormBuilder);
  appStore = inject(AppStore);
  userRequestService = inject(UserRequestService);

  createUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  onSubmit() {
    const { valid } = this.createUserForm;
    if (!valid) {
      alert('Please fill in all required fields.');
      return;
    }
    const { value } = this.createUserForm;
    const request: CreateUserRequestModel = {
      email: value.email ?? '',
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      city: value.city ?? '',
      country: value.country ?? '',
      phoneNumber: value.phoneNumber ?? ''
    };
    this.userRequestService.createUser(request);
    this.createUserForm.reset();
  }
}
