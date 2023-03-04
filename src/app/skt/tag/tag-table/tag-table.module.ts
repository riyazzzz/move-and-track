import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TagTablePage } from './tag-table.page';
import { SktComponentsModule } from '../../sktcomponents.module';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: TagTablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SktComponentsModule,
    SharedModModule,
    ReactiveFormsModule
  ],
  declarations: [TagTablePage]
})
export class TagTablePageModule {}
