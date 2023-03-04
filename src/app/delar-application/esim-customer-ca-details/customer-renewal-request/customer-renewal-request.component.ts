import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { FileUploader } from "ng2-file-upload";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";

@Component({
  selector: "app-customer-renewal-request",
  templateUrl: "./customer-renewal-request.component.html",
  styleUrls: ["./customer-renewal-request.component.scss"],
})
export class CustomerRenewalRequestComponent implements OnInit {
  @Input() value: any;
  public uploader: FileUploader = new FileUploader({});
  requestForm: FormGroup;
  valid = ["1 Year", "2 Year", "3 Year", "4 Year", "5 Year"];
  show: boolean;
  myPlatform: string;
  button: boolean = false;
  pdfLogoService: any;
  name: boolean = false;
  willDownload = false;
  dataString: any;
  output = "";
  file;
  excellKeyValid: boolean = false;
  imeiIssues = [];

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  createForm() {
    this.requestForm = this.formBuilder.group({
      document: ["", Validators.required],
      validity: ["", Validators.required],
    });
  }

  clear() {
    this.requestForm.patchValue({
      document: "",
      validity: "",
    });
  }

  reset() {
    this.requestForm.patchValue({
      document: "",
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
          newData["imei"] = jsonData["Sheet1"][i]["imei"].toString();
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

  submitBtn() {
    if (this.dataString.length == 0) {
      this.commonService.showConfirm(
        "Check your excell file,don't enter blank spaces"
      );
    } else {
      var excellKeys = Object.keys(this.dataString[0]);
      for (var i = 0; i < excellKeys.length; i++) {
        if (excellKeys[i] == "imei") {
          console.log("present");
          this.excellKeyValid = true;
        }
      }

      if (this.name == true && this.excellKeyValid == true) {
        this.imeiIssues = [];
        this.willDownload = true;
        const url =
          serverUrl.web +
          "/esim/saveEsimBulkRenewalRequest?companyid=apm&dealerid=" +
          localStorage.getItem("userName") +
          "&validityperiod=" +
          this.requestForm.value.validity;
        this.ajaxService
          .ajaxPostWithBody(url, this.dataString)
          .subscribe((res) => {
            if (res.message == "Renewal Request Saved Successfully") {
              this.modalController.dismiss({
                data: "Renewal Request Saved Successfully",
              });
            } else {
              this.commonService.showConfirm(res.message);
              this.reset();
            }
          });
      }
    }
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
  }
}
