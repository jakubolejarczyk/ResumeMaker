import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersListComponent } from "./users/users-list.component";
import { CompaniesListComponent } from "./companies/companies-list.component";

@NgModule({
  declarations: [
    UsersListComponent,
    CompaniesListComponent
  ],
  imports: [CommonModule],
  exports: [
    UsersListComponent,
    CompaniesListComponent
  ]
})
export class ListModule { }
