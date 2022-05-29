import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAspectsPageRoutingModule } from './home-aspects-routing.module';

import { HomeAspectsPage } from './home-aspects.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    HomeAspectsPageRoutingModule
  ],
  declarations: [HomeAspectsPage]
})
export class HomeAspectsPageModule {}
