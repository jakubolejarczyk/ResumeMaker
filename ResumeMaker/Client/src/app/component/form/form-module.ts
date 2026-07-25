import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";
import { CreateUserFormComponent } from "./create-user/create-user-form.component";
import { UpdateUserFormComponent } from "./update-user/update-user-form.component";
import { UpdateCompanyFormComponent } from "./update-company/update-company-form.component";

@NgModule({
  declarations: [
    CreateCompanyFormComponent,
    CreateUserFormComponent,
    UpdateUserFormComponent,
    UpdateCompanyFormComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CreateCompanyFormComponent,
    CreateUserFormComponent,
    UpdateUserFormComponent,
    UpdateCompanyFormComponent
  ]
})
export class FormModule {}
