import { CompanyEntityModel } from "../../model/entity/company-entity.model";

export class SetCompanies {
  static readonly type = '[Company] Set Companies';

  constructor(public companies: CompanyEntityModel[]) { }
}

export class DeselectCompany {
  static readonly type = '[Company] Deselect';
}

export class SelectCompany {
  static readonly type = '[Company] Select';

  constructor(public company: CompanyEntityModel) { }
}
