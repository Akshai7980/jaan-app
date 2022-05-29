import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WritingPageRoutingModule } from './writing-routing.module';

import { WritingPage } from './writing.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    WritingPageRoutingModule
  ],
  declarations: [WritingPage]
})
export class WritingPageModule {}
