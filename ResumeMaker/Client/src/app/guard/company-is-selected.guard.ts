import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";

import { CompanyService } from "../service/company.service";

export const companyIsSelectedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const companyService = inject(CompanyService);
  return companyService.getSelectedCompany$().pipe(
    take(1),
    map(selectedCompany => {
      if (selectedCompany) return true;
      alert("Company is not selected!");
      return router.createUrlTree(['/companies']);
    })
  );
};
