import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DictionaryPageRoutingModule } from './dictionary-routing.module';

import { DictionaryPage } from './dictionary.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    DictionaryPageRoutingModule
  ],
  declarations: [DictionaryPage]
})
export class DictionaryPageModule {}
