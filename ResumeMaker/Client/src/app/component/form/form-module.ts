import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";
import { CreateUserFormComponent } from "./create-user/create-user-form.component";
import { UpdateUserFormComponent } from "./update-user/update-user-form.component";
import { UpdateCompanyFormComponent } from "./update-company/update-company-form.component";
import { CreateResumeFormComponent } from "./create-resume/create-resume-form.component";

@NgModule({
  declarations: [
    CreateCompanyFormComponent,
    CreateUserFormComponent,
    UpdateUserFormComponent,
    UpdateCompanyFormComponent,
    CreateResumeFormComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CreateCompanyFormComponent,
    CreateUserFormComponent,
    UpdateUserFormComponent,
    UpdateCompanyFormComponent,
    CreateResumeFormComponent
  ]
})
export class FormModule {}
