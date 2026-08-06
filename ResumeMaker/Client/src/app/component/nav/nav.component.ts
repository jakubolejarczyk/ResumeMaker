import { Component, inject } from "@angular/core";
import { concatMap, filter, map, of, take } from "rxjs";

import { UserService } from "../../service/user.service";
import { CompanyService } from "../../service/company.service";
import { ResumeService } from "../../service/resume.service";
import { GenerateDal } from "../../dal/generate.dal";

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
  asd = inject(GenerateDal);

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

  aaa() {
    this.resumeService.getSelectedResume$().pipe(
      take(1),
      filter(bbb => !!bbb),
      concatMap(bbb => this.asd.create$(bbb.id))
    ).subscribe(blob => {

      const file = new Blob([blob], {
        type: 'application/pdf'
      });

      const url = window.URL.createObjectURL(file);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV.pdf';

      a.click();

      window.URL.revokeObjectURL(url);

    });
  }
}
