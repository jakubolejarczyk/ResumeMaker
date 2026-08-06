import { Injectable } from "@angular/core";

import { BaseDal } from "./base.dal";
import { ResponseModel } from "../model/response/response.model";
import { CompanyEntityModel } from "../model/entity/company-entity.model";

@Injectable({ providedIn: 'root' })
export class GenerateDal extends BaseDal {
  create$(id: number) {
    return this.httpClient.post(
      this.getEndpoint(id),
      {},
      {
        responseType: 'blob'
      }
    );
  }

  private getEndpoint(id?: number) {
    const endpoint = `${this.API_URL}/generate`;
    if (id) {
      return `${endpoint}/${id}`;
    }
    return endpoint;
  }
}
