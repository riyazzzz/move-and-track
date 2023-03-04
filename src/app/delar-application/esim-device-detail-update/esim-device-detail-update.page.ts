import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";

@Component({
  selector: "app-esim-device-detail-update",
  templateUrl: "./esim-device-detail-update.page.html",
  styleUrls: ["./esim-device-detail-update.page.scss"],
})
export class EsimDeviceDetailUpdatePage implements OnInit {
  deviceupdateform: FormGroup;
  devicerenewalupdateform1: FormGroup;
  devicerenewalupdateform2: FormGroup;
  devicerenewalupdateform3: FormGroup;
  devicerenewalupdateform4: FormGroup;
  devicerenewalupdateform5: FormGroup;
  statusupdateone: FormGroup;
  statusupdatetwo: FormGroup;
  statusupdatethree: FormGroup;
  statusupdatefour: FormGroup;
  statusupdatefive: FormGroup;
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
  dataStringRenewal: any;
  dataStringstatusupdate: any;
  imeiIssues = [];
  myPlatform: any;
  excellKeyValidRenewal: boolean = false;
  excellKeyValid: boolean = false;

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public platform: Platform
  ) {}

  clear(data?, renewals?) {
    if (data == "ca update") {
      this.deviceupdateform.patchValue({
        fileupload: "",
      });
    } else if (renewals == 1) {
      this.devicerenewalupdateform1.patchValue({
        fileuploadrenewal: "",
      });
    } else if (renewals == 2) {
      this.devicerenewalupdateform2.patchValue({
        fileuploadrenewal: "",
      });
    } else if (renewals == 3) {
      this.devicerenewalupdateform3.patchValue({
        fileuploadrenewal: "",
      });
    } else if (renewals == 4) {
      this.devicerenewalupdateform4.patchValue({
        fileuploadrenewal: "",
      });
    } else if (renewals == 5) {
      this.devicerenewalupdateform5.patchValue({
        fileuploadrenewal: "",
      });
    } else if (data == "renewal update") {
      this.devicerenewalupdateform1.patchValue({
        fileuploadrenewal: "",
      });
      this.devicerenewalupdateform2.patchValue({
        fileuploadrenewal: "",
      });
      this.devicerenewalupdateform3.patchValue({
        fileuploadrenewal: "",
      });
      this.devicerenewalupdateform4.patchValue({
        fileuploadrenewal: "",
      });
      this.devicerenewalupdateform5.patchValue({
        fileuploadrenewal: "",
      });
    } else {
      this.statusupdateone.patchValue({
        renewalstatusupdate: "",
      });
      this.statusupdatetwo.patchValue({
        renewalstatusupdate: "",
      });
      this.statusupdatethree.patchValue({
        renewalstatusupdate: "",
      });
      this.statusupdatefour.patchValue({
        renewalstatusupdate: "",
      });
      this.statusupdatefive.patchValue({
        renewalstatusupdate: "",
      });
    }
  }

  onFileChange(ev, update) {
    if (update == "device ca update") {
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
            jsonData["Sheet1"][i]["imeino"] =
              jsonData["Sheet1"][i]["imeino"].toString();
            json.push(jsonData["Sheet1"][i]);
          }
          this.dataString = json;
          this.output = this.dataString.slice(0, 300).concat("...");
          // this.sendToServer(dataString);
        };
        reader.readAsBinaryString(file);
      } else {
        this.commonService.presentToast(
          "Please insert only excel file (.xlsx)"
        );
      }
    } else if (update == "renewal update") {
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
            jsonData["Sheet1"][i]["imeino"] =
              jsonData["Sheet1"][i]["imeino"].toString();
            jsonData["Sheet1"][i]["renewalrequestdate"] =
              jsonData["Sheet1"][i]["renewalrequestdate"].toString();
            json.push(jsonData["Sheet1"][i]);
          }
          this.dataStringRenewal = json;
          this.output = this.dataString.slice(0, 300).concat("...");
          // this.sendToServer(dataString);
        };
        reader.readAsBinaryString(file);
      } else {
        this.commonService.presentToast(
          "Please insert only excel file (.xlsx)"
        );
      }
    } else if (update == "status update") {
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
            jsonData["Sheet1"][i]["imeino"] =
              jsonData["Sheet1"][i]["imeino"].toString();

            jsonData["Sheet1"][i]["cardactivationdate"] =
              jsonData["Sheet1"][i]["cardactivationdate"].toString();

            jsonData["Sheet1"][i]["cardenddate"] =
              jsonData["Sheet1"][i]["cardenddate"].toString();

            jsonData["Sheet1"][i]["comment"] =
              jsonData["Sheet1"][i]["comment"].toString();

            json.push(jsonData["Sheet1"][i]);
          }
          this.dataStringstatusupdate = json;
          this.output = this.dataString.slice(0, 300).concat("...");
          // this.sendToServer(dataString);
        };
        reader.readAsBinaryString(file);
      } else {
        this.commonService.presentToast(
          "Please insert only excel file (.xlsx)"
        );
      }
    }
  }

  sendToServer(data, renewals) {
    if (data == "ca update") {
      if (this.dataString.length == 0) {
        this.commonService.presentToast(
          "Check your excell file,don't enter blank spaces"
        );
      } else {
        var excellKeys = Object.keys(this.dataString[0]);
        for (var i = 0; i < excellKeys.length; i++) {
          if (
            excellKeys[i] == "vltdno" ||
            excellKeys[i] == "boxno" ||
            excellKeys[i] == "slotno" ||
            excellKeys[i] == "carequestdate"
          ) {
            console.log("present");
            this.excellKeyValid = true;
          }
        }
        if (this.name == true && this.excellKeyValid == true) {
          this.imeiIssues = [];
          this.willDownload = true;

          const url = serverUrl.web + "/esim/saveEsimDetailUpdate?renewalno=";
          this.ajaxService
            .ajaxPostWithBody(url, this.dataString)
            .subscribe((res) => {
              // console.log(res);
              // res == "[]"
              //   ? this.commonService.showConfirm(
              //       "Please insert a value excell file only"
              //     )
              //   : this.commonService.showConfirm("");
              if (res.message == "IMEI No Updated Successfully") {
                this.commonService.showConfirm(res.message);
                this.clear("ca update");
              } else {
                this.commonService.showConfirm(res.message);
              }
            });
        } else {
          this.commonService.presentToast(
            "Please insert valid excel file (.xlsx)"
          );
        }
      }
    } else if (data == "renewal update") {
      if (this.dataStringRenewal.length == 0) {
        this.commonService.presentToast(
          "Check your excell file,don't enter blank spaces"
        );
      } else {
        var excellKeys = Object.keys(this.dataStringRenewal[0]);
        for (var i = 0; i < excellKeys.length; i++) {
          if (excellKeys[i] == "renewalrequestdate") {
            console.log("present");
            this.excellKeyValidRenewal = true;
          }
        }
        if (this.name == true && this.excellKeyValidRenewal == true) {
          this.imeiIssues = [];
          this.willDownload = true;

          const url =
            serverUrl.web +
            "/esim/saveEsimRenewalDetailUpdate?renewalno=" +
            renewals;
          this.ajaxService
            .ajaxPostWithBody(url, this.dataStringRenewal)
            .subscribe((res) => {
              // console.log(res);
              // res == "[]"
              //   ? this.commonService.showConfirm(
              //       "Please insert a value excell file only"
              //     )
              //   : this.commonService.showConfirm("");
              if (res.message == "IMEI No Updated Successfully") {
                this.commonService.showConfirm(res.message);
                this.clear("renewal update");
              } else {
                this.commonService.showConfirm(res.message);
              }
            });
        } else {
          this.commonService.presentToast(
            "Please insert valid excel file (.xlsx)"
          );
        }
      }
    }
    // checking excell keys is valid or not
    else if (data == "status update") {
      if (this.dataStringstatusupdate.length == 0) {
        this.commonService.presentToast(
          "Check your excell file,don't enter blank spaces"
        );
      } else {
        var excellKeys = Object.keys(this.dataStringstatusupdate[0]);
        for (var i = 0; i < excellKeys.length; i++) {
          if (
            excellKeys[i] == "imeino" ||
            excellKeys[i] == "cardactivationdate" ||
            excellKeys[i] == "cardenddate" ||
            excellKeys[i] == "comment"
          ) {
            console.log("present");
            this.excellKeyValidRenewal = true;
          }
        }
        if (this.name == true && this.excellKeyValidRenewal == true) {
          this.imeiIssues = [];
          this.willDownload = true;

          const url =
            serverUrl.web +
            "/esim/saveEsimRenewalStatusUpdate?renewalno=" +
            renewals +
            "&createdby=" +
            localStorage.getItem("userName");
          this.ajaxService
            .ajaxPostWithBody(url, this.dataStringstatusupdate)
            .subscribe((res) => {
              // console.log(res);
              // res == "[]"
              //   ? this.commonService.showConfirm(
              //       "Please insert a value excell file only"
              //     )
              //   : this.commonService.showConfirm("");
              if (res.message == "Esim Renewal Status Saved Successfully") {
                this.commonService.showConfirm(res.message);
                this.clear();
              } else {
                this.commonService.showConfirm(res.message);
              }
            });
        } else {
          this.commonService.presentToast(
            "Please insert valid excel file (.xlsx)"
          );
        }
      }
    }
  }

  ionViewWillEnter() {
    this.clear("ca update");
    this.clear("renewal update");
    this.clear();
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.deviceupdateform = this.formBuilder.group({
      fileupload: ["", Validators.required],
    });
    this.devicerenewalupdateform1 = this.formBuilder.group({
      fileuploadrenewal: ["", Validators.required],
    });
    this.devicerenewalupdateform2 = this.formBuilder.group({
      fileuploadrenewal: ["", Validators.required],
    });
    this.devicerenewalupdateform3 = this.formBuilder.group({
      fileuploadrenewal: ["", Validators.required],
    });
    this.devicerenewalupdateform4 = this.formBuilder.group({
      fileuploadrenewal: ["", Validators.required],
    });
    this.devicerenewalupdateform5 = this.formBuilder.group({
      fileuploadrenewal: ["", Validators.required],
    });
    this.statusupdateone = this.formBuilder.group({
      renewalstatusupdate: ["", Validators.required],
    });
    this.statusupdatetwo = this.formBuilder.group({
      renewalstatusupdate: ["", Validators.required],
    });
    this.statusupdatethree = this.formBuilder.group({
      renewalstatusupdate: ["", Validators.required],
    });
    this.statusupdatefour = this.formBuilder.group({
      renewalstatusupdate: ["", Validators.required],
    });
    this.statusupdatefive = this.formBuilder.group({
      renewalstatusupdate: ["", Validators.required],
    });
  }
}
