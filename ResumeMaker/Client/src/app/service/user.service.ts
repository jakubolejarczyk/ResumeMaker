import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

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

  select(user: UserEntityModel) {
    this.store.dispatch(new SelectUser(user));
  }

  deselect$() {
    return combineLatest({
      selectedUser: this.getSelectedUser$(),
      users: this.getUsers$()
    }).pipe(
      take(1),
      map(({ selectedUser, users }) => {
        if (!selectedUser) return;
        const selectedUserExists = users.some(user => user.id === selectedUser.id);
        if (selectedUserExists) return;
        this.store.dispatch(new DeselectUser());
      })
    );
  }

  create$(request: UserRequestModel) {
    return this.dal.create$(request).pipe(
      tap(response => alert(response.message)),
      filter(response => response.success),
      concatMap(() => this.readAll$())
    );
  }

  readAll$() {
    return this.dal.readAll$().pipe(
      map(response => response.success ? response.body : []),
      concatMap(users => this.store.dispatch(new SetUsers(users)))
    );
  }

  delete$(id: number) {
    return this.dal.delete$(id).pipe(
      tap(response => alert(response.message)),
      filter(response => response.success),
      concatMap(() => this.readAll$()),
      concatMap(() => this.deselect$())
    );
  }

  //

  read$(id: number) {
    return this.dal.read$(id);
  }

  update$(id: number, request: UserRequestModel) {
    return this.dal.update$(id, request).pipe(
      concatMap(response => {
        return this.readAll$().pipe(
          map(() => response)
        );
      }),
      concatMap(response => {
        return this.refreshSelectedUser$().pipe(
          map(() => response)
        );
      })
    );
  }

  refreshSelectedUser$() {
    return combineLatest({
      selectedUser: this.getSelectedUser$(),
      users: this.getUsers$()
    }).pipe(
      take(1),
      concatMap(({ selectedUser, users }) => {
        if (selectedUser) {
          const currentSelectedUser = users.find(user => user.id === selectedUser.id);
          if (currentSelectedUser) {
            this.select(currentSelectedUser);
          } else {
            this.store.dispatch(new DeselectUser())
          }
        }
        return of(void 0);
      })
    );
  }
}
