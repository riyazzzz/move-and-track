import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { CommentComponent } from "./comment/comment.component";
import { EsimTopupPopupComponent } from "./esim-topup-popup/esim-topup-popup.component";
import { RenewalRequestComponent } from "./renewal-request/renewal-request.component";
import { ShowHistoryComponent } from "./show-history/show-history.component";

@Component({
  selector: "app-esim-renewal",
  templateUrl: "./esim-renewal.page.html",
  styleUrls: ["./esim-renewal.page.scss"],
})
export class EsimRenewalPage implements OnInit {
  renewalForm: FormGroup;
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
  rowColor;
  color;
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
  showButton: boolean = true;
  myPlatform: string;
  data;
  renewal: Number = 1;
  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private alertController: AlertController,
    private commonService: CommonService,
    private ete: ExportExcelService
  ) {}

  clear() {
    this.show = false;
  }

  // async requestForTopUp() {
  //   // {
  //   //   "topuprequestid": "", "iccidno1": "8991102105444840884F", "iccidno2": "8991102105444840884F", "vltdsno": "APM1K2I102100006833", "imei": "865006044591627",
  //   //     "topuprequestdate": "", "createdby": "apm-sa", "createddate": null, "updatedby": "apm-sa", "updateddate": null, "topupvalidity": "1 Month"
  //   // }
  //   let selectdata = this.myGrid.getselectedrowindexes();
  //   let arr = [];
  //   for (let i = 0; i < selectdata.length; i++) {
  //     arr.push({
  //       topuprequestid: "",
  //       iccidno1:
  //         this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno1,
  //       iccidno2:
  //         this.myGrid["attrSource"]["originaldata"][selectdata[i]].iccidno2,
  //       vltdsno:
  //         this.myGrid["attrSource"]["originaldata"][selectdata[i]].vltdsno,
  //       imei: this.myGrid["attrSource"]["originaldata"][selectdata[i]].imei,
  //       topuprequestdate: "",
  //       createdby: localStorage.getItem("userName").toString(),
  //       createddate: null,
  //       updatedby: localStorage.getItem("userName").toString(),
  //       updateddate: null,
  //     });
  //   }
  //   const modal = await this.modalController.create({
  //     component: EsimTopupPopupComponent,
  //     cssClass: "validityform",
  //     componentProps: {
  //       value: arr,
  //     },
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     if (data.data.data == "Topup Request Saved Successfully") {
  //       this.modalController.dismiss();
  //       this.show = false;
  //       this.data = data.data.data;
  //       this.getData();
  //     }
  //   });
  //   return await modal.present();
  // }
  async openModel() {
    let selectdata = this.myGrid.getselectedrowindexes();
    var arr = [];
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
      component: RenewalRequestComponent,
      cssClass: "validityform",
      componentProps: {
        value: arr,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Renewal Request Saved Successfully") {
        this.commonService.dismissLoader();
        this.show = false;
        this.data = "Renewal Request Saved Successfully";
        this.getData();
      }
    });
    return await modal.present();
  }

  customFilter(c) {
    this.color = c;
    if (this.color != undefined) {
      this.getData(this.renewal);
    }
  }

  getData(d?) {
    if (d == undefined) {
      this.renewal = 1;
    } else {
      this.renewal = d;
    }
    this.commonService.presentLoader();
    const url =
      serverUrl.web +
      "/esim/getDealerRenewalAll?renewalno=" +
      this.renewal +
      "&companyid=" +
      localStorage.getItem("corpId") +
      "&dealer=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      console.log(res);
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
      if (this.data != undefined) {
        this.commonService.showConfirm(this.data);
        this.data = undefined;
      }

      setTimeout(() => {
        let h = document.getElementsByClassName(
          "jqx-checkbox-default"
        ) as HTMLCollectionOf<HTMLElement>;
        h[0].style.display = "none";
      }, 2000);
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

      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.myGrid.clearselection();
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
      ];
    });
  }

  async viewModel(row) {
    const isModalOpened = await this.modalController.getTop();

    const modal = await this.modalController.create({
      component: ShowHistoryComponent,
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

  a: boolean = true;
  myGridOnRowSelect(event: any): void {
    console.log(event);

    this.selectedRow = this.myGrid.getselectedrowindexes();

    let current = this.myGrid.getselectedrowindex();
    if (current != -1) {
      let currentrow = this.myGrid.getrowdata(current);
      // console.log(currentrow, event);
      if (currentrow.renewalmessage != "") {
        if (this.a == true) {
          this.commonService.showConfirm(
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal"
          );
          this.a = false;
        } else {
          this.a = true;
        }
        this.myGrid.unselectrow(current);
        return null;
      }
    }

    this.selectedRow = this.myGrid.getselectedrowindexes();

    if (this.selectedRow.length > 0) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }

  myGridOnRowclick(event: any): void {
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
      title: "Renewal Request",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ionViewWillEnter() {
    this.data = undefined;
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.getData();
    this.clear();
  }
}
