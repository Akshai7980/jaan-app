import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprehensionPageRoutingModule } from './comprehension-routing.module';

import { ComprehensionPage } from './comprehension.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ComprehensionPageRoutingModule
  ],
  declarations: [ComprehensionPage]
})
export class ComprehensionPageModule {}
