import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module'

import { IonicModule } from '@ionic/angular';

import { AkliveTrackPage } from './aklive-track.page';

const routes: Routes = [
  {
    path: '',
    component: AkliveTrackPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AkliveTrackPage]
})
export class AkliveTrackPageModule {}
