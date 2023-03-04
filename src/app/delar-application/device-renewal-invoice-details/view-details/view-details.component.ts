import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-view-details",
  templateUrl: "./view-details.component.html",
  styleUrls: ["./view-details.component.scss"],
})
export class ViewDetailsComponent implements OnInit {
  @Input() value;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("selectComponent", { static: false })
  @ViewChild("myGrid", { static: false })
  myGrid: jqxGridComponent;
  columns: any;
  dataString: any;
  tableData: any;
  show: boolean = false;
  selectedRow: any;
  detail: any;
  page = [];

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private modalController: ModalController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  getdatas() {
    var url =
      serverUrl.web + "/esim/getRenewalInvoiceDetails?invoiceno=" + this.value;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return "--";
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
          text: "Invoice No",
          datafield: "invoiceno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 187,
        },
        {
          text: "Received Date",
          datafield: "receiveddate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 189,
        },
        {
          text: "Paid Amount",
          datafield: "receivedamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 187,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 189,
        },
      ];
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
    this.show = true;
  }

  ngOnInit() {
    this.getdatas();
  }
}
