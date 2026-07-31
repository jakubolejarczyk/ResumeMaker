import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { concatMap, filter, map, of, take } from "rxjs";

import { CompanyService } from "../../../service/company.service";
import { CompanyRequestModel } from "../../../model/request/company-request.model";
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-update-company-form-component',
  templateUrl: './update-company-form.component.html',
  styleUrl: '../base/base-form.component.css',
  standalone: false
})
export class UpdateCompanyFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  service = inject(CompanyService);

  updateCompanyForm = this.formBuilder.group({
    id: [0, Validators.required],
    companyName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    includeConsentClause: [false, Validators.required],
    customConsentClause: [''],
    recruitmentStatus: ['', Validators.required]
  });

  ngOnInit() {
    of(this.route.snapshot.paramMap.get('id')).pipe(
      take(1),
      map(param => {
        if (!param) throw new Error('Id parameter was not defined!');
        if (Number.isNaN(param)) throw new Error('Id parameter is not a number!');
        return parseInt(param);
      }),
      concatMap(id => {
        return this.service.getCompanies$().pipe(
          take(1),
          concatMap(comapnies => {
            const company = comapnies.find(companies => companies.id === id);
            if (company) return of(company);
            throw new Error('Company does not exits!');
          })
        );
      }),
      map(user => {
        this.updateCompanyForm.controls.id.setValue(user.id);
        this.updateCompanyForm.controls.companyName.setValue(user.companyName);
        this.updateCompanyForm.controls.city.setValue(user.city);
        this.updateCompanyForm.controls.country.setValue(user.country);
        this.updateCompanyForm.controls.includeConsentClause.setValue(user.includeConsentClause);
        this.updateCompanyForm.controls.customConsentClause.setValue(user.customConsentClause);
        this.updateCompanyForm.controls.recruitmentStatus.setValue(user.recruitmentStatus);
      })
    ).subscribe();
  }

  onSubmit() {
    of(this.route.snapshot.paramMap.get('id')).pipe(
      take(1),
      map(param => {
        if (!param) throw new Error('Id parameter was not defined!');
        if (Number.isNaN(param)) throw new Error('Id parameter is not a number!');
        return parseInt(param);
      }),
      concatMap(id => {
        return this.userService.getSelectedUser$().pipe(
          map(selectedUser => ({ selectedUser, id }))
        )
      }),
      map(({ selectedUser, id }) => {
        const { valid } = this.updateCompanyForm;
        if (!valid) {
          alert('Not all required fields have been completed.');
          return;
        }
        if (!id) {
          alert('Id was not defined.');
          return;
        }
        const { value } = this.updateCompanyForm;
        const request: CompanyRequestModel = {
          companyName: value.companyName ?? '',
          city: value.city ?? '',
          country: value.country ?? '',
          includeConsentClause: value.includeConsentClause ?? false,
          customConsentClause: value.customConsentClause ?? '',
          recruitmentStatus: value.recruitmentStatus ?? '',
          userId: selectedUser?.id ?? 0
        };
        return this.service.update$(id, request);
      }),
      take(1),
      filter(request => request !== undefined),
      concatMap(request => request)
    ).subscribe(response => {
      const { message } = response;
      alert(message);
    });
  }
}
