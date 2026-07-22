import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { ResponseModel } from "../../../model/response/response.model";
import { UsersStore } from "../../../store/users.store";

@Component({
  selector: 'app-user-view-component',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
  standalone: false
})
export class UserViewComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  route = inject(ActivatedRoute);
  usersStore = inject(UsersStore);

  userForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<ResponseModel<UserEntityModel>>(`http://localhost:5038/api/user/${id}`).subscribe(response => {
      if (response.success) {
        this.userForm.controls.email.setValue(response.body.email);
        this.userForm.controls.firstName.setValue(response.body.firstName);
        this.userForm.controls.lastName.setValue(response.body.lastName);
        this.userForm.controls.city.setValue(response.body.city);
        this.userForm.controls.country.setValue(response.body.country);
        this.userForm.controls.phoneNumber.setValue(response.body.phoneNumber);
      }
    });
  }

  onSubmit() {
    if (!this.userForm.valid) return;
    const { value } = this.userForm;
    const id = this.route.snapshot.paramMap.get('id');
    this.httpClient.patch<ResponseModel<UserEntityModel>>(`http://localhost:5038/api/user/${id}`, value)
      .pipe(
        tap(() => {
          this.httpClient.get<ResponseModel<UserEntityModel>>(`http://localhost:5038/api/user/${id}`).subscribe(response => {
            if (response.success) {
              this.userForm.controls.email.setValue(response.body.email);
              this.userForm.controls.firstName.setValue(response.body.firstName);
              this.userForm.controls.lastName.setValue(response.body.lastName);
              this.userForm.controls.city.setValue(response.body.city);
              this.userForm.controls.country.setValue(response.body.country);
              this.userForm.controls.phoneNumber.setValue(response.body.phoneNumber);
            }
          });
        }),
        switchMap(response => {
          if (response.success) {
            return this.httpClient.get<ResponseModel<UserEntityModel[]>>('http://localhost:5038/api/user');
          } else {
            throw new Error(response.message);
          }
        })
      )
      .subscribe({
        next: response => {
          this.usersStore.data.next(response.body);
          this.userForm.reset();
        },
        error: err => {
          alert(err);
        }
      });
  }
}
