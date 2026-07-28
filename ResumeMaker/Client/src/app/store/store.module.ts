import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { UserState } from "./state/user.state";

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
