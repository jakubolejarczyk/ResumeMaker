import { UserEntityModel } from "../entity/user-entity.model";

export interface UserRequestModel extends Omit<UserEntityModel, 'id'> {
}
