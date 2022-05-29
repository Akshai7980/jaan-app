import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprehensionPage } from './comprehension.page';

const routes: Routes = [
  {
    path: '',
    component: ComprehensionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprehensionPageRoutingModule {}
