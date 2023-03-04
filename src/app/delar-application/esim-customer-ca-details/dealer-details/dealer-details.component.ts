import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-dealer-details",
  templateUrl: "./dealer-details.component.html",
  styleUrls: ["./dealer-details.component.scss"],
})
export class DealerDetailsComponent implements OnInit {
  dealerForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  columns1: any;
  source: { localdata: any };
  dataAdapter: any;
  dataAdapter1: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
  tableData = [];
  tableData1 = [];
  @Input() value;
  list: any;
  page = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  createForm() {
    this.dealerForm = this.formBuilder.group({
      imeino: [""],
    });
  }

  getdata() {
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
        text: "ID",
        datafield: "id",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 150,
      },
      {
        text: "Dealer Name",
        datafield: "providerName",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 160,
      },
      {
        text: "Company ID",
        datafield: "companyId",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 160,
      },
      {
        text: "Contact No",
        datafield: "contactNo",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 160,
      },
      {
        text: "Email ID",
        datafield: "emailId",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 160,
      },
    ];
  }

  getdatas() {
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
    this.source = { localdata: this.tableData1 };
    this.dataAdapter1 = new jqx.dataAdapter(this.source);
    this.columns1 = [
      {
        text: "Company ID",
        datafield: "companyId",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 200,
      },
      {
        text: "SIM 1",
        datafield: "sim1",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 200,
      },
      {
        text: "SIM 2",
        datafield: "sim2",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 200,
      },
      {
        text: "Plate No",
        datafield: "plateno",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 200,
      },
    ];
  }
  fetchData() {
    var url =
      serverUrl.web +
      "/esim/getIMEIDealerDetail?dealer=" +
      localStorage.getItem("userName") +
      "&imeino=" +
      this.value.imei;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      if (res) {
        res.map((d) => {
          if (d.plateno != "") {
            this.tableData1.push(d);
          } else if (d.plateno == "") {
            this.tableData.push(d);
          }
        });
        this.getdata();
        this.getdatas();
      }
    });
  }
  ngOnInit() {
    this.createForm();
    this.fetchData();
    if (this.value.imei) {
      this.dealerForm.patchValue({
        imeino: this.value.imei,
      });
    }
  }
}
