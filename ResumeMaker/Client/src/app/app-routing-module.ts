import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { UsersViewComponent } from './component/view/users/users-view.component';
// import { CompaniesViewComponent } from './component/view/companies/companies-view.component';
// import { ResumesViewComponent } from './component/view/resumes/resumes-view.component';
// import { UserViewComponent } from './component/view/user/user-view.component';
// import { CompanyViewComponent } from './component/view/company/company-view.component';
// import { ResumeViewComponent } from './component/view/resume/resume-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  // {
  //   path: 'users',
  //   component: UsersViewComponent,
  //   canActivate: [initGuard]
  // },
  // {
  //   path: 'companies',
  //   component: CompaniesViewComponent,
  //   canActivate: [userIsSelectedGuard]
  // },
  // {
  //   path: 'resumes',
  //   component: ResumesViewComponent,
  //   canActivate: [userIsSelectedGuard, companyIsSelectedGuard]
  // },
  // {
  //   path: 'user/:id',
  //   component: UserViewComponent,
  //   canActivate: [userToUpdateExists]
  // },
  // {
  //   path: 'company/:id',
  //   component: CompanyViewComponent,
  //   canActivate: [userIsSelectedGuard]
  // },
  // {
  //   path: 'resume/:id',
  //   component: ResumeViewComponent,
  //   canActivate: [userIsSelectedGuard, companyIsSelectedGuard]
  // },
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
export class AppRoutingModule { }
