import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import * as XLSX from "xlsx";
import { FileUploader, FileLikeObject } from "ng2-file-upload";

@Component({
  selector: "app-esim-add-production",
  templateUrl: "./esim-add-production.component.html",
  styleUrls: ["./esim-add-production.component.scss"],
})
export class EsimAddProductionComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  columns: any;
  companyName: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  isshow = false;
  Qty: number;
  productionForm: FormGroup;
  tableData = [];
  imeidetail: any;
  serial: any;
  devicemodellist: any;
  dataString: any = [];
  name: any;
  output: any;
  excellKeyValid: boolean;
  imeiIssues: any[];
  enableFileSubmit: boolean = false;
  enableSubmit: boolean = true;
  myPlatform: string;
  button: boolean = false;
  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  getdevicemodellist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.productionForm.value.devicemodel = event.value;
  };

  onFileChange(ev) {
    var fileName = ev.srcElement.files[0];
    this.name = fileName.name.includes(".xlsx");
    if (this.name == true) {
      this.enableFileSubmit = true;
      this.enableSubmit = false;
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
          newData["iccidno"] = jsonData["Sheet1"][i]["iccidno"].toString();
          newData["imei"] = jsonData["Sheet1"][i]["imei"].toString();
          json.push(newData);
        }
        this.dataString = json;
        this.output = this.dataString.slice(0, 300).concat("...");
      };
      reader.readAsBinaryString(file);
    } else {
      this.commonService.showConfirm("Please insert only excel file (.xlsx)");
      this.enableFileSubmit = false;
      this.enableSubmit = true;
    }
  }

  submitWithExcel() {
    if (
      this.dataString.length == 0 ||
      this.productionForm.value.devicemodel == ""
    ) {
      if (this.dataString.length == 0) {
        this.commonService.showConfirm(
          "check your excell file,don't enter blank spaces"
        );
      } else {
        this.commonService.showConfirm("Please select the device model");
      }
    } else {
      this.button = true;
      var excellKeys = Object.keys(this.dataString[0]);
      for (var i = 0; i < excellKeys.length; i++) {
        if (excellKeys[i] == "iccidno" || excellKeys[i] == "imei") {
          console.log("present");
          this.excellKeyValid = true;
        }
      }
      if (this.name == true && this.excellKeyValid == true) {
        this.commonService.presentLoader();
        this.imeiIssues = [];
        var data;
        data = {
          companyid: localStorage.getItem("corpId"),
          branchid: localStorage.getItem("corpId"),
          serialno: this.productionForm.value.SerialNo,
          quantity: this.Qty,
          createdby: localStorage.getItem("userName"),
          salesdetail: this.dataString,
          devicemodel: this.productionForm.value.devicemodel,
        };
        const url =
          serverUrl.web +
          "/esim/saveEsimBulkProduction?companyid=" +
          localStorage.getItem("corpId") +
          "&branchid=" +
          localStorage.getItem("corpId");
        this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
          if (res) {
            this.commonService.dismissLoader();
          }
          if (res.message == "Production Saved Successfully") {
            this.commonService.showConfirm("Box Detail Added Succesfully");
            this.modalController.dismiss({
              data: "Box Detail Added Succesfully",
            });
            this.reset();
            this.button = false;
          } else {
            this.commonService.showConfirm(res.message);
            this.button = false;
          }
        });
      }
    }
  }

  submitBtn() {
    this.button = true;
    var data;
    data = {
      companyid: localStorage.getItem("corpId"),
      branchid: localStorage.getItem("corpId"),
      serialno: this.productionForm.value.SerialNo,
      quantity: this.Qty,
      createdby: localStorage.getItem("userName"),
      salesdetail: this.tableData,
      devicemodel: this.productionForm.value.devicemodel,
    };
    const url =
      serverUrl.web +
      "/esim/saveEsimProduction?companyid=" +
      localStorage.getItem("corpId") +
      "&branchid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Production Saved Successfully") {
        this.commonService.showConfirm("Box Detail Added Succesfully");
        this.modalController.dismiss({ data: "Box Detail Added Succesfully" });
        this.reset();
        this.button = false;
      } else {
        this.button = false;
        this.commonService.showConfirm(res.message);
      }
    });
  }

  click() {
    if (this.productionForm.value.iccidno == "") {
      this.commonService.showConfirm("Enter the Iccid Number");
    } else if (this.productionForm.value.imeiNo == "") {
      this.commonService.showConfirm("Enter the Imei Number");
    } else if (
      this.productionForm.value.imeiNo.toString().length > 15 ||
      this.productionForm.value.imeiNo.toString().length < 15
    ) {
      this.commonService.showConfirm("Imei No length should be 15 digits");
    } else {
      let show = true;
      if (this.myGrid)
        this.myGrid["attrSource"]["originaldata"].map((res) => {
          if (res.iccidno1 == this.productionForm.value.iccidno) {
            this.commonService.showConfirm("Iccidno No Already Assigned");
            show = false;
          } else if (res.imei == this.productionForm.value.imeiNo) {
            this.commonService.showConfirm("Imei No Already Assigned");
            show = false;
          }
        });
      if (show) {
        {
          const url =
            serverUrl.web +
            "/esim/getSingleEsimManufactureByImei?companyid=" +
            localStorage.getItem("corpId") +
            "&iccidno=" +
            this.productionForm.value.iccidno +
            "&imei=" +
            this.productionForm.value.imeiNo;
          this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
            this.imeidetail = res;
            if (res.message == "Invalid ICCID") {
              this.commonService.showConfirm(res.message);
            } else if (res.message == "ICCID Already Exists") {
              this.commonService.showConfirm(res.message);
            } else if (res.message == "Invalid IMEI") {
              this.commonService.showConfirm(res.message);
            } else if (res.message == "IMEI Already Exists") {
              this.commonService.showConfirm(res.message);
            } else {
              var detailValue = {
                imei: this.imeidetail.imei,
                iccidno: this.imeidetail.iccidno,
                iccidno1: this.imeidetail.iccidno1,
                iccidno2: this.imeidetail.iccidno2,
                vltdsno: this.imeidetail.vltdsno,
              };
              this.tableData.push(detailValue);
              this.reset();
              this.Qty = this.tableData.length;
              this.isshow = true;
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
                  text: "Iccid Number",
                  datafield: "iccidno1",
                  cellsrenderer: this.renderer,
                  cellsalign: "center",
                  align: "center",
                  width: 200,
                },
                {
                  text: "Imei Number",
                  datafield: "imei",
                  cellsrenderer: this.renderer,
                  cellsalign: "center",
                  align: "center",
                  width: 200,
                },
                {
                  text: "Delete",
                  datafield: "Delete",
                  columntype: "button",
                  cellsalign: "center",
                  align: "center",
                  width: 100,
                  cellsrenderer: (): string => {
                    return "Delete";
                  },
                  buttonclick: (row): void => {
                    this.deleteAnalogRow(row);
                  },
                },
              ];
            }
          });
        }
      }
    }
  }

  deleteAnalogRow(row: any) {
    this.tableData.splice(row, 1);
    this.source = { localdata: this.tableData };
    this.Qty = this.tableData.length;
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }

  createForm() {
    this.productionForm = this.formBuilder.group({
      devicemodel: ["", Validators.required],
      SerialNo: [""],
      iccidno: [""],
      imeiNo: [""],
      fileupload: [""],
    });
  }

  reset() {
    this.productionForm.patchValue({
      SerialNo: this.serial,
      iccidno: "",
      imeiNo: "",
      fileupload: "",
    });
  }

  getModellist() {
    var url = serverUrl.web + "/esim/getModel";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.devicemodellist = res;
    });
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    const url =
      serverUrl.web +
      "/esim/generateSerialno?companyid=" +
      localStorage.getItem("corpId");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.serial = res;
    });
    this.getModellist();
    this.createForm();
  }
}
