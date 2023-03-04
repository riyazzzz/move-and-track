import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { ReportsPage } from './reports.page';
import { ReportsFormPage } from './reports-form/reports-form.page';
import { MapModalComponent } from '../all-reports/trip-summary/map-modal/map-modal.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedModModule } from '../shared-mod/shared-mod.module';
import { ComponentsModule } from '../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: ReportsPage
  }
];
const repModal: Routes = [
  {
    path: '',
    component: ReportsFormPage
  },
  {
    path: 'tripSummaryReport',
    component: MapModalComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(repModal),
    IonicSelectableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModModule,
    ComponentsModule
  ],
  declarations: [MapModalComponent,ReportsFormPage, ReportsPage]
})
export class ReportsPageModule { }
