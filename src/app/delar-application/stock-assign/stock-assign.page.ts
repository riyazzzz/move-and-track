import {
  Component,
  OnInit,
  ViewChild,
  QueryList,
  ViewChildren,
  ElementRef,
} from "@angular/core";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import { DealerDetailsComponent } from "./dealer-details/dealer-details.component";

@Component({
  selector: "app-stock-assign",
  templateUrl: "./stock-assign.page.html",
  styleUrls: ["./stock-assign.page.scss"],
})
export class StockAssignPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  columns: any;
  myPlatform: any;
  selectedRow = [];
  tableData: any;
  type = "Assign";
  icon = "cloud-upload";
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  showList = [];
  companyList: any;
  showButton: boolean = false;
  page = [];

  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService
  ) {}
  typeSelector(data) {
    this.commonService.presentLoader();
    this.type = data;
    this.icon = "cloud-upload";
    const companySuffix = { suffix: "", mode: "stock" };
    if (this.type != "Assign") {
      companySuffix.mode = "revoke";
      this.icon = "cloud-download";
    }
    companySuffix.suffix = localStorage.getItem("companySuffix");
    const url = serverUrl.web + "/global/getImeiNoDetail";
    this.ajaxService.ajaxPostWithBody(url, companySuffix).subscribe((res) => {
      this.showList = res;
      this.commonService.dismissLoader();
      this.getDatas();
      this.myGrid.clearselection();
    });
  }

  async openModel() {
    if (this.type == "Assign") {
      var arr = [];
      for (let i = 0; i < this.selectedRow.length; i++) {
        arr.push(
          this.myGrid["attrSource"]["originaldata"][this.selectedRow[i]].imei
        );
      }

      const modal = await this.modalController.create({
        component: DealerDetailsComponent,
        componentProps: {
          value: this.companyList,
          value2: arr,
        },
      });
      modal.onDidDismiss().then((d) => {
        if (d.data == "Updated Successfully") {
          this.myGrid.clearselection();
          this.typeSelector(this.type);
        }
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
              for (let i = 0; i < this.selectedRow.length; i++) {
                const currentSuffix = localStorage.getItem("companySuffix");
                var data = {
                  fromDelar:
                    this.myGrid["attrSource"]["originaldata"][
                      this.selectedRow[i]
                    ].currentAgency,
                  toDelar:
                    this.myGrid["attrSource"]["originaldata"][
                      this.selectedRow[i]
                    ].previousAgency,
                  imeiNo: [
                    this.myGrid["attrSource"]["originaldata"][
                      this.selectedRow[i]
                    ].imei,
                  ],
                };
                const url = serverUrl.web + "/simcard/update/asset/manager";
                this.ajaxService.ajaxPostMethod(url, data).subscribe((res) => {
                  var responseData = res;
                  if (responseData.message == "updated") {
                    this.typeSelector(this.type);
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

  getDelar() {
    const suffix = localStorage.getItem("companySuffix");
    const companyUrl = serverUrl.web + "/global/getdealerlist?suffix=" + suffix;
    this.ajaxService.ajaxGet(companyUrl).subscribe((res) => {
      this.companyList = res;
    });
  }

  getDatas() {
    this.renderer = (row: number, column: any, value: string) => {
      if (value == "" || null || undefined || value == ",") {
        return "--";
      } else {
        return (
          '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
          value +
          "</span>"
        );
      }
    };

    this.source = { localdata: this.showList };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    if (this.type == "Assign") {
      this.columns = [
        {
          text: "IMEI No",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "SIM No",
          datafield: "simno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "VLTD No",
          datafield: "vltdsno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "Box No",
          datafield: "serialno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "Slot No",
          datafield: "slotno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
      ];
    } else {
      this.columns = [
        {
          text: "IMEI No",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "Dealer",
          datafield: "dealer",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "SIM No",
          datafield: "simno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "VLTD No",
          datafield: "vltdsno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "Box No",
          datafield: "serialno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
        {
          text: "Slot No",
          datafield: "slotno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 240,
        },
      ];
    }
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();

    if (this.selectedRow.length > 0) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.showList = [];
    this.companyList;
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.getDelar();
    this.typeSelector(this.type);
  }
}
