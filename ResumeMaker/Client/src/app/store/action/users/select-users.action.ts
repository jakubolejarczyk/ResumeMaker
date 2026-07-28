import { UserEntityModel } from "../../../model/entity/user-entity.model";

export class SelectUsersAction {
  static readonly type = '[Users] Select';

  constructor(public user: UserEntityModel) { }
}
