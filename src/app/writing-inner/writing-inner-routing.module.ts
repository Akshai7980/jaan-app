import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WritingInnerPage } from './writing-inner.page';

const routes: Routes = [
  {
    path: '',
    component: WritingInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WritingInnerPageRoutingModule {}
