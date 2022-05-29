import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationInner3Page } from './conversation-inner3.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationInner3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationInner3PageRoutingModule {}
