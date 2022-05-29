import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestimonialsAddPageRoutingModule } from './testimonials-add-routing.module';

import { TestimonialsAddPage } from './testimonials-add.page';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicRatingModule,
    TestimonialsAddPageRoutingModule
  ],
  declarations: [TestimonialsAddPage]
})
export class TestimonialsAddPageModule {}
