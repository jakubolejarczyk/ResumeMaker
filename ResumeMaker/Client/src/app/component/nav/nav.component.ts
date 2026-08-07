import { Component, inject } from "@angular/core";
import { combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

import { UserService } from "../../service/user.service";
import { CompanyService } from "../../service/company.service";
import { ResumeService } from "../../service/resume.service";
import { GenerateService } from "../../service/generate.service";

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
  generateService = inject(GenerateService);

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

  generate() {
    combineLatest({
      user: this.userService.getSelectedUser$(),
      company: this.companyService.getSelectedCompany$(),
      resume: this.resumeService.getSelectedResume$()
    }).pipe(
      take(1),
      concatMap(({ user, company, resume }) => {
        if (!user || !company || !resume) {
          alert("Please select a user, company, and resume.");
          return of(null);
        }
        return this.generateService.create$(
          user.id,
          company.id,
          resume.id
        );
      }),
      filter(response => response !== null),
      tap(response => {
        const blob = response.body;
        if (!blob) return;
        const disposition = response.headers.get('content-disposition');
        const fileName =
          disposition?.match(/filename\*=(?:UTF-8'')?([^;]+)/i)?.[1] ??
          disposition?.match(/filename="?([^"]+)"?/i)?.[1] ??
          'CV.pdf';
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = decodeURIComponent(fileName);
        a.click();
        URL.revokeObjectURL(url);
      })
    ).subscribe();
  }
}
