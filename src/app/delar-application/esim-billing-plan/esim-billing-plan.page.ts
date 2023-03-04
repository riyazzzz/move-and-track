import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import { IonicSelectableComponent } from "ionic-selectable";
import * as XLSX from "xlsx";

@Component({
  selector: "app-esim-billing-plan",
  templateUrl: "./esim-billing-plan.page.html",
  styleUrls: ["./esim-billing-plan.page.scss"],
})
export class EsimBillingPlanPage implements OnInit {
  BillingplanForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: any;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  tableData: any;
  purchasedetails: any;
  name: boolean = false;
  willDownload = false;
  dataString: any;
  output = "";
  file;
  show: boolean = false;
  imeiIssues = [];
  excellKeyValid: boolean = false;
  today = new Date();
  maxDate: string;
  isLoading: boolean;
  Provider: any;
  page = [];
  selectedRow: any;
  hideSerialNo: boolean = false;

  constructor(
    public platform: Platform,
    public loadingController: LoadingController,
    private ajaxService: AjaxService,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {}

  getsimprovider() {
    var url = serverUrl.web + "/esim/getEsimProvider";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Provider = res;
    });
  }

  createForm() {
    this.BillingplanForm = this.formBuilder.group({
      provider: ["", Validators.required],
      planname: ["", Validators.required],
      planamount: ["", Validators.required],
    });
  }

  clear() {
    this.hideSerialNo = false;
    this.BillingplanForm.patchValue({
      provider: "",
      planname: "",
      planamount: "",
    });
  }

  SubmitData() {
    var data;
    data = {
      planid: "",
      planname: this.BillingplanForm.value.planname.toString(),
      provider: this.BillingplanForm.value.provider.toString(),
      planamount: this.BillingplanForm.value.planamount.toString(),
      createdby: localStorage.getItem("userName"),
    };
    const url = serverUrl.web + "/esim/saveEsimBillingPlan";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Esim Billing Plan Saved Successfully") {
        this.commonService.showConfirm(res.message);
        this.clear();
        this.tableData = res;
        this.myGrid.clearselection();
        this.getdatas();
        this.modalController.dismiss();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  edit() {
    var data;
    data = {
      planid: this.selectedRow.planid.toString(),
      planname: this.BillingplanForm.value.planname.toString(),
      provider: this.BillingplanForm.value.provider.toString(),
      planamount: this.BillingplanForm.value.planamount.toString(),
      createdby: localStorage.getItem("userName"),
    };
    const url = serverUrl.web + "/esim/saveEsimBillingPlan";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Esim Billing Plan Saved Successfully") {
        this.commonService.showConfirm(res.message);
        this.clear();
        this.tableData = res;
        this.myGrid.clearselection();
        this.getdatas();
        this.modalController.dismiss();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
    this.clear();
    this.hideSerialNo = false;
  }

  setValue() {
    this.hideSerialNo = true;
    this.BillingplanForm.patchValue({
      planid: this.selectedRow.planid,
      provider: this.selectedRow.provider,
      planname: this.selectedRow.planname,
      planamount: this.selectedRow.planamount,
    });
  }

  delete() {
    var arr = [];
    arr.push({
      provider: this.selectedRow.provider,
      planname: this.selectedRow.planname,
      planamount: this.selectedRow.planamount,
    });
    const url =
      serverUrl.web +
      "/esim/DeleteEsimBillingPlan?planid=" +
      this.selectedRow.planid;
    this.ajaxService.ajaxPostWithString(url, arr).subscribe((response) => {
      let res = JSON.parse(response);
      if (res.message == "Esim Billing Plan Deleted Successfully") {
        this.getdatas();
        this.commonService.showConfirm(res.message);
        this.myGrid.clearselection();
        this.modalController.dismiss();
        this.selectedRow = "";
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  getdatas() {
    this.page = [];
    this.commonService.presentLoader();
    var url = serverUrl.web + "/esim/getEsimBillingPlan";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined || value == ",") {
          return "---";
        } else {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
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
          width: 253,
        },
        {
          text: "Plan Name",
          datafield: "planname",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 253,
        },
        {
          text: "Plan Amount",
          datafield: "planamount",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 253,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 253,
        },
        {
          text: "",
          datafield: "Edit Detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 93,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Edit"
              : "<button>Edit</button>";
          },
          buttonclick: (row): void => {
            this.setValue();
          },
        },
        {
          text: "",
          datafield: "detail",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 93,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "Delete"
              : "<button>Delete</button>";
          },
          buttonclick: (row): void => {
            this.deleteModel();
          },
        },
      ];
    });
  }

  async deleteModel() {
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: " Delete",
        backdropDismiss: false,
        message: "Are you sure you want to delete?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              this.delete();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.commonService.presentToast("Please select a row to Delete");
      return "";
    }
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
    this.show = true;
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
  }

  ionViewWillEnter() {
    this.getdatas();
    this.getsimprovider();
    this.clear();
  }
}
