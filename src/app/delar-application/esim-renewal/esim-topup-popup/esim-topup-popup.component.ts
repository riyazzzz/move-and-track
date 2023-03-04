import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "esim-topup-popup",
  templateUrl: "./esim-topup-popup.component.html",
  styleUrls: ["./esim-topup-popup.component.scss"],
})
export class EsimTopupPopupComponent implements OnInit {
  @Input() value: any;
  requestForm: FormGroup;
  valid = [
    "1 Month",
    "2 Month",
    "3 Month",
    "4 Month",
    "5 Month",
    "6 Month",
    "7 Month",
    "8 Month",
    "9 Month",
    "10 Month",
    "11 Month",
  ];
  show: boolean;
  myPlatform: string;
  button: boolean = false;

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  createForm() {
    this.requestForm = this.formBuilder.group({
      validity: ["", Validators.required],
    });
  }

  submitBtn() {
    this.button = true;
    const arr = [];
    this.value.map((data) => {
      arr.push({ ...data, topupvalidity: this.requestForm.value.validity });
    });

    const url =
      serverUrl.web +
      "/esim/saveEsimTopupRequest?companyid=apm&dealerid=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      // if (res) {
      //   res((d) => {
      //     if (d.res.message == "Aleady Renewal") {
      //       this.commonService.showConfirm(
      //         "Unselect the Already Renewaled Data"
      //       );
      //     } else if (d.res.message == "Renewal Request Saved Successfully") {
      //       this.commonService.showConfirm(
      //         "Renewal Request Saved Successfully"
      //       );
      //       this.modalController.dismiss({
      //         data: "Renewal Request Saved Successfully",
      //       });
      //     }
      //   });
      // }

      if (res.message == "Topup Request Saved Successfully") {
        this.button = false;
        this.modalController.dismiss({
          data: res.message,
        });
      } else {
        this.commonService.showConfirm(res.data);
        this.modalController.dismiss();
        this.button = false;
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
