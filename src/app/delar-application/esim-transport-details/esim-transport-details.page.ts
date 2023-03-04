import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { AddTransportDetailsComponent } from "./add-transport-details/add-transport-details.component";

@Component({
  selector: "app-esim-transport-details",
  templateUrl: "./esim-transport-details.page.html",
  styleUrls: ["./esim-transport-details.page.scss"],
})
export class EsimTransportDetailsPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  show: boolean;
  page = [];

  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private ete: ExportExcelService
  ) {}

  getDatas(d?) {
    this.page = [];
    this.commonService.presentLoader();
    var url = serverUrl.web + "/esim/getAllEsimTrasnsportDetails";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.page = ["100", "200", "500", "1000"];
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

      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: "Dealer",
          datafield: "dealer",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 158,
        },
        {
          text: "Invoice No",
          datafield: "invoiceno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Transport No",
          datafield: "transportno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Transport Date",
          datafield: "transportdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 158,
        },
        {
          text: "Transport Amount",
          datafield: "transportamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 158,
        },
        {
          text: "",
          datafield: "View Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 123,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Edit"
              : "<button>Edit</button>";
          },
          buttonclick: (row): void => {
            this.viewModel();
          },
        },
        {
          text: "",
          datafield: "download",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 123,
          cellsrenderer: (): string => {
            return "Download";
          },
          buttonclick: (row): void => {
            this.Download(row);
          },
        },
      ];
    });
  }

  Download(row) {
    if (this.selectedRow.uploaddocument != null) {
      const link = document.createElement("a");
      link.href = this.selectedRow.uploaddocument;
      link.target = "_blank";
      link.click();
    } else {
      this.commonService.showConfirm("Invoice Document Not Uploaded");
    }
  }

  async viewModel(data?) {
    const modal = await this.modalController.create({
      component: AddTransportDetailsComponent,
      cssClass: "tranportform",
      componentProps: {
        value: data == "add" ? {} : this.selectedRow,
      },
    });
    console.log(this.selectedRow);
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "saved success") {
        this.getDatas();
        this.myGrid.clearselection();
      }
    });

    return await modal.present();
  }

  myGridOnRowSelect(event: any): void {
    console.log(event.args.row);
    this.selectedRow = event.args.row.bounddata;
    this.show = true;
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
      title: "Device Transport Details",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ngOnInit(): void {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
  }

  ionViewWillEnter() {
    this.getDatas();
  }
}
