import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs";

import { UsersStateModel } from "../../model/state/users-state.model";
import { FetchAllUsersAction } from "../action/users/fetch-all-users.action";
import { UsersApi } from "../../api/users.api";
import { DeleteUsersAction } from "../action/users/delete-users.action";
import { CreateUsersAction } from "../action/users/create-users.action";
import { SelectUsersAction } from "../action/users/select-users.action";
import { DeselectUsersAction } from "../action/users/deselect-users.action";

@State<UsersStateModel>({
  name: 'usersState',
  defaults: {
    selectedUser: undefined,
    users: []
  }
})
@Injectable()
export class UsersState {
  usersApi = inject(UsersApi);

  @Selector()
  static getUsers(state: UsersStateModel) {
    return state.users;
  }

  @Selector()
  static getSelectedUser(state: UsersStateModel) {
    return state.selectedUser;
  }

  @Action(CreateUsersAction)
  create(_context: StateContext<UsersStateModel>, action: CreateUsersAction) {
    return this.usersApi.create(action.request);
  }

  @Action(FetchAllUsersAction)
  fetchAll(context: StateContext<UsersStateModel>) {
    return this.usersApi.fetchAll().pipe(
      map(response => {
        const users = response.success ? response.body : [];
        const state = context.getState();
        context.setState({ ...state, users });
        return response;
      })
    );
  }

  @Action(DeleteUsersAction)
  delete(_context: StateContext<UsersStateModel>, action: DeleteUsersAction) {
    return this.usersApi.delete(action.userId);
  }

  @Action(SelectUsersAction)
  select(context: StateContext<UsersStateModel>, action: SelectUsersAction) {
    const state = context.getState();
    context.setState({ ...state, selectedUser: action.user });
  }

  @Action(DeselectUsersAction)
  deselect(context: StateContext<UsersStateModel>) {
    const state = context.getState();
    context.setState({ ...state, selectedUser: undefined });
  }
}
