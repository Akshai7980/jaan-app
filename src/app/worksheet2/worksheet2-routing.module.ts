import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Worksheet2Page } from './worksheet2.page';

const routes: Routes = [
  {
    path: '',
    component: Worksheet2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Worksheet2PageRoutingModule {}
