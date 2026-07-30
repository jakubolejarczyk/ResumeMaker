import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map } from "rxjs";

import { UserService } from "../service/user.service";

export const userIsSelectedGuard: CanActivateFn = () => {
  const service = inject(UserService);
  const router = inject(Router);
  return service.getSelectedUser$().pipe(
    map(selectedUser => {
      if (selectedUser) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
};
