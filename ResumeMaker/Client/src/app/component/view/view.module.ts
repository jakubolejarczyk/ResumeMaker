import { NgModule } from "@angular/core";

import { UsersViewComponent } from "./users/users-view.component";
import { FormModule } from "../form/form.module";

@NgModule({
  declarations: [UsersViewComponent],
  imports: [FormModule],
  exports: [UsersViewComponent]
})
export class ViewModule { }
