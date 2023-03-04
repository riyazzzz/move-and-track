import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
})
export class CertificateComponent implements OnInit {
  @Input() value: any;
  requestForm: FormGroup;
  valid = ["1 Year", "2 Year", "3 Year"];
  show: boolean;
  myPlatform: string;
  button: boolean = false
  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) { }

  cancelBtn() {
    this.modalController.dismiss();
  }

  createForm() {
    this.requestForm = this.formBuilder.group({
      validity: ["", Validators.required],
    });
  }

  submitBtn() {
    this.button = true
    let data = {
      "dealerid": this.value.carequestby, "imei": this.value.imei, "vltdsno": this.value.vltdsno, "validityperiod": this.requestForm.value.validity, "createdby": localStorage.getItem('userName')
    }

    const url =
      serverUrl.web +
      "/esim/saveBSNLCertificatedetails";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Certificate Created Successfully") {
        this.commonService.showConfirm(res.message)
        this.modalController.dismiss({
          data: "Certificate Created Successfully",
        });
        this.button = false
      } else {
        this.commonService.showConfirm(res.message)
        this.modalController.dismiss({
          data: res.message,
        });
        this.button = false
      }
    });
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
  }

}
