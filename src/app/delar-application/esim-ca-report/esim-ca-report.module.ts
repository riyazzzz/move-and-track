import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { EsimCaReportPage } from "./esim-ca-report.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { AddEsimCaStatusUpdateComponent } from "./add-esim-ca-status-update/add-esim-ca-status-update.component";
import { HistoryDetailsComponent } from "./history-details/history-details.component";
import { BulkstatusComponent } from "./bulkstatus/bulkstatus.component";
import { SimUpdateComponent } from "./sim-update/sim-update.component";
import { CommentComponent } from "./comment/comment.component";
import { CertificateComponent } from "./certificate/certificate.component";

const routes: Routes = [
  {
    path: "",
    component: EsimCaReportPage,
  },
  {
    path: "add-esim-status-update",
    component: AddEsimCaStatusUpdateComponent,
  },
  {
    path: "history-details",
    component: HistoryDetailsComponent,
  },
  {
    path: "bulkstatus",
    component: BulkstatusComponent,
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
    SharedModModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EsimCaReportPage,
    AddEsimCaStatusUpdateComponent,
    HistoryDetailsComponent,
    BulkstatusComponent,
    SimUpdateComponent,
    CommentComponent,
    CertificateComponent
  ],
})
export class EsimCaReportPageModule { }
