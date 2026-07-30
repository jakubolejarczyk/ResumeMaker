import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersViewComponent } from './component/view/users/users-view.component';
import { UserViewComponent } from './component/view/user/user-view.component';
import { initGuard } from './guard/init.guard';
import { userToUpdateExistsGuard } from './guard/user-to-update-exists.guard';
import { CompaniesViewComponent } from './component/view/companies/companies-view.component';

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
    canActivate: [initGuard, userToUpdateExistsGuard]
  },
  {
    path: 'companies',
    component: CompaniesViewComponent,
    canActivate: [initGuard]
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
