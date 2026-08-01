import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { catchError, combineLatest, concatMap, filter, map, of, take, tap } from "rxjs";

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
  companyService = inject(CompanyService);

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
    this.resetForm().subscribe();
  }

  onSubmit() {
    combineLatest({
      form: of(this.updateCompanyForm),
      selectedUser: this.userService.getSelectedUser$()
    }).pipe(
      take(1),
      filter(({ form }) => {
        if (form.valid) return true;
        throw new Error('Not all required fields have been set.');
      }),
      map(({ form, selectedUser }) => ({ value: form.value, selectedUser })),
      map(({ value, selectedUser }) => {
        const { id, companyName, city, country, includeConsentClause, customConsentClause, recruitmentStatus } = value;
        const userId = selectedUser?.id;
        if (!id) throw new Error('Id has not been set.');
        if (!companyName) throw new Error('Company name has not been set.');
        if (!city) throw new Error('City has not been set.');
        if (!country) throw new Error('Country has not been set.');
        if (includeConsentClause === undefined || includeConsentClause === null) throw new Error('Include consent clause has not been set.');
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
        return ({ id, request});
      }),
      concatMap(({ id, request }) => this.companyService.update$(id, request)),
      tap(() => this.updateCompanyForm.reset()),
      tap(() => this.updateCompanyForm.controls.includeConsentClause.setValue(false)),
      concatMap(() => this.resetForm()),
      catchError(error => {
        alert(error);
        return of(void 0);
      })
    ).subscribe();
  }

  private resetForm() {
    return of(this.route.snapshot.paramMap.get('id')).pipe(
      take(1),
      map(paramId => {
        if (!paramId) throw new Error('Parameter id was not defined!');
        if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
        return parseInt(paramId);
      }),
      concatMap(id => {
        return this.companyService.getCompanies$().pipe(
          take(1),
          concatMap(companies => {
            const companyToUpdate = companies.find(company => company.id === id);
            if (companyToUpdate) return of(companyToUpdate);
            throw new Error('Company to update does not exits!');
          })
        );
      }),
      map(companyToUpdate => {
        this.updateCompanyForm.controls.id.setValue(companyToUpdate.id);
        this.updateCompanyForm.controls.companyName.setValue(companyToUpdate.companyName);
        this.updateCompanyForm.controls.city.setValue(companyToUpdate.city);
        this.updateCompanyForm.controls.country.setValue(companyToUpdate.country);
        this.updateCompanyForm.controls.includeConsentClause.setValue(companyToUpdate.includeConsentClause);
        this.updateCompanyForm.controls.customConsentClause.setValue(companyToUpdate.customConsentClause);
        this.updateCompanyForm.controls.recruitmentStatus.setValue(companyToUpdate.recruitmentStatus);
      })
    )
  }
}
