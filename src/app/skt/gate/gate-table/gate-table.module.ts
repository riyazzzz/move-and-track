import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GateTablePage } from './gate-table.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { SktComponentsModule } from '../../sktcomponents.module';

const routes: Routes = [
  {
    path: '',
    component: GateTablePage
  }
];

@NgModule({
  imports: [
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SktComponentsModule
  ],
  declarations: [GateTablePage]
})
export class GateTablePageModule {}
