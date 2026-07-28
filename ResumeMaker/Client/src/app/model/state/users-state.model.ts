import { UserEntityModel } from "../entity/user-entity.model";

export interface UsersStateModel {
  selectedUserId?: number;
  users: UserEntityModel[];
}
