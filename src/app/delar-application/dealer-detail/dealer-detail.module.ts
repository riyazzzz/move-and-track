import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { IonicSelectableModule} from 'ionic-selectable';
import { DealerDetailPage } from './dealer-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DealerDetailPage
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
  declarations: [DealerDetailPage]
})
export class DealerDetailPageModule {}
