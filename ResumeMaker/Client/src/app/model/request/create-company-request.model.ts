import { CompanyEntityModel } from "../entity/company-entity.model";

export interface CreateCompanyRequestModel extends Omit<CompanyEntityModel, 'id'> {
}
