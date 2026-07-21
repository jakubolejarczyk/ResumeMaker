import { NgModule } from "@angular/core";

import { CompaniesViewComponent } from "./companies/companies-view.component";
import { ResumesViewComponent } from "./resumes/resumes-view.component";
import { UsersViewComponent } from "./users/users-view.component";

@NgModule({
  declarations: [
    CompaniesViewComponent,
    ResumesViewComponent,
    UsersViewComponent
  ],
  exports: [
    CompaniesViewComponent,
    ResumesViewComponent,
    UsersViewComponent
  ]
})
export class ViewModule { }
