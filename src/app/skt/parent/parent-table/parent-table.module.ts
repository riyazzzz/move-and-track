import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ParentTablePage } from './parent-table.page';
import { SktComponentsModule } from '../../sktcomponents.module';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: ParentTablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SktComponentsModule,
    SharedModModule
  ],
  declarations: [ParentTablePage]
})
export class ParentTablePageModule {}
