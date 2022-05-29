import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunCornerInnerPageRoutingModule } from './fun-corner-inner-routing.module';

import { FunCornerInnerPage } from './fun-corner-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    FunCornerInnerPageRoutingModule
  ],
  declarations: [FunCornerInnerPage]
})
export class FunCornerInnerPageModule {}
