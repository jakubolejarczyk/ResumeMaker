import { UserEntityModel } from "../entity/user-entity.model";

export interface ReadUsersResponseModel {
  success: boolean;
  message: string;
  body: UserEntityModel[];
}
