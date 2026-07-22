import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { from, Subscription, switchMap } from "rxjs";
import { Router } from "@angular/router";

import { CompaniesStore } from "../../../store/companies.store";
import { CompanyEntityModel } from "../../../model/entity/company-entity.model";
import { ResponseModel } from "../../../model/response/response.model";
import { UserStore } from "../../../store/user.store";

@Component({
  selector: 'app-companies-view-component',
  templateUrl: './companies-view.component.html',
  styleUrl: './companies-view.component.css',
  standalone: false
})
export class CompaniesViewComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClient);
  companiesStore = inject(CompaniesStore);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  userStore = inject(UserStore);

  companyForm = this.formBuilder.group({
    companyName: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    includeConsentClause: [false, Validators.required],
    customConsentClause: ['', Validators.required],
    recruitmentStatus: ['', Validators.required]
  });

  companies: CompanyEntityModel[] = [];

  sub!: Subscription;

  ngOnInit() {
    const userId = this.userStore.getValue();
    this.sub = this.companiesStore.data.subscribe(companies => {
      this.companies = companies;
      this.cdr.detectChanges();
    });
    this.httpClient.get<ResponseModel<CompanyEntityModel[]>>(`http://localhost:5038/api/company/user/${userId}`).subscribe(response => {
      this.companiesStore.data.next(response.body);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (!this.companyForm.valid) return;
    const userId = this.userStore.getValue();
    const { value } = this.companyForm;
    const body = { ...value, userId };
    console.log(body);
    this.httpClient.post<ResponseModel<CompanyEntityModel>>('http://localhost:5038/api/company', body)
      .pipe(
        switchMap(response => {
          if (response.success) {
            alert(response.message);
            return this.httpClient.get<ResponseModel<CompanyEntityModel[]>>(`http://localhost:5038/api/company/user/${userId}`);
          } else {
            throw new Error(response.message);
          }
        })
      )
      .subscribe({
        next: response => {
          this.companiesStore.data.next(response.body);
          this.companyForm.reset();
        },
        error: err => {
          alert(err);
        }
      });
  }

  onUpdate(companyId: number) {
    this.router.navigate(['/company', companyId]);
  }

  onDelete(companyId: number) {
    const userId = this.userStore.getValue();
    this.httpClient.delete<ResponseModel<CompanyEntityModel>>(`http://localhost:5038/api/company/${companyId}`)
      .pipe(
        switchMap(response => {
          if (response.success) {
            return this.httpClient.get<ResponseModel<CompanyEntityModel[]>>(`http://localhost:5038/api/company/user/${userId}`);
          } else {
            throw new Error(response.message);
          }
        })
      )
      .subscribe({
        next: response => {
          this.companiesStore.data.next(response.body);
        },
        error: err => {
          alert(err);
        }
      });
  }
}
