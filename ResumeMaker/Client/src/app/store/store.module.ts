import { NgModule } from "@angular/core";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from "@ngxs/store";

import { UsersState } from "./state/users.state";
import { UserState } from "./state/user.state";

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState, UsersState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
})
export class NgxsStoreModule {}
