import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GridviewTabPageModule } from '../gridview-tab/gridview-tab.module';
import { IonicModule } from '@ionic/angular';
import { MapviewTabPage } from './mapview-tab.page';
import { ComponentsModule } from '../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: MapviewTabPage
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
  declarations: [MapviewTabPage]
})
export class MapviewTabPageModule {}
