import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialsAddPage } from './testimonials-add.page';

const routes: Routes = [
  {
    path: '',
    component: TestimonialsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialsAddPageRoutingModule {}
