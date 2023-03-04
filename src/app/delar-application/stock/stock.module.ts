import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { PipesModule } from 'pipes-module';
import { IonicModule } from '@ionic/angular';

import { StockPageRoutingModule } from './stock-routing.module';
import { StockFilterService } from '../../services/stock-filter.service';
import { StockPage } from './stock.page';
import { AddImeiCompanyPage } from './add-imei-company/add-imei-company.page';
import { Routes, RouterModule } from '@angular/router';
const addImeiCompanyPage: Routes = [
  {
    path: '',
    component: AddImeiCompanyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //PipesModule,
    IonicModule,
    StockPageRoutingModule,
    RouterModule.forChild(addImeiCompanyPage)
  ],
  declarations: [StockPage, StockFilterService, AddImeiCompanyPage]
})
export class StockPageModule {}
