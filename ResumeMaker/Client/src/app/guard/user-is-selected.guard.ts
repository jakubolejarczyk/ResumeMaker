import { CanActivateFn } from "@angular/router";

// import { UserStore } from "../store/user.store";

export const userIsSelectedGuard: CanActivateFn = () => {
  // const userStore = inject(UserStore);
  // const router = inject(Router);
  // if (userStore.getValue() == -1) {
  //   alert("User was not selected!");
  //   return router.createUrlTree(['/']);
  // }
  return true;
};
