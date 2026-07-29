import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateUserFormComponent } from "./create-user/create-user-form.component";
import { UpdateUserFormComponent } from "./update-user/update-user-form.component";

@NgModule({
  declarations: [
    CreateUserFormComponent,
    UpdateUserFormComponent
  ],
  imports: [ReactiveFormsModule],
  exports: [
    CreateUserFormComponent,
    UpdateUserFormComponent
  ]
})
export class FormModule {}
