import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingLevel6InnerPageRoutingModule } from './reading-level6-inner-routing.module';

import { ReadingLevel6InnerPage } from './reading-level6-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ReadingLevel6InnerPageRoutingModule
  ],
  declarations: [ReadingLevel6InnerPage]
})
export class ReadingLevel6InnerPageModule {}
