import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel3PageRoutingModule } from './reading-level3-routing.module';

import { ReadingLevel3Page } from './reading-level3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel3PageRoutingModule
  ],
  declarations: [ReadingLevel3Page]
})
export class ReadingLevel3PageModule {}
