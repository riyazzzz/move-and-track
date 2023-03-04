import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
@Component({
  selector: "app-ca-request",
  templateUrl: "./ca-request.page.html",
  styleUrls: ["./ca-request.page.scss"],
})
export class CARequestPage implements OnInit {
  CaRequestForm: FormGroup;
  slotno = ["10000"];
  show: boolean = false;
  showsubmit: boolean = true;
  srstatus: any;
  source: { localdata: any };
  dataAdapter: any;
  maxDate: string;
  today = new Date();
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  tableData: any;
  selectedRow: any;
  Download: any;
  pdfdatas: any[];
  head = ["ICCID"];
  constructor(
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private ete: ExportExcelService
  ) {}
  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.CaRequestForm.patchValue({
      carequestNo: "",
      SrNo: "",
      SrDate: "",
      Srstatus: "",
    });
    this.getdatas();
    this.show = false;
    this.showsubmit = true;
  }
  submit() {
    const url =
      serverUrl.web +
      "/sensorise/getSensoriseCARequest?companyid=" +
      localStorage.getItem("corpId") +
      "&carequestno=" +
      this.CaRequestForm.value.carequestNo +
      "&srno=" +
      this.CaRequestForm.value.SrNo +
      "&srdate=" +
      this.CaRequestForm.value.SrDate +
      "&srstatus=" +
      this.CaRequestForm.value.Srstatus;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      if (res.length == 0) {
        this.commonService.showConfirm("SR status not available");
      } else {
        this.show = true;
        this.showsubmit = false;
        this.renderer = (row: number, column: any, value: string) => {
          if (value == "" || null || undefined) {
            return "----";
          } else {
            return (
              '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px;">' +
              value +
              "</span>"
            );
          }
        };
        this.source = { localdata: this.tableData };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          {
            text: "CA Request Number",
            datafield: "carequestid",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "Distributor",
            datafield: "distributor",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "Request Date",
            datafield: "carequestdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "Request Quantity",
            datafield: "carequestqty",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "SR Number",
            datafield: "srno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "SR Date",
            datafield: "srdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "SR Status",
            datafield: "srStatus",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
          },
          {
            text: "Download",
            datafield: "Download",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            cellsrenderer: (): string => {
              return "Download";
            },
            buttonclick: (row): void => {
              this.download();
            },
          },
        ];
      }
    });
  }
  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.CaRequestForm = this.formBuilder.group({
      carequestNo: [""],
      SrNo: [""],
      SrDate: [""],
      Srstatus: [""],
    });
  }
  getdatas() {
    var url =
      serverUrl.web +
      "/sensorise/getSensoriseCARequest?companyid=" +
      localStorage.getItem("corpId") +
      "&carequestno=&srno=&srdate=&srstatus";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return "-----";
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
          text: "CA Request Number",
          datafield: "carequestid",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Distributor",
          datafield: "distributor",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Request Date",
          datafield: "carequestdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Request Quantity",
          datafield: "carequestqty",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "SR Number",
          datafield: "srno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "SR Date",
          datafield: "srdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "SR Status",
          datafield: "srStatus",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Download",
          datafield: "Download",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          cellsrenderer: (): string => {
            return "Download";
          },
          buttonclick: (row): void => {
            this.download();
          },
        },
      ];
    });
  }
  download() {
    var url =
      serverUrl.web +
      "/sensorise/getSensoriseDownloadICCIDno?companyid=" +
      localStorage.getItem("corpId") +
      "&carequestid=" +
      this.selectedRow.carequestid;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Download = res;
      this.pdfdatas = [];
      for (var i = 0; i < this.Download.length; i++) {
        this.pdfdatas.push([this.Download[i].iccidno]);
      }
      let reportData = {
        data: this.pdfdatas,
        headers: this.head,
      };
      this.ete.generateExcel(reportData);
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  ngOnInit() {
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate +=
      (this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1).toString()
        : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate +=
      this.today.getDate() < 10
        ? "0" + this.today.getDate().toString()
        : this.today.getDate().toString();
    this.getdatas();
    this.createForm();
  }
}
