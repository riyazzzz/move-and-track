import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ClassTablePage } from './class-table.page';
import { SktComponentsModule } from '../../sktcomponents.module';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';



const routes: Routes = [
  {
    path: '',
    component: ClassTablePage
  }
];

@NgModule({
  imports: [
  SktComponentsModule,
  SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  ClassTablePage,
  ],
})
export class ClassTablePageModule {}
