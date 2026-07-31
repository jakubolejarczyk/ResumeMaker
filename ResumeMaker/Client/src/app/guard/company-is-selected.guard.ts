import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { catchError, concatMap, map, of } from "rxjs";

import { CompanyService } from "../service/company.service";

export const companyToUpdateExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const companyService = inject(CompanyService);
  return of(route.paramMap.get('id')).pipe(
    map(param => {
      if (!param) throw new Error('Id parameter was not defined!');
      if (Number.isNaN(param)) throw new Error('Id parameter is not a number!');
      return parseInt(param);
    }),
    concatMap(id => {
      return companyService.getCompanies$().pipe(
        concatMap(companies => {
          const companyExists = companies.some(company => company.id === id);
          if (companyExists) return of(true);
          throw new Error('Company does not exits!');
        })
      );
    }),
    catchError(() => {
      return of(router.createUrlTree(['/companies']))
    })
  );
};
