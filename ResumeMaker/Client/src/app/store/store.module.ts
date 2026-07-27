import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  DEVTOOLS_REDUX_CONFIG,
  OPTIONS_CONFIG,
} from './store.config';
import { UsersState } from './state/users.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      UsersState
    ], OPTIONS_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    // NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
  ],
  exports: [NgxsModule],
})
export class NgxsStoreModule {}
