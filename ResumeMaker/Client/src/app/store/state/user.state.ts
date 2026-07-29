import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { UserStateModel } from "../../model/state/user-state.model";
import { DeselectUser, SelectUser, SetReadAll, SetUsers } from "../actions/user.actions";

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    selectedUser: undefined,
    users: [],
    readAll: {
      success: false,
      message: ''
    }
  }
})
@Injectable()
export class UserState {
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static getSelectedUser(state: UserStateModel) {
    return state.selectedUser;
  }

  @Action(SetUsers)
  setUsers(context: StateContext<UserStateModel>, action: SetUsers) {
    const state = context.getState();
    context.setState({
      ...state,
      users: action.users
    });
  }

  @Action(DeselectUser)
  deselectUser(context: StateContext<UserStateModel>) {
    const state = context.getState();
    context.setState({
      ...state,
      selectedUser: undefined
    });
  }

  @Action(SelectUser)
  selectUser(context: StateContext<UserStateModel>, action: SelectUser) {
    const state = context.getState();
    context.setState({
      ...state,
      selectedUser: action.user
    });
  }

  @Action(SetReadAll)
  setReadAll(context: StateContext<UserStateModel>, action: SetReadAll) {
    const state = context.getState();
    context.setState({
      ...state,
      readAll: {
        ...state.readAll,
        success: action.success,
        message: action.message
      }
    });
  }
}
