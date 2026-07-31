import { Component, inject } from "@angular/core";
import { map } from "rxjs";

import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: false
})
export class NavComponent {
  userService = inject(UserService);

  selectedUser$ = this.userService.getSelectedUser$().pipe(
    map(selectedUser => {
      if (selectedUser) {
        return `${selectedUser.firstName} ${selectedUser.lastName}`;
      }
      return 'None';
    })
  );
}
