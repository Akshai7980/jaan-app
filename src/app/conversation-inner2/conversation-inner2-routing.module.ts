import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationInner2Page } from './conversation-inner2.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationInner2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationInner2PageRoutingModule {}
