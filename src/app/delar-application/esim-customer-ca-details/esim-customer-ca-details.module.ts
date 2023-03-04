import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EsimCustomerCaDetailsPage } from "./esim-customer-ca-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { StatusDetailsComponent } from "./status-details/status-details.component";
import { DealerDetailsComponent } from "./dealer-details/dealer-details.component";
import { RequestPageComponent } from "./request-page/request-page.component";
import { EsimTopupPopupComponent } from "./esim-topup-popup/esim-topup-popup.component";
import { CommentComponent } from "./comment/comment.component";
import { CustomerRenewalRequestComponent } from "./customer-renewal-request/customer-renewal-request.component";
import { FileUploadModule } from "ng2-file-upload";
import { AssignDealerComponent } from "./assign-dealer/assign-dealer.component";
import { DealerlistComponent } from "./dealerlist/dealerlist.component";
import { AssigndealerPipe } from "src/app/services/assign-dealer-pipe-ca-page";

const routes: Routes = [
  {
    path: "",
    component: EsimCustomerCaDetailsPage,
  },
  {
    path: "status-details",
    component: StatusDetailsComponent,
  },
  {
    path: "dealer-details",
    component: DealerDetailsComponent,
  },
  {
    path: "request-page",
    component: RequestPageComponent,
  },
  {
    path: "app-esim-topup-popup",
    component: EsimTopupPopupComponent,
  },
  {
    path: "comment",
    component: CommentComponent,
  },
  {
    path: "customer-renewal-request",
    component: CustomerRenewalRequestComponent,
  },
  {
    path: "assign-dealer",
    component: AssignDealerComponent,
  },
  {
    path: "dealerlist",
    component: DealerlistComponent,
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
    EsimCustomerCaDetailsPage,
    StatusDetailsComponent,
    AssigndealerPipe,
    DealerDetailsComponent,
    RequestPageComponent,
    EsimTopupPopupComponent,
    CommentComponent,
    CustomerRenewalRequestComponent,
    AssignDealerComponent,
    DealerlistComponent,
  ],
})
export class EsimCustomerCaDetailsPageModule {}
