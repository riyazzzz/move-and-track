import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from "@ionic/angular";

@Component({
  selector: "app-warranty-expiry",
  templateUrl: "./warranty-expiry.page.html",
  styleUrls: ["./warranty-expiry.page.scss"],
})
export class WarrantyExpiryPage implements OnInit {
  validityForm: FormGroup;
  UpdateForm: FormGroup;
  simdetails: any;
  dateofpurchase: any;
  warrantyexpirydate: any;
  simcardno: any;
  value: any;
  hideSerialNo = false;
  myPlatform: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    public ajaxService: AjaxService,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService
  ) { }

  clear() {
    this.validityForm.reset();
    this.UpdateForm.reset();
  }

  onSubmit() {
    if (this.validityForm.value.imeino.toString().length != 15) {
      this.commonService.showConfirm("Enter the 15 Digit Imei Number");
      this.hideSerialNo = false;
    } else if (this.validityForm.valid) {
      const url =
        serverUrl.web +
        "/global/getWarrantyandSimcardno?imeino=" +
        this.validityForm.value.imeino;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        console.log(res);
        if (res.message != "invalid imei no") {
          this.hideSerialNo = true;
          this.simdetails = res;
          this.UpdateForm.patchValue({
            dateofpurchase: this.simdetails.dateofpurchase.trim(),
            warrantyexpirydate: this.simdetails.warrantyexpirydate.trim(),
            simcardno1: this.simdetails.simcardno1.trim(),
            simcardno2: this.simdetails.simcardno2.trim(),
            devicemodel: this.simdetails.device_model.trim(),
            agency: this.simdetails.agency.trim(),
            currentagency: this.simdetails.current_agency.trim(),
            previousagency: this.simdetails.previous_agency.trim(),
          });
        } else {
          this.hideSerialNo = false;
          this.commonService.showConfirm(res.message);
        }
      });
    } else {
      this.commonService.showConfirm("Enter the Imei Number");
      this.clear();
    }
  }

  async save() {
    const alert = await this.alertController.create({
      header: " Confirm",
      backdropDismiss: false,
      message: "Are you sure you want to Save?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => { },
        },
        {
          text: "Ok",
          handler: (data) => {
            this.saveMethod();
          },
        },
      ],
    });
    await alert.present();
  }

  saveMethod() {
    this.commonService.presentLoader();
    var data;
    if (
      this.UpdateForm.value.simcardno2 == null ||
      this.UpdateForm.value.simcardno2 == undefined
    ) {
      this.UpdateForm.value.simcardno2 = "";
    }

    data = {
      imeino: this.validityForm.value.imeino.toString(),
      warrantyexpirydate: this.UpdateForm.value.warrantyexpirydate,
      simcardno1: this.UpdateForm.value.simcardno1.toString(),
      simcardno2: this.UpdateForm.value.simcardno2.toString(),
      dateofpurchase: this.UpdateForm.value.dateofpurchase,
      device_model: this.UpdateForm.value.devicemodel,
      agency:
        this.UpdateForm.value.agency == null || ""
          ? ""
          : this.UpdateForm.value.agency.toString(),
      current_agency:
        this.UpdateForm.value.currentagency == null || ""
          ? ""
          : this.UpdateForm.value.currentagency.toString(),

      previous_agency:
        this.UpdateForm.value.previousagency == null || ""
          ? ""
          : this.UpdateForm.value.previousagency.toString(),
    };
    const url = serverUrl.web + "/global/saveWarrantyandSimcardno";
    this.ajaxService
      .ajaxPostWithString(url, JSON.stringify(data))
      .subscribe((res) => {
        this.commonService.dismissLoader();
        if (JSON.parse(res).message == "Sim Detail Updated Successfully") {
          this.commonService.showConfirm("Sim Detail Updated Successfully");
          this.clear();
        } else {
          this.commonService.showConfirm("Please Contact Support Team");
        }
      });
  }

  async deleteMethod() {
    if (this.validityForm.value.imeino.toString().length != 15) {
      this.commonService.showConfirm("Enter the 15 Digit Imei Number");
    } else if (this.validityForm.valid) {
      const alert = await this.alertController.create({
        header: " Confirm",
        backdropDismiss: false,
        message: "Are you sure you want to Delete?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => { },
          },
          {
            text: "Ok",
            handler: (data) => {
              this.delete();
            },
          },
        ],
      });
      await alert.present();
    }
  }

  delete() {
    const url =
      serverUrl.web +
      "/global/deleteImeinoFromInventory?imeino=" +
      this.validityForm.value.imeino;
    this.ajaxService.ajaxDeleteWithString(url).subscribe((res) => {
      if (res.message == "IMEI No Deleted Successfully") {
        this.commonService.showConfirm(res.message);
        this.clear();
      } else {
        this.commonService.showConfirm(res.message);
        this.clear();
      }
    });
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.validityForm = this.formBuilder.group({
      imeino: ["", Validators.required],
    });
    this.UpdateForm = this.formBuilder.group({
      dateofpurchase: ["", Validators.required],
      warrantyexpirydate: ["", Validators.required],
      simcardno1: ["", Validators.required],
      simcardno2: [""],
      devicemodel: [""],
      agency: [""],
      currentagency: [""],
      previousagency: [""],
    });
  }

  ionViewWillEnter() {
    this.validityForm.reset();
    this.UpdateForm.reset();
  }
}
