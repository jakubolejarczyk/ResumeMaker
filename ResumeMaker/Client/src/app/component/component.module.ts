import { NgModule } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { RootComponent } from "./root/root.component";
import { ViewModule } from "./view/view.module";

@NgModule({
  declarations: [RootComponent],
  imports: [
    RouterOutlet,
    ViewModule
  ],
  exports: [RootComponent]
})
export class ComponentModule { }
