import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { AjaxService } from "../../../services/ajax.service";
import { Router } from "@angular/router";
import { CommonService } from "../../../services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-dealerlist",
  templateUrl: "./dealerlist.component.html",
  styleUrls: ["./dealerlist.component.scss"],
})
export class DealerlistComponent implements OnInit {
  @Input() value;
  @Input() value2;
  companyList;
  selectedArray = [];
  searchInput: string;
  showList: any;
  answer = [];
  assignedImei = [];
  showImeiList = [];
  companyID = "";
  checkedValues: any[];

  show: boolean = false;
  constructor(
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private alertController: AlertController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  removeCheckedFromArray(checkbox: String) {
    return this.selectedArray.findIndex((category) => {
      return category === checkbox;
    });
  }

  updateAnswer(event, index, name, company) {
    this.companyID = name;
    this.assign(company.name);
  }

  async assign(name) {
    let imei = [];
    this.value2.map((d) => imei.push(d.imei));

    let text =
      "Are you sure? You want to add this stock to this company " + name;
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
            const currentSuffix = localStorage.getItem("companySuffix");
            var data = {
              fromDelar: currentSuffix,
              toDelar: this.companyID.toString() + "",
              imeiNo: imei,
            };
            const url = serverUrl.web + "/simcard/update/asset/manager";
            this.ajaxService.ajaxPostMethod(url, data).subscribe((res) => {
              var responseData = res;
              if (responseData.message == "updated") {
                this.modalController.dismiss({
                  data: "Stock Assigned Successfully",
                });
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    this.companyList = this.value;
  }
}
