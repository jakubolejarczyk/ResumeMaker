import { NgModule } from "@angular/core";

import { UsersViewComponent } from "./users/users-view.component";

@NgModule({
  declarations: [UsersViewComponent],
  exports: [UsersViewComponent]
})
export class ViewsModule { }
