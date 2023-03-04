import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LatLongMapPickerPage } from './lat-long-map-picker.page';

const routes: Routes = [
  {
    path: '',
    component: LatLongMapPickerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LatLongMapPickerPage]
})
export class LatLongMapPickerPageModule {}
