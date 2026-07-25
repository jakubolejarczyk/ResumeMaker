import { CompanyEntityModel } from "../entity/company-entity.model";

export interface ReadCompanyResponseModel {
  success: boolean;
  message: string;
  body: CompanyEntityModel;
}
