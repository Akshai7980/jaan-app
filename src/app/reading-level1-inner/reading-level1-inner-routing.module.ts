import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel1InnerPage } from './reading-level1-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel1InnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel1InnerPageRoutingModule {}
