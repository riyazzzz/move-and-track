import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TabsLoginPageRoutingModule } from './tabs-login.router.module'
import { TabsLoginPage } from './tabs-login.page';

import { DelarApplicationRoutingModule } from '../delar-application/delar-application-routing.module'
const routes: Routes = [
  {
    path: '',
    component: TabsLoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TabsLoginPageRoutingModule,
    DelarApplicationRoutingModule
  ],
  declarations: [TabsLoginPage]
})
export class TabsLoginPageModule {}
