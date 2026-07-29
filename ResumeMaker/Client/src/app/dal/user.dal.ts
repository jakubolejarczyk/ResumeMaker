import { Injectable } from "@angular/core";

import { BaseDal } from "./base.dal";
import { ResponseModel } from "../model/response/response.model";
import { UserEntityModel } from "../model/entity/user-entity.model";
import { UserRequestModel } from "../model/request/user-request.model";

@Injectable({ providedIn: 'root' })
export class UserDal extends BaseDal {
  create(request: UserRequestModel) {
    return this.httpClient.post<ResponseModel<UserEntityModel>>(this.getEndpoint(), request);
  }

  read(id: number) {
    return this.httpClient.get<ResponseModel<UserEntityModel>>(this.getEndpoint(id));
  }

  readAll() {
    return this.httpClient.get<ResponseModel<UserEntityModel[]>>(this.getEndpoint());
  }

  update(id: number, request: UserRequestModel) {
    return this.httpClient.patch<ResponseModel<UserEntityModel>>(this.getEndpoint(id), request);
  }

  delete(id: number) {
    return this.httpClient.delete<ResponseModel<UserEntityModel>>(this.getEndpoint(id));
  }

  private getEndpoint(id?: number) {
    const endpoint = `${this.API_URL}/user`;
    return id ? `${endpoint}/${id}` : endpoint;
  }
}
