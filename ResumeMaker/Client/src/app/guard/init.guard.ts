import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { concatMap, map } from "rxjs";

import { UserService } from "../service/user.service";
import { CompanyService } from "../service/company.service";

export const initGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const companyService = inject(CompanyService);
  return userService.readAll$().pipe(
    concatMap(() => companyService.readAllForUser$()),
    map(() => true)
  );
};
