import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BroadcastSmsPage } from './broadcast-sms.page';
import { SktComponentsModule } from '../../sktcomponents.module';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: BroadcastSmsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SktComponentsModule,
    SharedModModule,
    ReactiveFormsModule
  ],
  declarations: [BroadcastSmsPage]
})
export class BroadcastSmsPageModule {}
