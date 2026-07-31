import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { concatMap, of } from "rxjs";

import { UserService } from "../service/user.service";
import { CompanyService } from "../service/company.service";

export const initGuard: CanActivateFn = () => {
  const user = inject(UserService);
  const company = inject(CompanyService);
  return of(true).pipe(
    concatMap(() => user.readAll$()),
    concatMap(() => user.refreshSelectedUser$()),
    concatMap(() => company.readAllForUser$()),
    concatMap(() => of(true))
  );
};
