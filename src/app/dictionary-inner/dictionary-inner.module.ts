import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DictionaryInnerPageRoutingModule } from './dictionary-inner-routing.module';

import { DictionaryInnerPage } from './dictionary-inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DictionaryInnerPageRoutingModule
  ],
  declarations: [DictionaryInnerPage]
})
export class DictionaryInnerPageModule {}
