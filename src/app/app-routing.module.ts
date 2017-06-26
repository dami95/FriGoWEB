import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleModule } from './example/example.module';
import { ContactComponent } from './shared/contact/contact.component';
import { LoggedInGuard } from './core/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'recipe',
    loadChildren: './recipe/recipe.module#RecipeModule'
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'fridge',
    loadChildren: './fridge/fridge.module#FridgeModule',
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'cookbook',
    loadChildren: './cookbook/cookbook.module#CookbookModule'
  },
  {
    path: 'recipe',
    loadChildren: './recipe/recipe.module#RecipeModule',
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
