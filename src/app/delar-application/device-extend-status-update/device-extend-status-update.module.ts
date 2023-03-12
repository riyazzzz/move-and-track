import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DeviceExtendStatusUpdatePage } from "./device-extend-status-update.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { ExtendCommentComponent } from "./extend-comment/extend-comment.component";
import { BulkExtendComponent } from "./bulk-extend/bulk-extend.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceExtendStatusUpdatePage,
  },
  {
    path: "extend-comment",
    component: ExtendCommentComponent,
  },
  {
    path: "bulk-extend",
    component: BulkExtendComponent,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    DeviceExtendStatusUpdatePage,
    ExtendCommentComponent,
    BulkExtendComponent,
  ],
})
export class DeviceExtendStatusUpdatePageModule {}
