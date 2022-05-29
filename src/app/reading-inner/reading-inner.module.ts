import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingInnerPageRoutingModule } from './reading-inner-routing.module';

import { ReadingInnerPage } from './reading-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingInnerPageRoutingModule
  ],
  declarations: [ReadingInnerPage]
})
export class ReadingInnerPageModule {}
