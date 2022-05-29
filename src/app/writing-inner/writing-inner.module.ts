import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WritingInnerPageRoutingModule } from './writing-inner-routing.module';

import { WritingInnerPage } from './writing-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    WritingInnerPageRoutingModule
  ],
  declarations: [WritingInnerPage]
})
export class WritingInnerPageModule {}
