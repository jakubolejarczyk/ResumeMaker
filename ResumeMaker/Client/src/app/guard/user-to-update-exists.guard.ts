import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngxs/store";

import { UserState } from "../store/state/user.state";

export const userToUpdateExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);
  const param = route.paramMap.get('id');
  if (!param) return false;
  const id = parseInt(param);
  const users = store.selectSnapshot(UserState.getUsers);
  const userExists = users.some(user => user.id === id);
  if (userExists) return true;
  return router.createUrlTree(['/']);
};
