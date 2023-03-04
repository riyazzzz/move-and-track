import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-renewal-request",
  templateUrl: "./renewal-request.component.html",
  styleUrls: ["./renewal-request.component.scss"],
})
export class RenewalRequestComponent implements OnInit {
  @Input() value: any;
  requestForm: FormGroup;
  valid = ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year"];
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
    this.commonService.presentLoader();
    this.button = true
    const arr = [];
    this.value.map((data) => {
      arr.push({ ...data, validityperiod: this.requestForm.value.validity });
    });

    const url =
      serverUrl.web +
      "/esim/saveEsimRenewalRequest?companyid=apm&branchid=apm&dealerid=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      if (res.message == "Renewal Request Saved Successfully") {
        this.modalController.dismiss({
          data: "Renewal Request Saved Successfully",
        });
        this.button = false
      } else {
        this.commonService.showConfirm(res.message)
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
