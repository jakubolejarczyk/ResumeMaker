import { NgModule } from "@angular/core";

import { MainComponent } from "./main/main.component";
import { ViewsModule } from "./views/views-module";

@NgModule({
  declarations: [MainComponent],
  imports: [ViewsModule],
  exports: [MainComponent]
})
export class ComponentsModule { }
