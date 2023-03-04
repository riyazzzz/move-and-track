import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { RequestDetailsComponent } from "./request-details/request-details.component";

@Component({
  selector: "app-esim-dealer-detail",
  templateUrl: "./esim-dealer-detail.page.html",
  styleUrls: ["./esim-dealer-detail.page.scss"],
})
export class EsimDealerDetailPage implements OnInit {
  DealerForm: FormGroup;
  show: boolean = false;
  data;
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
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: (
    | {
        text: string;
        datafield: string;
        cellsrenderer: (row: number, column: any, value: string) => string;
        cellsalign: string;
        align: string;
        width: number;
      }
    | { text: string; datafield: string; cellsrenderer?: undefined }
  )[];
  tableData: any;
  selectedRow = [];
  Invoice: any;
  SerialNo: any;
  Dealer: any;
  dealername: any;
  details: any;
  showButton: boolean = true;
  myPlatform: string;

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private alertController: AlertController,
    private commonService: CommonService,
    private ete: ExportExcelService
  ) {}

  clear(d?) {
    this.DealerForm.patchValue({
      InvoiceNo: "",
      SerialNo: "",
      // iccidNumber: "",
      // ImeiNumber: "",
    });
    this.hideSerialNo = true;
    this.show = false;
    this.showInvoice = false;
    this.showSerialNo = false;
    if (d == 1) {
      this.SearchData();
    }
  }

  reset() {
    this.DealerForm.patchValue({
      SerialNo: "",
    });
  }
  getdealerlist() {
    var url =
      serverUrl.web +
      "/esim/getDealerInvoice?companyid=apm&dealer=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Invoice = res;
    });
  }

  getinvoicelist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.DealerForm.value.InvoiceNo = event.value;
    var url =
      serverUrl.web +
      "/esim/getInvoiceSerial?companyid=apm&invoiceno=" +
      this.DealerForm.value.InvoiceNo;
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
    if (event.value) this.DealerForm.value.SerialNo = event.value;
  };

  createForm() {
    this.DealerForm = this.formBuilder.group({
      InvoiceNo: ["", Validators.required],
      SerialNo: [""],
      // iccidNumber: [""],
      // ImeiNumber: [""],
    });
  }

  async openModel() {
    let selectdata = this.myGrid.getselectedrowindexes();
    var arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        carequestid: "",
        iccidno1:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1,
        iccidno2:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno2,
        vltdsno:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].vltdsno,
        imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
        carequestdate:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]]
            .carequestdate,
        createdby:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].createdby,
        createddate: null,
        updatedby:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].createdby,
        updateddate: null,
      });
    }
    const modal = await this.modalController.create({
      component: RequestDetailsComponent,
      cssClass: "validityform",
      componentProps: {
        value: arr,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "CA Request Saved Successfully") {
        this.commonService.dismissLoader();
        this.data = "CA Request Saved Successfully";
        this.show = false;
        this.clear();
        this.SearchData();
      }
    });
    return await modal.present();
  }

  // const url =
  //   serverUrl.web + "/esim/saveEsimCARequest?companyid=apm&branchid=apm";
  // this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
  //   if (res.message == "CA Request Saved Successfully") {
  //     this.commonService.showConfirm("CA Request Saved Successfully");
  //     this.modalController.dismiss();
  //     this.show = false;
  //     this.clear();
  //   } else {
  //     this.commonService.showConfirm("Please Select the Row for Request");
  //   }
  // });

  SearchData() {
    this.commonService.presentLoader();

    var url =
      serverUrl.web +
      "/esim/getDealerEsimSalesAll?companyid=apm&invoiceno=" +
      this.DealerForm.value.InvoiceNo.trim() +
      "&dealer=" +
      localStorage.getItem("userName") +
      "&serialno=" +
      this.DealerForm.value.SerialNo.trim();
    // "&iccidno=" +
    // this.DealerForm.value.iccidNumber +
    // "&imeino=" +
    // this.DealerForm.value.ImeiNumber;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      if (res.length == 0) {
        this.commonService.showConfirm("CA Request not available");
        this.show = false;
      } else {
        this.details = res[0];
        if (this.data != undefined) {
          this.commonService.showConfirm(this.data);
          this.data = undefined;
        }

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
              text: "VLTD No",
              datafield: "vltdsno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "Box No",
              datafield: "serialno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "ICCID No 1",
              datafield: "iccidno1",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "ICCID No 2",
              datafield: "iccidno2",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "IMEI No",
              datafield: "imei",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
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
              text: "Slot No",
              datafield: "slotno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 102,
            },
          ];
        } else {
          this.columns = [
            {
              text: "VLTD No",
              datafield: "vltdsno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "Box No",
              datafield: "serialno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "ICCID No 1",
              datafield: "iccidno1",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "ICCID No 2",
              datafield: "iccidno2",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
            },
            {
              text: "IMEI No",
              datafield: "imei",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 155,
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
              text: "Slot No",
              datafield: "slotno",
              cellsrenderer: this.renderer,
              cellsalign: "center",
              align: "center",
              width: 102,
            },
          ];
        }
      }
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();

    if (this.selectedRow.length > 0) {
      this.showButton = false;
    } else {
      this.showButton = true;
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
      title: "Commercial Activation Request",
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
    this.createForm();
  }

  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ionViewWillEnter() {
    this.data = undefined;
    this.clear();
    this.getdealerlist();
    this.SearchData();
  }
}
