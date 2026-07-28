import { UserEntityModel } from "../../model/entity/user-entity.model";

export class SetUsers {
  static readonly type = '[User] Set Users';

  constructor(public users: UserEntityModel[]) { }
}

export class DeselectUser {
  static readonly type = '[User] Deselect';
}

export class SelectUser {
  static readonly type = '[User] Select';

  constructor(public user: UserEntityModel) { }
}
