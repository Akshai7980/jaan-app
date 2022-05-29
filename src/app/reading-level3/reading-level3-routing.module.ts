import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel3Page } from './reading-level3.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel3PageRoutingModule {}
