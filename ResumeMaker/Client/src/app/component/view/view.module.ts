import { NgModule } from "@angular/core";

import { UsersViewComponent } from "./users/users-view.component";
import { FormModule } from "../form/form.module";
import { ListModule } from "../list/list.module";

@NgModule({
  declarations: [UsersViewComponent],
  imports: [
    FormModule,
    ListModule
  ],
  exports: [UsersViewComponent]
})
export class ViewModule { }
