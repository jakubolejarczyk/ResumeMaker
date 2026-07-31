import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { combineLatest, concatMap, map, of } from "rxjs";

import { UserDal } from "../dal/user.dal";
import { DeselectUser, SelectUser, SetUsers } from "../store/actions/user.actions";
import { UserState } from "../store/state/user.state";
import { UserRequestModel } from "../model/request/user-request.model";
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

  // select(user: UserEntityModel) {
  //   this.store.dispatch(new SelectUser(user));
  // }

  create$(request: UserRequestModel) {
    return of(true);
    // return this.dal.create$(request).pipe(
    //   concatMap(response => {
    //     return this.readAll$().pipe(
    //       map(() => response)
    //     );
    //   })
    // );
  }

  readAll$() {
    return this.dal.readAll$().pipe(
      map(response => response.success ? response.body : []),
      concatMap(users => this.store.dispatch(new SetUsers(users)))
    );
  }

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

  delete$(id: number) {
    return this.dal.delete$(id).pipe(
      concatMap(() => this.readAll$())
    );
  }

  select$(user: UserEntityModel) {
    return this.store.dispatch(new SelectUser(user));
  }

  deselect$() {
    return combineLatest([this.getSelectedUser$(), this.getUsers$()]).pipe(
      concatMap(([selectedUser, users]) => {
        if (!selectedUser) return of(void 0);
        const selectedUserExists = users.some(user => user.id === selectedUser.id);
        if (selectedUserExists) return of(void 0);
        this.store.dispatch(new DeselectUser());
        return of(void 0);
      })
    );
  }
}
