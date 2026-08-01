import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";

import { UserService } from "../service/user.service";

export const userIsSelectedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  return userService.getSelectedUser$().pipe(
    take(1),
    map(selectedUser => {
      if (selectedUser) return true;
      alert("User is not selected!");
      return router.createUrlTree(['/']);
    })
  );
};
