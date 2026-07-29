// import { inject } from "@angular/core";
// import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";

// import { AppStore } from "../old/app-store";

// export const userToUpdateExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
//   const appStore = inject(AppStore);
//   const router = inject(Router);
//   const userId = route.paramMap.get('id');
//   const hasUser = appStore.users.value.some(user => user.id.toString() === userId);
//   if (hasUser) {
//     return true;
//   }
//   return router.createUrlTree(['/']);
// };
