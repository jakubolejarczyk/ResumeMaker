import { CreateUserRequestModel } from "../../../model/request/create-user-request.model";

export class CreateUsersAction {
  static readonly type = '[Users] Create';

  constructor(public request: CreateUserRequestModel) { }
}
