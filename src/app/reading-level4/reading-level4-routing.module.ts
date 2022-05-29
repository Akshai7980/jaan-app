import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel4Page } from './reading-level4.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel4PageRoutingModule {}
