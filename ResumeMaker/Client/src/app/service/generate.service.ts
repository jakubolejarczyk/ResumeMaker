import { inject, Injectable } from "@angular/core";

import { GenerateDal } from "../dal/generate.dal";

@Injectable({ providedIn: 'root' })
export class GenerateService {
  private dal = inject(GenerateDal);

  create$(userId: number, companyId: number, resumeId: number) {
    return this.dal.create$(userId, companyId, resumeId);
  }
}
