import { CompanyEntityModel } from "../entity/company-entity.model";

export interface CompanyStateModel {
  selectedCompany?: CompanyEntityModel;
  companies: CompanyEntityModel[];
}
