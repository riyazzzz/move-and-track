import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';;
import { FileUploadModule } from 'ng2-file-upload';
import { IonicModule } from '@ionic/angular';
import { CreateCertificateComponent } from '../certificate/create-certificate/create-certificate.component'
import { CertificatePage } from './certificate.page';
import { QRCodeModule } from 'angular2-qrcode';
const routes: Routes = [
  {
    path: '',
    component: CertificatePage,
    
  }, {
    path: 'create-certificate',
    component: CreateCertificateComponent,
    
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FileUploadModule,
    QRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificatePage, CreateCertificateComponent]
})
export class CertificatePageModule {}
