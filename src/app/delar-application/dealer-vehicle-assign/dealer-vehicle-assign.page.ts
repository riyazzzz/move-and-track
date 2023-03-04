import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { AjaxService } from "../../services/ajax.service";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { adminLocalStorage, serverUrl } from "src/environments/environment";
// import { ANY_STATE } from '@angular/animation/src/dsl/animation_transition_expr';
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-dealer-vehicle-assign",
  templateUrl: "./dealer-vehicle-assign.page.html",
  styleUrls: ["./dealer-vehicle-assign.page.scss"],
})
export class DealerVehicleAssignPage implements OnInit {
  searchInput: string;
  showList: any;
  answer = [];
  SalesDealer: any;
  assignedImei = [];
  showImeiList = [];
  companyID = "";
  dealerForm: FormGroup;
  checkedValues: any[];
  selectedArray = [];
  type = "Re-assign";
  icon = "cloud-upload";
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  myPlatform: string;
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    public platform: Platform
  ) {}
  updateAnswer(event, index, imei, imeiDetail) {
    if (event.currentTarget.checked == true) {
      if (this.type == "Assign") this.selectedArray.push(imeiDetail);
      else this.selectedArray.push(imeiDetail);
    } else {
      let index;
      if (this.type == "Assign") index = this.removeCheckedFromArray(imei);
      else index = this.removeCheckedFromArray(imei);
      this.selectedArray.splice(index, 1);
    }
    console.log(this.selectedArray);
  }

  getsalesDealer() {
    this.showList = [];
    this.selectedArray = [];

    var url =
      serverUrl.web + `/login/getSubDealer?companyid=${localStorage.corpId}`;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.SalesDealer = res;
    });
  }
  createForm() {
    this.dealerForm = this.formBuilder.group({
      salesDealer: ["", Validators.required],
    });
  }
  removeCheckedFromArray(checkbox: String) {
    return this.selectedArray.findIndex((category) => {
      return category === checkbox;
    });
  }

  Clear() {
    if (this.dealerForm.value.salesDealer != "") {
      this.dealerForm.reset();
      this.typeSelector(this.type);
    }
    this.uncheckAll();
  }

  async submit() {
    if (this.type == "Assign") {
      let text =
        "Are you sure? You want to unassign this stock to your company ";
      const alert = await this.alertController.create({
        header: "Unassign Dealer",
        backdropDismiss: false,
        message: text,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => {},
          },
          {
            text: "Confirm",
            handler: (confirm) => {
              var arr = [];
              for (let i = 0; i < this.selectedArray.length; i++) {
                arr.push({
                  vin: this.selectedArray[i].vin,
                  companyId: "apm-ca",
                  userId: localStorage.userName,
                });
              }
              const url = serverUrl.web + `/login/DeleteDealerVehicles`;
              this.ajaxService
                .ajaxPostWithString(url, JSON.stringify(arr))
                .subscribe((res) => {
                  var responseData = JSON.parse(res);
                  if (
                    responseData.message ==
                    "Dealer Vehicle UnAssigned Successfully"
                  ) {
                    this.typeSelector(this.type);
                    this.selectedArray = [];
                    this.uncheckAll();
                    this.commonService.presentToast("Updated Successfully");
                  } else {
                    this.commonService.showConfirm(responseData.message);
                  }
                });
            },
          },
        ],
      });
      await alert.present();
    } else {
      let text = "Are you sure? You want to assign this stock to your company ";
      const alert = await this.alertController.create({
        header: "Assign Dealer",
        backdropDismiss: false,
        message: text,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => {},
          },
          {
            text: "Confirm",
            handler: (confirm) => {
              var arr = [];
              for (let i = 0; i < this.selectedArray.length; i++) {
                arr.push({
                  vin: this.selectedArray[i].vin,
                  companyId: "apm-ca",
                  userId: localStorage.userName,
                });
              }
              const url = serverUrl.web + `/login/saveDealerVehicles`;
              // let saveData=JSON.stringify({"vin":this.selectedArray[i].plateno,"userId":localStorage.userName,"companyId":this.selectedArray[i].companyid})
              this.ajaxService
                .ajaxPostWithString(url, JSON.stringify(arr))
                .subscribe((res) => {
                  var responseData = JSON.parse(res);
                  if (
                    responseData.message ==
                    "Dealer Vehicle Assigned Successfully"
                  ) {
                    this.typeSelector(this.type);
                    this.selectedArray = [];
                    this.uncheckAll();
                    this.commonService.presentToast("Updated Successfully");
                  } else {
                    this.commonService.showConfirm(responseData.message);
                  }
                });
            },
          },
        ],
      });
      await alert.present();
    }
  }

  //Empties array with checkedboxes
  emptyCheckedArray() {
    this.selectedArray = [];
  }

  getCheckedBoxes() {
    console.log(this.selectedArray);
  }

  Submit() {
    this.typeSelector(this.type);
  }
  ionViewWillEnter() {
    this.showList = [];
    this.companyID = "";
    this.selectedArray = [];
    this.typeSelector(this.type);
  }
  typeSelector(data) {
    this.commonService.presentLoader();
    this.uncheckAll();
    this.type = data;
    this.icon = "cloud-upload";

    // https://mvt.apmkingstrack.com/fleettracking/login/getAssignedVehicles?companyid=apm&userid=apm-sa

    if (
      this.dealerForm.value.salesDealer == "" ||
      this.dealerForm.value.salesDealer == null
    ) {
      if (data == "Assign") {
        var url =
          serverUrl.web +
          `/login/getAssignedVehicles?userid=${localStorage.userName}`;
      } else {
        var url =
          serverUrl.web +
          `/login/getUnassignedVehicles?companyid=${localStorage.corpId}&userid=${localStorage.userName}`;
      }
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res) {
          this.commonService.dismissLoader();
          this.showList = res;
        }
      });
    } else {
      if (data == "Assign") {
        var param = "getAssignedCompanyVehicles";
        var query = ``;
        //  https://mvt.apmkingstrack.com/fleettracking/login/getAssignedVehicles?companyid=apm&userid=apm-sa
      } else {
        var param = "getUnassignedCompanyVehicles";
        var query = `companyid=${localStorage.corpId}&`;
      }
      const url =
        serverUrl.web +
        `/login/${param}?${query}userid=${localStorage.userName}&dealer=${this.dealerForm.value.salesDealer}`;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res) {
          this.commonService.dismissLoader();
          this.showList = res;
        }
      });
    }
  }

  uncheckAll() {
    for (let i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes["_results"][i].checked = false;
    }
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
    this.getsalesDealer();
  }
}
