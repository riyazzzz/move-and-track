import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { WarrantyExpiryPage } from './warranty-expiry.page';

const routes: Routes = [
  {
    path: '',
    component: WarrantyExpiryPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WarrantyExpiryPage]
})
export class WarrantyExpiryPageModule {}
