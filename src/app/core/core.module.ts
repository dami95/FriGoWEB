import { NgModule,
  Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { NotifierService } from './notifier.service';
import { HttpModule } from '@angular/http';
import { User } from '../shared/models/user';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { IngredientService } from './ingredient.service';
import { UnitService } from './unit.service';

@NgModule({
  imports:      [ SharedModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    LoggedInGuard,
    NotLoggedInGuard,
    NotifierService,
    ApiService,
    UserService,
    IngredientService,
    UnitService
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
