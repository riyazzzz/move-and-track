import { FmsreportsPage } from './fmsreports.page';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FmsreportsFormPage } from '../fmsreports/fmsreports-form/fmsreports-form.page';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedModModule } from '../../shared-mod/shared-mod.module';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: FmsreportsPage
  },

  {
    path: '',
    component: FmsreportsFormPage
  },
 
];

@NgModule({
  imports: [
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicSelectableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModModule,
    ComponentsModule
  ],
  declarations: [FmsreportsFormPage,FmsreportsPage]
})
export class FmsreportsPageModule {}
