import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { SenoriseRSUPage } from './senorise-rsu.page';
import { AddSensoriseComponent } from './add-sensorise/add-sensorise.component';
import { SensoriseListComponent } from './sensorise-list/sensorise-list.component';

const routes: Routes = [
  {
    path: '',
    component: SenoriseRSUPage
  },
  {
    path: 'sensorise-renewal',
    component: AddSensoriseComponent,
    
  },
  {
    path: 'sensorise-list',
    component: SensoriseListComponent,
    
  }
];

@NgModule({
  imports: [
    SharedModModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SenoriseRSUPage,AddSensoriseComponent,SensoriseListComponent]
})
export class SenoriseRSUPageModule {}
