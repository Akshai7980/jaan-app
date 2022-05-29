import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeakingInnerPage } from './speaking-inner.page';

const routes: Routes = [
  {
    path: '',
    component: SpeakingInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeakingInnerPageRoutingModule {}
