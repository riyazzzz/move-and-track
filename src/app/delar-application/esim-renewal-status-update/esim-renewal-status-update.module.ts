import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EsimRenewalStatusUpdatePage } from "./esim-renewal-status-update.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { AddEsimRenewalStatusUpdateComponent } from "./add-esim-renewal-status-update/add-esim-renewal-status-update.component";
import { RenewalBulkstatusComponent } from "./renewal-bulkstatus/renewal-bulkstatus.component";
import { RenewalHistoryDetailsComponent } from "./renewal-history-details/renewal-history-details.component";
import { SimUpdateComponent } from "./sim-update/sim-update.component";
import { CommentComponent } from "./comment/comment.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { QRCodeModule } from "angular2-qrcode";

const routes: Routes = [
  {
    path: "",
    component: EsimRenewalStatusUpdatePage,
  },
  {
    path: "add-esim-renewal-status-update",
    component: AddEsimRenewalStatusUpdateComponent,
  },
  {
    path: "renewal-bulkstatus",
    component: RenewalBulkstatusComponent,
  },
  {
    path: "renewal-history-details",
    component: RenewalHistoryDetailsComponent,
  },
  {
    path: "sim-update",
    component: SimUpdateComponent,
  },
  {
    path: "comment",
    component: CommentComponent,
  },
  {
    path: "certificate",
    component: CertificateComponent,
  },
];

@NgModule({
  imports: [
    QRCodeModule,
    SharedModModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EsimRenewalStatusUpdatePage,
    AddEsimRenewalStatusUpdateComponent,
    RenewalBulkstatusComponent,
    RenewalHistoryDetailsComponent,
    SimUpdateComponent,
    CommentComponent,
    CertificateComponent,
  ],
})
export class EsimRenewalStatusUpdatePageModule {}
