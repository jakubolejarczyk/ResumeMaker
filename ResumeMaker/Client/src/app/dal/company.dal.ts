import { Injectable } from "@angular/core";

import { BaseDal } from "./base.dal";
import { ResponseModel } from "../model/response/response.model";
import { CompanyEntityModel } from "../model/entity/company-entity.model";
import { CompanyRequestModel } from "../model/request/company-request.model";

@Injectable({ providedIn: 'root' })
export class CompanyDal extends BaseDal {
  create(request: CompanyRequestModel) {
    return this.httpClient.post<ResponseModel<CompanyEntityModel>>(this.getEndpoint(), request);
  }

  read(id: number) {
    return this.httpClient.get<ResponseModel<CompanyEntityModel>>(this.getEndpoint(id));
  }

  readAllForUser(userId: number) {
    return this.httpClient.get<ResponseModel<CompanyEntityModel[]>>(this.getEndpoint(userId, true));
  }

  update(id: number, request: CompanyRequestModel) {
    return this.httpClient.patch<ResponseModel<CompanyEntityModel>>(this.getEndpoint(id), request);
  }

  delete(id: number) {
    return this.httpClient.delete<ResponseModel<CompanyEntityModel>>(this.getEndpoint(id));
  }

  private getEndpoint(id?: number, isUserId?: boolean) {
    const endpoint = `${this.API_URL}/company`;
    if (id) {
      if (isUserId) {
        return `${endpoint}/user/${id}`;
      }
      return `${endpoint}/${id}`;
    }
    return endpoint;
  }
}
