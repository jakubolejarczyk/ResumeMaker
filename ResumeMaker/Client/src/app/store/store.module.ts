import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { UserState } from "./state/user.state";
import { CompanyState } from "./state/company.state";

@NgModule({
  imports: [
    NgxsModule.forRoot([UserState, CompanyState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
