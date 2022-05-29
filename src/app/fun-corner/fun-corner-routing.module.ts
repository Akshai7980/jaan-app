import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunCornerPage } from './fun-corner.page';

const routes: Routes = [
  {
    path: '',
    component: FunCornerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FunCornerPageRoutingModule {}
