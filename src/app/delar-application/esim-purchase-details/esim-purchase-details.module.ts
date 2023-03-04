import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EsimPurchaseDetailsPage } from "./esim-purchase-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { PayDetailsComponent } from "./pay-details/pay-details.component";
import { DetailsComponent } from "./details/details.component";
import { FileUploadModule } from "ng2-file-upload";

const routes: Routes = [
  {
    path: "",
    component: EsimPurchaseDetailsPage,
  },
  {
    path: "pay-details",
    component: PayDetailsComponent,
  },
  {
    path: "details",
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    IonicSelectableModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EsimPurchaseDetailsPage,
    DetailsComponent,
    PayDetailsComponent,
  ],
})
export class EsimPurchaseDetailsPageModule {}
