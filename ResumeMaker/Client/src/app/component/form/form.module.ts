import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateUserFormComponent } from "./create-user/create-user-form.component";
import { UpdateUserFormComponent } from "./update-user/update-user-form.component";
import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";

@NgModule({
  declarations: [
    CreateUserFormComponent,
    UpdateUserFormComponent,
    CreateCompanyFormComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CreateUserFormComponent,
    UpdateUserFormComponent,
    CreateCompanyFormComponent
  ]
})
export class FormModule {}
