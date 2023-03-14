import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { AddEsimCaStatusUpdateComponent } from "./add-esim-ca-status-update/add-esim-ca-status-update.component";
import { BulkstatusComponent } from "./bulkstatus/bulkstatus.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { CommentComponent } from "./comment/comment.component";
import { HistoryDetailsComponent } from "./history-details/history-details.component";
import { SimUpdateComponent } from "./sim-update/sim-update.component";

@Component({
  selector: "app-esim-ca-report",
  templateUrl: "./esim-ca-report.page.html",
  styleUrls: ["./esim-ca-report.page.scss"],
})
export class EsimCaReportPage implements OnInit {
  CAReportForm: FormGroup;
  show: boolean = false;
  showbutton: boolean = false;
  hideSerialNo = false;
  showDealer = false;
  showInvoice = false;
  data = "";
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
  carequestNo: any;
  checkbutton: boolean = true;
  myPlatform: any;

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

  clear(d?) {
    this.CAReportForm.patchValue({
      CaRequestNo: "",
      InvoiceNo: "",
      SerialNo: "",
    });
    this.hideSerialNo = true;
    this.show = false;
    this.showInvoice = false;
    this.showSerialNo = false;
    this.showInvoiceNumber = false;
    if (d == 1) {
      this.SearchData();
    }
  }

  reset() {
    this.CAReportForm.patchValue({
      SerialNo: "",
    });
  }

  resets() {
    this.CAReportForm.patchValue({
      InvoiceNo: "",
    });
  }

  getcalist() {
    var url =
      serverUrl.web +
      "/esim/getCaRequest?companyid=" +
      localStorage.getItem("corpId") +
      "&dealer=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.carequestNo = res;
    });
  }

  getCalist = (event: { component: IonicSelectableComponent; value: any }) => {
    if (event.value) this.CAReportForm.value.CaRequestNo = event.value;
    var url =
      serverUrl.web +
      "/esim/getDealerCAInvoice?companyid=" +
      localStorage.getItem("corpId") +
      "&dealer=" +
      localStorage.getItem("userName") +
      "&carequestid=" +
      this.CAReportForm.value.CaRequestNo;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Invoice = res;
      if (this.Invoice.length == 0) {
        this.showInvoiceNumber = false;
      } else {
        this.resets();
        this.showInvoiceNumber = true;
      }
    });
  };

  getinvoicelist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.CAReportForm.value.InvoiceNo = event.value;
    var url =
      serverUrl.web +
      "/esim/getInvoiceSerial?companyid=" +
      localStorage.getItem("corpId") +
      "&invoiceno=" +
      this.CAReportForm.value.InvoiceNo;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.SerialNo = res;
      if (this.SerialNo.length == 0) {
        this.showSerialNo = false;
      } else {
        this.reset();
        this.showSerialNo = true;
      }
    });
  };
  getseriallist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.CAReportForm.value.SerialNo = event.value;
  };

  createForm() {
    this.CAReportForm = this.formBuilder.group({
      CaRequestNo: ["", Validators.required],
      InvoiceNo: [""],
      SerialNo: [""],
    });
  }

  SearchData(d?) {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/esim/getDealerCARequestAll?companyid=" +
      localStorage.getItem("corpId") +
      "&carequestno=" +
      this.CAReportForm.value.CaRequestNo +
      "&invoiceno=" +
      this.CAReportForm.value.InvoiceNo.trim() +
      "&serialno=" +
      this.CAReportForm.value.SerialNo.trim();
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      if (res.length == 0) {
        this.commonService.showConfirm("CA Report not available");
        this.show = false;
      } else {
        if (d == 1) {
          this.commonService.showConfirm(this.data);
          this.data = undefined;
        }
        this.details = res[0];

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
              datafield: "carequestid",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 145,
            },
            {
              text: "Request Date",
              datafield: "carequestdate",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 145,
            },
            {
              text: "VLTD No",
              datafield: "vltdsno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 145,
            },
            {
              text: "Box No",
              datafield: "serialno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 145,
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
              width: 145,
            },
            {
              text: "SIM 1",
              datafield: "sim1",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 120,
            },
            {
              text: "SIM 2",
              datafield: "sim2",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 120,
            },
            {
              text: "Slot No",
              datafield: "slotno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 100,
            },
            {
              text: "Card Activated Date",
              datafield: "cardactivationdate",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 160,
            },
            {
              text: "Card End Date",
              datafield: "cardenddate",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 140,
            },
            {
              text: "Card Status",
              datafield: "cardstatus",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 130,
            },
            {
              text: "Validity Requested",
              datafield: "validityperiod",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
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
              datafield: "certificate",
              columntype: "button",
              cellsalign: "center",
              align: "center",
              width: 120,
              cellsrenderer: (): string => {
                return this.myPlatform == "desktop"
                  ? "BSNL Certificate"
                  : "<button>Certificate</button>";
              },
              buttonclick: (row): void => {
                this.CertificateModel(row);
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

            // {
            //   text: "",
            //   datafield: "Simupdate",
            //   columntype: "button",
            //   cellsalign: "center",
            //   align: "center",
            //   width: 120,
            //   cellsrenderer: (): string => {
            //     return this.myPlatform == "desktop"
            //       ? "Sim Update"
            //       : "<button>Sim Update</button>";
            //   },
            //   buttonclick: (row): void => {
            //     this.simModel(row);
            //   },
            // },
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
      }
    });
  }

  async viewModel(data?) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: AddEsimCaStatusUpdateComponent,
        cssClass: "statusform",
        componentProps: {
          value: this.selectedRow,
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

  async CertificateModel(row) {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CertificateComponent,
      cssClass: "validityform",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Certificate Created Successfully") {
        this.SearchData();
      }
    });
    return await modal.present();
  }

  async CommentModel(row) {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CommentComponent,
      cssClass: "commentform",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Esim CA Comment Saved Successfully") {
        this.SearchData();
      }
    });
    return await modal.present();
  }
  async simModel(row) {
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: SimUpdateComponent,
        cssClass: "simupdateform",
        componentProps: {
          value: this.selectedRow,
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
        component: HistoryDetailsComponent,
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
      });
    }
    const isModalOpened = await this.modalController.getTop();
    if (!isModalOpened) {
      const modal = await this.modalController.create({
        component: BulkstatusComponent,
        cssClass: "statusform",
        componentProps: {
          value: arr,
        },
      });
      modal.onDidDismiss().then((d) => {
        if (d.data.data == "Esim CA Status Saved Successfully") {
          this.SearchData(1);
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
      title: "Device CA Status Update Details",
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
    this.clear();
    this.getcalist();
    this.SearchData();
  }
}
