import { Component, inject } from "@angular/core";
import { map } from "rxjs";

import { UserService } from "../../service/user.service";
import { CompanyService } from "../../service/company.service";

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: false
})
export class NavComponent {
  userService = inject(UserService);
  companyService = inject(CompanyService);

  selectedUser$ = this.userService.getSelectedUser$().pipe(
    map(selectedUser => {
      if (selectedUser) {
        return `${selectedUser.firstName} ${selectedUser.lastName}`;
      }
      return 'None';
    })
  );

  selectedCompany$ = this.companyService.getSelectedCompany$().pipe(
    map(selectedCompany => {
      if (selectedCompany) {
        return selectedCompany.companyName;
      }
      return 'None';
    })
  );
}
