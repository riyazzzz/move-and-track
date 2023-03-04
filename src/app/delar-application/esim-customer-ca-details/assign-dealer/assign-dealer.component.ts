import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import { DealerlistComponent } from "../dealerlist/dealerlist.component";

@Component({
  selector: "app-assign-dealer",
  templateUrl: "./assign-dealer.component.html",
  styleUrls: ["./assign-dealer.component.scss"],
})
export class AssignDealerComponent implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  tableData = [];
  selectedArray = [];
  @Input() value;
  type = "Assign";
  companyList: any;
  icon = "cloud-upload";
  showList: any;
  selectedRow: any;
  show: boolean = false;
  data = "";

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private alertController: AlertController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  getdata() {
    const arr = [];
    this.value.map((data) => {
      arr.push({ ...data });
    });
    const url = serverUrl.web + "/esim/getAssignimei";
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      this.tableData = res;
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return "--";
        } else {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            value +
            "</span>"
          );
        }
      };
      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: "IMEI No",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Assign Dealer",
          datafield: "assigndealer",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "",
          datafield: "status",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 130,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Remove"
              : "<button>Remove</button>";
          },
          buttonclick: (row): void => {
            this.delete(row);
          },
        },
      ];
    });
  }

  delete(row) {
    this.tableData.splice(row, 1);
    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }

  getdealer() {
    const suffix = localStorage.getItem("companySuffix");
    const companyUrl = serverUrl.web + "/global/getdealerlist?suffix=" + suffix;
    this.ajaxService.ajaxGet(companyUrl).subscribe((res) => {
      this.companyList = res;
    });
  }

  async openModel() {
    if (this.type == "Assign") {
      this.modalController.dismiss();
      const modal = await this.modalController.create({
        component: DealerlistComponent,
        componentProps: {
          value: this.companyList,
          value2: this.tableData,
        },
      });
      modal.onDidDismiss().then((data) => {
        if (data.data.data == "Stock Assigned Successfully") {
          this.modalController.dismiss();
          this.commonService.data(data.data.data);
        }
      });
      return await modal.present();
    }
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.getdata();
    this.getdealer();
  }
}
