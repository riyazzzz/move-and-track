import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { StockAssignPage } from "./stock-assign.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { DealerDetailsComponent } from "./dealer-details/dealer-details.component";
import { SearchDealerStockPipe } from "src/app/services/search-dealer-pipe-stock-up";

const routes: Routes = [
  {
    path: "",
    component: StockAssignPage,
  },
  {
    path: "dealer-details",
    component: DealerDetailsComponent,
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
    StockAssignPage,
    SearchDealerStockPipe,
    DealerDetailsComponent,
  ],
})
export class StockAssignPageModule {}
