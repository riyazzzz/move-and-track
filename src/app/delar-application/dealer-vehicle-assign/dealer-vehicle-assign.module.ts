import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchDealerAssignPipe } from '../../services/dealer-assign-pipe';
import { DealerAssignRouter } from './dealer-vehicle-assign-routing.module';
import { DealerVehicleAssignPage } from './dealer-vehicle-assign.page';
import { IonicSelectableModule} from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IonicSelectableModule,
    FormsModule,
    ReactiveFormsModule,
    DealerAssignRouter,
  ],
  declarations: [
    DealerVehicleAssignPage,
    SearchDealerAssignPipe
  ],

})
export class DealerVehicleAssignPageModule {}