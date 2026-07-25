import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AppStore } from "../../../store/app-store";
import { CompanyRequestService } from "../../../service/request/company-request.service";
import { CompanyEntityModel } from "../../../model/entity/company-entity.model";

@Component({
  selector: 'app-companies-list-component',
  templateUrl: './companies-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class CompaniesListComponent implements OnInit, OnDestroy {
  appStore = inject(AppStore);
  companyRequestService = inject(CompanyRequestService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  companies: CompanyEntityModel[] = [];

  sub!: Subscription;

  ngOnInit() {
    this.sub = this.appStore.companies.subscribe(companies => {
      this.companies = companies;
      this.cdr.detectChanges();
    });
    this.companyRequestService.readCompanies();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelect(user: CompanyEntityModel) {
    this.appStore.company.next(user);
  }

  // onUpdate(userId: number) {
  //   this.router.navigate(['/user', userId]);
  // }

  onDelete(companyId: number) {
    this.companyRequestService.deleteCompany(companyId);
  }
}
