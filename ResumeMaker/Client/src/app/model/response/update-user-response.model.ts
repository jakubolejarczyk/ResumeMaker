import { UserEntityModel } from "../entity/user-entity.model";

export interface UpdateUserResponseModel {
  success: boolean;
  message: string;
  body: UserEntityModel;
}
