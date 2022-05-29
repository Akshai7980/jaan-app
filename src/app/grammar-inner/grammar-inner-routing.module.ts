import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrammarInnerPage } from './grammar-inner.page';

const routes: Routes = [
  {
    path: '',
    component: GrammarInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrammarInnerPageRoutingModule {}
