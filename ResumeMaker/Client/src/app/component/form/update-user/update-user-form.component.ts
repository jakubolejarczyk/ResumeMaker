import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { AppStore } from "../../../store/app-store";
import { UserRequestService } from "../../../service/request/user-request.service";
import { UpdateUserRequestModel } from "../../../model/request/update-user-request.model";

@Component({
  selector: 'app-update-user-form-component',
  templateUrl: './update-user-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateUserFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  appStore = inject(AppStore);
  userRequestService = inject(UserRequestService);
  route = inject(ActivatedRoute);

  updateUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.userRequestService.readUser(id).subscribe(response => {
      if (response.success) {
        this.updateUserForm.controls.email.setValue(response.body.email);
        this.updateUserForm.controls.firstName.setValue(response.body.firstName);
        this.updateUserForm.controls.lastName.setValue(response.body.lastName);
        this.updateUserForm.controls.city.setValue(response.body.city);
        this.updateUserForm.controls.country.setValue(response.body.country);
        this.updateUserForm.controls.phoneNumber.setValue(response.body.phoneNumber);
      }
    });
  }

  onSubmit() {
    const { valid } = this.updateUserForm;
    if (!valid) {
      alert('Please fill in all required fields.');
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const { value } = this.updateUserForm;
    const request: UpdateUserRequestModel = {
      email: value.email ?? '',
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      city: value.city ?? '',
      country: value.country ?? '',
      phoneNumber: value.phoneNumber ?? ''
    };
    this.userRequestService.updateUser(id, request);
  }
}
