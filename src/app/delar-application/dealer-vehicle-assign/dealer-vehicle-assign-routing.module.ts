import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerVehicleAssignPage } from './dealer-vehicle-assign.page';

const routes: Routes = [
  {
    path: '',
    component: DealerVehicleAssignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerAssignRouter {}