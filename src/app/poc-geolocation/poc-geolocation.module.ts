import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PocGeolocationPage } from './poc-geolocation.page';

const routes: Routes = [
  {
    path: '',
    component: PocGeolocationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PocGeolocationPage]
})
export class PocGeolocationPageModule {}
