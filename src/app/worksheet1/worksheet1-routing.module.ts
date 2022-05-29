import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Worksheet1Page } from './worksheet1.page';

const routes: Routes = [
  {
    path: '',
    component: Worksheet1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Worksheet1PageRoutingModule {}
