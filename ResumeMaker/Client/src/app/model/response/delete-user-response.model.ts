import { UserEntityModel } from "../entity/user-entity.model";

export interface DeleteUserResponseModel {
  success: boolean;
  message: string;
  body: UserEntityModel;
}
