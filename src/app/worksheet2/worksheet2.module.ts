import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Worksheet2PageRoutingModule } from './worksheet2-routing.module';

import { Worksheet2Page } from './worksheet2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Worksheet2PageRoutingModule
  ],
  declarations: [Worksheet2Page]
})
export class Worksheet2PageModule {}
