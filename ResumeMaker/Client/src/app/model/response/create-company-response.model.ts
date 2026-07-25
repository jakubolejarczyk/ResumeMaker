import { CompanyEntityModel } from "../entity/company-entity.model";

export interface CreateCompanyResponseModel {
  success: boolean;
  message: string;
  body: CompanyEntityModel;
}
