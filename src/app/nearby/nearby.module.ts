import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NearbyPage } from './nearby.page';
import { ComponentsModule } from '../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: NearbyPage
  }
];
const VtsNearBy: Routes = [
  {
    path: '',
    component: NearbyPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(VtsNearBy)
  ],
  declarations: [NearbyPage]
})
export class NearbyPageModule {}
