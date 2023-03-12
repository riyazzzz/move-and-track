import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { AssignDealerComponent } from "./assign-dealer/assign-dealer.component";
import { CertificateCreationComponent } from "./certificate-creation/certificate-creation.component";
import { CommentComponent } from "./comment/comment.component";
import { CompanyCreationComponent } from "./company-creation/company-creation.component";
import { ConfirmPopupComponent } from "./confirm-popup/confirm-popup.component";
import { CustomerRenewalRequestComponent } from "./customer-renewal-request/customer-renewal-request.component";
import { DealerDetailsComponent } from "./dealer-details/dealer-details.component";
import { EndUserCreationComponent } from "./end-user-creation/end-user-creation.component";
import { EsimTopupPopupComponent } from "./esim-topup-popup/esim-topup-popup.component";
import { RequestPageComponent } from "./request-page/request-page.component";
import { StatusDetailsComponent } from "./status-details/status-details.component";

@Component({
  selector: "app-esim-customer-ca-details",
  templateUrl: "./esim-customer-ca-details.page.html",
  styleUrls: ["./esim-customer-ca-details.page.scss"],
})
export class EsimCustomerCaDetailsPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  data: any = "";
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any = [];
  tableData: any;
  color;
  show: boolean = false;
  renewalbutton: boolean = true;
  rowColor;
  respone: any;
  result: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private ete: ExportExcelService,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {}

  async assigndealer() {
    let selectdata = this.myGrid.getselectedrowindexes();
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
      });
    }

    const modal = await this.modalController.create({
      component: AssignDealerComponent,
      cssClass: "simupdateform",
      componentProps: {
        value: arr,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data == "Stock Assigned Successfully") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  async customerrenewalrequest() {
    const modal = await this.modalController.create({
      component: CustomerRenewalRequestComponent,
      cssClass: "renewalrequest",
      componentProps: {},
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Renewal Request Saved Successfully") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  TopupCheck() {
    let selectdata = this.myGrid.getselectedrowindexes();
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
      });
    }
    const url = serverUrl.web + "/esim/saveEsimTopupCheck";
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      if (res.message == "Success") {
        this.requestForTopUp();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  async requestForTopUp() {
    let selectdata = this.myGrid.getselectedrowindexes();
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        topuprequestid: "",
        iccidno1:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1,
        iccidno2:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno2,
        vltdsno:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].vltdsno,
        imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
        topuprequestdate: "",
        createdby: localStorage.getItem("userName").toString(),
        createddate: null,
        updatedby: localStorage.getItem("userName").toString(),
        updateddate: null,
      });
    }
    const modal = await this.modalController.create({
      component: EsimTopupPopupComponent,
      cssClass: "validityform",
      componentProps: {
        value: arr,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Topup Request Saved Successfully") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  async requestMethod() {
    let selectdata = this.myGrid.getselectedrowindexes();
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        renewalrequestid: "",
        iccidno1:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1,
        iccidno2:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno2,
        vltdsno:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].vltdsno,
        imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
        renewalrequestdate: "",
        createdby:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].createdby,
        createddate: null,
        updatedby:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].createdby,
        updateddate: null,
      });
    }
    const modal = await this.modalController.create({
      component: RequestPageComponent,
      cssClass: "validityform",
      componentProps: {
        value: arr,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Renewal Request Saved Successfully") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  async requestoneyearModel() {
    const alert = await this.alertController.create({
      header: "Confirm",
      backdropDismiss: false,
      message: "Are you sure you want to Extend 1 Year ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Ok",
          handler: (data) => {
            this.requestForoneyeartop();
          },
        },
      ],
    });
    await alert.present();
  }

  requestForoneyeartop() {
    this.commonService.presentLoader();
    let selectdata = this.myGrid.getselectedrowindexes();
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        extendoneyearrequestid: "",
        iccidno1:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1,
        iccidno2:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno2,
        vltdsno:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]].vltdsno,
        imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
        extendoneyearrequestdate: "",
        extendoneyearvalidity: "1 Year",
        createdby: localStorage.getItem("userName"),
        createddate: "",
        updatedby: localStorage.getItem("userName"),
        updateddate: "",
      });
    }
    const url =
      serverUrl.web +
      "/esim/saveEsimExtendOneYearRequest?companyid=apm&dealerid=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      this.commonService.dismissLoader();
      if (res.message == "Extend One Year Request Saved Successfully") {
        this.myGrid.clearselection();
        this.getdatas();
        this.commonService.showConfirm(res.message);
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  customFilter(c) {
    this.color = c;
    if (this.color != undefined) {
      this.getdatas();
    }
  }
  getdatas(d?) {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/esim/getDealerCAStatusAll?companyid=" +
      localStorage.getItem("corpId") +
      "&invoiceno=" +
      "&serialno=" +
      "&dealer=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      if (d == 1) {
        this.commonService.showConfirm(this.data);
        this.data = undefined;
      }

      if (this.color != undefined) {
        var fData = res.filter((d) => {
          return d.rowcolor == this.color;
        });
        this.tableData = fData;
        this.color = undefined;
      } else {
        this.tableData = res;
      }

      this.commonService.dismissLoader();
      this.renderer = (row: number, column: any, value: string) => {
        const data = this.myGrid.getrowdata(row);

        this.rowColor = data.rowcolor;

        if (value == "" || null || undefined || value == ",") {
          if (this.rowColor == "orange") {
            var val = "background-color : orange";
            var col = "white;";
          }
          if (this.rowColor == null) {
            var col = "darkblue";
          }

          if (this.rowColor == "yellow") {
            var col = "darkblue;";
            var val = "background-color : yellow";
          }
          if (this.rowColor == "red") {
            var col = "white;";
            var val = "background-color : red";
          }
          if (this.rowColor == "blue") {
            var col = "white;";
            var val = "background-color : blue";
          }
          return (
            '<div style="height:100%;font-size:11px;color:' +
            col +
            "margin:auto;" +
            "padding:10px;" +
            "" +
            val +
            '">' +
            "--" +
            "</div>"
          );
        } else {
          if (this.rowColor == "orange") {
            var col = "white;";
            var val = "background-color : orange";
          }
          if (this.rowColor == null) {
            var col = "darkblue";
          }
          if (this.rowColor == "yellow") {
            var col = "darkblue;";
            var val = "background-color : yellow";
          }
          if (this.rowColor == "red") {
            var col = "white;";
            var val = "background-color : red";
          }
          if (this.rowColor == "blue") {
            var col = "white;";
            var val = "background-color : blue";
          }
          return (
            '<div style="height:100%;font-size:11px;color:' +
            col +
            ";margin:auto;" +
            "padding:10px;" +
            "" +
            val +
            '">' +
            value +
            "</div>"
          );
        }
      };

      //   if (value == "" || null || undefined) {
      //     return (
      //       '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
      //       "--" +
      //       "</span>"
      //     );
      //   } else {
      //     return (
      //       '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
      //       value +
      //       "</span>"
      //     );
      //   }
      // };
      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
      this.myGrid.clearselection();
      this.columns = [
        {
          text: "VLTD No",
          datafield: "vltdsno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "Box No",
          datafield: "serialno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "Invoice No",
          datafield: "invoiceno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "ICCID No 1",
          datafield: "iccidno1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 140,
        },
        {
          text: "ICCID No 2",
          datafield: "iccidno2",
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
          width: 140,
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
          text: "Plate No",
          datafield: "plateno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 125,
        },
        {
          text: "Contact No",
          datafield: "contactno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 125,
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
          text: "Validity Requested",
          datafield: "validityperiod",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 155,
        },
        {
          text: "Card Requested Date",
          datafield: "carequestdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 155,
        },
        {
          text: "Card Requested by",
          datafield: "carequestby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 155,
        },
        {
          text: "Card Activated Date",
          datafield: "cardactivationdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 155,
        },
        {
          text: "Card End Date",
          datafield: "cardenddate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Card Status",
          datafield: "cardstatus",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 135,
        },
        {
          text: "Comment",
          datafield: "purcomment",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 120,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 135,
        },

        {
          text: "",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 120,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Vehicle"
              : "<button>Vehicle</button>";
          },
          buttonclick: (row): void => {
            this.checkvehicle();
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
              ? "Certificate"
              : "<button>Certificate</button>";
          },
          buttonclick: (row): void => {
            this.getmessage();
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
            this.viewModel(row);
          },
        },
        {
          text: "",
          datafield: "status",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 120,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Dealer Details"
              : "<button>Dealer Details</button>";
          },
          buttonclick: (row): void => {
            this.openModel(row);
          },
        },
      ];
    });
  }

  getmessage() {
    const url =
      serverUrl.web +
      "/global/getCertificateDetails?imei=" +
      this.selectedRow.imei;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      if (res.message) {
        this.commonService.showConfirm(res.message);
      } else if (res.message == "") {
        this.result = res;
        this.CertificateModel();
      }
    });
  }

  async CertificateModel() {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CertificateCreationComponent,
      cssClass: "viewserialfrom",
      componentProps: {
        value: this.result,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Certificate Saved Successfully") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  checkvehicle() {
    const url =
      serverUrl.web +
      "/site/getvehiclevalidation?imei=" +
      this.selectedRow.imei;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      if (res.message == "success") {
        this.confirm();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  async confirm() {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: ConfirmPopupComponent,
      cssClass: "vehiclecreation",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == 1) {
        this.vehiclecreationModel();
      } else {
        this.enduserModel();
      }
    });
    return await modal.present();
  }

  async vehiclecreationModel() {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CompanyCreationComponent,
      cssClass: "viewserialfrom",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Successfully Presisted") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  async enduserModel() {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: EndUserCreationComponent,
      cssClass: "viewserialfrom",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Added Successfully") {
        this.show = false;
        this.data = data.data.data;
        this.getdatas(1);
      }
    });
    return await modal.present();
  }

  async viewModel(row) {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: StatusDetailsComponent,
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

  async CommentModel(row) {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CommentComponent,
      cssClass: "simupdateform",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async openModel(row) {
    const modal = await this.modalController.create({
      component: DealerDetailsComponent,
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

  myGridOnRowclick(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  myGridOnRowSelect(event: any): void {
    // let h = document.getElementsByClassName(
    //   "jqx-checkbox-default"
    // ) as HTMLCollectionOf<HTMLElement>;
    // h[0].style.display = "none";
    // this.selectedRow = this.myGrid.getselectedrowindexes();

    // let current = this.myGrid.getselectedrowindex();
    // if (current != -1) {
    //   let currentrow = this.myGrid.getrowdata(current);
    //   // console.log(currentrow, event);
    //   if (currentrow.renewalmessage) {
    //     this.myGrid.unselectrow(current);
    //     this.commonService.showConfirm("Selected Data is Aleady Renewal");
    //     return null;
    //   }
    // }
    this.selectedRow = this.myGrid.getselectedrowindexes();
    if (this.selectedRow.length > 0) {
      this.renewalbutton = false;
    } else {
      this.renewalbutton = true;
    }
    if (event.type == "rowunselect") return null;
    // console.log(this.myGrid.getrowdata(this.selectedRow[]));
  }
  // myGridOnRowSelect(event: any) {

  //   let current = this.myGrid.getselectedrowindex();

  //   if (current != -1) {
  //     // let currentrow = this.myGrid.getrowdata(current);
  //     // console.log(currentrow, event);
  //     // if (currentrow.renewalmessage != '') {
  //     //   this.myGrid.unselectrow(current);
  //     //   this.commonService.showConfirm("Selected Data is Aleady Renewal");
  //     //   return null;
  //     // }
  //     let arr = ""
  //     let selectdata = this.myGrid.getselectedrowindexes();
  //     // var arr = [];
  //     for (let i = 0; i < selectdata.length; i++) {
  //       if (this.myGrid["attrSource"]["originaldata"][selectdata[i]].renewalmessage != '') {
  //         this.myGrid.unselectrow(selectdata[i])
  //         arr += this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1
  //       }
  //     }
  //     this.commonService.showConfirm(arr);

  //   }

  //   // console.log(this.myGrid.getrowdata(this.selectedRow[]));
  //   this.selectedRow = this.myGrid.getselectedrowindexes();
  //   if (this.selectedRow.length > 0) {
  //     this.renewalbutton = false;
  //   } else {
  //     this.renewalbutton = true;
  //   }
  //   if (event.type == "rowunselect") return null;
  // }

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
      title: "Customer CA Details",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ionViewWillEnter() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.getdatas();
    this.commonService.getData.subscribe((d) => {
      this.data = d;
      this.getdatas(1);
    });
  }
}
