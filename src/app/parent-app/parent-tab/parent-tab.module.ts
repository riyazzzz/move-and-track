import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ParentTabPageRoutingModule } from './parent-tab.router.module'
import { IonicModule } from '@ionic/angular';

import { ParentTabPage } from './parent-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ParentTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParentTabPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParentTabPage]
})
export class ParentTabPageModule {}
