import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { EsimAddProductionComponent } from "./esim-add-production/esim-add-production.component";
import { EsimViewProductionComponent } from "./esim-view-production/esim-view-production.component";

@Component({
  selector: "app-esim-production-detail",
  templateUrl: "./esim-production-detail.page.html",
  styleUrls: ["./esim-production-detail.page.scss"],
})
export class EsimProductionDetailPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  columns: any;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  page = [];

  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private ete: ExportExcelService
  ) {}

  getDatas() {
    this.page = [];
    this.commonService.presentLoader();
    const url =
      serverUrl.web +
      "/esim/getEsimProductionAll?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      var detail = res;
      this.tableData = res;
      this.commonService.dismissLoader();
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined || value == ",") {
          return "---";
        } else {
          return (
            '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
            value +
            "</span>"
          );
        }
      };

      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: "Box Number",
          datafield: "serialno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 255,
        },
        {
          text: "Quantity",
          datafield: "qty",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 255,
        },
        {
          text: "Date",
          datafield: "date",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 255,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 255,
        },
        {
          text: "View Detail",
          datafield: "View Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 160,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "View Details"
              : "<button>View Details</button>";
          },
          buttonclick: (row): void => {
            this.viewModel(row);
          },
        },
      ];
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }
  async viewModel(row) {
    const modal = await this.modalController.create({
      component: EsimViewProductionComponent,
      cssClass: "viewform",
      componentProps: {
        value: this.selectedRow.serialno,
      },
    });
    modal.onDidDismiss().then(() => {
      this.selectedRow = undefined;
    });
    return await modal.present();
  }

  async openModel() {
    const modal = await this.modalController.create({
      component: EsimAddProductionComponent,
      cssClass: "tranportform",
    });
    modal.onDidDismiss().then((data) => {
      console.log(data.data.data);
      if (data.data.data == "Box Detail Added Succesfully") {
        this.getDatas();
      }
    });
    return await modal.present();
  }

  newfunc() {
    let data = this.tableData;
    console.log(this.myGrid);

    let coloumnArray = [];

    this.myGrid.attrColumns.map((p) => {
      coloumnArray.push(p.datafield);
    });

    for (let i = 0; i < data.length; i++) {
      let k = Object.keys(data[i]);
      for (let j = 0; j < k.length; j++) {
        if (coloumnArray.includes(k[j]) == false) {
          delete data[i][k[j].toString()];
        }
      }
    }

    let forExcel = [];
    data.map((val) => {
      let newArray = Object.values(val);
      forExcel.push(newArray);
    });

    var Header = Object.keys(data[0]);

    let reportData = {
      title: "Esim Production Details",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
  }
  ionViewWillEnter() {
    this.getDatas();
  }
}
