import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { AddEsimRenewalStatusUpdateComponent } from "./add-esim-renewal-status-update/add-esim-renewal-status-update.component";
import { CommentComponent } from "./comment/comment.component";
import { RenewalBulkstatusComponent } from "./renewal-bulkstatus/renewal-bulkstatus.component";
import { RenewalHistoryDetailsComponent } from "./renewal-history-details/renewal-history-details.component";
import { SimUpdateComponent } from "./sim-update/sim-update.component";

@Component({
  selector: "app-esim-renewal-status-update",
  templateUrl: "./esim-renewal-status-update.page.html",
  styleUrls: ["./esim-renewal-status-update.page.scss"],
})
export class EsimRenewalStatusUpdatePage implements OnInit {
  RenewalReportForm: FormGroup;
  show: boolean = false;
  showbutton: boolean = false;
  hideSerialNo = false;
  showDealer = false;
  showInvoice = false;
  showSerialNo = false;
  showInvoiceNumber = false;
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("myGrid", { static: false }) myGrid: any;
  columns: any;
  tableData: any;
  selectedRow = [];
  Invoice: any;
  SerialNo: any;
  Dealer: any;
  dealername: any;
  details: any;
  renewalRequestNo: any;
  checkbutton: boolean = true;
  myPlatform: any;
  renewal: Number = 1;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private ete: ExportExcelService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.RenewalReportForm = this.formBuilder.group({
      RenewalRequestNo: ["", Validators.required],
    });
  }

  SearchData(d?) {
    if (d == undefined) {
      this.renewal = 1;
    } else {
      this.renewal = d;
    }
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/esim/getDealerRenewalRequestAll?renewalno=" +
      this.renewal +
      "&companyid=" +
      localStorage.getItem("corpId") +
      "&renewalrequestno=" +
      this.RenewalReportForm.value.RenewalRequestNo;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.commonService.dismissLoader();
      this.tableData = res;

      // if (res.length == 0) {
      //   this.commonService.showConfirm("Renewal Report not available");
      //   this.show = false;
      // } else {
      //   this.details = res[0];
      //   setTimeout(() => {

      //   }, 3000);
      this.show = true;

      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            "--" +
            "</span>"
          );
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
      this.myGrid.clearselection();
      if (localStorage.getItem("corpId") == "apm") {
        this.columns = [
          {
            text: "Request No",
            datafield: "renewalrequestid",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "VLTD No",
            datafield: "vltdsno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "Invoice No",
            datafield: "invoiceno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "ICCID No 1",
            datafield: "iccidno1",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "ICCID No 2",
            datafield: "iccidno2",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
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
            width: 110,
          },
          {
            text: "SIM 2",
            datafield: "sim2",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 110,
          },
          {
            text: "Plate No",
            datafield: "plateno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 100,
          },

          {
            text: "Contact No",
            datafield: "contactno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 110,
          },
          {
            text: "Validity Requested",
            datafield: "validityperiod",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 140,
          },

          {
            text: "Renewal Requested Date",
            datafield: "renewalrequestdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 170,
          },

          {
            text: "Renewal Requested by",
            datafield: "renewalrequestby",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "Previous Card Activation Date",
            datafield: "priviouscommercialactivationdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "Previous Card End Date",
            datafield: "priviouscardenddate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },
          {
            text: "Previous Card Status",
            datafield: "priviouscardstatus",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
          },

          {
            text: "Card Activation Date",
            datafield: "cardactivationdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 140,
          },
          {
            text: "Card End Date",
            datafield: "cardenddate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 100,
          },

          {
            text: "Card Status",
            datafield: "cardstatus",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 125,
          },
          {
            text: "Comment",
            datafield: "purcomment",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 90,
          },
          {
            text: "Created by",
            datafield: "createdby",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 90,
          },
          {
            text: "",
            datafield: "Status",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            width: 120,
            cellsrenderer: (): string => {
              return this.myPlatform == "desktop"
                ? "Status Update"
                : "<button>Status Update</button>";
            },
            buttonclick: (row): void => {
              this.viewModel();
            },
          },
          {
            text: "",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            width: 120,
            cellsrenderer: (): string => {
              return this.myPlatform == "desktop"
                ? "Comments"
                : "<button>Comments</button>";
            },
            buttonclick: (row): void => {
              this.CommentModel(row);
            },
          },
          {
            text: "",
            datafield: "Simupdate",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            width: 120,
            cellsrenderer: (): string => {
              return this.myPlatform == "desktop"
                ? "Sim Update"
                : "<button>Sim Update</button>";
            },
            buttonclick: (row): void => {
              this.SimModel(row);
            },
          },
          {
            text: "",
            datafield: "history",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            width: 120,
            cellsrenderer: (): string => {
              return this.myPlatform == "desktop"
                ? "Status History"
                : "<button>Status History</button>";
            },
            buttonclick: (row): void => {
              this.openModel(row);
            },
          },
        ];
      }
    });
  }

  async viewModel(data?) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: AddEsimRenewalStatusUpdateComponent,
        cssClass: "statusform",
        componentProps: {
          value: this.selectedRow,
          renewal: this.renewal,
        },
      });
      console.log(this.selectedRow);
      modal.onDidDismiss().then((data) => {
        this.selectedRow = undefined;
        this.myGrid.clearselection();
        if (data.data.data == "saved success") {
          this.SearchData();
        }
      });
      return await modal.present();
    }
  }

  async CommentModel(row) {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CommentComponent,
      cssClass: "commentform",
      componentProps: {
        value: this.selectedRow,
        renewal: this.renewal,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Esim Renewal Comment Saved Successfully") {
        this.SearchData();
      }
    });
    return await modal.present();
  }

  async SimModel(row) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: SimUpdateComponent,
        cssClass: "simupdateform",
        componentProps: {
          value: this.selectedRow,
          renewal: this.renewal,
        },
      });
      modal.onDidDismiss().then((data) => {
        if (data.data.data == "Changed Successfully") {
          this.SearchData();
        }
      });
      return await modal.present();
    }
  }

  async openModel(row) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: RenewalHistoryDetailsComponent,
        cssClass: "viewserialfrom",
        componentProps: {
          value: this.selectedRow,
        },
      });
      modal.onDidDismiss().then(() => {});
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
        createdby:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].createdby,
        renewalno: this.renewal.toString(),
      });
    }
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: RenewalBulkstatusComponent,
        cssClass: "statusform",
        componentProps: {
          value: arr,
        },
      });
      modal.onDidDismiss().then((d) => {
        if (d.data.data == "Esim Renewal Status Saved Successfully") {
          this.SearchData();
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
      title: "Device Renewal Status Update",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ionViewWillEnter() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }

    this.SearchData();
  }
}
