import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";

import { UserDal } from "../dal/user.dal";
import { SelectUser } from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";
import { UserEntityModel } from "../model/entity/user-entity.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  private dal = inject(UserDal);
  private store = inject(Store);

  getSelectedUser$() {
    return this.store.select(UserState.getSelectedUser);
  }

  getUsers$() {
    return this.store.select(UserState.getUsers);
  }

  getSelectedUser() {
    return this.store.selectOnce(UserState.getSelectedUser);
  }

  getUsers() {
    return this.store.selectOnce(UserState.getUsers);
  }

  select(user: UserEntityModel) {
    this.store.dispatch(new SelectUser(user));
  }

  // create(request: UserRequestModel) {
  //   return this.dal.create(request).pipe(
  //     concatMap(response => {
  //       const { success, message } = response;
  //       if (success) {
  //         return of(response);
  //       }
  //       throw new Error(message);
  //     }),
  //     concatMap(response => {
  //       return this.readAll().pipe(
  //         map(() => response)
  //       );
  //     })
  //   );
  // }

  // readAll() {
  //   return this.dal.readAll().pipe(
  //     concatMap(response => {
  //       const { success, body } = response;
  //       const users = success ? body : [];
  //       this.store.dispatch(new SetUsers(users));
  //       return of(void 0);
  //     }),
  //     concatMap(() => {
  //       const selectedUser = this.store.selectSnapshot(UserState.getSelectedUser);
  //       if (selectedUser === undefined) return of(void 0);
  //       const users = this.store.selectSnapshot(UserState.getUsers);
  //       const selectedUserCopy = users.find(user => user.id === selectedUser.id);
  //       if (selectedUserCopy) {
  //         this.store.dispatch(new SelectUser(selectedUserCopy));
  //       } else {
  //         this.store.dispatch(new DeselectUser());
  //       }
  //       return of(void 0);
  //     })
  //   );
  // }

  // delete(id: number) {
  //   return this.dal.delete(id).pipe(
  //     concatMap(response => {
  //       const { success, message } = response;
  //       if (success) {
  //         return of(response);
  //       }
  //       throw new Error(message);
  //     }),
  //     concatMap(response => {
  //       return this.readAll().pipe(
  //         map(() => response)
  //       );
  //     })
  //   );
  // }

  // update(id: number, request: UserRequestModel) {
  //   return this.dal.update(id, request).pipe(
  //     concatMap(response => {
  //       const { success, message } = response;
  //       if (success) {
  //         return of(response);
  //       }
  //       throw new Error(message);
  //     }),
  //     concatMap(response => {
  //       return this.readAll().pipe(
  //         map(() => response)
  //       );
  //     })
  //   );
  // }
}
