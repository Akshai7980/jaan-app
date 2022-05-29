import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmInnerPageRoutingModule } from './alarm-inner-routing.module';

import { AlarmInnerPage } from './alarm-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    AlarmInnerPageRoutingModule
  ],
  declarations: [AlarmInnerPage]
})
export class AlarmInnerPageModule {}
