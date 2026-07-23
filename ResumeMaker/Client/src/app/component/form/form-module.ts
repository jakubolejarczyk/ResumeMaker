import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";
import { CreateUserFormComponent } from "./create-user/create-user-form.component";

@NgModule({
  declarations: [
    CreateCompanyFormComponent,
    CreateUserFormComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CreateCompanyFormComponent,
    CreateUserFormComponent
  ]
})
export class FormModule {}
