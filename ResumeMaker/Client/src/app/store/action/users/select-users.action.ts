export class SelectUsersAction {
  static readonly type = '[Users] Select';

  constructor(public userId: number) { }
}
