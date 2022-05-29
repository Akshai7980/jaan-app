import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrammarInnerPageRoutingModule } from './grammar-inner-routing.module';

import { GrammarInnerPage } from './grammar-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    GrammarInnerPageRoutingModule
  ],
  declarations: [GrammarInnerPage]
})
export class GrammarInnerPageModule {}
