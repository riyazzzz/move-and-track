import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DeviceExtendOneyearInvoiceDetailsPage } from "./device-extend-oneyear-invoice-details.page";
import { ReceivedExtendDetailsComponent } from "./received-extend-details/received-extend-details.component";
import { ViewExtendDetailsComponent } from "./view-extend-details/view-extend-details.component";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { FileUploadModule } from "ng2-file-upload";
import { ViewImeiComponent } from "./view-imei/view-imei.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceExtendOneyearInvoiceDetailsPage,
  },
  {
    path: "received-extend-details",
    component: ReceivedExtendDetailsComponent,
  },
  {
    path: "view-extend-details",
    component: ViewExtendDetailsComponent,
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
    DeviceExtendOneyearInvoiceDetailsPage,
    ReceivedExtendDetailsComponent,
    ViewExtendDetailsComponent,
    ViewImeiComponent,
  ],
})
export class DeviceExtendOneyearInvoiceDetailsPageModule {}
