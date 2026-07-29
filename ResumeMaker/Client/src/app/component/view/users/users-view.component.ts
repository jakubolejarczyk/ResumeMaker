import { Component, inject, OnInit } from "@angular/core";

import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-users-view-component',
  templateUrl: './users-view.component.html',
  standalone: false
})
export class UsersViewComponent implements OnInit {
  service = inject(UserService);

  ngOnInit() {
    this.service.readAll().subscribe();
  }
}
