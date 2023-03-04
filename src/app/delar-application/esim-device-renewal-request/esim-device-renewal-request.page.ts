import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-esim-device-renewal-request",
  templateUrl: "./esim-device-renewal-request.page.html",
  styleUrls: ["./esim-device-renewal-request.page.scss"],
})
export class EsimDeviceRenewalRequestPage implements OnInit {
  RenewalRequestForm: FormGroup;
  slotno = ["10000"];
  show: boolean = false;
  showsubmit: boolean = true;
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
  myPlatform: any;
  pdfdatas: any[];
  head = [
    "Iccid No 1",
    "SIM 1",
    "Provider 1",
    "IMSI 1",
    "Iccid No 2",
    "SIM 2",
    "Provider 2",
    "IMSI 2",
  ];

  constructor(
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private ete: ExportExcelService,
    public platform: Platform
  ) {}

  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.RenewalRequestForm.patchValue({
      renewalrequestNo: "",
    });
    this.show = false;
    this.showsubmit = true;
    this.getdatas();
  }

  reset() {
    this.RenewalRequestForm.patchValue({
      renewalrequestNo: "",
    });
  }

  submit() {
    this.commonService.presentLoader();
    const url =
      serverUrl.web +
      "/esim/getEsimRenewalRequest?companyid=" +
      localStorage.getItem("corpId") +
      "&renewalrequestno=" +
      this.RenewalRequestForm.value.renewalrequestNo;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      if (res.length == 0) {
        this.commonService.showConfirm("Renewal request not available");
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
            text: "Renewal Request Number",
            datafield: "renewalrequestid",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 215,
          },
          {
            text: "Renewal Requested by",
            datafield: "distributor",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 215,
          },
          {
            text: "Request Date",
            datafield: "renewalrequestdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 215,
          },
          {
            text: "Request Quantity",
            datafield: "renewalrequestqty",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 215,
          },
          {
            text: "Validity",
            datafield: "validityperiod",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 215,
          },
          {
            text: "Download",
            datafield: "Download",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            width: 160,
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
    this.RenewalRequestForm = this.formBuilder.group({
      renewalrequestNo: ["", Validators.required],
    });
  }

  getdatas() {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/esim/getEsimRenewalRequest?companyid=" +
      localStorage.getItem("corpId") +
      "&renewalrequestno=";
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
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: "Renewal Request Number",
          datafield: "renewalrequestid",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Renewal Requested by",
          datafield: "distributor",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 199,
        },
        {
          text: "Request Date",
          datafield: "renewalrequestdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 198,
        },
        {
          text: "Request Quantity",
          datafield: "renewalrequestqty",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 199,
        },
        {
          text: "Validity Requested",
          datafield: "validityperiod",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 198,
        },
        {
          text: "Download",
          datafield: "Download",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 150,
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
      "/esim/getRenewalDownloadICCIDno?companyid=" +
      localStorage.getItem("corpId") +
      "&renewalrequestid=" +
      this.selectedRow.renewalrequestid;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Download = res;
      this.pdfdatas = [];
      for (var i = 0; i < this.Download.length; i++) {
        this.pdfdatas.push([
          this.Download[i].iccidno1,
          this.Download[i].sim1,
          this.Download[i].provider1,
          this.Download[i].imsi1,
          this.Download[i].iccidno2,
          this.Download[i].sim2,
          this.Download[i].provider2,
          this.Download[i].imsi2,
        ]);
      }
      let reportData = {
        data: this.pdfdatas,
        headers: this.head,
      };
      this.ete.generateExcel(reportData);
    });
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  newfunc() {
    let data = this.tableData;
    console.log(this.myGrid);

    let coloumnArray = [];

    this.myGrid.attrColumns.map((p) => {
      coloumnArray.push(p.datafield);
    });

    for (let i = 0; i < data.length; i++) {
      let k = Object.keys(data[i]);
      for (let j = 0; j < k.length; j++) {
        if (coloumnArray.includes(k[j]) == false) {
          delete data[i][k[j].toString()];
        }
      }
    }

    let forExcel = [];
    data.map((val) => {
      let newArray = Object.values(val);
      forExcel.push(newArray);
    });

    var Header = Object.keys(data[0]);

    let reportData = {
      title: "Device Renewal Request",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
  }

  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ionViewWillEnter() {
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate +=
      (this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1).toString()
        : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate +=
      this.today.getDate() < 10
        ? "0" + this.today.getDate().toString()
        : this.today.getDate().toString();
    this.reset();
    this.getdatas();
  }
}
