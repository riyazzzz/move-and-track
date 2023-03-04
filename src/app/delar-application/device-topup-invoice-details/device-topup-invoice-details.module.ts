import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DeviceTopupInvoiceDetailsPage } from "./device-topup-invoice-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import {
  IonicSelectableModalComponent,
  IonicSelectableModule,
} from "ionic-selectable";
import { FileUploadModule } from "ng2-file-upload";
import { ReceivedTopupDetailsComponent } from "./received-topup-details/received-topup-details.component";
import { ViewTopupDetailsComponent } from "./view-topup-details/view-topup-details.component";
import { ViewImeiComponent } from "./view-imei/view-imei.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceTopupInvoiceDetailsPage,
  },
  {
    path: "received-topup-details",
    component: ReceivedTopupDetailsComponent,
  },
  {
    path: "view-topup-details",
    component: ViewTopupDetailsComponent,
  },
  {
    path: "view-imei",
    component: ViewImeiComponent,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DeviceTopupInvoiceDetailsPage,
    ReceivedTopupDetailsComponent,
    ViewTopupDetailsComponent,
    ViewImeiComponent,
  ],
})
export class DeviceTopupInvoiceDetailsPageModule {}
