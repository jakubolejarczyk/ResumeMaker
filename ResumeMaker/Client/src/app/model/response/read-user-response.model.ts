import { UserEntityModel } from "../entity/user-entity.model";

export interface ReadUserResponseModel {
  success: boolean;
  message: string;
  body: UserEntityModel;
}
