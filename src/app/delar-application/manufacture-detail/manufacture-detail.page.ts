import { Component, OnInit, ViewChild } from "@angular/core";
import { AjaxService } from "../../services/ajax.service";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AlertController, ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicSelectableComponent } from "ionic-selectable";
@Component({
  selector: "app-manufacture-detail",
  templateUrl: "./manufacture-detail.page.html",
  styleUrls: ["./manufacture-detail.page.scss"],
})
export class ManufactureDetailPage implements OnInit {
  ManufactureForm: FormGroup;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  name: boolean = false;
  willDownload = false;
  dataString: any;
  output = "";
  file;
  tableData: any;
  show: boolean = false;
  imeiIssues = [];
  excellKeyValid: boolean = false;
  maxDate: string;
  today = new Date();
  PurchaseOrderNo: any;
  MfgunitList: any;
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private modalController: ModalController
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
          newData["imei"] = jsonData["Sheet1"][i]["imei"] + "";
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
  getpurchaseorderlist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.ManufactureForm.value.PurchaseOrderNo = event.value;
  };
  getmfgunit = (event: { component: IonicSelectableComponent; value: any }) => {
    if (event.value) this.ManufactureForm.value.mfgunit = event.value;
  };
  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.ManufactureForm.patchValue({
      PurchaseOrderNo: "",
      mfgDate: today,
      mfgQty: "",
      mfgunit: "",
      fileupload: "",
    });
  }
  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.ManufactureForm = this.formBuilder.group({
      PurchaseOrderNo: ["", Validators.required],
      mfgQty: ["", Validators.required],
      mfgDate: [today, Validators.required],
      mfgunit: ["", Validators.required],
      fileupload: [this.file, Validators.required],
    });
  }

  SearchData() {
    if (this.dataString.length == 0) {
      this.commonService.showConfirm(
        "check your excell file,don't enter blank spaces"
      );
    } else {
      var excellKeys = Object.keys(this.dataString[0]);
      for (var i = 0; i < excellKeys.length; i++) {
        if (excellKeys[i] == "iccidno1" || excellKeys[i] == "imei") {
          console.log("present");
          this.excellKeyValid = true;
        }
      }
      if (this.name == true && this.excellKeyValid == true) {
        this.imeiIssues = [];
        this.willDownload = true;
        const url =
          serverUrl.web +
          "/sensorise/saveSensoriseManufacture?companyid=" +
          localStorage.getItem("corpId") +
          "&branchid=" +
          localStorage.getItem("corpId") +
          "&orderno=" +
          this.ManufactureForm.value.PurchaseOrderNo +
          "&mfgquantity=" +
          this.ManufactureForm.value.mfgQty +
          "&mfgdate=" +
          this.ManufactureForm.value.mfgDate +
          "&mfgunit=" +
          this.ManufactureForm.value.mfgunit.toUpperCase();
        this.ajaxService
          .ajaxPostWithBody(url, this.dataString)
          .subscribe((res) => {
            if (res.message == "Manufacture Saved Successfully") {
              this.commonService.showConfirm("Manufacture Saved Sucessfully");
              this.clear();
              this.getdatas();
            } else {
              this.commonService.showConfirm(res.message);
            }
          });
      }
    }
  }
  getdatas() {
    var url =
      serverUrl.web +
      "/sensorise/getSensoriseManufactureAll?companyid=" +
      localStorage.getItem("corpId");
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
          text: "Purchase Order Number",
          datafield: "orderno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 180,
        },
        {
          text: "Iccid Number",
          datafield: "iccidno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Imei Number",
          datafield: "imei",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Vltd SNo",
          datafield: "vltdsno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 180,
        },
        {
          text: "Mfg Slot",
          datafield: "mfgslot",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Mfg Quantity",
          datafield: "mfgquantity",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Mfg Date",
          datafield: "mfgdate",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
        {
          text: "Mfg Unit",
          datafield: "mfgunit",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
        },
      ];
    });
  }
  getPurchase() {
    var url =
      serverUrl.web +
      "/sensorise/getPurchase?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.PurchaseOrderNo = res;
    });
  }
  getMfgunit() {
    var url = serverUrl.web + "/sensorise/getMFGUnit";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.MfgunitList = res;
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
    this.getdatas();
    this.getPurchase();
    this.getMfgunit();
    this.createForm();
  }
}
