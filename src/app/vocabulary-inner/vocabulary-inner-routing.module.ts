import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyInnerPage } from './vocabulary-inner.page';

const routes: Routes = [
  {
    path: '',
    component: VocabularyInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocabularyInnerPageRoutingModule {}
