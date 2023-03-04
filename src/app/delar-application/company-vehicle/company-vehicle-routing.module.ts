import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyVehiclePage } from './company-vehicle.page';
const routes: Routes = [
  {
    path: '',
    component: CompanyVehiclePage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyVehiclePageRoutingModule {}
