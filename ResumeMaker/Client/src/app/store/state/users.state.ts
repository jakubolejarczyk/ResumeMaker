import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs";

import { UsersStateModel } from "../../model/state/users-state.model";
import { FetchAllUsersAction } from "../action/users/fetch-all-users.action";
import { UsersApi } from "../../api/users.api";
import { DeleteUsersAction } from "../action/users/delete-users.action";

@State<UsersStateModel>({
  name: 'usersState',
  defaults: {
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

  @Action(FetchAllUsersAction)
  fetchAll(context: StateContext<UsersStateModel>) {
    return this.usersApi.fetchAll().pipe(
      map(response => {
        const users = response.success ? response.body : [];
        context.setState({ users });
        return response;
      })
    );
  }

  @Action(DeleteUsersAction)
  delete(_context: StateContext<UsersStateModel>, action: DeleteUsersAction) {
    return this.usersApi.delete(action.userId);
  }
}
