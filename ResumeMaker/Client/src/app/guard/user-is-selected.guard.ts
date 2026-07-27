import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AppStore } from "../old/app-store";

export const userIsSelectedGuard: CanActivateFn = () => {
  const appStore = inject(AppStore);
  const router = inject(Router);
  if (appStore.user.value === undefined) {
    alert("User was not selected!");
    return router.createUrlTree(['/']);
  }
  return true;
};
