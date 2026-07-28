import { NgModule } from "@angular/core";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from "@ngxs/store";

import { UsersState } from "./state/users.state";

@NgModule({
  imports: [
    NgxsModule.forRoot([UsersState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
})
export class NgxsStoreModule {}
