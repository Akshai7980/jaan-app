import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialsInnerPage } from './testimonials-inner.page';

const routes: Routes = [
  {
    path: '',
    component: TestimonialsInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialsInnerPageRoutingModule {}
