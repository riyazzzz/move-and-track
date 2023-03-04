import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { ProductionDetailsPage } from './production-details.page';
import { AddProductionComponent } from './add-production/add-production.component';
import { ViewProductionComponent } from './view-production/view-production.component';
import { IonicSelectableModule} from 'ionic-selectable';
const routes: Routes = [
  {
    path: '',
    component: ProductionDetailsPage
  },
  {
    path: 'add-production',
    component: AddProductionComponent
  },
  {
    path: 'view-production',
    component: ViewProductionComponent
  }
];

@NgModule({
  imports: [
    IonicSelectableModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductionDetailsPage,AddProductionComponent,ViewProductionComponent]
})
export class ProductionDetailsPageModule {}
