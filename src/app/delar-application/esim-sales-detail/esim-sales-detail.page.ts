import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { EsimAddSaleComponent } from "./esim-add-sale/esim-add-sale.component";
import { EsimViewSerialDeatilsComponent } from "./esim-view-serial-deatils/esim-view-serial-deatils.component";

@Component({
  selector: "app-esim-sales-detail",
  templateUrl: "./esim-sales-detail.page.html",
  styleUrls: ["./esim-sales-detail.page.scss"],
})
export class EsimSalesDetailPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: any;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  isDeleteShow: any = true;
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
      "/esim/getEsimSalesAll?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      var detail = res;
      this.tableData = res;
      this.commonService.dismissLoader();
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined || value == ",") {
          return (
            '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
            "0" +
            "</span>"
          );
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
          text: "Invoice No",
          datafield: "invoiceno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 152,
        },
        {
          text: "Sales Distributor",
          datafield: "saledistributor",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 152,
        },
        {
          text: "Sales Date",
          datafield: "saledate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Slot No",
          datafield: "slotno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Total Box",
          datafield: "totalbox",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 152,
        },
        {
          text: "Sales Quantity",
          datafield: "totalquantity",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 152,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "View Detail",
          datafield: "View Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 125,
          cellsrenderer: (): string => {
            return "View Detail";
          },
          buttonclick: (row): void => {
            this.viewModel(row);
          },
        },
      ];
    });
  }
  async viewModel(row) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: EsimViewSerialDeatilsComponent,
        cssClass: "viewserialfrom",
        componentProps: {
          value: this.selectedRow,
        },
      });
      modal.onDidDismiss().then(() => {
        this.selectedRow = undefined;
      });
      return await modal.present();
    }
  }

  async openModel() {
    const modal = await this.modalController.create({
      component: EsimAddSaleComponent,
      cssClass: "saleform",
    });
    modal.onDidDismiss().then((d) => {
      this.selectedRow = undefined;
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }
      if (d.data.data == "Sales Details Added Succesfully") {
        this.getDatas();
      }
    });
    return await modal.present();
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
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
      title: "Esim Product Delivery Details",
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
