import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModModule} from '../../shared-mod/shared-mod.module'
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ManufactureDetailPage } from './manufacture-detail.page';
import { IonicSelectableModule} from 'ionic-selectable';
const routes: Routes = [
  {
    path: '',
    component: ManufactureDetailPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicSelectableModule,
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManufactureDetailPage]
})
export class ManufactureDetailPageModule {}
