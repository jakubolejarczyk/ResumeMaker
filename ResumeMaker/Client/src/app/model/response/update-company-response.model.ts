import { CompanyEntityModel } from "../entity/company-entity.model";

export interface UpdateCompanyResponseModel {
  success: boolean;
  message: string;
  body: CompanyEntityModel;
}
