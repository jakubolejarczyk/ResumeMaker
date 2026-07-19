import { NgModule } from "@angular/core";

import { CreateUserFormComponent } from "./create-user/create-user-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CreateUserFormComponent],
  imports: [ReactiveFormsModule],
  exports: [CreateUserFormComponent]
})
export class FormsModule { }
