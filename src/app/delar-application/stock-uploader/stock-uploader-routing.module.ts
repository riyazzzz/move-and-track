import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockUploaderPage } from './stock-uploader.page';

const routes: Routes = [
  {
    path: '',
    component: StockUploaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockUploaderPageRoutingModule {}
