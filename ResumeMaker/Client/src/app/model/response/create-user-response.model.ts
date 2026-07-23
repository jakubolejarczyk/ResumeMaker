import { UserEntityModel } from "../entity/user-entity.model";

export interface CreateUserResponseModel {
  success: boolean;
  message: string;
  body: UserEntityModel;
}
