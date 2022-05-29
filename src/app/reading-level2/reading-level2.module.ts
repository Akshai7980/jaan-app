import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel2PageRoutingModule } from './reading-level2-routing.module';

import { ReadingLevel2Page } from './reading-level2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel2PageRoutingModule
  ],
  declarations: [ReadingLevel2Page]
})
export class ReadingLevel2PageModule {}
