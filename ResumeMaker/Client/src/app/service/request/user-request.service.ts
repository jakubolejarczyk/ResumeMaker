import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap, tap } from "rxjs";

import { CreateUserRequestModel } from "../../model/request/create-user-request.model";
import { CreateUserResponseModel } from "../../model/response/create-user-response.model";
import { ReadUsersResponseModel } from "../../model/response/read-users-response.model";
import { AppStore } from "../../store/app-store";
import { DeleteUserResponseModel } from "../../model/response/delete-user-response.model";
import { ReadUserResponseModel } from "../../model/response/read-user-response.model";
import { UpdateUserRequestModel } from "../../model/request/update-user-request.model";
import { UpdateUserResponseModel } from "../../model/response/update-user-response.model";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class UserRequestService {
  readonly API_ENDPOINT = 'http://localhost:5038/api/user/';

  httpClient = inject(HttpClient);
  appStore = inject(AppStore);

  createUser(request: CreateUserRequestModel) {
    this.httpClient.post<CreateUserResponseModel>(this.API_ENDPOINT, request)
      .pipe(
        switchMap(response => {
          alert(response.message);
          return this.httpClient.get<ReadUsersResponseModel>(this.API_ENDPOINT);
        })
      )
      .subscribe(response => this.appStore.users.next(response.body));
  }

  readUser(id: string, updateUserForm: FormGroup<{
    email: FormControl,
    firstName: FormControl,
    lastName: FormControl,
    city: FormControl,
    country: FormControl,
    phoneNumber: FormControl
  }>) {
    this.httpClient.get<ReadUserResponseModel>(this.API_ENDPOINT + id).subscribe(response => {
      if (response.success) {
        updateUserForm.controls.email.setValue(response.body.email);
        updateUserForm.controls.firstName.setValue(response.body.firstName);
        updateUserForm.controls.lastName.setValue(response.body.lastName);
        updateUserForm.controls.city.setValue(response.body.city);
        updateUserForm.controls.country.setValue(response.body.country);
        updateUserForm.controls.phoneNumber.setValue(response.body.phoneNumber);
      }
    });
  }

  readUsers() {
    this.httpClient.get<ReadUsersResponseModel>(this.API_ENDPOINT).subscribe(response => {
      if (!response.success) {
        alert(response.message);
      }
      this.appStore.users.next(response.body);
    });
  }

  updateUser(id: string, request: UpdateUserRequestModel) {
    this.httpClient.patch<UpdateUserResponseModel>(this.API_ENDPOINT + id, request)
      .pipe(
        switchMap(response => {
          alert(response.message);
          return this.httpClient.get<ReadUsersResponseModel>(this.API_ENDPOINT);
        })
      )
      .subscribe(response => this.appStore.users.next(response.body));
  }

  deleteUser(userId: number) {
    this.httpClient.delete<DeleteUserResponseModel>(this.API_ENDPOINT + userId)
      .pipe(
        switchMap(response => {
          alert(response.message);
          return this.httpClient.get<ReadUsersResponseModel>(this.API_ENDPOINT);
        })
      )
      .subscribe(response => {
        this.appStore.users.next(response.body);
      });
  }
}
