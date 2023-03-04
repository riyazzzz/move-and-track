import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-esim-view-production",
  templateUrl: "./esim-view-production.component.html",
  styleUrls: ["./esim-view-production.component.scss"],
})
export class EsimViewProductionComponent implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  @Input() value;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  columns: any;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  page = [];

  constructor(
    private ajaxService: AjaxService,
    private modalController: ModalController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    const url =
      serverUrl.web +
      "/esim/getEsimProductionDetail?companyid=" +
      localStorage.getItem("corpId") +
      "&serialno=" +
      this.value;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.page = ["100", "200", "500", "1000"];
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
          text: "ICCID No",
          datafield: "iccidno1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 195,
        },
        {
          text: "SIM No",
          datafield: "simno1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 193,
        },
        {
          text: "IMEI No",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 195,
        },
        {
          text: "VLTD No",
          datafield: "vltdsno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 193,
        },
      ];
    });
  }
}
