import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";
import { PayDetailsComponent } from "../pay-details/pay-details.component";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  detailForm: FormGroup;
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

  createForm() {
    this.detailForm = this.formBuilder.group({
      serviceprovider: [""],
      invoiceno: [""],
      invoiceamount: [""],
    });
  }

  getdatas() {
    var url =
      serverUrl.web +
      "/esim/getInvoiceDetails?invoiceno=" +
      this.detailForm.value.invoiceno;
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
          text: "Paid Date",
          datafield: "paiddate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 187,
        },
        {
          text: "Paid Amount",
          datafield: "paidamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 189,
        },
        {
          text: "UTR No",
          datafield: "utrno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 187,
        },
        {
          text: "Created By",
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
    const url =
      serverUrl.web + "/esim/getSingleEsimInvoice?headerid=" + this.value;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      console.log(res);
      {
        this.detail = res;
        this.detailForm.patchValue({
          serviceprovider: this.detail.serviceprovider,
          invoiceno: this.detail.invoiceno,
          invoiceamount: this.detail.invoiceamount,
        });
        this.getdatas();
      }
    });
    this.createForm();
  }
}
