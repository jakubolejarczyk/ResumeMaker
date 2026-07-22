import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersViewComponent } from './component/view/users/users-view.component';
import { CompaniesViewComponent } from './component/view/companies/companies-view.component';
import { ResumesViewComponent } from './component/view/resumes/resumes-view.component';
import { UserViewComponent } from './component/view/user/user-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersViewComponent
  },
  {
    path: 'companies',
    component: CompaniesViewComponent
  },
  {
    path: 'resumes',
    component: ResumesViewComponent
  },
  {
    path: 'user/:id',
    component: UserViewComponent
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
export class AppRoutingModule { }
