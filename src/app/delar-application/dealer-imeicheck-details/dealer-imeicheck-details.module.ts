import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DealerImeicheckDetailsPage } from "./dealer-imeicheck-details.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import {
  IonicSelectableComponent,
  IonicSelectableModule,
} from "ionic-selectable";

const routes: Routes = [
  {
    path: "",
    component: DealerImeicheckDetailsPage,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DealerImeicheckDetailsPage],
})
export class DealerImeicheckDetailsPageModule {}
