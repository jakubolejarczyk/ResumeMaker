import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { catchError, combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

import { CompanyRequestModel } from "../../../model/request/company-request.model";
import { UserService } from "../../../service/user.service";
import { CompanyService } from "../../../service/company.service";

@Component({
  selector: 'app-create-company-form-component',
  templateUrl: './create-company-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class CreateCompanyFormComponent {
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  companyService = inject(CompanyService);

  createCompanyForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    includeConsentClause: [false, Validators.required],
    customConsentClause: [''],
    recruitmentStatus: ['', Validators.required]
  });

  onSubmit() {
    combineLatest({
      form: of(this.createCompanyForm),
      selectedUser: this.userService.getSelectedUser$()
    }).pipe(
      take(1),
      filter(({ form }) => {
        if (form.valid) return true;
        throw new Error('Not all required fields have been set.');
      }),
      map(({ form, selectedUser }) => ({ value: form.value, selectedUser })),
      map(({ value, selectedUser }) => {
        const { companyName, city, country, includeConsentClause, customConsentClause, recruitmentStatus } = value;
        const userId = selectedUser?.id;
        if (!companyName) throw new Error('Company name has not been set.');
        if (!city) throw new Error('City has not been set.');
        if (!country) throw new Error('Country has not been set.');
        if (!includeConsentClause) throw new Error('Include consent clause has not been set.');
        if (!customConsentClause) throw new Error('Custom consent clause has not been set.');
        if (!recruitmentStatus) throw new Error('Recruitment status has not been set.');
        if (!userId) throw new Error('User id has not been set.');
        const request: CompanyRequestModel = {
          companyName,
          city,
          country,
          includeConsentClause,
          customConsentClause,
          recruitmentStatus,
          userId
        };
        return request;
      }),
      concatMap(request => this.companyService.create$(request)),
      tap(() => this.createCompanyForm.reset()),
      catchError(error => {
        alert(error);
        return of(void 0);
      })
    ).subscribe();
  }
}
