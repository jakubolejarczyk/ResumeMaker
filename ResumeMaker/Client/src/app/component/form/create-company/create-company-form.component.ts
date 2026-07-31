import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { CompanyRequestModel } from "../../../model/request/company-request.model";
import { UserService } from "../../../service/user.service";
import { concatMap, filter, map, take } from "rxjs";
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
    const { valid } = this.createCompanyForm;
    if (!valid) {
      alert('Not all required fields have been completed.');
      return;
    }
    const { value } = this.createCompanyForm;
    this.userService.getSelectedUser$().pipe(
      filter(selectedUser => selectedUser !== undefined),
      map(selectedUser => {
        const request: CompanyRequestModel = {
          companyName: value.companyName ?? '',
          city: value.city ?? '',
          country: value.country ?? '',
          includeConsentClause: value.includeConsentClause ?? false,
          customConsentClause: value.customConsentClause ?? '',
          recruitmentStatus: value.recruitmentStatus ?? '',
          userId: selectedUser.id
        };
        return request;
      }),
      concatMap(request => this.companyService.create$(request)),
      take(1),
      map(response => {
        const { success, message } = response;
        if (success) {
          this.createCompanyForm.reset();
        }
        alert(message);
      })
    ).subscribe();
  }
}
