import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AisDashboardPage } from './ais-dashboard.page';
import {TableComponent} from '../ais-dashboard/table/table.component'
const routes: Routes = [
  {
    path: '',
    component: AisDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[TableComponent],
  declarations: [AisDashboardPage, TableComponent],
})
export class AisDashboardPageModule {}
