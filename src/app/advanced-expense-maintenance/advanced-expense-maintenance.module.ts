import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ComponentsModule} from '../components/components.module'
import { IonicModule } from '@ionic/angular';

import { AdvancedExpenseMaintenancePage } from './advanced-expense-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: AdvancedExpenseMaintenancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdvancedExpenseMaintenancePage]
})
export class AdvancedExpenseMaintenancePageModule {}
