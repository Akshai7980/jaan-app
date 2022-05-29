import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocabularyInnerPageRoutingModule } from './vocabulary-inner-routing.module';

import { VocabularyInnerPage } from './vocabulary-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    VocabularyInnerPageRoutingModule
  ],
  declarations: [VocabularyInnerPage]
})
export class VocabularyInnerPageModule {}
