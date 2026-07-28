import { Injectable } from "@angular/core";

import { BaseApi } from "./base.api";
import { UserEntityModel } from "../model/entity/user-entity.model";
import { ResponseModel } from "../model/response/response.model";

@Injectable({ providedIn: 'root' })
export class UsersApi extends BaseApi {
  fetchAll() {
    return this.httpClient.get<ResponseModel<UserEntityModel[]>>(this.getUserEndpoint());
  }

  delete(userId: number) {
    return this.httpClient.delete<ResponseModel<UserEntityModel>>(this.getUserEndpoint(userId));
  }
}
