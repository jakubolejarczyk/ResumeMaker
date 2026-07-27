import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ComponentModule } from './component/component-module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    NgxsModule.forRoot([], { developmentMode: /** !environment.production */ false }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
