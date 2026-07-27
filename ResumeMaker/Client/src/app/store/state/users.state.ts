import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { switchMap, tap } from "rxjs";

import { UserApi } from "../../api/user.api";
import { UsersStateModel } from "../../model/state/users-state.model";
import { FetchAllUsersAction } from "../action/users/fetch-all-users.action";
import { DeleteUsersAction } from "../action/users/delete-users.action";
import { UnselectUserAction } from "../action/user/unselect-user.action";

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

  @Action(FetchAllUsersAction)
  fetchAllUser(context: StateContext<UsersStateModel>) {
    return this.userApi.fetchAllUser().pipe(
      tap(response => {
        const users = response.body;
        context.setState({ users });
      })
    );
  }

  @Action(DeleteUsersAction)
  deleteUser(context: StateContext<UsersStateModel>, action: DeleteUsersAction) {
    return this.userApi.deleteUser(action.userId).pipe(
      switchMap(() => context.dispatch(new FetchAllUsersAction())),
      switchMap(() => context.dispatch(new UnselectUserAction()))
    );
  }
}
