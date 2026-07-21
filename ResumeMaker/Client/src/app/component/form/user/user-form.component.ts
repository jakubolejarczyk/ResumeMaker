import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { UserRequestModel } from "../../../model/request/user-request.model";
import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { ResponseModel } from "../../../model/response/response.model";

@Component({
  selector: 'app-user-form-component',
  templateUrl: 'user-form.component.html',
  styleUrl: 'user-form.component.css',
  standalone: false
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);

  http = inject(HttpClient);

  userForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  onSubmit() {
    const body: UserRequestModel = <UserRequestModel>this.userForm.value;
    this.http.post<ResponseModel<UserEntityModel>>('http://localhost:5038/api/user', body).subscribe(response => {
      alert(response.message);
      if (response.success) {
        this.userForm.reset();
      }
    });
  }
}
