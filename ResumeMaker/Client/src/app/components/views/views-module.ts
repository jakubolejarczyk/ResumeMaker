import { NgModule } from "@angular/core";

import { UsersViewComponent } from "./users/users-view.component";
import { FormsModule } from "../forms/forms-module";

@NgModule({
  declarations: [UsersViewComponent],
  imports: [FormsModule],
  exports: [UsersViewComponent]
})
export class ViewsModule { }
