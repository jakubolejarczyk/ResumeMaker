import { CompanyEntityModel } from "../entity/company-entity.model";

export interface CompanyRequestModel extends Omit<CompanyEntityModel, 'id'> {
}
