import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Worksheet4PageRoutingModule } from './worksheet4-routing.module';

import { Worksheet4Page } from './worksheet4.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Worksheet4PageRoutingModule
  ],
  declarations: [Worksheet4Page]
})
export class Worksheet4PageModule {}
