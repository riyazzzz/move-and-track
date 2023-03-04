import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockPage } from './stock.page';

const routes: Routes = [
  {
    path: '',
    component: StockPage
  },
  {
    path: 'add-imei-company',
    loadChildren: () => import('./add-imei-company/add-imei-company.module').then( m => m.AddImeiCompanyPageModule)
  },{
    path: 'add-company',
    loadChildren: () => import('./add-company/add-company.module').then( m => m.AddCompanyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockPageRoutingModule {}
