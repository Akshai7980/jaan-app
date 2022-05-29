import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Worksheet4Page } from './worksheet4.page';

const routes: Routes = [
  {
    path: '',
    component: Worksheet4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Worksheet4PageRoutingModule {}
