import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { IonicModule } from '@ionic/angular';
import { GeofenceModelPage } from '../../app/geofence/geofence-model/geofence-model.page';
import { GeofenceListModelPage } from '../../app/geofence/geofence-list-model/geofence-list-model.page';
import { GeofencePage } from './geofence.page';
const geofencemodelpage: Routes = [
  {
    path: '',
    component: GeofenceModelPage
  },
];
const geofencelistmodelpage: Routes = [
  {
    path: '',
    component: GeofenceListModelPage
  },
];
const routes: Routes = [
  {
    path: '',
    component: GeofencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(geofencemodelpage),
    RouterModule.forChild(geofencelistmodelpage)
  ],
  declarations: [GeofencePage, GeofenceModelPage, GeofenceListModelPage]
})
export class GeofencePageModule { }
