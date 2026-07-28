import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { concatMap, map, of, switchMap } from "rxjs";

import { FetchAllUsersAction } from "../store/action/users/fetch-all-users.action";
import { DeleteUsersAction } from "../store/action/users/delete-users.action";
import { UsersState } from "../store/state/users.state";
import { CreateUserRequestModel } from "../model/request/create-user-request.model";
import { CreateUsersAction } from "../store/action/users/create-users.action";
import { DeselectUsersAction } from "../store/action/users/deselect-users.action";
import { SelectUsersAction } from "../store/action/users/select-users.action";
import { UserEntityModel } from "../model/entity/user-entity.model";

@Injectable({ providedIn: 'root' })
export class UsersService {
  store = inject(Store);

  getUsers() {
    return this.store.select(UsersState.getUsers);
  }

  getSelectedUserId() {
    return this.store.select(UsersState.getSelectedUser);
  }

  create(request: CreateUserRequestModel) {
    this.store.dispatch(new CreateUsersAction(request)).pipe(
      concatMap(() => this.store.dispatch(new FetchAllUsersAction())),
      map(() => ({
        users: this.store.selectSnapshot(UsersState.getUsers),
        selectedUser: this.store.selectSnapshot(UsersState.getSelectedUser)
      })),
      switchMap(({ users, selectedUser }) => {
        if (selectedUser === undefined) return of(true);
        const selectedUserExists = users.some(user => user.id === selectedUser.id);
        return selectedUserExists ? of(true) : this.store.dispatch(new DeselectUsersAction());
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
        selectedUser: this.store.selectSnapshot(UsersState.getSelectedUser)
      })),
      switchMap(({ users, selectedUser }) => {
        if (selectedUser === undefined) return of(true);
        const selectedUserExists = users.some(user => user.id === selectedUser.id);
        return selectedUserExists ? of(true) : this.store.dispatch(new DeselectUsersAction());
      })
    ).subscribe();
  }

  select(user: UserEntityModel) {
    this.store.dispatch(new SelectUsersAction(user));
  }
}
