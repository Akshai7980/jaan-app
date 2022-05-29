import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel5PageRoutingModule } from './reading-level5-routing.module';

import { ReadingLevel5Page } from './reading-level5.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel5PageRoutingModule
  ],
  declarations: [ReadingLevel5Page]
})
export class ReadingLevel5PageModule {}
