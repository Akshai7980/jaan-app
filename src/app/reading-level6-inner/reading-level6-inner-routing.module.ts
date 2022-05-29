import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingLevel6InnerPage } from './reading-level6-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingLevel6InnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingLevel6InnerPageRoutingModule {}
