import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprehensionInnerPage } from './comprehension-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ComprehensionInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprehensionInnerPageRoutingModule {}
