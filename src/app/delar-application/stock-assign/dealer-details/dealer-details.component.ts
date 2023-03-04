import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-dealer-details",
  templateUrl: "./dealer-details.component.html",
  styleUrls: ["./dealer-details.component.scss"],
})
export class DealerDetailsComponent implements OnInit {
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

  async closeModal() {
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
              imeiNo: this.value2,
            };
            const url = serverUrl.web + "/simcard/update/asset/manager";
            this.ajaxService.ajaxPostMethod(url, data).subscribe((res) => {
              var responseData = res;
              if (responseData.message == "updated") {
                this.commonService.presentToast("Updated Successfully");
                this.modalController.dismiss("Updated Successfully");
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
