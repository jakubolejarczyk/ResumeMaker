import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from "@angular/core";

import { UserEntityModel } from "../../../model/entity/user-entity.model";
import { ResponseModel } from "../../../model/response/response.model";

@Component({
  selector: 'app-user-list-component',
  templateUrl: 'user-list.component.html',
  styleUrl: 'user-list.component.css',
  standalone: false
})
export class UserListComponent {
  http = inject(HttpClient);

  cdr = inject(ChangeDetectorRef);

  users: UserEntityModel[] = [];

  @Output() userId = new EventEmitter();

  onClick() {
    this.http.get<ResponseModel<UserEntityModel[]>>('http://localhost:5038/api/user').subscribe(response => {
      this.users = [...(response.body ?? [])];
      this.cdr.detectChanges();
    });
  }

  selectUser(userId: number) {
    this.userId.emit(userId);
  }

  deleteUser(userId: number) {
    this.http.delete<ResponseModel<UserEntityModel>>('http://localhost:5038/api/user/' + userId).subscribe(response => {
      alert(response.message);
      this.http.get<ResponseModel<UserEntityModel[]>>('http://localhost:5038/api/user').subscribe(response => {
        this.users = [...(response.body ?? [])];
        this.cdr.detectChanges();
      });
    });
  }
}
