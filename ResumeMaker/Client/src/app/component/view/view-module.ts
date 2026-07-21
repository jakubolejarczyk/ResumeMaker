import { NgModule } from "@angular/core";

import { UserViewComponent } from "./user/user-view.component";
import { CompanyViewComponent } from "./company/company-view.component";
import { ResumeViewComponent } from "./resume/resume-view.component";
import { FormModule } from "../form/form-module";
import { ListModule } from "../list/list-module";

@NgModule({
  declarations: [
    UserViewComponent,
    ResumeViewComponent,
    CompanyViewComponent
  ],
  imports: [
    FormModule,
    ListModule
  ],
  exports: [
    UserViewComponent,
    ResumeViewComponent,
    CompanyViewComponent
  ]
})
export class ViewModule { }
