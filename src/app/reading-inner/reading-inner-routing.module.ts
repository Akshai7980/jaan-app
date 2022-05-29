import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingInnerPage } from './reading-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingInnerPageRoutingModule {}
