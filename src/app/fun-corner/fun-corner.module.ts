import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunCornerPageRoutingModule } from './fun-corner-routing.module';

import { FunCornerPage } from './fun-corner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    FunCornerPageRoutingModule
  ],
  declarations: [FunCornerPage]
})
export class FunCornerPageModule {}
