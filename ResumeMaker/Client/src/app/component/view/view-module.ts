import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CompaniesViewComponent } from "./companies/companies-view.component";
import { ResumesViewComponent } from "./resumes/resumes-view.component";
import { UsersViewComponent } from "./users/users-view.component";
import { UserViewComponent } from "./user/user-view.component";
import { CompanyViewComponent } from "./company/company-view.component";

@NgModule({
  declarations: [
    CompaniesViewComponent,
    ResumesViewComponent,
    UsersViewComponent,
    UserViewComponent,
    CompanyViewComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CompaniesViewComponent,
    ResumesViewComponent,
    UsersViewComponent,
    UserViewComponent,
    CompanyViewComponent
  ]
})
export class ViewModule { }
