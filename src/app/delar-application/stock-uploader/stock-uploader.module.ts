import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StockUploaderPageRoutingModule } from "./stock-uploader-routing.module";
import { SharedModModule } from "../../shared-mod/shared-mod.module";
// import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { StockUploaderPage } from "./stock-uploader.page";

@NgModule({
  imports: [
    SharedModModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModModule,
    ReactiveFormsModule,
    // jqxGridModule,
    StockUploaderPageRoutingModule,
  ],
  declarations: [StockUploaderPage],
})
export class StockUploaderPageModule {}
