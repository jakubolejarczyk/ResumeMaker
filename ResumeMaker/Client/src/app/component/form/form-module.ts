import { NgModule } from "@angular/core";

import { CreateCompanyFormComponent } from "./create-company/create-company-form.component";

@NgModule({
  declarations: [CreateCompanyFormComponent],
  exports: [CreateCompanyFormComponent]
})
export class FormModule {}
