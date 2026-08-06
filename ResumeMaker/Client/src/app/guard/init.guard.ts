import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { concatMap, map } from "rxjs";

import { UserService } from "../service/user.service";
import { CompanyService } from "../service/company.service";
import { ResumeService } from "../service/resume.service";

export const initGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const companyService = inject(CompanyService);
  const resumeService = inject(ResumeService);
  return userService.readAll$().pipe(
    concatMap(() => companyService.readAllForUser$()),
    concatMap(() => resumeService.readAllForUser$()),
    map(() => true)
  );
};
