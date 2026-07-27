import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { Router } from "@angular/router";

import { UsersState } from "../../../store/state/users.state";
import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { DeleteUserAction } from "../../../store/action/user/delete-user.action";
import { FetchAllUserAction } from "../../../store/action/user/fetch-all-user.action";

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
    // this.appStore.user.next(user);
    // this.appStore.company.next(undefined);
  }

  onUpdate(user: UserEntityModel) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: UserEntityModel) {
    this.store.dispatch(new DeleteUserAction(user.id)).subscribe(() => {
      this.store.dispatch(new FetchAllUserAction());
    });
  }
}
