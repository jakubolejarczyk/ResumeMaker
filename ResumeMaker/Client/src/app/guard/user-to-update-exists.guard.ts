import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { catchError, concatMap, map, of } from "rxjs";

import { UserService } from "../service/user.service";

export const userToUpdateExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);
  return of(route.paramMap.get('id')).pipe(
    map(param => {
      if (!param) throw new Error('Id parameter was not defined!');
      if (Number.isNaN(param)) throw new Error('Id parameter is not a number!');
      return parseInt(param);
    }),
    concatMap(id => {
      return userService.getUsers$().pipe(
        concatMap(users => {
          const userExists = users.some(user => user.id === id);
          if (userExists) return of(true);
          throw new Error('User does not exits!');
        })
      );
    }),
    catchError(() => {
      return of(router.createUrlTree(['/']))
    })
  );
};
