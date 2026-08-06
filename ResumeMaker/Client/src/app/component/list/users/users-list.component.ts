import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../../service/user.service";
import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { concatMap, of, take } from "rxjs";
import { CompanyService } from "../../../service/company.service";
import { ResumeService } from "../../../service/resume.service";

@Component({
  selector: 'app-users-list-component',
  templateUrl: './users-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class UsersListComponent {
  userService = inject(UserService);
  companyService = inject(CompanyService);
  resumeService = inject(ResumeService);
  router = inject(Router);

  users$ = this.userService.getUsers$();

  onSelect(user: UserEntityModel) {
    of(this.userService.select(user)).pipe(
      take(1),
      concatMap(() => this.companyService.readAllForUser$()),
      concatMap(() => this.companyService.deselect$()),
      concatMap(() => this.resumeService.readAllForUser$()),
      concatMap(() => this.resumeService.deselect$())
    ).subscribe();
  }

  onUpdate(user: UserEntityModel) {
    this.router.navigate(['/user', user.id]);
  }

  onDelete(user: UserEntityModel) {
    this.userService.delete$(user.id).pipe(
      concatMap(() => this.companyService.readAllForUser$()),
      concatMap(() => this.companyService.deselect$()),
      concatMap(() => this.resumeService.readAllForUser$()),
      concatMap(() => this.resumeService.deselect$())
    ).subscribe();
  }
}
