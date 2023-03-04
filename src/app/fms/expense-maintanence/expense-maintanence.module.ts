import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { ComponentsModule } from '../components/components.module';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExpenseMaintanencePage } from '../expense-maintanence/expense-maintanence.page';

// import { ExpenseMaintenancePage } from './expense-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseMaintanencePage
  }
];

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpenseMaintanencePage]
})
export class ExpenseMaintenancePageModule {}
