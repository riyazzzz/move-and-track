import { NgModule } from '@angular/core';
import { VehicleRegistrationPage } from '../vehicle-registration.page';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: VehicleRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRegistrationRoutingModule { }
