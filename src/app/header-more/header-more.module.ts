import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderMorePageRoutingModule } from './header-more-routing.module';

import { HeaderMorePage } from './header-more.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderMorePageRoutingModule
  ],
  declarations: [HeaderMorePage]
})
export class HeaderMorePageModule {}
