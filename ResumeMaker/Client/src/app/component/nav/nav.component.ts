import { Component, inject } from "@angular/core";
import { map } from "rxjs";

import { UserService } from "../../service/user.service";
import { CompanyService } from "../../service/company.service";
import { ResumeService } from "../../service/resume.service";

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: false
})
export class NavComponent {
  userService = inject(UserService);
  companyService = inject(CompanyService);
  resumeService = inject(ResumeService);

  selectedUser$ = this.userService.getSelectedUser$().pipe(
    map(selectedUser => {
      if (selectedUser) {
        return `${selectedUser.firstName} ${selectedUser.lastName}`;
      }
      return 'Nothing';
    })
  );

  selectedCompany$ = this.companyService.getSelectedCompany$().pipe(
    map(selectedCompany => {
      if (selectedCompany) {
        return selectedCompany.companyName;
      }
      return 'Nothing';
    })
  );

  selectedResume$ = this.resumeService.getSelectedResume$().pipe(
    map(selectedResume => {
      if (selectedResume) {
        return selectedResume.name;
      }
      return 'Nothing';
    })
  );
}
