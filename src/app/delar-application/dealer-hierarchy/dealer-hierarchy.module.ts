import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DealerHierarchyPage } from './dealer-hierarchy.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';

const routes: Routes = [
  {
    path: '',
    component: DealerHierarchyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DealerHierarchyPage]
})
export class DealerHierarchyPageModule {}
