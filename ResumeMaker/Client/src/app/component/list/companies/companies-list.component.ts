import { Component, inject } from "@angular/core";

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

  companies$ = this.service.getCompanies$();

  onSelect(company: CompanyEntityModel) {
    this.service.select$(company).subscribe();
  }

  onUpdate(company: CompanyEntityModel) {
    // this.router.navigate(['/company', userId]);
  }

  onDelete(company: CompanyEntityModel) {
    this.service.delete$(company.id).subscribe();
  }
}
