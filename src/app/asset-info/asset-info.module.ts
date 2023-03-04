import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module'
import { IonicModule } from '@ionic/angular';

import { AssetInfoPage } from './asset-info.page';
const routes: Routes = [
  {
    path: '',
    component: AssetInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [AssetInfoPage, ]
})
export class AssetInfoPageModule { }
