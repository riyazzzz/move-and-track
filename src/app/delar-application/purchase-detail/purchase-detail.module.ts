import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModModule} from '../../shared-mod/shared-mod.module'
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseDetailPage } from './purchase-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseDetailPage
  }
];

@NgModule({
  imports: [
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseDetailPage]
})
export class PurchaseDetailPageModule {}
