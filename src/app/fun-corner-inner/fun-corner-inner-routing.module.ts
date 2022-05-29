import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunCornerInnerPage } from './fun-corner-inner.page';

const routes: Routes = [
  {
    path: '',
    component: FunCornerInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FunCornerInnerPageRoutingModule {}
