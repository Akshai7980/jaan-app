import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel5Page } from './reading-level5.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel5PageRoutingModule {}
