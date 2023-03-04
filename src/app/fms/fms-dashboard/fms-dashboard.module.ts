import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FmsDashboardPage } from './fms-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: FmsDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FmsDashboardPage]
})
export class FmsDashboardPageModule {}
