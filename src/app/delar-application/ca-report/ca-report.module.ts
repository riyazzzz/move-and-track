import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSelectableModule} from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CaReportPage } from './ca-report.page';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
const routes: Routes = [
  {
    path: '',
    component: CaReportPage
  }
];

@NgModule({
  imports: [
    SharedModModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CaReportPage]
})
export class CaReportPageModule {}
