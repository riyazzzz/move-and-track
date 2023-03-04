import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouteTripPage } from './route-trip.page';
import { SktComponentsModule } from '../../sktcomponents.module';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';



const routes: Routes = [
  {
    path: '',
    component: RouteTripPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SktComponentsModule,
    SharedModModule
  ],
  declarations: [RouteTripPage]
})
export class RouteTripPageModule {}
