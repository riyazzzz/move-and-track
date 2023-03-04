import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';;
import { CustomCertificatePage } from './custom-certificate.page';
import {CreateCertificateComponent} from './create-certificate/create-certificate.component'
const routes: Routes = [
  {
    path: '',
    component: CustomCertificatePage
  },{
    path: 'create-certificates',
    component: CreateCertificateComponent,
    
  }
];

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomCertificatePage, CreateCertificateComponent]
})
export class CustomCertificatePageModule {}
