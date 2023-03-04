import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DealerComponentsModule } from '../../dealer-component/dealer-component.module';
import { AssertStatusListPage } from './assert-status-list.page';

const routes: Routes = [
  {
    path: '',
    component: AssertStatusListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssertStatusListPage]
})
export class AssertStatusListPageModule {}
