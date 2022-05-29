import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesInnerPage } from './games-inner.page';

const routes: Routes = [
  {
    path: '',
    component: GamesInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesInnerPageRoutingModule {}
