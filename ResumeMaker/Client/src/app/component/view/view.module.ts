import { NgModule } from "@angular/core";

import { UsersViewComponent } from "./users/users-view.component";
import { FormModule } from "../form/form.module";
import { ListModule } from "../list/list.module";
import { UserViewComponent } from "./user/user-view.component";
import { CompaniesViewComponent } from "./companies/companies-view.component";
import { CompanyViewComponent } from "./company/company-view.component";
import { ResumesViewComponent } from "./resumes/resumes-view.component";
import { ResumeViewComponent } from "./resume/resume-view.component";

@NgModule({
  declarations: [
    UsersViewComponent,
    UserViewComponent,
    CompaniesViewComponent,
    CompanyViewComponent,
    ResumesViewComponent,
    ResumeViewComponent
  ],
  imports: [
    FormModule,
    ListModule
  ],
  exports: [
    UsersViewComponent,
    UserViewComponent,
    CompaniesViewComponent,
    CompanyViewComponent,
    ResumesViewComponent,
    ResumeViewComponent
  ]
})
export class ViewModule { }
