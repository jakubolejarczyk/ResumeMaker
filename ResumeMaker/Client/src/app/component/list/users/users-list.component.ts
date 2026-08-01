import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../../service/user.service";
import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { concatMap } from "rxjs";
import { CompanyService } from "../../../service/company.service";

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class UsersListComponent {
  userService = inject(UserService);
  companyService = inject(CompanyService);
  router = inject(Router);

  users$ = this.userService.getUsers$();

  onSelect(user: UserEntityModel) {
    this.userService.select(user);
  }

  onUpdate(user: UserEntityModel) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: UserEntityModel) {
    this.userService.delete$(user.id).pipe(
      concatMap(() => this.companyService.readAllForUser$()),
      concatMap(() => this.companyService.deselect$())
    ).subscribe();
  }
}
