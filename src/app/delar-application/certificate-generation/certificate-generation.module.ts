import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CertificateGenerationPage } from "./certificate-generation.page";
import { SharedModModule } from "src/app/shared-mod/shared-mod.module";
import { AddCertificateComponent } from "./add-certificate/add-certificate.component";
import { QRCodeModule } from "angular2-qrcode";

const routes: Routes = [
  {
    path: "",
    component: CertificateGenerationPage,
  },
  {
    path: "add-certificate",
    component: AddCertificateComponent,
  },
];

@NgModule({
  imports: [
    SharedModModule,
    QRCodeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CertificateGenerationPage, AddCertificateComponent],
})
export class CertificateGenerationPageModule {}
