import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { switchMap } from "rxjs";

import { UsersState } from "../../../store/state/users.state";
import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { SelectUserAction } from "../../../store/action/user/select-user.action";
import { DeleteUsersAction } from "../../../store/action/users/delete-users.action";
import { FetchAllUsersAction } from "../../../store/action/users/fetch-all-users.action";

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class UsersListComponent {
  store = inject(Store);
  router = inject(Router);

  users$ = this.store.select(UsersState.getUsers);

  onSelect(user: UserEntityModel) {
    this.store.dispatch(new SelectUserAction(user.id));
  }

  onUpdate(user: UserEntityModel) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: UserEntityModel) {
    this.store.dispatch(new DeleteUsersAction(user.id))
      .pipe(
        switchMap(() => this.store.dispatch(new FetchAllUsersAction()))
      )
      .subscribe();
  }
}
