import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationInnerPageRoutingModule } from './conversation-inner-routing.module';

import { ConversationInnerPage } from './conversation-inner.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ConversationInnerPageRoutingModule
  ],
  declarations: [ConversationInnerPage]
})
export class ConversationInnerPageModule {}
