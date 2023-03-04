import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotpassModalPage } from '../login/forgotpass-modal/forgotpass-modal.page';
import { LoginPage } from './login.page';
import { StudentLoginComponent } from '../parent-app/student-login/student-login.component';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

const fPassModal: Routes = [
  {
    path: '',
    component: ForgotpassModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(fPassModal)
  ],
  declarations: [LoginPage, ForgotpassModalPage, StudentLoginComponent],
  entryComponents: []
})
export class LoginPageModule {}
export class ForgotpassModalPageModule {}
