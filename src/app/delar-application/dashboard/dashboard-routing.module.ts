import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'add-company',
    loadChildren: () => import('./add-company/add-company.module').then( m => m.AddCompanyPageModule)
  },
  {
    path: 'add-imei-company',
    loadChildren: () => import('./add-imei-company/add-imei-company.module').then( m => m.AddImeiCompanyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
