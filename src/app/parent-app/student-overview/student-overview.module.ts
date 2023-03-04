import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { StudentOverviewPage } from './student-overview.page';
const routes: Routes = [
  {
    path: '',
    component: StudentOverviewPage
  },{
    path:'attendence-report',
    loadChildren:'./parent-app/attendence-report/attendence-report.module#AttendenceReportPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentOverviewPage]
})
export class StudentOverviewPageModule { }
