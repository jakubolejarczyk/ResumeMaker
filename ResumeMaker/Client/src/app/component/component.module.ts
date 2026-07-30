import { NgModule } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

import { RootComponent } from "./root/root.component";
import { ViewModule } from "./view/view.module";
import { NavComponent } from "./nav/nav.component";

@NgModule({
  declarations: [
    RootComponent,
    NavComponent
  ],
  imports: [
    RouterLink,
    RouterOutlet,
    ViewModule
  ],
  exports: [RootComponent]
})
export class ComponentModule { }
