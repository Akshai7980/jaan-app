import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactBookPageRoutingModule } from './contact-book-routing.module';

import { ContactBookPage } from './contact-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactBookPageRoutingModule
  ],
  declarations: [ContactBookPage]
})
export class ContactBookPageModule {}
