import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExcelValidationPage } from './excel-validation.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelValidationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExcelValidationPage]
})
export class ExcelValidationPageModule {}
