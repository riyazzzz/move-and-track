import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EsimHomePage } from './esim-home.page';
import { DashboardgridComponent } from '../components/dashboardgrid/dashboardgrid.component';
import { TableModule } from 'smart-webcomponents-angular/table';
const routes: Routes = [
  {
    path: '',
    component: EsimHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  declarations: [EsimHomePage, DashboardgridComponent],
  entryComponents: [DashboardgridComponent]
})
export class EsimHomePageModule { }
