import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CompaniesViewComponent } from "./companies/companies-view.component";
import { ResumesViewComponent } from "./resumes/resumes-view.component";
import { UsersViewComponent } from "./users/users-view.component";
import { UserViewComponent } from "./user/user-view.component";
import { CompanyViewComponent } from "./company/company-view.component";
import { FormModule } from "../form/form-module";
import { ListModule } from "../list/list-module";

@NgModule({
  declarations: [
    CompaniesViewComponent,
    ResumesViewComponent,
    UsersViewComponent,
    UserViewComponent,
    CompanyViewComponent
  ],
  imports: [
    FormModule,
    ListModule,
    ReactiveFormsModule
  ],
  exports: [
    CompaniesViewComponent,
    ResumesViewComponent,
    UsersViewComponent,
    UserViewComponent,
    CompanyViewComponent
  ]
})
export class ViewModule { }
