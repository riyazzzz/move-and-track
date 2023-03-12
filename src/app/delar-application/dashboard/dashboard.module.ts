import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { PipesModule } from 'pipes-module';
import { IonicModule } from "@ionic/angular";
import { SearchFilterService } from "../../services/search-filter.service";
import { DashboardPageRoutingModule } from "./dashboard-routing.module";
import { DashboardPage } from "./dashboard.page";
// import { AddImeiCompanyPageModule } from './add-imei-company/add-imei-company.module';
// import { AddCompanyVehiclePage } from '../company-vehicle/add-company-vehicle/add-company-vehicle.page';
import { Routes, RouterModule } from "@angular/router";
import { AddImeiCompanyPage } from "./add-imei-company/add-imei-company.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
import { AddCompanyPage } from "./add-company/add-company.page";
import { IonicSelectableModule } from "ionic-selectable";
import { CreateCompanyComponent } from "./create-company/create-company.component";
const addImeiCompanyPage: Routes = [
  {
    path: "",
    component: AddImeiCompanyPage,
  },
  {
    path: "company-details",
    component: CompanyDetailsComponent,
  },
  {
    path: "create-company",
    component: CreateCompanyComponent,
  },
];
@NgModule({
  imports: [
    SharedModModule,
    IonicSelectableModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    // PipesModule,
    DashboardPageRoutingModule,
    RouterModule.forChild(addImeiCompanyPage),
  ],
  declarations: [
    DashboardPage,
    AddImeiCompanyPage,
    CompanyDetailsComponent,
    SearchFilterService,
    // AddCompanyPage,
    CreateCompanyComponent,
  ], //SearchFilterService
  // entryComponents: [AddCompanyPage],
})
export class DashboardPageModule {}
