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
  selector: "app-esim-accounts-mapping",
  templateUrl: "./esim-accounts-mapping.page.html",
  styleUrls: ["./esim-accounts-mapping.page.scss"],
})
export class EsimAccountsMappingPage implements OnInit {
  accountmapForm: FormGroup;
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
  Provider: any;
  page = [];

  constructor(
    public loadingController: LoadingController,
    private ajaxService: AjaxService,
    private router: Router,
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
          newData["simno"] = jsonData["Sheet1"][i]["simno"].toString();
          json.push(newData);
        }
        this.dataString = json;
        this.output = this.dataString.slice(0, 300).concat("...");
      };
      reader.readAsBinaryString(file);
    } else {
      this.commonService.showConfirm("Please insert only excel file (.xlsx)");
    }
  }

  createForm() {
    this.accountmapForm = this.formBuilder.group({
      provider: ["", Validators.required],
      accountno: ["", Validators.required],
      fileupload: [this.file, Validators.required],
    });
  }

  clear() {
    this.accountmapForm.patchValue({
      provider: "",
      accountno: "",
      fileupload: "",
    });
  }

  SubmitData() {
    // this.commonService.presentLoader();
    if (this.dataString.length == 0) {
      this.commonService.showConfirm(
        "Check your excell file,don't enter blank spaces"
      );
    } else {
      var excellKeys = Object.keys(this.dataString[0]);
      for (var i = 0; i < excellKeys.length; i++) {
        if (excellKeys[i] == "simno") {
          console.log("present");
          this.excellKeyValid = true;
        }
      }

      if (this.name == true && this.excellKeyValid == true) {
        var data = [];
        this.willDownload = true;

        this.dataString.map((d) => {
          data.push({
            provider: this.accountmapForm.value.provider,
            accountno: this.accountmapForm.value.accountno,
            simno: d.simno,
            createdby: localStorage.getItem("userName"),
          });
        });

        const url = serverUrl.web + "/esim/saveEsimAccountMapping";
        this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
          if (res) {
            // this.commonService.dismissLoader();
          }
          if (res.message == "Esim Account Mapping Saved Successfully") {
            this.commonService.showConfirm(res.message);
            this.clear();
            this.getdatas();
          } else {
            this.commonService.showConfirm(res.message);
            this.clear();
          }
        });
      }
    }
  }

  getdatas() {
    this.page = [];
    this.commonService.presentLoader();
    var url = serverUrl.web + "/esim/getAllEsimAccountMapping";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined || value == ",") {
          return "--";
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
          width: 200,
        },
        {
          text: "Account No",
          datafield: "accountno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "ICCID No",
          datafield: "iccidno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "SIM No",
          datafield: "simno",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "IMEI No",
          datafield: "imeino",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
        {
          text: "Created by",
          datafield: "createdby",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 200,
        },
      ];
    });
  }

  ngOnInit() {
    this.createForm();
  }

  ionViewWillEnter() {
    this.getdatas();
    this.getsimprovider();
    this.clear();
  }
}
