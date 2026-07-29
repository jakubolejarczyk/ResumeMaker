import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

// import { CompaniesViewComponent } from "./companies/companies-view.component";
// import { ResumesViewComponent } from "./resumes/resumes-view.component";
// import { UsersViewComponent } from "./users/users-view.component";
// import { UserViewComponent } from "./user/user-view.component";
// import { CompanyViewComponent } from "./company/company-view.component";
// import { FormModule } from "../form/form-module";
// import { ListModule } from "../list/list-module";
// import { ResumeViewComponent } from "./resume/resume-view.component";
// import { AsyncPipe, CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    // CompaniesViewComponent,
    // ResumesViewComponent,
    // UsersViewComponent,
    // UserViewComponent,
    // CompanyViewComponent,
    // ResumeViewComponent
  ],
  imports: [
    // FormModule,
    // ListModule,
    ReactiveFormsModule,
  ],
  exports: [
    // CompaniesViewComponent,
    // ResumesViewComponent,
    // UsersViewComponent,
    // UserViewComponent,
    // CompanyViewComponent,
    // ResumeViewComponent
  ]
})
export class ViewModule { }
