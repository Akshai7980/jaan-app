import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Worksheet3PageRoutingModule } from './worksheet3-routing.module';

import { Worksheet3Page } from './worksheet3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Worksheet3PageRoutingModule
  ],
  declarations: [Worksheet3Page]
})
export class Worksheet3PageModule {}
