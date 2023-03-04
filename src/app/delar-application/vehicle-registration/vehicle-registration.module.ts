import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { VehicleRegistrationPage } from './vehicle-registration.page';
import { VehicleRegistrationRoutingModule } from './vehicle-registration-routing/vehicle-registration-routing.module';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadModule,
    VehicleRegistrationRoutingModule
  ],
  declarations: [VehicleRegistrationPage]
})
export class VehicleRegistrationPageModule {}
