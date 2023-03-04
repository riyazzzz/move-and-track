import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';

import { ReportsFormPage } from './reports-form.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class ReportsFormPageModule {}
