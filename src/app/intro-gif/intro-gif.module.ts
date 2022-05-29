import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroGifPageRoutingModule } from './intro-gif-routing.module';

import { IntroGifPage } from './intro-gif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroGifPageRoutingModule
  ],
  declarations: [IntroGifPage]
})
export class IntroGifPageModule {}
