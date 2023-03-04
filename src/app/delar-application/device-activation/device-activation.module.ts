// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { DeviceActivationPageRoutingModule } from './device-activation-routing.module';

// import { DeviceActivationPage } from './device-activation.page';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule,
//     DeviceActivationPageRoutingModule
//   ],
//   declarations: [DeviceActivationPage]
// })
// export class DeviceActivationPageModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{HttpClientModule}from'@angular/common/http'
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceActivationPageRoutingModule } from './device-activation-routing.module';
// import {ProgressBarModule} from "angular-progress-bar";
import { DeviceActivationPage } from './device-activation.page';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FileUploadModule,
    DeviceActivationPageRoutingModule,
    // ProgressBarModule,
    HttpClientModule,
  ],
  declarations: [DeviceActivationPage]
})
export class DeviceActivationPageModule {}
