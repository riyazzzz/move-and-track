import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddDelarPageRoutingModule } from './add-delar-routing.module';

import { AddDelarPage } from './add-delar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDelarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddDelarPage]
})
export class AddDelarPageModule {}
