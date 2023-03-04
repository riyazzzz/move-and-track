import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { VehicleCreationPageRoutingModule } from './vehicle-creation-routing.module';

import { VehicleCreationPage } from './vehicle-creation.page';

@NgModule({
  imports: [
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VehicleCreationPageRoutingModule
  ],
  declarations: [VehicleCreationPage]
})
export class VehicleCreationPageModule {}
