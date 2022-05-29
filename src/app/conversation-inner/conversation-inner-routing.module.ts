import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationInnerPage } from './conversation-inner.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationInnerPageRoutingModule {}
