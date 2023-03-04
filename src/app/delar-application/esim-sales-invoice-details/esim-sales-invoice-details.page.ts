import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { FileUploader } from "ng2-file-upload";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { PdfLogoService } from "src/app/services/pdf-logo.service";
import { serverUrl } from "src/environments/environment";
import { ReceivedDetailsComponent } from "./received-details/received-details.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";

@Component({
  selector: "app-esim-sales-invoice-details",
  templateUrl: "./esim-sales-invoice-details.page.html",
  styleUrls: ["./esim-sales-invoice-details.page.scss"],
})
export class EsimSalesInvoiceDetailsPage implements OnInit {
  SalesinvoiceForm: FormGroup;
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
  editdetail: any;
  hideSerialNo: boolean = false;
  Dealer: any;
  invoiceno: any;
  maxDate;
  today = new Date();
  productlist: any;

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
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.hideSerialNo = false;
    this.SalesinvoiceForm.patchValue({
      dealerid: "",
      invoiceno: "",
      invoiceamount: "",
      invoicedate: today,
      noofunits: "",
      productname: "",
      invoicedocument: "",
    });
    this.uploader.queue.length = 0;
  }

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.SalesinvoiceForm = this.formBuilder.group({
      dealerid: ["", Validators.required],
      invoiceno: ["", Validators.required],
      invoicedate: [today, Validators.required],
      invoiceamount: ["", Validators.required],
      noofunits: ["", Validators.required],
      productname: ["", Validators.required],
      invoicedocument: [""],
    });
  }

  getDealer() {
    var url = serverUrl.web + "/esim/getDealer";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Dealer = res;
    });
  }

  getModellist() {
    var url = serverUrl.web + "/esim/getModel";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.productlist = res;
    });
  }

  getdevicemodellist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.SalesinvoiceForm.value.devicemodel = event.value;
  };

  async add() {
    this.button = true;
    const file = this.uploader;
    var data;
    data = {
      headerid: "",
      dealerid: this.SalesinvoiceForm.value.dealerid.toString(),
      invoiceno: this.SalesinvoiceForm.value.invoiceno.toString(),
      invoicedate: this.SalesinvoiceForm.value.invoicedate.toString(),
      invoiceamount: this.SalesinvoiceForm.value.invoiceamount.toString(),
      noofunits: this.SalesinvoiceForm.value.noofunits.toString(),
      productname: this.SalesinvoiceForm.value.productname.toString(),
      createdby: localStorage.getItem("userName"),
    };

    const testData: FormData = new FormData();

    if (file.queue.length != 0) {
      testData.append("InvoiceDocument", file.queue[0]._file);
      testData.append("data", JSON.stringify(data));
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("InvoiceDocument", default_file);
      testData.append("data", JSON.stringify(data));
    }

    const url = serverUrl.web + "/esim/saveEsimSalesInvoiceHeader";
    this.ajaxService.ajaxPostWithFile(url, testData).subscribe((res) => {
      if (res.message == "Sales Invoice Saved Successfully") {
        this.commonService.showConfirm("Sales Invoice Saved Successfully");
        this.clear();
        this.tableData = res;
        this.button = false;
        this.getdatas();
      } else if (res.message == "Sales Invoice Not Saved Successfully") {
        this.commonService.showConfirm("Sales Invoice Not Saved Successfully");
        this.button = false;
        this.clear();
      } else {
        this.commonService.showConfirm(res.message);
        this.button = false;
        this.clear();
      }
    });
  }

  async edit() {
    this.button = true;
    const file = this.uploader;
    var data;
    data = {
      headerid: this.selectedRow.headerid.toString(),
      dealerid: this.SalesinvoiceForm.value.dealerid.toString(),
      invoiceno: this.SalesinvoiceForm.value.invoiceno.toString(),
      invoicedate: this.SalesinvoiceForm.value.invoicedate.toString(),
      invoiceamount: this.SalesinvoiceForm.value.invoiceamount.toString(),
      noofunits: this.SalesinvoiceForm.value.noofunits.toString(),
      productname: this.SalesinvoiceForm.value.productname.toString(),
      createdby: localStorage.getItem("userName"),
    };

    const testData: FormData = new FormData();

    if (file.queue.length != 0) {
      testData.append("InvoiceDocument", file.queue[0]._file);
      testData.append("data", JSON.stringify(data));
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("InvoiceDocument", default_file);
      testData.append("data", JSON.stringify(data));
    }

    const url = serverUrl.web + "/esim/saveEsimSalesInvoiceHeader";
    this.ajaxService.ajaxPostWithFile(url, testData).subscribe((res) => {
      if (res.message == "Sales Invoice Saved Successfully") {
        this.commonService.showConfirm("Sales Invoice Saved Successfully");
        this.clear();
        this.tableData = res;
        this.getdatas();
        this.button = false;
      } else if (res.message == "Sales Invoice Not Saved Successfully") {
        this.commonService.showConfirm("Sales Invoice Not Saved Successfully");
        this.clear();
        this.button = false;
      } else {
        this.commonService.showConfirm(res.message);
        this.button = false;
        this.clear();
      }
    });

    this.hideSerialNo = false;
  }

  setValue() {
    this.hideSerialNo = true;
    this.SalesinvoiceForm.patchValue({
      dealerid: this.selectedRow.dealerid,
      invoiceno: this.selectedRow.invoiceno,
      invoicedate: this.selectedRow.invoicedate,
      invoiceamount: this.selectedRow.invoiceamount,
      noofunits: this.selectedRow.noofunits,
      productname: this.selectedRow.productname,
    });
  }

  getdatas() {
    this.commonService.presentLoader();
    var url = serverUrl.web + "/esim/getAllSalesEsimInvoice";
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
          text: "Dealer",
          datafield: "dealerid",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 85,
        },
        {
          text: "Invoice No",
          datafield: "invoiceno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 95,
        },
        {
          text: "Invoice Date",
          datafield: "invoicedate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 105,
        },
        {
          text: "Invoice Amt",
          datafield: "invoiceamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 90,
        },
        {
          text: "Total Received Amt",
          datafield: "totalamountreceived",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "Balance Amt",
          datafield: "balanceamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 90,
        },
        {
          text: "No of Units",
          datafield: "noofunits",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 85,
        },
        {
          text: "Total Supplied Units",
          datafield: "totalsuppliedunits",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "Balance Units",
          datafield: "balanceunits",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 95,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 85,
        },
        {
          text: "",
          datafield: "receivedetails",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 100,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Received Amt"
              : "<button>Received Amt</button>";
          },
          buttonclick: (row): void => {
            this.receivedpopup(row);
          },
        },
        {
          text: "",
          datafield: "Edit Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 80,
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
          width: 80,
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
          width: 80,
          cellsrenderer: (): string => {
            return "Invoice";
          },
          buttonclick: (row): void => {
            this.Download(row);
          },
        },
      ];
    });
  }

  async receivedpopup(row) {
    const modal = await this.modalController.create({
      component: ReceivedDetailsComponent,
      cssClass: "payform",
      componentProps: {
        value: this.selectedRow.headerid,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Sales Invoice Detail Saved Successfully") {
        this.getdatas();
      }
    });
    return await modal.present();
  }

  async detailspop(row) {
    const modal = await this.modalController.create({
      component: ViewDetailsComponent,
      cssClass: "viewserialfrom",
      componentProps: {
        value: this.selectedRow.invoiceno,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async Download(row) {
    if (this.selectedRow.uploadinvoice != null) {
      const link = document.createElement("a");
      link.href = this.selectedRow.uploadinvoice;
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
      title: "Esim Sales Invoice Details",
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
    this.getDealer();
    this.getdatas();
    this.getModellist();
  }
}