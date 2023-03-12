import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { BulkExtendComponent } from "./bulk-extend/bulk-extend.component";
import { ExtendCommentComponent } from "./extend-comment/extend-comment.component";

@Component({
  selector: "app-device-extend-status-update",
  templateUrl: "./device-extend-status-update.page.html",
  styleUrls: ["./device-extend-status-update.page.scss"],
})
export class DeviceExtendStatusUpdatePage implements OnInit {
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("myGrid", { static: false })
  myGrid: jqxGridComponent;
  columns: any;
  dataString: any;
  tableData: any;
  detail: any;
  data = "";
  show: boolean = false;
  selectedRow: any;
  myPlatform: any;
  checkbutton: boolean = true;

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private modalController: ModalController,
    public platform: Platform,
    private ete: ExportExcelService
  ) {}

  getdatas() {
    this.commonService.presentLoader();

    var url =
      serverUrl.web +
      "/esim/getDealerExtendOneYearRequestAll?companyid=apm" +
      "&extendoneyearrequestno=";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();

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
          text: "Request No",
          datafield: "renewalrequestid",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 120,
        },
        {
          text: "VLTD No",
          datafield: "vltdsno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "Invoice No",
          datafield: "invoiceno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 120,
        },
        {
          text: "ICCID No",
          datafield: "iccidno1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "IMEI No",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "SIM 1",
          datafield: "sim1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "SIM 2",
          datafield: "sim2",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "Plate No",
          datafield: "plateno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "Contact No",
          datafield: "contactno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },

        {
          text: "Extend 1 Yr Requested",
          datafield: "validityperiod",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "Extend 1 Yr Requested Date",
          datafield: "renewalrequestdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Requested By",
          datafield: "renewalrequestby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },

        {
          text: "Extend 1 Yr Date",
          datafield: "cardactivationdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },

        {
          text: "Extend 1 Yr Status",
          datafield: "cardstatus",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "Comment",
          datafield: "comment",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 130,
        },
        {
          text: "",
          datafield: "topup",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 127,
          cellsrenderer: (): string => {
            return "Status Update";
          },
          buttonclick: (row): void => {
            this.openModel(row);
          },
        },
      ];
    });
  }

  async openModel(row) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: ExtendCommentComponent,
        cssClass: "commentform",
        componentProps: {
          value: this.selectedRow,
        },
      });
      modal.onDidDismiss().then((data) => {
        if (data.data.data == "Extend One Year Status Updated Successfully") {
          this.getdatas();
        }
      });
      return await modal.present();
    }
  }

  async bulkstatusModel(row) {
    let selectdata = this.myGrid.getselectedrowindexes();
    var arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        iccidno:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1,
        validityperiod:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]]
            .validityperiod,
        createdby:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].createdby,
      });
    }
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: BulkExtendComponent,
        cssClass: "statusform",
        componentProps: {
          value: arr,
        },
      });
      modal.onDidDismiss().then((d) => {
        if (d.data.data == "Extend One Year Status Updated Successfully") {
          this.myGrid.clearselection();
          this.getdatas();
          this.data = d.data.data;
        }
      });
      return await modal.present();
    }
  }

  myGridOnRowclick(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();

    if (this.selectedRow.length > 0) {
      this.checkbutton = false;
    } else {
      this.checkbutton = true;
    }
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
      title: "Device Extend One Year Status Update",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }
  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
  }
  ionViewWillEnter() {
    this.getdatas();
  }
}
