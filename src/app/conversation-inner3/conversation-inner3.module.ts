import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationInner3PageRoutingModule } from './conversation-inner3-routing.module';

import { ConversationInner3Page } from './conversation-inner3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ConversationInner3PageRoutingModule
  ],
  declarations: [ConversationInner3Page]
})
export class ConversationInner3PageModule {}
