import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AttendenceReportPage } from './attendence-report.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: AttendenceReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModModule
  ],
  declarations: [AttendenceReportPage]
})
export class AttendenceReportPageModule {}
