import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EsimSalesInvoiceDetailsPage } from "./esim-sales-invoice-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { FileUploadModule } from "ng2-file-upload";
import { ReceivedDetailsComponent } from "./received-details/received-details.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";

const routes: Routes = [
  {
    path: "",
    component: EsimSalesInvoiceDetailsPage,
  },
  {
    path: "received-details",
    component: ReceivedDetailsComponent,
  },
  {
    path: "details",
    component: ViewDetailsComponent,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    IonicSelectableModule,
    FileUploadModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EsimSalesInvoiceDetailsPage,
    ReceivedDetailsComponent,
    ViewDetailsComponent,
  ],
})
export class EsimSalesInvoiceDetailsPageModule {}
