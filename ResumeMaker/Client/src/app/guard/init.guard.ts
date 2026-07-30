import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map, concatMap, of } from "rxjs";

import { UserService } from "../service/user.service";
import { CompanyService } from "../service/company.service";

export const initGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const companyService = inject(CompanyService);
  return userService.readAll$().pipe(
    concatMap(success => {
      if (success) {
        return companyService.readAllForUser$();
      }
      return of(false)
    }),
    map(success => success)
  );
};
