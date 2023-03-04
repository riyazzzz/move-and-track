import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import { AddProductionComponent } from "./add-production/add-production.component";
import { ViewProductionComponent } from "./view-production/view-production.component";

@Component({
  selector: "app-production-details",
  templateUrl: "./production-details.page.html",
  styleUrls: ["./production-details.page.scss"],
})
export class ProductionDetailsPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  columns: any;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService
  ) {}
  getDatas() {
    const url =
      serverUrl.web +
      "/sensorise/getSensoriseProductionAll?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      var detail = res;
      this.tableData = res;

      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined || value == ",") {
          return "---";
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
          text: "Serial Number",
          datafield: "serialno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 300,
        },
        {
          text: "Quantity",
          datafield: "qty",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 400,
        },
        {
          text: "Date",
          datafield: "date",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "View Detail",
          datafield: "View Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 200,
          cellsrenderer: (): string => {
            return "View Detail";
          },
          buttonclick: (row): void => {
            this.viewModel();
          },
        },
      ];
    });
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  async viewModel() {
    const modal = await this.modalController.create({
      component: ViewProductionComponent,
      cssClass: "saleform",
      componentProps: {
        value: this.selectedRow.serialno,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  async openModel() {
    const modal = await this.modalController.create({
      component: AddProductionComponent,
      cssClass: "saleform",
    });
    modal.onDidDismiss().then(() => {
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }
      this.getDatas();
    });
    return await modal.present();
  }
  ngOnInit() {
    this.getDatas();
  }
}
