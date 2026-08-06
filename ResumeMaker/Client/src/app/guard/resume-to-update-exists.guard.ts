import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { catchError, concatMap, map, of, take } from "rxjs";

import { ResumeService } from "../service/resume.service";

export const resumeToUpdateExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const resumeService = inject(ResumeService);
  return of(route.paramMap.get('id')).pipe(
    take(1),
    map(paramId => {
      if (!paramId) throw new Error('Parameter id was not defined!');
      if (Number.isNaN(paramId)) throw new Error('Parameter id is not a number!');
      return parseInt(paramId);
    }),
    concatMap(id => {
      return resumeService.getResumes$().pipe(
        take(1),
        map(resumes => {
          const resumeExists = resumes.some(resume => resume.id === id);
          if (resumeExists) return true;
          throw new Error('Resume does not exist!');
        })
      );
    }),
    catchError(error => {
      alert(error);
      return of(router.createUrlTree(['/resumes']))
    })
  );
};
