import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestimonialsInnerPageRoutingModule } from './testimonials-inner-routing.module';

import { TestimonialsInnerPage } from './testimonials-inner.page';

import { IonicRatingModule } from 'ionic4-rating';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    TestimonialsInnerPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [TestimonialsInnerPage]
})
export class TestimonialsInnerPageModule {}
