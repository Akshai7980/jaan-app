import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderMorePage } from './header-more.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderMorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderMorePageRoutingModule {}
