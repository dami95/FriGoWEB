import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NotifierComponent } from './notifier/notifier.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/last'

@NgModule({
  imports:      [ CommonModule, RouterModule ],
  declarations: [ HeaderComponent, ContactComponent, NotifierComponent ],
  exports:      [ CommonModule, FormsModule, HeaderComponent, NotifierComponent]
})
export class SharedModule { }
