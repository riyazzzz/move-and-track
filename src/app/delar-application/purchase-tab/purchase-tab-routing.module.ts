import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseTabPage } from './purchase-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseTabPageRoutingModule {}
