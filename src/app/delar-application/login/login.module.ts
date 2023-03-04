import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageRoutingModule } from './login-routing.module';
import { ForgotpassdealerComponent} from '../login/forgotpassdealer/forgotpassdealer.component'
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [LoginPage,ForgotpassdealerComponent],
  entryComponents: [ForgotpassdealerComponent]
})
export class LoginPageModule {}
