import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { OdometerHistoryPage } from './odometer-history.page';

const routes: Routes = [
  {
    path: '',
    component: OdometerHistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OdometerHistoryPage]
})
export class OdometerHistoryPageModule {}
