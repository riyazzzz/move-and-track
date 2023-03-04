import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";

@Component({
  selector: "app-purchase-detail",
  templateUrl: "./purchase-detail.page.html",
  styleUrls: ["./purchase-detail.page.scss"],
})
export class PurchaseDetailPage implements OnInit {
  PurchaseForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: (
    | {
        text: string;
        datafield: string;
        cellsrenderer: (row: number, column: any, value: string) => string;
        cellsalign: string;
        align: string;
        width: number;
      }
    | { text: string; datafield: string; cellsrenderer?: undefined }
  )[];
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
  constructor(
    public loadingController: LoadingController,
    private ajaxService: AjaxService,
    private router: Router,
    private alertController: AlertController,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {}

  onFileChange(ev) {
    var fileName = ev.srcElement.files[0];
    this.name = fileName.name.includes(".xlsx");
    if (this.name == true) {
      this.dataString = [];
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.srcElement.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: "binary" });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        let json = [];

        for (let i = 0; i < jsonData["Sheet1"].length; i++) {
          let newData = {};
          newData["iccidno1"] = jsonData["Sheet1"][i]["iccidno"].toString();
          newData["createdby"] =
            localStorage.getItem("userName").toString() + "";
          newData["createddate"] = null;
          newData["updatedby"] = null;
          newData["updateddate"] = null;
          json.push(newData);
        }
        this.dataString = json;
        this.output = this.dataString.slice(0, 300).concat("...");
      };
      reader.readAsBinaryString(file);
    } else {
      this.commonService.showConfirm("please insert only excel file (.xlsx)");
    }
  }
  SearchData() {
    if (this.dataString.length == 0) {
      this.commonService.showConfirm(
        "check your excell file,don't enter blank spaces"
      );
    } else {
      var excellKeys = Object.keys(this.dataString[0]);
      for (var i = 0; i < excellKeys.length; i++) {
        if (excellKeys[i] == "iccidno1") {
          console.log("present");
          this.excellKeyValid = true;
        }
      }
      if (this.name == true && this.excellKeyValid == true) {
        this.imeiIssues = [];
        this.willDownload = true;
        const url =
          serverUrl.web +
          "/sensorise/saveSensorisePurchase?companyid=" +
          localStorage.getItem("corpId") +
          "&branchid=" +
          localStorage.getItem("corpId") +
          "&orderno=" +
          this.PurchaseForm.value.orderNo +
          "&orderdate=" +
          this.PurchaseForm.value.orderDate +
          "&ordertime=" +
          this.PurchaseForm.value.ordertime +
          "&orderquantity=" +
          this.PurchaseForm.value.orderqty;
        this.ajaxService
          .ajaxPostWithBody(url, this.dataString)
          .subscribe((res) => {
            if (res.message == "Purchase Saved Successfully") {
              this.commonService.showConfirm(res.message);
              this.clear();
              this.getpurchasedetails();
            } else {
              this.commonService.showConfirm(res.message);
            }
          });
      }
    }
  }
  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.PurchaseForm.patchValue({
      orderDate: today,
      ordertime: todaytime,
      orderNo: "",
      orderqty: "",
      fileupload: "",
    });
  }
  async srupdate() {
    const alert = await this.alertController.create({
      header: "Enter your Password",
      inputs: [
        {
          type: "text",
          placeholder: "Enter the Password",
          min: 1,
          max: 10,
          name: "password",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {
            this.commonService.dismissLoader();
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            this.senddata(data);
          },
        },
      ],
    });

    await alert.present();
  }
  senddata(data) {
    var url =
      serverUrl.web +
      "/sensorise/passwordAuthentication?password=" +
      data.password;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      if (res.message == "correct password") {
        this.refreshmenu();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }
  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("dismissed"));
  }
  async presentLoader() {
    this.isLoading = true;

    setTimeout(() => {
      this.dismissLoader();
    }, 2000);

    return await this.loadingController
      .create({
        spinner: "circles",
        message: "Please Wait!",
        translucent: false,
        cssClass: "custom-loader-class",
      })
      .then((a) => {
        a.present().then(() => {
          console.log("presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort presenting"));
          }
        });
      });
  }
  refreshmenu() {
    var url =
      serverUrl.web +
      "/sensorise/updateSensoriseSRStatus?companyid=" +
      localStorage.getItem("corpId") +
      "&branchid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.presentLoader();
      if (res.message == "SR Status Updated Successfully") {
        this.commonService.showConfirm("SR Status Saved Successfully");
        this.getpurchasedetails();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }
  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.PurchaseForm = this.formBuilder.group({
      orderNo: ["", Validators.required],
      orderDate: [today, Validators.required],
      ordertime: [todaytime, Validators.required],
      orderqty: ["", Validators.required],
      fileupload: [this.file, Validators.required],
    });
  }
  getpurchasedetails() {
    var url =
      serverUrl.web +
      "/sensorise/getSensorisePurchaseAll?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;

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
          text: "Purchase Order Number",
          datafield: "orderno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Purchase Order Date",
          datafield: "orderdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Purchase Order Quantity",
          datafield: "orderquantity",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Iccid Number",
          datafield: "iccidno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 153,
        },
        {
          text: "Sim 1",
          datafield: "sim1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Sim 2",
          datafield: "sim2",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Commercial Activation Date",
          datafield: "commercialactivationdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 230,
        },
        {
          text: "Card End Date",
          datafield: "cardenddate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Card State",
          datafield: "cardstate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Card Status",
          datafield: "cardstatus",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Last SR Action",
          datafield: "lastsraction",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Last SR Product",
          datafield: "lastsrproduct",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 180,
        },
        {
          text: "Last SR Date",
          datafield: "lastsrdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
      ];
    });
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
    this.getpurchasedetails();
    this.createForm();
  }
}
