import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";

import { UserService } from "../service/user.service";
import { CompanyService } from "../service/company.service";

export const initGuard: CanActivateFn = () => {
  const user = inject(UserService);
  const company = inject(CompanyService);
  return user.readAll$().pipe(
    map(() => true)
  );
  // return of(true).pipe(
  //   concatMap(() => user.readAll$()),
  //   concatMap(() => user.refreshSelectedUser$()),
  //   concatMap(() => company.readAllForUser$()),
  //   concatMap(() => company.refreshSelectedCompany$()),
  //   concatMap(() => of(true))
  // );
};
