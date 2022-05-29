import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel1InnerPageRoutingModule } from './reading-level1-inner-routing.module';

import { ReadingLevel1InnerPage } from './reading-level1-inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadingLevel1InnerPageRoutingModule
  ],
  declarations: [ReadingLevel1InnerPage]
})
export class ReadingLevel1InnerPageModule {}
