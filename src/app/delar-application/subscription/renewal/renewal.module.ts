import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RenewalPageRoutingModule } from './renewal-routing.module';

import { RenewalPage } from './renewal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RenewalPageRoutingModule
  ],
  declarations: [RenewalPage]
})
export class RenewalPageModule {}
