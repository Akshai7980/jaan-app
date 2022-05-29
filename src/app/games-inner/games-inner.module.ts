import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesInnerPageRoutingModule } from './games-inner-routing.module';

import { GamesInnerPage } from './games-inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesInnerPageRoutingModule
  ],
  declarations: [GamesInnerPage]
})
export class GamesInnerPageModule {}
