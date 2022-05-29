import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel6Page } from './reading-level6.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel6PageRoutingModule {}
