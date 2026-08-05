import { Injectable } from "@angular/core";

import { BaseDal } from "./base.dal";
import { ResumeRequestModel } from "../model/request/resume-request.model";
import { ResponseModel } from "../model/response/response.model";
import { ResumeEntityModel } from "../model/entity/resume-entity.model";

@Injectable({ providedIn: 'root' })
export class ResumeDal extends BaseDal {
  create$(request: ResumeRequestModel) {
    return this.httpClient.post<ResponseModel<ResumeEntityModel>>(this.getEndpoint(), request);
  }

  read$(id: number) {
    return this.httpClient.get<ResponseModel<ResumeEntityModel>>(this.getEndpoint(id));
  }

  readAllForUser$(userId: number) {
    return this.httpClient.get<ResponseModel<ResumeEntityModel[]>>(this.getEndpoint(userId, true));
  }

  update$(id: number, request: ResumeRequestModel) {
    return this.httpClient.patch<ResponseModel<ResumeEntityModel>>(this.getEndpoint(id), request);
  }

  delete$(id: number) {
    return this.httpClient.delete<ResponseModel<ResumeEntityModel>>(this.getEndpoint(id));
  }

  private getEndpoint(id?: number, isUserId?: boolean) {
    const endpoint = `${this.API_URL}/resume`;
    if (id) {
      if (isUserId) {
        return `${endpoint}/user/${id}`;
      }
      return `${endpoint}/${id}`;
    }
    return endpoint;
  }
}
