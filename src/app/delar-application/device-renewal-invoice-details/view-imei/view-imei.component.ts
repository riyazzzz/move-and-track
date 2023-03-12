import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-view-imei",
  templateUrl: "./view-imei.component.html",
  styleUrls: ["./view-imei.component.scss"],
})
export class ViewImeiComponent implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  page = [];
  @Input() value: any;
  @Input() valueone: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private alertController: AlertController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  getDatas() {
    this.page = [];
    this.tableData = JSON.parse(this.value);
    this.page = ["100", "200", "500", "1000"];
    this.renderer = (row: number, column: any, value: string) => {
      if (value == "" || null || undefined || value == ",") {
        return "--";
      } else {
        return (
          '<span style="line-height:32px;font-size:17px;color:darkblue;margin:auto;padding-left: 5px;">' +
          value +
          "</span>"
        );
      }
    };

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      {
        text: "IMEI",
        datafield: "imei",
        cellsrenderer: this.renderer,
        cellsalign: "left",
        align: "left",
        width: 175,
      },
      {
        text: "Renewal No",
        datafield: "renewalno",
        cellsrenderer: this.renderer,
        cellsalign: "left",
        align: "left",
        width: 175,
      },
      {
        text: "",
        datafield: "remove",
        columntype: "button",
        cellsalign: "center",
        align: "center",
        width: 150,
        cellsrenderer: (): string => {
          return "Remove";
        },
        buttonclick: (row): void => {
          this.removeModel(row);
        },
      },
    ];
  }

  async removeModel(row) {
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: "Remove",
        backdropDismiss: false,
        message: "Are you sure you want to remove?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              this.remove();
            },
          },
        ],
      });
      await alert.present();
    }
  }

  async remove() {
    const url =
      serverUrl.web +
      "/esim/removeRenewalInvoiceIMEI?invoiceno=" +
      this.valueone +
      "&imeino=" +
      this.selectedRow.imei;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      if (res.message == "IMEI Removed Successfully") {
        this.commonService.showConfirm("IMEI Removed Successfully");
        this.modalController.dismiss({
          data: "IMEI Removed Successfully",
        });
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  ngOnInit() {
    this.getDatas();
  }
}
