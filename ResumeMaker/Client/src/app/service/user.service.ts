import { inject, Injectable } from "@angular/core";
import { concatMap, of } from "rxjs";
import { Store } from "@ngxs/store";

import { UserDal } from "../dal/user.dal";
import { DeselectUser, SetUsers } from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";
import { UserRequestModel } from "../model/request/user-request.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  private dal = inject(UserDal);
  private store = inject(Store);

  create(request: UserRequestModel) {
    return this.dal.create(request).pipe(
      concatMap(response => {
        if (response.success) {
          return of(void 0);
        }
        throw new Error(response.message);
      }),
      concatMap(() => this.readAll())
    );
  }

  readAll() {
    return this.dal.readAll().pipe(
      concatMap(response => {
        const { success, body } = response;
        const users = success ? body : [];
        this.store.dispatch(new SetUsers(users));
        return of(void 0);
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
