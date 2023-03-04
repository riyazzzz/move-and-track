import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { EsimProductionDetailPage } from "./esim-production-detail.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { IonicSelectableComponent } from "ionic-selectable";
import { EsimViewProductionComponent } from "./esim-view-production/esim-view-production.component";
import { EsimAddProductionComponent } from "./esim-add-production/esim-add-production.component";
import { IonicSelectableModule } from "ionic-selectable";
import { FileUploadModule } from "ng2-file-upload";
const routes: Routes = [
  {
    path: "",
    component: EsimProductionDetailPage,
  },
  {
    path: "esim-add-production",
    component: EsimAddProductionComponent,
  },
  {
    path: "esim-view-production",
    component: EsimViewProductionComponent,
  },
];

@NgModule({
  imports: [
    IonicSelectableModule,
    FileUploadModule,
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EsimProductionDetailPage,
    EsimAddProductionComponent,
    EsimViewProductionComponent,
  ],
})
export class EsimProductionDetailPageModule {}
