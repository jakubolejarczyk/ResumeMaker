import { UserEntityModel } from "../entity/user-entity.model";

export interface UserStateModel {
  selectedUser?: UserEntityModel;
  users: UserEntityModel[];
  readAll: {
    success: boolean;
    message: string;
  }
}
