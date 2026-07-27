import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { UsersStateModel } from "../../model/state/users-state.model";
import { FetchAllUserAction } from "../action/user/fetch-all-user.action";
import { UserApi } from "../../api/user.api";
import { DeleteUserAction } from "../action/user/delete-user.action";

@State<UsersStateModel>({
  name: 'usersState',
  defaults: {
    users: []
  }
})
@Injectable()
export class UsersState {
  userApi = inject(UserApi);

  @Selector()
  static getUsers(state: UsersStateModel) {
    return state.users;
  }

  @Action(FetchAllUserAction)
  fetchAllUser(context: StateContext<UsersStateModel>) {
    return this.userApi.fetchAllUser().pipe(
      tap(response => {
        const users = response.body;
        context.setState({ users });
      })
    );
  }

  @Action(DeleteUserAction)
  deleteUser(_context: StateContext<UsersStateModel>, action: DeleteUserAction) {
    return this.userApi.deleteUser(action.userId);
  }
}
