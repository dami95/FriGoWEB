import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent, LayoutHeaderComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
