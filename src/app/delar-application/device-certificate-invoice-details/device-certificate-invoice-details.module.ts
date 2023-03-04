import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DeviceCertificateInvoiceDetailsPage } from "./device-certificate-invoice-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { ReceivedDetailsComponent } from "./received-details/received-details.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";
import { FileUploadModule } from "ng2-file-upload";

const routes: Routes = [
  {
    path: "",
    component: DeviceCertificateInvoiceDetailsPage,
  },
  {
    path: "received-details",
    component: ReceivedDetailsComponent,
  },
  {
    path: "view-details",
    component: ViewDetailsComponent,
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
    DeviceCertificateInvoiceDetailsPage,
    ReceivedDetailsComponent,
    ViewDetailsComponent,
  ],
})
export class DeviceCertificateInvoiceDetailsPageModule {}
