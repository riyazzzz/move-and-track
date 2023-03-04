import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 import { ComponentsModule } from '../../components/components.module'
import { IonicModule } from '@ionic/angular';
import { FmsProfilePage } from './fms-profile.page';

const routes: Routes = [
  {
    path: '',
    component: FmsProfilePage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FmsProfilePage]
})
export class FmsProfilePageModule {}
