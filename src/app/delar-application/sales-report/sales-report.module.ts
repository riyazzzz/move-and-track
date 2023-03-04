import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SalesCardComponent } from './sales-card/sales-card.component';

import { SalesReportPage } from './sales-report.page';

const routes: Routes = [
  {
    path: '',
    component: SalesReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [SalesReportPage, SalesCardComponent]
})
export class SalesReportPageModule {}
