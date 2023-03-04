import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EsimDealerDetailPage } from './esim-dealer-detail.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  {
    path: '',
    component: EsimDealerDetailPage
  },
  {
    path: 'request-details',
    component: RequestDetailsComponent
  }
];

@NgModule({
  imports: [
    SharedModModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsimDealerDetailPage,RequestDetailsComponent]
})
export class EsimDealerDetailPageModule {}
