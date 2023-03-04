import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule} from 'ionic-selectable';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { IonicModule } from '@ionic/angular';
import { RSURequestPage } from './rsu-request.page';

const routes: Routes = [
  {
    path: '',
    component: RSURequestPage
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
  declarations: [RSURequestPage]
})
export class RSURequestPageModule {}
