import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";

import { CreateUserRequestModel } from "../../model/request/create-user-request.model";
import { CreateUserResponseModel } from "../../model/response/create-user-response.model";
import { ReadUsersResponseModel } from "../../model/response/read-users-response.model";
import { AppStore } from "../../store/app-store";

@Injectable({ providedIn: 'root' })
export class UserRequestService {
  readonly API_ENDPOINT = 'http://localhost:5038/api/user';

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
}
