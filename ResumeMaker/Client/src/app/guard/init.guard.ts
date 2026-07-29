import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";

import { UserService } from "../service/user.service";

export const initGuard: CanActivateFn = () => {
  const service = inject(UserService);
  return service.readAll().pipe(
    map(() => true)
  );
};
