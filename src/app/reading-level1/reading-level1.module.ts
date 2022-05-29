import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel1PageRoutingModule } from './reading-level1-routing.module';

import { ReadingLevel1Page } from './reading-level1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel1PageRoutingModule
  ],
  declarations: [ReadingLevel1Page]
})
export class ReadingLevel1PageModule {}
