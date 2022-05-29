import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeningInnerPage } from './listening-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ListeningInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeningInnerPageRoutingModule {}
