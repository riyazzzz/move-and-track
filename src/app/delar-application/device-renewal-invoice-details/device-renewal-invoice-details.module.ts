import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DeviceRenewalInvoiceDetailsPage } from "./device-renewal-invoice-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { ReceivedDetailsComponent } from "./received-details/received-details.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";
import { IonicSelectableModule } from "ionic-selectable";
import { FileUploadModule } from "ng2-file-upload";
import { ViewImeiComponent } from "./view-imei/view-imei.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceRenewalInvoiceDetailsPage,
  },
  {
    path: "view-details",
    component: ViewDetailsComponent,
  },
  {
    path: "recived-details",
    component: ReceivedDetailsComponent,
  },
  {
    path: "view-imei",
    component: ViewImeiComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    SharedModModule,
    FileUploadModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DeviceRenewalInvoiceDetailsPage,
    ReceivedDetailsComponent,
    ViewDetailsComponent,
    ViewImeiComponent,
  ],
})
export class DeviceRenewalInvoiceDetailsPageModule {}
