import { NgModule } from "@angular/core";

import { UsersListComponent } from "./users/users-list.component";
import { CompaniesListComponent } from "./companies/companies-list.component";
import { ResumesListComponent } from "./resumes/resumes-list.component";

@NgModule({
  declarations: [
    UsersListComponent,
    CompaniesListComponent,
    ResumesListComponent
  ],
  exports: [
    UsersListComponent,
    CompaniesListComponent,
    ResumesListComponent
  ]
})
export class ListModule { }
