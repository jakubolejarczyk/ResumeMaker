export class SelectUserAction {
  static readonly type = '[User] Select';

  constructor(public userId: number) { }
}
