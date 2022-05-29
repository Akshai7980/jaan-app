import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAspectsPage } from './home-aspects.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAspectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAspectsPageRoutingModule {}
