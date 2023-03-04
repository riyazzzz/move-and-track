import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AjaxService } from "../../services/ajax.service";
import { CommonService } from "../../services/common.service";
import { serverUrl } from "src/environments/environment";
import { AlertController, Platform } from "@ionic/angular";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-check-imei",
  templateUrl: "./check-imei.page.html",
  styleUrls: ["./check-imei.page.scss"],
})
export class CheckImeiPage implements OnInit {
  numberSearch: FormGroup;
  imeiMobileSearch = ["Imei Number", "Mobile Number", "Company"];
  imeino: "";
  selectedComp = "";
  reportData: any;
  myPlatform: any;
  holder = "Enter the Imei Number ";
  maxNum = 15;
  data: any;
  disabled = true;
  mobileNumber;
  companyName = [];
  hide_mob: boolean = true;
  show_select: boolean = false;
  showCompany: boolean = false;
  showList: any;
  commonData;
  displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  type: string;
  constructor(
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private location: Location,
    public platform: Platform,
    private formBuilder: FormBuilder
  ) {}

  closePage() {
    this.location.back();
  }

  async delete_imei(ImeiDetail, type) {
    const alert = await this.alertController.create({
      header: "Delete vehicle",
      backdropDismiss: false,
      inputs: [
        {
          name: "Password",
          type: "text",
          placeholder: "Enter dealer password",
        },
      ],
      message: "vehicle will be deleted",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "ok",
          handler: (data) => {
            if (
              data.Password.toLowerCase() == localStorage.password.toLowerCase()
            ) {
              this.commonService.presentLoader();
              if (type == "imei") {
                const url =
                  serverUrl.web +
                  "/global/delete/imei?imeiNo=" +
                  ImeiDetail.imei;
                this.ajaxService.ajaxDeleteWithString(url).subscribe((res) => {
                  console.log(res);
                  if (res.message == "success") {
                    this.reportData = "";
                    this.commonService.presentToast("Successfully deleted");
                    this.commonService.dismissLoader();
                  } else {
                    this.commonService.presentToast("contact support team");
                    this.commonService.dismissLoader();
                  }
                });
              } else if (type == "comp") {
                const url2 =
                  serverUrl.web +
                  "/global/delete/company?companyId=" +
                  ImeiDetail.companyId;
                this.ajaxService.ajaxDeleteWithString(url2).subscribe((res) => {
                  if (res.error.text == "deleted") {
                    this.getCompanyID();
                    this.showCompany = false;
                    this.commonService.presentToast("Deleted Successfully");
                    this.commonService.dismissLoader();
                  } else {
                    this.commonService.presentToast("Contact support team");
                    this.commonService.dismissLoader();
                  }
                  this.numberSearch.reset();
                });
              }
            } else {
              this.commonService.presentToast("dealer password is wrong");
            }
          },
        },
      ],
    });

    await alert.present();
  }

  submit() {
    if (this.numberSearch.value.commonNumber.length == 15) {
      const url =
        serverUrl.web +
        "/global/searchimei?imeiNo=" +
        this.numberSearch.value.commonNumber;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        this.reportData = res;
        this.numberSearch.reset();
        if (res.length == 0) {
          this.commonService.presentToast("Imei not available");
        }
      });
    } else if (
      this.numberSearch.value.commonNumber.length == 10 &&
      this.type == "mobile"
    ) {
      this.commonService.presentLoader();
      const url2 =
        serverUrl.web +
        "/global/searchcontact?contactNo=" +
        this.numberSearch.value.commonNumber;
      this.ajaxService.ajaxGet(url2).subscribe((res) => {
        if (res.contact == "-" || Object.keys(res).length == 0) {
          this.commonService.presentToast("Mobile number not available");
          this.mobileNumber = "";
          this.commonService.dismissLoader();
        } else {
          this.mobileNumber = res;
          this.commonService.dismissLoader();
        }
        this.numberSearch.reset();
      });
    } else if (this.show_select) {
      const url2 =
        serverUrl.web +
        "/global/searchCompany?companyId=" +
        this.numberSearch.value.commonNumber;
      this.ajaxService.ajaxGet(url2).subscribe((res) => {
        if (res) {
          this.showList = res;
          this.showCompany = true;
        } else {
          this.commonService.presentToast("Company not available");
        }
        this.numberSearch.reset();
      });
    } else {
      this.commonService.presentToast("please check the number");
    }
  }

  async deleteCompany(comp) {
    const alert = await this.alertController.create({
      header: "Delete company",
      backdropDismiss: false,
      inputs: [
        {
          name: "Password",
          type: "text",
          placeholder: "Enter dealer password",
        },
      ],
      message: "company will be deleted",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "ok",
          handler: (data) => {
            if (
              data.Password.toLowerCase() == localStorage.password.toLowerCase()
            ) {
              const url2 =
                serverUrl.web +
                "/global/delete/company?companyId=" +
                comp.companyId;
              this.ajaxService.ajaxDeleteWithString(url2).subscribe((res) => {
                if (res.error.text == "deleted") {
                  this.getCompanyID();
                  this.showCompany = false;
                  this.commonService.presentToast("Deleted Successfully");
                } else {
                  this.commonService.presentToast("Contact support team");
                }
                this.numberSearch.reset();
              });
            } else {
              this.commonService.presentToast("dealer password is wrong");
            }
          },
        },
      ],
    });

    await alert.present();
  }

  doInfinite(event) {
    //console.log("event trigger")
    setTimeout(() => {
      //console.log(this.commonData)
      this.displayData.push(
        ...this.commonData.slice(
          this.currentPage * this.displayCount,
          (this.currentPage + 1) * this.displayCount
        )
      );
      this.currentPage++;
      event.target.complete();
      if (this.displayData.length == this.commonData.length) {
        event.target.disabled = true;
      }
      //console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
  }
  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
      //console.log();
    } else {
      this.displayData = this.commonData;
    }
  }

  getCompanyID() {
    this.commonService.presentLoader();
    const url =
      serverUrl.web +
      "/global/getdealercompanylist?suffix=" +
      localStorage.getItem("companySuffix");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.commonData = res;
      this.companyName = res;
      this.commonService.dismissLoader();
      this.setDisplayData();
    });
  }

  getImeiMobileNumber(data) {
    this.mobileNumber = false;
    this.showCompany = false;
    this.reportData = "";
    this.hide_mob = true;
    this.show_select = false;
    this.numberSearch.reset();
    if (data.target.value == "Imei Number") {
      this.holder = "Enter the Imei Number ";
      this.maxNum = 15;
      this.mobileNumber = "";
    } else if (data.target.value == "Mobile Number") {
      this.type = "mobile";
      this.holder = "Enter the Mobile Number ";
      this.maxNum = 10;
      this.reportData = "";
    } else {
      this.type = "";
      this.maxNum = 0;
      this.hide_mob = false;
      this.show_select = true;
    }
  }

  ionViewWillEnter() {
    this.mobileNumber = "";
    this.reportData = "";
  }

  ngOnInit() {
    this.getCompanyID();
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.numberSearch = this.formBuilder.group({
      commonNumber: ["", Validators.required],
    });
  }
}
