import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { UsersService } from "../../../service/users.service";

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class UsersListComponent {
  router = inject(Router);
  users = inject(UsersService);

  users$ = this.users.getUsers();

  onSelect(user: UserEntityModel) {
    this.users.select(user.id);
  }

  onUpdate(user: UserEntityModel) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: UserEntityModel) {
    this.users.delete(user.id);
  }
}
