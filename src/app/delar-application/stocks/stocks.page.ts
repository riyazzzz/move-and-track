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
import { CompanylistComponent } from "./companylist/companylist.component";
import { AlertController, ModalController } from "@ionic/angular";
@Component({
  selector: "app-stocks",
  templateUrl: "./stocks.page.html",
  styleUrls: ["./stocks.page.scss"],
})
export class StocksPage implements OnInit {
  searchInput: string;
  showList: any;
  answer = [];
  assignedImei = [];
  showImeiList = [];
  companyID = "";
  checkedValues: any[];
  companyList;
  selectedArray = [];
  type = "Assign";
  icon = "cloud-upload";
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  constructor(
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private alertController: AlertController
  ) {}
  updateAnswer(event, index, imei, imeiDetail) {
    if (event.currentTarget.checked == true) {
      if (this.type == "Assign") this.selectedArray.push(imei);
      else this.selectedArray.push(imeiDetail);
    } else {
      let index;
      if (this.type == "Assign") index = this.removeCheckedFromArray(imei);
      else index = this.removeCheckedFromArray(imeiDetail.imei);
      this.selectedArray.splice(index, 1);
    }
    console.log(this.selectedArray);
  }

  async openModel() {
    if (this.type == "Assign") {
      const modal = await this.modalController.create({
        component: CompanylistComponent,
        componentProps: {
          value: this.companyList,
          value2: this.selectedArray,
        },
      });
      modal.onDidDismiss().then(() => {
        this.selectedArray = [];
        this.typeSelector(this.type);
        this.uncheckAll();
      });
      return await modal.present();
    } else {
      let text =
        "Are you sure? You want to re-assign this stock to your company ";
      const alert = await this.alertController.create({
        header: "Assign Stock",
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
              for (let i = 0; i < this.selectedArray.length; i++) {
                const currentSuffix = localStorage.getItem("companySuffix");
                var data = {
                  fromDelar: this.selectedArray[i].currentAgency,
                  toDelar: this.selectedArray[i].previousAgency,
                  imeiNo: [this.selectedArray[i].imei],
                };
                const url = serverUrl.web + "/simcard/update/asset/manager";
                this.ajaxService.ajaxPostMethod(url, data).subscribe((res) => {
                  var responseData = res;
                  if (responseData.message == "updated") {
                    this.typeSelector(this.type);
                    this.selectedArray = [];
                    this.uncheckAll();
                    this.commonService.presentToast("Updated Successfully");
                  } else if (responseData.message == "Error") {
                    this.commonService.presentToast("Reassign error");
                  }
                });
              }
            },
          },
        ],
      });
      await alert.present();
    }
  }

  removeCheckedFromArray(checkbox: String) {
    return this.selectedArray.findIndex((category) => {
      return category === checkbox;
    });
  }

  //Empties array with checkedboxes
  emptyCheckedArray() {
    this.selectedArray = [];
  }

  getCheckedBoxes() {
    console.log(this.selectedArray);
  }

  assign() {
    if (this.companyID != "" && this.selectedArray.length > 0) {
      const currentSuffix = localStorage.getItem("companySuffix");

      var data = {
        formDelar: currentSuffix,
        toDelar: this.companyID + "",
        imeiNo: this.selectedArray,
      };
      const url = serverUrl.web + "/simcard/update/asset/manager";
      this.ajaxService.ajaxPostMethod(url, data).subscribe((res) => {
        var responseData = JSON.parse(res);
        if (responseData.message == "updated") {
          this.router.navigateByUrl("/dashboard");
          this.commonService.presentToast("Updated Successfully");
        }
      });
    } else {
      this.commonService.presentToast("Please Select the Company");
    }
  }
  getImeiList() {
    // const companySuffix = {suffix:''};
    // companySuffix.suffix = localStorage.getItem('companySuffix');
    // const url = serverUrl.web + '/api/vts/superadmin/device/' + JSON.stringify(companySuffix);
    // this.ajaxService.ajaxGet(url)
    // .subscribe(res => {
    //   this.showList = res;
    //   for(var i=0;i<this.showList.length;i++){
    //     this.showImeiList.push(this.showList[i].imei)

    //   }
    // });

    this.showList = JSON.parse(adminLocalStorage.dealerLoginData).assets[
      "Stocks"
    ];
  }
  getDelar() {
    const suffix = localStorage.getItem("companySuffix");
    const companyUrl = serverUrl.web + "/global/getdealerlist?suffix=" + suffix;
    this.ajaxService.ajaxGet(companyUrl).subscribe((res) => {
      this.companyList = res;
    });
  }
  ionViewWillEnter() {
    this.showList = [];
    this.companyList;
    this.companyID = "";
    this.selectedArray = [];
    this.getImeiList();
    this.getDelar();
    this.typeSelector(this.type);
  }
  typeSelector(data) {
    this.commonService.presentLoader();
    this.uncheckAll();
    this.type = data;
    this.icon = "cloud-upload";
    const companySuffix = { suffix: "21", mode: "stock" };
    if (this.type != "Assign") {
      companySuffix.mode = "revoke";
      this.icon = "cloud-download";
    }
    companySuffix.suffix = localStorage.getItem("companySuffix");
    const url = serverUrl.web + "/global/getImeiNoDetails";
    this.ajaxService.ajaxPostWithBody(url, companySuffix).subscribe((res) => {
      this.showList = res;
      this.commonService.dismissLoader();
    });
  }

  uncheckAll() {
    for (let i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes["_results"][i].checked = false;
    }
  }

  ngOnInit() {}
}
