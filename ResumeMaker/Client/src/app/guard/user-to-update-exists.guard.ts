import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { catchError, concatMap, map, of, take } from "rxjs";

import { UserService } from "../service/user.service";

export const userToUpdateExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const userService = inject(UserService);
  return of(route.paramMap.get('id')).pipe(
    take(1),
    map(paramId => {
      if (!paramId) throw new Error('Parameter id was not defined!');
      if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
      return parseInt(paramId);
    }),
    concatMap(id => {
      return userService.getUsers$().pipe(
        take(1),
        map(users => {
          const userExists = users.some(user => user.id === id);
          if (userExists) return true;
          throw new Error('User does not exits!');
        })
      );
    }),
    catchError(error => {
      alert(error);
      return of(router.createUrlTree(['/']))
    })
  );
};
