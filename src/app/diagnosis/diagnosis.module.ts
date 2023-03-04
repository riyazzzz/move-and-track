import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { VtsDiagnosisComponent } from './vts-diagnosis/vts-diagnosis.component'
import { DiagnosisPage } from './diagnosis.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiagnosisPage, VtsDiagnosisComponent]
})
export class DiagnosisPageModule {}
