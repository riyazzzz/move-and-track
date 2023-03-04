import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { serverUrl } from "src/environments/environment";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "app-esim-billing-generation",
  templateUrl: "./esim-billing-generation.page.html",
  styleUrls: ["./esim-billing-generation.page.scss"],
})
export class EsimBillingGenerationPage implements OnInit {
  BillinggenForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  tableData: any;
  Provider: any;
  page = [];
  Planname: any;
  Accountno: any;
  showplaname = false;
  showaccountno = false;
  show: boolean = false;
  details: any;
  totalamount: any;

  constructor(
    public loadingController: LoadingController,
    private ajaxService: AjaxService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.BillinggenForm = this.formBuilder.group({
      provider: ["", Validators.required],
      planname: ["", Validators.required],
      accountno: ["", Validators.required],
      fromdate: [today, Validators.required],
      todate: [today, Validators.required],
    });
  }

  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.BillinggenForm.patchValue({
      provider: "",
      planname: "",
      accountno: "",
      fromdate: today,
      todate: today,
    });
    this.showplaname = false;
    this.showaccountno = false;
    this.show = false;
  }

  reset() {
    this.BillinggenForm.patchValue({
      planname: "",
    });
  }
  resets() {
    this.BillinggenForm.patchValue({
      accountno: "",
    });
  }

  getsimprovider() {
    var url = serverUrl.web + "/esim/getEsimProvider";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Provider = res;
    });
  }

  getplanname = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.BillinggenForm.value.provider = event.value;
    var url =
      serverUrl.web +
      "/esim/getProviderBillingPlan?provider=" +
      this.BillinggenForm.value.provider;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Planname = res;
      if (this.Planname.length == 0) {
        this.showplaname = false;
      } else {
        this.reset();
        this.showplaname = true;
      }
    });
  };

  getaccountno = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.BillinggenForm.value.planname = event.value;
    var url =
      serverUrl.web +
      "/esim/getProviderAccountNo?provider=" +
      this.BillinggenForm.value.provider;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Accountno = res;
      if (this.Accountno.length == 0) {
        this.showaccountno = false;
      } else {
        this.resets();
        this.showaccountno = true;
      }
    });
  };

  gettotalamount() {
    var url =
      serverUrl.web +
      "/esim/getTotalBillAmount?provider=" +
      this.BillinggenForm.value.provider +
      "&planname=" +
      this.BillinggenForm.value.planname +
      "&accountno=" +
      this.BillinggenForm.value.accountno +
      "&fromdate=" +
      this.BillinggenForm.value.fromdate +
      "&todate=" +
      this.BillinggenForm.value.todate;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.totalamount = res;
    });
  }

  SearchData() {
    this.page = [];
    this.commonService.presentLoader();
    var data;
    data = {
      provider: this.BillinggenForm.value.provider.toString(),
      planname: this.BillinggenForm.value.planname.toString(),
      accountno: this.BillinggenForm.value.accountno.toString(),
      fromdate: this.BillinggenForm.value.fromdate.toString(),
      todate: this.BillinggenForm.value.todate.toString(),
      createdby: localStorage.getItem("userName"),
    };

    const url = serverUrl.web + "/esim/getEsimBillingGeneration";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      this.tableData = res;
      this.gettotalamount();
      this.commonService.dismissLoader();
      this.show = true;
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
          text: "Sim Provider",
          datafield: "provider",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Plan Name",
          datafield: "planname",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Account No",
          datafield: "accountno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Sim No",
          datafield: "simno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "From Date",
          datafield: "fromdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "To Date",
          datafield: "todate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Amount",
          datafield: "amount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
      ];
    });
  }

  ngOnInit() {
    this.createForm();
  }

  ionViewWillEnter() {
    this.getsimprovider();
    this.clear();
  }
}
