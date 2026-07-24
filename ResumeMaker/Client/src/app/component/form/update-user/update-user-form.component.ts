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
    this.userRequestService.readUser(id, this.updateUserForm);
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
