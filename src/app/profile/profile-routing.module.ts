import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotLoggedInGuard } from '../core/not-logged-in.guard';

import { OnBoardComponent } from './on-board/on-board.component'

const routes: Routes = [
  {
    path: '',
    component: OnBoardComponent,
    canActivate: [ NotLoggedInGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
