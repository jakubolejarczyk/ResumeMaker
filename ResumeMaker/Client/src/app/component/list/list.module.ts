import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersListComponent } from "./users/users-list.component";
import { CompaniesListComponent } from "./companies/companies-list.component";
import { ResumesListComponent } from "./resumes/resumes-list.component";

@NgModule({
  declarations: [
    UsersListComponent,
    CompaniesListComponent,
    ResumesListComponent
  ],
  imports: [CommonModule],
  exports: [
    UsersListComponent,
    CompaniesListComponent,
    ResumesListComponent
  ]
})
export class ListModule { }
