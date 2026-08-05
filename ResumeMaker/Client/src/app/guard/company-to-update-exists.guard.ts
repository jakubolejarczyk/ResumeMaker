import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { catchError, concatMap, map, of, take } from "rxjs";

import { CompanyService } from "../service/company.service";

export const companyToUpdateExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const companyService = inject(CompanyService);
  return of(route.paramMap.get('id')).pipe(
    take(1),
    map(paramId => {
      if (!paramId) throw new Error('Parameter id was not defined!');
      if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
      return parseInt(paramId);
    }),
    concatMap(id => {
      return companyService.getCompanies$().pipe(
        take(1),
        map(companies => {
          const companyExists = companies.some(company => company.id === id);
          if (companyExists) return true;
          throw new Error('Company does not exits!');
        })
      );
    }),
    catchError(error => {
      alert(error);
      return of(router.createUrlTree(['/companies']))
    })
  );
};
