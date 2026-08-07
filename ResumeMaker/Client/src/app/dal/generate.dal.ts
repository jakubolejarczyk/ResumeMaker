import { Injectable } from "@angular/core";

import { BaseDal } from "./base.dal";

@Injectable({ providedIn: 'root' })
export class GenerateDal extends BaseDal {
  create$(userId: number, companyId: number, resumeId: number) {
    const endpoint = `${this.API_URL}/generate/${userId}/${companyId}/${resumeId}`;
    return this.httpClient.post(endpoint, {}, { responseType: 'blob', observe: 'response' });
  }
}
