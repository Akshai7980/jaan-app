import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPageRoutingModule } from './worksheet-routing.module';

import { WorksheetPage } from './worksheet.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    WorksheetPageRoutingModule
  ],
  declarations: [WorksheetPage]
})
export class WorksheetPageModule {}
