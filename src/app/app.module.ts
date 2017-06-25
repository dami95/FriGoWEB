import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ImageUploadModule } from 'angular2-image-upload';
import './rxjs.operators';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
