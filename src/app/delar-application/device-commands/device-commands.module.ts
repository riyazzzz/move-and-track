import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule} from 'ionic-selectable';
import { DeviceCommandsPageRoutingModule } from './device-commands-routing.module';

import { DeviceCommandsPage } from './device-commands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceCommandsPageRoutingModule,
    ReactiveFormsModule,
  IonicSelectableModule
],
  declarations: [DeviceCommandsPage]
})
export class DeviceCommandsPageModule {}
