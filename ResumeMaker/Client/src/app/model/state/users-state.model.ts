import { UserEntityModel } from "../entity/user-entity.model";

export interface UsersStateModel {
  selectedUser?: UserEntityModel;
  users: UserEntityModel[];
  fetchAll: {
    success: boolean | undefined;
    message: string;
  }
}
