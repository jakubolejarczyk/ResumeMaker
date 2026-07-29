import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateUserFormComponent } from "./create-user/create-user-form.component";

@NgModule({
  declarations: [CreateUserFormComponent],
  imports: [ReactiveFormsModule],
  exports: [CreateUserFormComponent]
})
export class FormModule {}
