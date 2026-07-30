import { NgModule } from "@angular/core";

import { UsersViewComponent } from "./users/users-view.component";
import { FormModule } from "../form/form.module";
import { ListModule } from "../list/list.module";
import { UserViewComponent } from "./user/user-view.component";
import { CompaniesViewComponent } from "./companies/companies-view.component";

@NgModule({
  declarations: [
    UsersViewComponent,
    UserViewComponent,
    CompaniesViewComponent
  ],
  imports: [
    FormModule,
    ListModule
  ],
  exports: [
    UsersViewComponent,
    UserViewComponent,
    CompaniesViewComponent
  ]
})
export class ViewModule { }
