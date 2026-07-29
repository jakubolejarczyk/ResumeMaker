import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../../../service/user.service";
import { UserRequestModel } from "../../../model/request/user-request.model";

@Component({
  selector: 'app-create-user-form-component',
  templateUrl: './create-user-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateUserFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  service = inject(UserService);

  showMessage = false;
  isError = false;
  message = '';

  createUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit() {
    this.resetMessage();
  }

  onSubmit() {
    this.resetMessage();
    const { valid } = this.createUserForm;
    if (!valid) {
      this.showMessage = true;
      this.isError = true;
      this.message = 'Not all required fields have been completed.';
      return;
    }
    const { value } = this.createUserForm;
    const request: UserRequestModel = {
      email: value.email ?? '',
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      city: value.city ?? '',
      country: value.country ?? '',
      phoneNumber: value.phoneNumber ?? ''
    };
    this.service.create(request).subscribe({
      next: (response) => {
        const { success, message } = response;
        if (success) {
          alert(message);
          this.createUserForm.reset();
        }
      },
      error: (message) => {
        alert(message);
      }
    });
  }

  private resetMessage() {
    this.showMessage = false;
    this.isError = false;
    this.message = '';
  }
}
