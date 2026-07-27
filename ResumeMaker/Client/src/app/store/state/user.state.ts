import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { UserStateModel } from "../../model/state/user-state.model";
import { SelectUserAction } from "../action/user/select-user.action";

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    selectedUserId: undefined
  }
})
@Injectable()
export class UserState {
  @Selector()
  static getSelectedUserId(state: UserStateModel) {
    return state.selectedUserId;
  }

  @Action(SelectUserAction)
  fetchAllUser(context: StateContext<UserStateModel>, action: SelectUserAction) {
    context.setState({ selectedUserId: action.userId });
  }
}
