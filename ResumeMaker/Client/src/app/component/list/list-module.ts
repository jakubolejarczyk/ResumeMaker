import { NgModule } from "@angular/core";

import { UserListComponent } from "./user/user-list.component";

@NgModule({
  declarations: [UserListComponent],
  exports: [UserListComponent]
})
export class ListModule { }
