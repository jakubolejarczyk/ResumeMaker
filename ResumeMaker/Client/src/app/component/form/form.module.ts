import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateUserFormComponent } from "./create-user/create-user-form.component";
import { UpdateUserFormComponent } from "./update-user/update-user-form.component";
import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";
import { UpdateCompanyFormComponent } from "./update-company/update-company-form.component";
import { CreateResumeFormComponent } from "./create-resume/create-resume-form.component";
import { UpdateResumeFormComponent } from "./update-resume/update-resume-form.component";

@NgModule({
  declarations: [
    CreateUserFormComponent,
    UpdateUserFormComponent,
    CreateCompanyFormComponent,
    UpdateCompanyFormComponent,
    CreateResumeFormComponent,
    UpdateResumeFormComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CreateUserFormComponent,
    UpdateUserFormComponent,
    CreateCompanyFormComponent,
    UpdateCompanyFormComponent,
    CreateResumeFormComponent,
    UpdateResumeFormComponent
  ]
})
export class FormModule {}
