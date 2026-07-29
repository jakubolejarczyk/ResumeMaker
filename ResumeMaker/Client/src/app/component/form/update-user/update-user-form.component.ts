import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { UserDal } from "../../../dal/user.dal";
import { UserRequestModel } from "../../../model/request/user-request.model";
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-update-user-form-component',
  templateUrl: './update-user-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateUserFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  dal = inject(UserDal);
  route = inject(ActivatedRoute);
  service = inject(UserService);

  updateUserForm = this.formBuilder.group({
    id: [0, Validators.required],
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (!param) throw new Error('Id was not provided!');
    const id = parseInt(param);
    if (!id) throw new Error('Id is not a number!');
    this.dal.read(id).subscribe(response => {
      const { success, body } = response;
      if (success && body) {
        this.updateUserForm.controls.id.setValue(body.id);
        this.updateUserForm.controls.email.setValue(body.email);
        this.updateUserForm.controls.firstName.setValue(body.firstName);
        this.updateUserForm.controls.lastName.setValue(body.lastName);
        this.updateUserForm.controls.city.setValue(body.city);
        this.updateUserForm.controls.country.setValue(body.country);
        this.updateUserForm.controls.phoneNumber.setValue(body.phoneNumber);
      }
    });
  }

  onSubmit() {
    const { valid } = this.updateUserForm;
    if (!valid) {
      alert('Not all required fields have been completed.');
      return;
    }
    const { value } = this.updateUserForm;
    const request: UserRequestModel = {
      email: value.email ?? '',
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      city: value.city ?? '',
      country: value.country ?? '',
      phoneNumber: value.phoneNumber ?? ''
    };
    const id = value.id;
    if (!id) throw new Error("Id is not defined!");
    this.service.update(id, request).subscribe({
      next: (response) => {
        const { success, message } = response;
        if (success) {
          alert(message);
        }
      },
      error: (message) => {
        alert(message);
      }
    });
  }
}
