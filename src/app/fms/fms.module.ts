import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { ExpenseMaintanencePage } from './expense-maintanence/expense-maintanence.page';
// import { ExpenseMaintanencePageModule } from './expense-maintanence/expense-maintanence.module';
import { IonicModule } from '@ionic/angular';

// const routes: Routes = [
//   {
//     path: '',
//  loadChildren: () => import('../expense-maintenance/expense-maintenance.module').then(m => m.ExpenseMaintenancePageModule)
//   }
// ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    // RouterModule.forChild(routes),

  ]
})
export class FmsModule { }
