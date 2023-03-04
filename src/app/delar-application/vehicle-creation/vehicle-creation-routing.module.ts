import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleCreationPage } from './vehicle-creation.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleCreationPageRoutingModule {}
