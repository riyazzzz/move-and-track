import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import { InventoryPopupComponent } from "./inventory-popup/inventory-popup.component";
import { ModalController, Platform } from "@ionic/angular";
import { ViewCommentsComponent } from "./view-comments/view-comments.component";
@Component({
  selector: "app-inventory-details",
  templateUrl: "./inventory-details.page.html",
  styleUrls: ["./inventory-details.page.scss"],
})
export class InventoryDetailsPage implements OnInit {
  myPlatform: string;
  showButton: boolean = true;
  page = [];

  constructor(
    private location: Location,
    private ajaxService: AjaxService,
    public platform: Platform,
    private modalController: ModalController,
    private commonService: CommonService
  ) {}
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  selectedRow: any;
  tableData: any;
  closePage() {
    this.location.back();
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
    if (this.myGrid.getselectedrowindexes().length > 0) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }
  async openModel(event) {
    const modal = await this.modalController.create({
      component: InventoryPopupComponent,
      cssClass: "addexpenseform",
      componentProps: {
        value: this.selectedRow,
        mode: event.target.textContent,
      },
    });
    modal.onDidDismiss().then(() => {
      this.getdata();
    });
    return await modal.present();
  }
  async viewModel() {
    const modal = await this.modalController.create({
      component: ViewCommentsComponent,
      cssClass: "saleform",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
  async addComments() {
    const modal = await this.modalController.create({
      component: InventoryPopupComponent,
      cssClass: "addexpenseform",
      componentProps: {
        value: this.selectedRow,
        mode: "comments",
      },
    });
    modal.onDidDismiss().then(() => {
      this.getdata();
    });
    return await modal.present();
  }
  getdata() {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/sensorise/getIccidDetails?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return "---";
        } else {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            value +
            "</span>"
          );
        }
      };
      this.source = { localdata: this.tableData };
      this.page = ["100", "200", "500", "1000"];
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: "Imei Number",
          datafield: "imeino",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        // {text :'Sim1 Iccid Number',datafield:'iccidno1',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        // {text :'Sim2 Iccid Number',datafield:'iccidno2',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        {
          text: "Sim 1 Number",
          datafield: "simcardno1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Sim 2 Number",
          datafield: "simcardno2",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Plate No",
          datafield: "vehiclenumber",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Created Date",
          datafield: "createddate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Dealer Name",
          datafield: "providername",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        // { text: 'Slot Number', datafield: 'slotno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
        // {text :'Esim Provider',datafield:'esimprovider',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        // {text :'Dispatch Date',datafield:'dispatchdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        // {text :'Expiry Date',datafield:'expirydate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        // {text :'Activated Date',datafield:'activatedate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        // { text: 'Card Status', datafield: 'status', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
        // {text :'Comments',datafield:'comments',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
        //     { text: 'Add Comments', columntype: 'button',cellsalign: 'center', align: 'center',width:150,
        //     cellsrenderer: (): string => {
        //       return 'ADD';
        //     },
        //     buttonclick: (row): void => {
        //      this.addComments()
        //     }
        //   } ,
        //   { text: 'View Comments', columntype: 'button',cellsalign: 'center', align: 'center',width:150,
        //   cellsrenderer: (): string => {
        //     return 'View';
        //   },
        //   buttonclick: (row): void => {
        //    this.viewModel()
        //   }
        // }
      ];
    });
  }
  ngOnInit() {
    this.getdata();
  }
}
