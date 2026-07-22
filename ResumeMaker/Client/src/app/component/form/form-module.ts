import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";

@NgModule({
  declarations: [CreateCompanyFormComponent],
  imports: [ReactiveFormsModule],
  exports: [CreateCompanyFormComponent]
})
export class FormModule {}
