import { NgModule } from "@angular/core";

import { UsersListComponent } from "./users/users-list.component";
import { CompaniesListComponent } from "./companies/companies-list.component";

@NgModule({
  declarations: [
    UsersListComponent,
    CompaniesListComponent
  ],
  exports: [
    UsersListComponent,
    CompaniesListComponent
  ]
})
export class ListModule { }
