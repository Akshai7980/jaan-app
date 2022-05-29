import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingPageRoutingModule } from './reading-routing.module';

import { ReadingPage } from './reading.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingPageRoutingModule
  ],
  declarations: [ReadingPage]
})
export class ReadingPageModule {}
