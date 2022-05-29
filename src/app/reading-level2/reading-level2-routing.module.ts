import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel2Page } from './reading-level2.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel2PageRoutingModule {}
