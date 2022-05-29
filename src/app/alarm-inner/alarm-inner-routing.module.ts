import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmInnerPage } from './alarm-inner.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmInnerPageRoutingModule {}
