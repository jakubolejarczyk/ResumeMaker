import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription, switchMap } from "rxjs";

import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { ResponseModel } from "../../../model/response/response.model";
// import { UsersStore } from "../../../store/users.store";
import { Router } from "@angular/router";
// import { UserStore } from "../../../store/user.store";

@Component({
  selector: 'app-users-view-component',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css',
  standalone: false
})
export class UsersViewComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  // usersStore = inject(UsersStore);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  // userStore = inject(UserStore);

  userForm = this.formBuilder.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  users: UserEntityModel[] = [];

  // sub!: Subscription;

  ngOnInit() {
    // this.sub = this.usersStore.data.subscribe(users => {
    //   this.users = users;
    //   this.cdr.detectChanges();
    // });
    // this.httpClient.get<ResponseModel<UserEntityModel[]>>('http:localhost:5038/api/user').subscribe(response => {
    //   this.usersStore.data.next(response.body);
    // });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  onSubmit() {
    if (!this.userForm.valid) return;
    const { value } = this.userForm;
    this.httpClient.post<ResponseModel<UserEntityModel>>('http://localhost:5038/api/user', value)
      .pipe(
        switchMap(response => {
          if (response.success) {
            alert(response.message);
            return this.httpClient.get<ResponseModel<UserEntityModel[]>>('http://localhost:5038/api/user');
          } else {
            throw new Error(response.message);
          }
        })
      )
      .subscribe({
        next: response => {
          // this.usersStore.data.next(response.body);
          this.userForm.reset();
        },
        error: err => {
          alert(err);
        }
      });
  }

  onSelect(userId: number) {
    // this.userStore.data.next(userId);
    alert(`User with id ${userId} was set!`);
  }

  onUpdate(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  onDelete(userId: number) {
    this.httpClient.delete<ResponseModel<UserEntityModel>>(`http://localhost:5038/api/user/${userId}`)
      .pipe(
        switchMap(response => {
          if (response.success) {
            return this.httpClient.get<ResponseModel<UserEntityModel[]>>('http://localhost:5038/api/user');
          } else {
            throw new Error(response.message);
          }
        })
      )
      .subscribe({
        next: response => {
          // this.usersStore.data.next(response.body);
        },
        error: err => {
          alert(err);
        }
      });
  }
}
