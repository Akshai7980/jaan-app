import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeningInnerPageRoutingModule } from './listening-inner-routing.module';

import { ListeningInnerPage } from './listening-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeningInnerPageRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [ListeningInnerPage]
})
export class ListeningInnerPageModule {}
