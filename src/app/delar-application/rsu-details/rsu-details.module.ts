import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModModule} from '../../shared-mod/shared-mod.module'
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RSUDetailsPage } from './rsu-details.page';
import { IonicSelectableModule} from 'ionic-selectable';
import { RenewalDetailsComponent } from './renewal-details/renewal-details.component';

const routes: Routes = [
  {
    path: '',
    component: RSUDetailsPage
  },
  {
    path: 'renewal-details',
    component: RenewalDetailsComponent,
    
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RSUDetailsPage,RenewalDetailsComponent]
})
export class RSUDetailsPageModule {}