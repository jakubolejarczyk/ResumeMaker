import { NgModule } from "@angular/core";

import { MainComponent } from "./main/main.component";
import { ViewModule } from "./view/view-module";

@NgModule({
  declarations: [MainComponent],
  imports: [ViewModule],
  exports: [MainComponent]
})
export class ComponentModule { }
