import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ThirdPartyVinPage } from './third-party-vin.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: ThirdPartyVinPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ThirdPartyVinPage]
})
export class ThirdPartyVinPageModule {}
