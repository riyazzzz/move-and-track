import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseTabPageRoutingModule } from './purchase-tab-routing.module';

import { PurchaseTabPage } from './purchase-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseTabPageRoutingModule
  ],
  declarations: [PurchaseTabPage]
})
export class PurchaseTabPageModule {}
