import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocabularyPageRoutingModule } from './vocabulary-routing.module';

import { VocabularyPage } from './vocabulary.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    VocabularyPageRoutingModule
  ],
  declarations: [VocabularyPage]
})
export class VocabularyPageModule {}
