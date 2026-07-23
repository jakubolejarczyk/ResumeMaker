import { UserEntityModel } from "../entity/user-entity.model";

export interface CreateUserRequestModel extends Omit<UserEntityModel, 'id'> {
}
