import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PipesModule } from 'pipes-module';
import { IonicModule } from '@ionic/angular';
import { SearchFilterService } from '../../services/search-filter.service';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
// import { AddImeiCompanyPageModule } from './add-imei-company/add-imei-company.module';
// import { AddCompanyVehiclePage } from '../company-vehicle/add-company-vehicle/add-company-vehicle.page';
import { Routes, RouterModule } from '@angular/router';
import { AddImeiCompanyPage } from './add-imei-company/add-imei-company.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
const addImeiCompanyPage: Routes = [
  {
    path: '',
    component: AddImeiCompanyPage
  },
  {
    path: 'company-details',
    component: CompanyDetailsComponent,
  }
];
@NgModule({
  imports: [
    SharedModModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    // PipesModule,
    DashboardPageRoutingModule,
    RouterModule.forChild(addImeiCompanyPage)
    
  ],
  declarations: [DashboardPage, AddImeiCompanyPage,CompanyDetailsComponent, SearchFilterService] //SearchFilterService
})
export class DashboardPageModule {}
