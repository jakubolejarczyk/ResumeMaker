import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersViewComponent } from './component/view/users/users-view.component';
import { UserViewComponent } from './component/view/user/user-view.component';
import { initGuard } from './guard/init.guard';
import { CompaniesViewComponent } from './component/view/companies/companies-view.component';
import { userIsSelectedGuard } from './guard/user-is-selected.guard';
import { userToUpdateExists } from './guard/user-to-update-exists.guard';
import { CompanyViewComponent } from './component/view/company/company-view.component';
import { companyIsSelectedGuard } from './guard/company-is-selected.guard';
import { ResumesViewComponent } from './component/view/resumes/resumes-view.component';
import { companyToUpdateExists } from './guard/company-to-update-exists.guard';
import { ResumeViewComponent } from './component/view/resume/resume-view.component';
import { resumeToUpdateExists } from './guard/resume-to-update-exists.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersViewComponent,
    canActivate: [initGuard]
  },
  {
    path: 'user/:id',
    component: UserViewComponent,
    canActivate: [initGuard, userToUpdateExists]
  },
  {
    path: 'companies',
    component: CompaniesViewComponent,
    canActivate: [initGuard, userIsSelectedGuard]
  },
  {
    path: 'company/:id',
    component: CompanyViewComponent,
    canActivate: [initGuard, userIsSelectedGuard, companyToUpdateExists]
  },
  {
    path: 'resumes',
    component: ResumesViewComponent,
    canActivate: [initGuard, userIsSelectedGuard, companyIsSelectedGuard]
  },
  {
    path: 'resume/:id',
    component: ResumeViewComponent,
    canActivate: [initGuard, userIsSelectedGuard, companyIsSelectedGuard, resumeToUpdateExists]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
