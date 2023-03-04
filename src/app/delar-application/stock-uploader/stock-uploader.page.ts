import { Component, OnInit, ViewChild } from "@angular/core";
import { AjaxService } from "../../services/ajax.service";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-stock-uploader",
  templateUrl: "./stock-uploader.page.html",
  styleUrls: ["./stock-uploader.page.scss"],
})
export class StockUploaderPage implements OnInit {
  stockform: FormGroup;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
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

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  clear() {
    this.stockform.patchValue({
      fileupload: "",
    });
  }
  reset() {
    this.stockform.patchValue({
      fileupload: "",
    });
    this.show = false;
  }

  onFileChange(ev) {
    this.show = false;
    var fileName = ev.srcElement.files[0];
    this.name = fileName.name.includes(".xlsx");
    if (this.name == true) {
      this.show = false;
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
          jsonData["Sheet1"][i]["IMEI_NO"] =
            jsonData["Sheet1"][i]["IMEI_NO"].toString();
          jsonData["Sheet1"][i]["SIM_NO"] =
            jsonData["Sheet1"][i]["SIM_NO"].toString();
          jsonData["Sheet1"][i]["SIM_NO2"] =
            jsonData["Sheet1"][i]["SIM_NO2"] + "";
          jsonData["Sheet1"][i]["PROVIDER"] =
            jsonData["Sheet1"][i]["PROVIDER"].toString();
          jsonData["Sheet1"][i]["PROVIDER2"] =
            jsonData["Sheet1"][i]["PROVIDER2"] + "";
          jsonData["Sheet1"][i]["MANUFACTURE"] =
            jsonData["Sheet1"][i]["MANUFACTURE"].toString();
          jsonData["Sheet1"][i]["DEALER_ID"] =
            jsonData["Sheet1"][i]["DEALER_ID"] + "";
          json.push(jsonData["Sheet1"][i]);
        }
        this.dataString = json;
        this.output = this.dataString.slice(0, 300).concat("...");
        // this.sendToServer(dataString);
      };
      reader.readAsBinaryString(file);
    } else {
      this.commonService.showConfirm("Please insert only excel file (.xlsx)");
    }
  }

  sendToServer() {
    // checking excell keys is valid or not
    if (this.dataString.length == 0) {
      this.commonService.showConfirm(
        "Check your excell file,don't enter blank spaces"
      );
    } else {
      var excellKeys = Object.keys(this.dataString[0]);
      for (var i = 0; i < excellKeys.length; i++) {
        if (excellKeys[i] == "IMEI_NO" || excellKeys[i] == "MODEL") {
          console.log("present");
          this.excellKeyValid = true;
        }
      }
      if (this.name == true && this.excellKeyValid == true) {
        this.imeiIssues = [];
        this.willDownload = true;
        // let url ="http://localhost:8090/Web/api/vts/comp/inventory";
        const url = serverUrl.web + "/global/comp/inventory";
        // const data = [];
        // data.push(this.dataString["Sheet1"]);
        this.ajaxService
          .ajaxPostWithBody(url, this.dataString)
          .subscribe((res) => {
            console.log(res);
            res == "[]"
              ? this.commonService.showConfirm(
                  "Please insert a value excell file only"
                )
              : this.commonService.showConfirm("uploaded");
            var resDatas = res;
            for (var i = 0; i < resDatas.length; i++) {
              var data = "";
              data += Object.values(resDatas[i]);
              if (data != "Device Persisted") {
                this.imeiIssues.push({
                  imei: Object.keys(resDatas[i]),
                  issue: Object.values(resDatas[i]),
                });
              }
            }
            if (this.imeiIssues.length > 0) {
              this.show = true;
              this.source.localdata = this.imeiIssues;
              // this.source.localdata = [{imei:"121212121212121",issue:"PROVIDER is Missing"}];

              this.clear();
              this.myGrid.updatebounddata();
            }
          });
      } else {
        this.commonService.showConfirm(
          "Please insert valid excel file (.xlsx)"
        );
      }
    }
  }

  getDatas() {
    this.renderer = (row: number, column: any, value: string) => {
      if (value == "" || null || undefined || value == ",") {
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
      // { text: "IMEI", datafield: "imei", cellsrenderer: this.renderer },
      // {text :'Operator',datafield:'operatorName',cellsrenderer:this.renderer},
      // { text: "ISSUE", datafield: "issue", cellsrenderer: this.renderer },
      // {text :'Serial No',datafield:'serialNo',cellsrenderer:this.renderer},
      {
        text: "IMEI",
        datafield: "imei",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
      },
      {
        text: "ISSUE",
        datafield: "issue",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
      },
    ];
  }

  ionViewWillEnter() {
    this.getDatas();
    this.show = false;
    this.clear;
  }

  ngOnInit() {
    this.stockform = this.formBuilder.group({
      fileupload: ["", Validators.required],
    });
    this.getDatas();
  }
}
