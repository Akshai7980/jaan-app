import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictionaryInnerPage } from './dictionary-inner.page';

const routes: Routes = [
  {
    path: '',
    component: DictionaryInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictionaryInnerPageRoutingModule {}
