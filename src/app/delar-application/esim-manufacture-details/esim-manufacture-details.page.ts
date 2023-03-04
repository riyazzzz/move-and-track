import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";

@Component({
  selector: "app-esim-manufacture-details",
  templateUrl: "./esim-manufacture-details.page.html",
  styleUrls: ["./esim-manufacture-details.page.scss"],
})
export class EsimManufactureDetailsPage implements OnInit {
  EsimdetailsForm: FormGroup;
  selectComponent: IonicSelectableComponent;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
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
  invoice: any;

  constructor(
    public loadingController: LoadingController,
    private ajaxService: AjaxService,
    private router: Router,
    private alertController: AlertController,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {}

  getinvoicelist() {
    var url = serverUrl.web + "/esim/getPurchaseNo";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.invoice = res;
    });
  }

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
          newData["iccidno1"] = jsonData["Sheet1"][i]["iccidno1"].toString();
          newData["sim1"] = jsonData["Sheet1"][i]["sim1"].toString();
          newData["provider1"] = jsonData["Sheet1"][i]["provider1"].toString();
          newData["imsi1"] = jsonData["Sheet1"][i]["imsi1"].toString();
          newData["iccidno2"] = jsonData["Sheet1"][i]["iccidno2"].toString();
          newData["sim2"] = jsonData["Sheet1"][i]["sim2"].toString();
          newData["provider2"] = jsonData["Sheet1"][i]["provider2"].toString();
          newData["imsi2"] = jsonData["Sheet1"][i]["imsi2"].toString();
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
        if (
          excellKeys[i] == "iccidno1" ||
          excellKeys[i] == "sim1" ||
          excellKeys[i] == "provider1" ||
          excellKeys[i] == "imsi1" ||
          excellKeys[i] == "iccidno2" ||
          excellKeys[i] == "sim2" ||
          excellKeys[i] == "provider2" ||
          excellKeys[i] == "imsi2"
        ) {
          console.log("present");
          this.excellKeyValid = true;
        }
      }

      if (this.name == true && this.excellKeyValid == true) {
        this.imeiIssues = [];
        this.willDownload = true;
        const url =
          serverUrl.web +
          "/esim/saveEsimPurchase?companyid=" +
          localStorage.getItem("corpId") +
          "&branchid=" +
          localStorage.getItem("corpId") +
          "&orderno=" +
          this.EsimdetailsForm.value.orderNo +
          "&orderquantity=" +
          this.EsimdetailsForm.value.orderqty;
        this.ajaxService
          .ajaxPostWithBody(url, this.dataString)
          .subscribe((res) => {
            if (res.message == "Purchase Saved Successfully") {
              this.commonService.showConfirm("Sim Detail Saved Successfully");
              this.clear();
              this.getdatas();
            } else {
              this.commonService.showConfirm(res.message);
            }
            this.getinvoicelist();
          });
      }
    }
  }
  clear() {
    this.EsimdetailsForm.patchValue({
      orderNo: "",
      orderqty: "",
      fileupload: "",
    });
    this.invoice = "";
    this.getinvoicelist();
  }

  createForm() {
    this.EsimdetailsForm = this.formBuilder.group({
      orderNo: ["", Validators.required],
      orderqty: ["", Validators.required],
      fileupload: [this.file, Validators.required],
    });
  }

  getdatas() {
    var url =
      serverUrl.web +
      "/esim/getEsimPurchaseAll?companyid=" +
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
          text: "Service Provider",
          datafield: "serviceprovider",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "Invoice No",
          datafield: "orderno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "ICCID No 1",
          datafield: "iccidno1",
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
          width: 150,
        },
        {
          text: "Provider 1",
          datafield: "provider1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "IMSI 1",
          datafield: "imsi1",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "ICCID No 2",
          datafield: "iccidno2",
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
          width: 150,
        },
        {
          text: "Provider 2",
          datafield: "provider2",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 150,
        },
        {
          text: "IMSI 2",
          datafield: "imsi2",
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
    this.EsimdetailsForm.reset();
    this.getdatas();
    this.getinvoicelist();
  }
}
