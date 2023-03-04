import { Component, OnInit, ViewChild } from "@angular/core";
import { Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-dealer-stock-list",
  templateUrl: "./dealer-stock-list.page.html",
  styleUrls: ["./dealer-stock-list.page.scss"],
})
export class DealerStockListPage implements OnInit {
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
  page = [];
  tableData: any = [];
  noData = {};

  constructor(
    public platform: Platform,
    private commonService: CommonService,
    private ajaxService: AjaxService
  ) {}

  getdata() {
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
    this.page = ["100", "200", "500", "1000"];
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      {
        text: "Dealer",
        datafield: "name",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 199,
      },
      {
        text: "Total Device",
        datafield: "total",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 198,
      },
      {
        text: "Stocks",
        datafield: "stocks",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 198,
      },
      {
        text: "Online",
        datafield: "online",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 198,
      },
      {
        text: "Offline",
        datafield: "offline",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 198,
      },
      {
        text: "Expiry",
        datafield: "expiry",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 199,
      },
    ];
  }

  fetchData() {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/global/getDealerStockList?company=" +
      localStorage.getItem("corpId") +
      "&suffix=" +
      localStorage.companySuffix;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      if (res) {
        this.commonService.dismissLoader();
        this.getdata();
        res.map((d) => {
          if (d.show == "Yes") {
            this.tableData.push(d);
          } else if (d.show == "No") {
            this.noData = d;
          }
        });
      }
    });
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.fetchData();
  }
}
