import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprehensionInnerPageRoutingModule } from './comprehension-inner-routing.module';

import { ComprehensionInnerPage } from './comprehension-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ComprehensionInnerPageRoutingModule
  ],
  declarations: [ComprehensionInnerPage]
})
export class ComprehensionInnerPageModule {}
