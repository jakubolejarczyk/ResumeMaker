import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { CompanyService } from "../../../service/company.service";
import { CompanyEntityModel } from "../../../model/entity/company-entity.model";

@Component({
  selector: 'app-companies-list-component',
  templateUrl: './companies-list.component.html',
  styleUrl: '../base/base-list.component.css',
  standalone: false
})
export class CompaniesListComponent {
  service = inject(CompanyService);
  router = inject(Router);

  companies$ = this.service.getCompanies$();

  onSelect(company: CompanyEntityModel) {
    this.service.select(company);
  }

  onUpdate(company: CompanyEntityModel) {
    this.router.navigate(['/company', company.id]);
  }

  onDelete(company: CompanyEntityModel) {
    this.service.delete$(company.id).subscribe();
  }
}
