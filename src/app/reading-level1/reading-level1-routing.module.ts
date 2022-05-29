import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel1Page } from './reading-level1.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel1PageRoutingModule {}
