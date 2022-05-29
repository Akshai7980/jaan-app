import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel4PageRoutingModule } from './reading-level4-routing.module';

import { ReadingLevel4Page } from './reading-level4.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel4PageRoutingModule
  ],
  declarations: [ReadingLevel4Page]
})
export class ReadingLevel4PageModule {}
