import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-company-details",
  templateUrl: "./company-details.component.html",
  styleUrls: ["./company-details.component.scss"],
})
export class CompanyDetailsComponent implements OnInit {
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

  getdata() {
    var url =
      serverUrl.web + "/global/getlistofvehiclesinfo?companyId=" + this.value;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return "-";
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
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Imei No",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Sim No",
          datafield: "sim",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Purchase Date",
          datafield: "dop",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
        {
          text: "Expiry Date",
          datafield: "warrantyExpiryDate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 160,
        },
      ];
    });
  }

  ngOnInit() {
    this.getdata();
  }
}
