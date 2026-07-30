import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { concatMap, of } from "rxjs";

import { UserDal } from "../dal/user.dal";
import { SetUsers } from "../store/actions/user.actions";

@Injectable({ providedIn: 'root' })
export class UserService {
  private dal = inject(UserDal);
  private store = inject(Store);

  // getSelectedUser$() {
  //   return this.store.select(UserState.getSelectedUser);
  // }

  // getUsers$() {
  //   return this.store.select(UserState.getUsers);
  // }

  // getSelectedUser() {
  //   return this.store.selectOnce(UserState.getSelectedUser);
  // }

  // getUsers() {
  //   return this.store.selectOnce(UserState.getUsers);
  // }

  // select(user: UserEntityModel) {
  //   this.store.dispatch(new SelectUser(user));
  // }

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

  readAll$$() {
    return this.dal.readAll$().pipe(
      concatMap(response => {
        const { success, body } = response;
        const users = success ? body : [];
        this.store.dispatch(new SetUsers(users));
        return of(true);
      })
    );
  }

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

  // select$(id: number) {
  //   return this.getUsers$().pipe(
  //     concatMap(users => )
  //   );

  //   this.store.dispatch(new SelectUser(id));

  //   return this.dal.readAll().pipe(
  //     concatMap(response => {
  //       const { success, message, body } = response;
  //       const users = success ? body : [];
  //       this.store.dispatch(new SetUsers(users));
  //       return of({ success, message });
  //     })
  //   );
  // }
}
