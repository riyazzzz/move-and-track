import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";
import { DetailsComponent } from "./details/details.component";
import { PayDetailsComponent } from "./pay-details/pay-details.component";
import { PdfLogoService } from "src/app/services/pdf-logo.service";
import { ExportExcelService } from "src/app/services/export-excel.service";

@Component({
  selector: "app-esim-purchase-details",
  templateUrl: "./esim-purchase-details.page.html",
  styleUrls: ["./esim-purchase-details.page.scss"],
})
export class EsimPurchaseDetailsPage implements OnInit {
  PurchaseForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: any;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
  button: boolean = false;
  tableData: any;
  show: boolean = false;
  service: any;
  public uploader: FileUploader = new FileUploader({});
  paydetail: any;
  editdetail: any;
  hideSerialNo: boolean = false;
  maxDate;
  today = new Date();

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private pdfLogoService: PdfLogoService,
    private ete: ExportExcelService
  ) {}

  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.hideSerialNo = false;
    this.PurchaseForm.patchValue({
      serviceprovider: "",
      invoicenumber: "",
      invoiceamount: "",
      totalquantity: "",
      invoicedate: today,
      invoicedocument: "",
    });

    this.uploader.queue.length = 0;
    console.log(this.PurchaseForm);
  }

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.PurchaseForm = this.formBuilder.group({
      serviceprovider: ["", Validators.required],
      invoicenumber: ["", Validators.required],
      invoicedate: [today, Validators.required],
      invoiceamount: ["", Validators.required],
      totalquantity: ["", Validators.required],
      invoicedocument: [""],
    });
  }

  async add() {
    this.button = true;
    this.commonService.presentLoader();
    const file = this.uploader;
    var data;
    data = {
      headerid: "",
      serviceprovider: this.PurchaseForm.value.serviceprovider,
      invoiceno: this.PurchaseForm.value.invoicenumber.toString(),
      invoicedate: this.PurchaseForm.value.invoicedate.toString(),
      totalquantity: this.PurchaseForm.value.totalquantity.toString(),
      invoiceamount: this.PurchaseForm.value.invoiceamount.toString(),
      createdby: localStorage.getItem("userName"),
    };

    const testData: FormData = new FormData();

    if (file.queue.length != 0) {
      testData.append("invoicedocument", file.queue[0]._file);
      testData.append("data", JSON.stringify(data));
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("invoicedocument", default_file);
      testData.append("data", JSON.stringify(data));
    }

    const url = serverUrl.web + "/esim/saveEsimPurchaseInvoiceHeader";
    this.ajaxService.ajaxPostWithFile(url, testData).subscribe((res) => {
      if (res) {
        this.commonService.dismissLoader();
      }
      if (res.message == "Purchase Invoice Saved Successfully") {
        this.commonService.showConfirm("Purchase Invoice Saved Successfully");
        this.clear();
        this.tableData = res;
        this.button = false;
        this.myGrid.clearselection();
        this.getdatas();
      } else if (
        res.message == "Purchase Invoice Detail Not Saved Successfully"
      ) {
        this.commonService.showConfirm(
          "Purchase Invoice Detail Not Saved Successfully"
        );
        this.button = false;
      } else {
        this.button = false;
        this.commonService.showConfirm("Invoice No is already persiste");
      }
    });
  }

  async edit() {
    this.button = true;
    this.commonService.presentLoader();
    const file = this.uploader;
    var data;
    data = {
      headerid: this.selectedRow.headerid.toString(),
      serviceprovider: this.PurchaseForm.value.serviceprovider,
      invoiceno: this.PurchaseForm.value.invoicenumber.toString(),
      invoicedate: this.PurchaseForm.value.invoicedate.toString(),
      totalquantity: this.PurchaseForm.value.totalquantity.toString(),
      invoiceamount: this.PurchaseForm.value.invoiceamount.toString(),
      createdby: localStorage.getItem("userName"),
    };

    const testData: FormData = new FormData();

    if (file.queue.length != 0) {
      testData.append("invoicedocument", file.queue[0]._file);
      testData.append("data", JSON.stringify(data));
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("invoicedocument", default_file);
      testData.append("data", JSON.stringify(data));
    }

    const url = serverUrl.web + "/esim/saveEsimPurchaseInvoiceHeader";
    this.ajaxService.ajaxPostWithFile(url, testData).subscribe((res) => {
      if (res) {
        this.commonService.dismissLoader();
      }
      if (res.message == "Purchase Invoice Saved Successfully") {
        this.commonService.showConfirm("Purchase Invoice Saved Successfully");
        this.clear();
        this.tableData = res;
        this.getdatas();
        this.myGrid.clearselection();
      } else if (
        res.message == "Purchase Invoice Detail Not Saved Successfully"
      ) {
        this.button = false;
        this.commonService.showConfirm(
          "Purchase Invoice Detail Not Saved Successfully"
        );
        this.button = false;
      } else {
        this.button = false;
        this.commonService.showConfirm("Invoice No is already persiste");
      }
    });

    this.hideSerialNo = false;
  }

  setValue() {
    this.button = false;
    this.hideSerialNo = true;
    this.PurchaseForm.patchValue({
      serviceprovider: this.selectedRow.serviceprovider,
      invoicenumber: this.selectedRow.invoiceno,
      invoicedate: this.selectedRow.invoicedate,
      totalquantity: this.selectedRow.totalquantity,
      invoiceamount: this.selectedRow.invoiceamount,
    });
  }
  getdatas() {
    this.commonService.presentLoader();
    var url = serverUrl.web + "/esim/getAllEsimInvoice";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            0 +
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
      this.columns = [
        {
          text: "Service Provider",
          datafield: "serviceprovider",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 120,
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
          text: "Invoice Date",
          datafield: "invoicedate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 98,
        },
        {
          text: "Invoice Amount",
          datafield: "invoiceamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 112,
        },
        {
          text: "Total Paid Amount",
          datafield: "totalamountpaid",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 135,
        },
        {
          text: "Balance Amount",
          datafield: "balanceamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 125,
        },
        {
          text: "Total Quantity",
          datafield: "totalquantity",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 105,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 88,
        },
        {
          text: "",
          datafield: "paydetails",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 100,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Payment Amt"
              : "<button>Payment Amt</button>";
          },
          buttonclick: (row): void => {
            this.paypopup(row);
          },
        },
        {
          text: "",
          datafield: "Edit Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 52,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Edit"
              : "<button>Edit</button>";
          },
          buttonclick: (row): void => {
            this.setValue();
          },
        },
        {
          text: "",
          datafield: "detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 64,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Details"
              : "<button>Details</button>";
          },
          buttonclick: (row): void => {
            this.detailspop(row);
          },
        },
        {
          text: "",
          datafield: "download",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 62,
          cellsrenderer: (): string => {
            return "Invoice";
          },
          buttonclick: (row): void => {
            this.Download();
          },
        },
      ];
    });
  }

  async paypopup(row) {
    const modal = await this.modalController.create({
      component: PayDetailsComponent,
      cssClass: "payform",
      componentProps: {
        value: this.selectedRow.headerid,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Purchase Invoice Detail Saved Successfully") {
        this.getdatas();
      }
    });
    return await modal.present();
  }

  async detailspop(row) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      cssClass: "viewserialfrom",
      componentProps: {
        value: this.selectedRow.headerid,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  Download() {
    if (this.selectedRow.uploaddocument != null) {
      const link = document.createElement("a");
      link.href = this.selectedRow.uploaddocument;
      link.target = "_blank";
      link.click();
    } else {
      this.commonService.showConfirm("Invoice Document Not Uploaded");
    }
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
    this.show = true;
  }

  getserviceprovider() {
    var url = serverUrl.web + "/esim/getServiceProvider";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.service = res;
    });
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
      title: "Esim Purchase Details",
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
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate +=
      (this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1).toString()
        : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate +=
      this.today.getDate() < 10
        ? "0" + this.today.getDate().toString()
        : this.today.getDate().toString();
    this.createForm();
  }

  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ionViewWillEnter() {
    this.clear();
    this.getdatas();
    this.getserviceprovider();
  }
}
