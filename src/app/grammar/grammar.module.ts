import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrammarPageRoutingModule } from './grammar-routing.module';

import { GrammarPage } from './grammar.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    GrammarPageRoutingModule
  ],
  declarations: [GrammarPage]
})
export class GrammarPageModule {}
