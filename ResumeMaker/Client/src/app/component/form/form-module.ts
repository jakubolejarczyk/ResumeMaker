import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { UserFormComponent } from "./user/user-form.component";

@NgModule({
  declarations: [UserFormComponent],
  imports: [ReactiveFormsModule],
  exports: [UserFormComponent]
})
export class FormModule { }
