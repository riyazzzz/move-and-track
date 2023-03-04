import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddCompanyVehiclePage } from './add-company-vehicle/add-company-vehicle.page';
import { CompanyVehiclePageRoutingModule } from './company-vehicle-routing.module';
import { CompanyVehiclePage } from './company-vehicle.page';
import { Routes, RouterModule } from '@angular/router';
import { DealerComponentsModule } from '../dealer-component/dealer-component.module'
const addCompanyVehiclePage: Routes = [
  {
    path: '',
    component: AddCompanyVehiclePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DealerComponentsModule,
    IonicModule,
    CompanyVehiclePageRoutingModule,
    RouterModule.forChild(addCompanyVehiclePage)
  ],
  declarations: [CompanyVehiclePage, AddCompanyVehiclePage]
})
export class CompanyVehiclePageModule {}
