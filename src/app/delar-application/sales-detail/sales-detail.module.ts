import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesDetailPage } from './sales-detail.page';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { ViewSerialdetailComponent } from './view-serialdetail/view-serialdetail.component';
import { ViewSerialDetailsComponent } from './view-serial-details/view-serial-details.component';
import { IonicSelectableModule} from 'ionic-selectable';
const routes: Routes = [
  {
    path: '',
    component: SalesDetailPage
  },
  {
    path: 'sales-details',
    component: AddSaleComponent,
    
  },
  {
    path: 'view-serial-details',
    component: ViewSerialdetailComponent,
    
  },
  {
    path: 'view-serial-detail',
    component: ViewSerialDetailsComponent,
    
  }
];

@NgModule({
  imports: [
    IonicSelectableModule,
    ReactiveFormsModule,
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalesDetailPage,AddSaleComponent,ViewSerialdetailComponent,ViewSerialDetailsComponent]
})
export class SalesDetailPageModule {}
