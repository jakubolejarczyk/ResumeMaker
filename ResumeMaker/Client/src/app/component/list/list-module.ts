import { NgModule } from "@angular/core";

import { UsersListComponent } from "./users/users-list.component";

@NgModule({
  declarations: [UsersListComponent],
  exports: [UsersListComponent]
})
export class ListModule { }
