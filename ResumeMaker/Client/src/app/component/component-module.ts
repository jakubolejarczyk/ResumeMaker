import { NgModule } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

import { RootComponent } from "./root/root.component";
import { NavComponent } from "./nav/nav.component";
import { ViewModule } from "./view/view-module";

@NgModule({
  declarations: [
    RootComponent,
    NavComponent
  ],
  imports: [
    ViewModule,
    RouterLink,
    RouterOutlet
  ],
  exports: [RootComponent]
})
export class ComponentModule { }
