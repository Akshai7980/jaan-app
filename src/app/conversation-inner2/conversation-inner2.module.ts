import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationInner2PageRoutingModule } from './conversation-inner2-routing.module';

import { ConversationInner2Page } from './conversation-inner2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ConversationInner2PageRoutingModule
  ],
  declarations: [ConversationInner2Page]
})
export class ConversationInner2PageModule {}
