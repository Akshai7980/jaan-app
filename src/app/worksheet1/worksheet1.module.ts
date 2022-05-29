import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Worksheet1PageRoutingModule } from './worksheet1-routing.module';

import { Worksheet1Page } from './worksheet1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Worksheet1PageRoutingModule
  ],
  declarations: [Worksheet1Page]
})
export class Worksheet1PageModule {}
