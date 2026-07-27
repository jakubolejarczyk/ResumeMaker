export class DeleteUserAction {
  static readonly type = '[User] Delete';

  constructor(public userId: number) { }
}
