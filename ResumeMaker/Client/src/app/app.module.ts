import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app';
import { ComponentModule } from './component/component.module';
import { StoreModule } from './store/store.module';
import { AppRoutesModule } from './app-routes.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutesModule,
    ComponentModule,
    StoreModule
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
