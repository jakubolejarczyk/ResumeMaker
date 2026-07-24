import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AppStore } from "../../../store/app-store";
import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { UserRequestService } from "../../../service/request/user-request.service";

@Component({
  selector: 'app-user-list-component',
  templateUrl: './users-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class UsersListComponent implements OnInit, OnDestroy {
  appStore = inject(AppStore);
  userRequestService = inject(UserRequestService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  users: UserEntityModel[] = [];

  sub!: Subscription;

  ngOnInit() {
    this.sub = this.appStore.users.subscribe(users => {
      this.users = users;
      this.cdr.detectChanges();
    });
    this.userRequestService.readUsers();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(user: UserEntityModel) {
    this.appStore.user.next(user);
  }

  onUpdate(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  onDelete(userId: number) {
    this.userRequestService.deleteUser(userId);
  }
}
