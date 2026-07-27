export class DeleteUsersAction {
  static readonly type = '[Users] Delete';

  constructor(public userId: number) { }
}
