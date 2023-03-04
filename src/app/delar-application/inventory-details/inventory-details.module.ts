import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModModule } from 'src/app/shared-mod/shared-mod.module';
import { IonicModule } from '@ionic/angular';
import { InventoryDetailsPage } from './inventory-details.page';
import { InventoryPopupComponent } from './inventory-popup/inventory-popup.component';
import { ViewCommentsComponent } from './view-comments/view-comments.component';
import { IonicSelectableModule} from 'ionic-selectable';
const routes: Routes = [
  {
    path: '',
    component: InventoryDetailsPage
  },
  {
    path: 'InventoryPopupComponent',
    component: InventoryPopupComponent
  },
  {
    path: 'viewInventoryPopupComponent',
    component: ViewCommentsComponent
  },
];

@NgModule({
  imports: [
    IonicSelectableModule,
    ReactiveFormsModule,
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InventoryDetailsPage,InventoryPopupComponent,ViewCommentsComponent]
})
export class InventoryDetailsPageModule {}
