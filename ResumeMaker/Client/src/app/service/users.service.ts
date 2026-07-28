import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { concatMap, map, of, switchMap } from "rxjs";

import { FetchAllUsersAction } from "../store/action/users/fetch-all-users.action";
import { DeleteUsersAction } from "../store/action/users/delete-users.action";
import { DeselectUserAction } from "../store/action/user/deselect-user.action";
import { UsersState } from "../store/state/users.state";
import { UserState } from "../store/state/user.state";
import { CreateUserRequestModel } from "../model/request/create-user-request.model";
import { CreateUsersAction } from "../store/action/users/create-users.action";

@Injectable({ providedIn: 'root' })
export class UsersService {
  store = inject(Store);

  getUsers() {
    return this.store.select(UsersState.getUsers);
  }

  create(request: CreateUserRequestModel) {
    this.store.dispatch(new CreateUsersAction(request)).pipe(
      concatMap(() => this.store.dispatch(new FetchAllUsersAction())),
      map(() => ({
        users: this.store.selectSnapshot(UsersState.getUsers),
        selectedUserId: this.store.selectSnapshot(UserState.getSelectedUserId)
      })),
      switchMap(({ users, selectedUserId }) => {
        if (selectedUserId === undefined) return of(true);
        const selectedUserExists = users.some(user => user.id === selectedUserId);
        return selectedUserExists ? of(true) : this.store.dispatch(new DeselectUserAction());
      })
    ).subscribe();
  }

  fetchAll() {
    this.store.dispatch(new FetchAllUsersAction());
  }

  delete(userId: number) {
    this.store.dispatch(new DeleteUsersAction(userId)).pipe(
      concatMap(() => this.store.dispatch(new FetchAllUsersAction())),
      map(() => ({
        users: this.store.selectSnapshot(UsersState.getUsers),
        selectedUserId: this.store.selectSnapshot(UserState.getSelectedUserId)
      })),
      switchMap(({ users, selectedUserId }) => {
        if (selectedUserId === undefined) return of(true);
        const selectedUserExists = users.some(user => user.id === selectedUserId);
        return selectedUserExists ? of(true) : this.store.dispatch(new DeselectUserAction());
      })
    ).subscribe();
  }
}
