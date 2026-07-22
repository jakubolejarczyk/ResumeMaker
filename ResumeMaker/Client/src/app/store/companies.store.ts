import { Injectable } from "@angular/core";

import { StoreBase } from "../base/store.base";
import { CompanyEntityModel } from "../model/entity/company-entity.model";

@Injectable({ providedIn: 'root' })
export class CompaniesStore extends StoreBase<CompanyEntityModel[]> {
  constructor() {
    super([]);
  }
}
