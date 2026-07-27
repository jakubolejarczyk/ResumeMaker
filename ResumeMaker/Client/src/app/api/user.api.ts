import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

import { BaseApi } from "./base.api";
import { UserEntityModel } from "../model/entity/user-entity.model";
import { ResponseModel } from "../model/response/response.model";

@Injectable({ providedIn: 'root' })
export class UserApi extends BaseApi {
  httpClient = inject(HttpClient);

  fetchAllUser() {
    return this.httpClient.get<ResponseModel<UserEntityModel[]>>(this.getUserEndpoint())
      .pipe(
        tap(response => {
          if (!response.success) {
            alert(response.message);
          }
        })
      );
  }
}
