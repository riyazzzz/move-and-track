import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RenewalPage } from './renewal.page';
import { AddrenewalComponent } from '../addrenewal/addrenewal.component';
import { ComponentsModule } from 'src/app/components/components.module';
const routes: Routes = [
  {
    path: '',
    component: RenewalPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RenewalPage,AddrenewalComponent],
  entryComponents:[AddrenewalComponent]
})
export class RenewalPageModule {}
