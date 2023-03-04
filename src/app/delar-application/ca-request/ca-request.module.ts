import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

import { CARequestPage } from './ca-request.page';

const routes: Routes = [
  {
    path: '',
    component: CARequestPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CARequestPage]
})
export class CARequestPageModule {}
