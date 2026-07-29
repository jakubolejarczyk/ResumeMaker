import { inject, Injectable } from "@angular/core";
import { concatMap } from "rxjs";
import { Store } from "@ngxs/store";

import { UserDal } from "../dal/user.dal";
import { SetUsers } from "../store/actions/user.actions";

@Injectable({ providedIn: 'root' })
export class UserService {
  dal = inject(UserDal);
  store = inject(Store);

  readAll() {
    this.dal.readAll().pipe(
      concatMap(response => this.store.dispatch(new SetUsers(response.body))),
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
