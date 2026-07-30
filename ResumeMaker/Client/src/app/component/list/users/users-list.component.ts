import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../../service/user.service";
import { UserEntityModel } from "../../../model/entity/user-entity.model";

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class UsersListComponent {
  service = inject(UserService);
  router = inject(Router);

  // users$ = this.service.getUsers();

  onSelect(user: UserEntityModel) {
    // this.service.select(user);
  }

  onUpdate(user: UserEntityModel) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: UserEntityModel) {
    // this.service.delete(user.id).subscribe();
  }
}
