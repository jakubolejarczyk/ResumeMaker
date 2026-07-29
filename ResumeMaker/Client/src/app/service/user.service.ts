import { inject, Injectable } from "@angular/core";
import { concatMap, map, of } from "rxjs";
import { Store } from "@ngxs/store";

import { UserDal } from "../dal/user.dal";
import { DeselectUser, SetReadAll, SetUsers } from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";

@Injectable({ providedIn: 'root' })
export class UserService {
  private dal = inject(UserDal);
  private store = inject(Store);

  readAll() {
    return this.dal.readAll().pipe(
      concatMap(response => {
        const { body } = response;
        return this.store.dispatch(new SetUsers(body)).pipe(map(() => response))
      }),
      concatMap(response => {
        const { success, message } = response;
        return this.store.dispatch(new SetReadAll(success, message))
      }),
      concatMap(() => {
        const selectedUser = this.store.selectSnapshot(UserState.getSelectedUser);
        if (selectedUser === undefined) return of(void 0);
        const users = this.store.selectSnapshot(UserState.getUsers);
        const selectedUserExists = users.some(user => user.id === selectedUser.id);
        if (!selectedUserExists) this.store.dispatch(new DeselectUser());
        return of(void 0);
      })
    );
  }

  // getState() {
  //   return this.store.select(UsersState.getState);
  // }

  // getSelectedUserId() {
  //   return this.store.select(UsersState.getSelectedUser);
  // }

  // create(request: CreateUserRequestModel) {
  //   this.store.dispatch(new CreateUsersAction(request)).pipe(
  //     concatMap(() => this.store.dispatch(new FetchAllUsersAction())),
  //     map(() => ({
  //       users: this.store.selectSnapshot(UsersState.getUsers),
  //       selectedUser: this.store.selectSnapshot(UsersState.getSelectedUser)
  //     })),
  //     switchMap(({ users, selectedUser }) => {
  //       if (selectedUser === undefined) return of(true);
  //       const selectedUserExists = users.some(user => user.id === selectedUser.id);
  //       return selectedUserExists ? of(true) : this.store.dispatch(new DeselectUsersAction());
  //     })
  //   ).subscribe();
  // }

  // fetchAll() {
  //   this.store.dispatch(new FetchAllUsersAction());
  // }

  // delete(userId: number) {
  //   this.store.dispatch(new DeleteUsersAction(userId)).pipe(
  //     concatMap(() => this.store.dispatch(new FetchAllUsersAction())),
  //     map(() => ({
  //       users: this.store.selectSnapshot(UsersState.getUsers),
  //       selectedUser: this.store.selectSnapshot(UsersState.getSelectedUser)
  //     })),
  //     switchMap(({ users, selectedUser }) => {
  //       if (selectedUser === undefined) return of(true);
  //       const selectedUserExists = users.some(user => user.id === selectedUser.id);
  //       return selectedUserExists ? of(true) : this.store.dispatch(new DeselectUsersAction());
  //     })
  //   ).subscribe();
  // }

  // select(user: UserEntityModel) {
  //   this.store.dispatch(new SelectUsersAction(user));
  // }
}
