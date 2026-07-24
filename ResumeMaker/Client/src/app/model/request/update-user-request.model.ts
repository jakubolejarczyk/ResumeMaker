import { UserEntityModel } from "../entity/user-entity.model";

export interface UpdateUserRequestModel extends Omit<UserEntityModel, 'id'> {
}
