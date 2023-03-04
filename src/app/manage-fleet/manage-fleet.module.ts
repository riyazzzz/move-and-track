import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 import { ComponentsModule } from '../components/components.module'
import { IonicModule } from '@ionic/angular';
// import {SharedModModule} from '../shared-mod/shared-mod.module'
import { ManageFleetPage } from './manage-fleet.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFleetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    // ComponentsModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageFleetPage]
})
export class ManageFleetPageModule {}
