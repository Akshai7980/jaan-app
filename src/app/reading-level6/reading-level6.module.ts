import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel6PageRoutingModule } from './reading-level6-routing.module';

import { ReadingLevel6Page } from './reading-level6.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel6PageRoutingModule
  ],
  declarations: [ReadingLevel6Page]
})
export class ReadingLevel6PageModule {}
