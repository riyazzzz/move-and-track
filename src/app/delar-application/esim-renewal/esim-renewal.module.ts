import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EsimRenewalPage } from "./esim-renewal.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { RenewalRequestComponent } from "./renewal-request/renewal-request.component";
import { IonicSelectableModule } from "ionic-selectable";
import { ShowHistoryComponent } from "./show-history/show-history.component";
import { EsimTopupPopupComponent } from "./esim-topup-popup/esim-topup-popup.component";
import { CommentComponent } from "./comment/comment.component";

const routes: Routes = [
  {
    path: "",
    component: EsimRenewalPage,
  },
  {
    path: "renewal-request",
    component: RenewalRequestComponent,
  },
  {
    path: "show-history",
    component: ShowHistoryComponent,
  },
  {
    path: "esim-topup-popup",
    component: EsimTopupPopupComponent,
  },
  {
    path: "comment",
    component: CommentComponent,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EsimRenewalPage,
    RenewalRequestComponent,
    ShowHistoryComponent,
    EsimTopupPopupComponent,
    CommentComponent,
  ],
})
export class EsimRenewalPageModule {}
