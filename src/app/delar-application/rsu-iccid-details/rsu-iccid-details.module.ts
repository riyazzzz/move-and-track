import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RsuIccidDetailsPage } from './rsu-iccid-details.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: RsuIccidDetailsPage
  }
];

@NgModule({
  imports: [
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RsuIccidDetailsPage]
})
export class RsuIccidDetailsPageModule {}
