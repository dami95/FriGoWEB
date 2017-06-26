import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from '../core/logged-in.guard';

import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: ':id',
    component: SingleRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
