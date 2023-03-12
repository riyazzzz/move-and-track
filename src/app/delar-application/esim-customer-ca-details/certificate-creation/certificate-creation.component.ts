import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-certificate-creation",
  templateUrl: "./certificate-creation.component.html",
  styleUrls: ["./certificate-creation.component.scss"],
})
export class CertificateCreationComponent implements OnInit {
  certificatedetails: FormGroup;
  @Input() value: any;

  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}
  cancelBtn() {
    this.modalController.dismiss();
  }
  clear() {
    this.certificatedetails.patchValue({
      plateno: "",
      imei: "",
      engineno: "",
      chassisno: "",
      service: "",
    });
  }
  creatFrom() {
    this.certificatedetails = this.formBuilder.group({
      plateno: ["", Validators.required],
      imei: ["", Validators.required],
      engineno: ["", Validators.required],
      chassisno: ["", Validators.required],
      service: ["", Validators.required],
    });
  }

  getdetails() {
    this.certificatedetails.patchValue({
      plateno: this.value.plateno,
      imei: this.value.imei,
      engineno: this.value.engineno,
      chassisno: this.value.chassisno,
    });
  }
  submit() {
    var data = {
      imei: this.certificatedetails.value.imei,
      engineno: this.certificatedetails.value.engineno,
      chassisno: this.certificatedetails.value.chassisno,
      createdby: localStorage.getItem("userName"),
      serviceengineer: this.certificatedetails.value.service,
    };
    const url = serverUrl.web + "/global/saveCertificateDetails";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Certificate Saved Successfully") {
        this.modalController.dismiss({
          data: "Certificate Saved Successfully",
        });
        this.clear();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  ngOnInit() {
    this.creatFrom();
    if (Object.keys(this.value).length != 0) {
      console.log(this.value);
      this.getdetails();
    } else {
      // this.clear();
      this.value = {};
    }
  }
}
