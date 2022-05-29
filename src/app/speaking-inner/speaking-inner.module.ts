import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeakingInnerPageRoutingModule } from './speaking-inner-routing.module';

import { SpeakingInnerPage } from './speaking-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    SpeakingInnerPageRoutingModule
  ],
  declarations: [SpeakingInnerPage]
})
export class SpeakingInnerPageModule {}
