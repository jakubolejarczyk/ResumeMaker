import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { UserStateModel } from "../../model/state/user-state.model";
import { SelectUserAction } from "../action/user/select-user.action";
import { DeselectUserAction } from "../action/user/deselect-user.action";

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
  select(context: StateContext<UserStateModel>, action: SelectUserAction) {
    context.setState({ selectedUserId: action.userId });
  }

  @Action(DeselectUserAction)
  deselect(context: StateContext<UserStateModel>) {
    context.setState({ selectedUserId: undefined });
  }
}
