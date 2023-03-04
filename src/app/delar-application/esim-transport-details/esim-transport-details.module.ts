import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EsimTransportDetailsPage } from "./esim-transport-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableModule } from "ionic-selectable";
import { FileUploadModule } from "ng2-file-upload";
import { AddTransportDetailsComponent } from "./add-transport-details/add-transport-details.component";

const routes: Routes = [
  {
    path: "",
    component: EsimTransportDetailsPage,
  },
  {
    path: "add-transport-details",
    component: AddTransportDetailsComponent,
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
  declarations: [EsimTransportDetailsPage, AddTransportDetailsComponent],
})
export class EsimTransportDetailsPageModule {}
