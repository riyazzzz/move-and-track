import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-bulk-extend",
  templateUrl: "./bulk-extend.component.html",
  styleUrls: ["./bulk-extend.component.scss"],
})
export class BulkExtendComponent implements OnInit {
  topupForm: FormGroup;
  @Input() value: any;
  tableData: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild("myGrid", { static: false })
  myGrid: jqxGridComponent;
  columns: any;
  dataString: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.topupForm = this.formBuilder.group({
      comment: ["", Validators.required],
    });
  }

  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.topupForm.patchValue({
      comment: "",
    });
  }

  cancelBtn() {
    this.modalController.dismiss();
  }

  submitBtn() {
    const arr = [];
    this.value.map((data) => {
      arr.push({ ...data, comment: this.topupForm.value.comment });
    });
    const url = serverUrl.web + "/esim/saveEsimBulkExtendOneYearStatus";
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      if (res.message == "Extend One Year Status Updated Successfully") {
        this.commonService.showConfirm(res.message);
        this.modalController.dismiss({
          data: "Extend One Year Status Updated Successfully",
        });
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  getdatas() {
    this.tableData = this.value;
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
        text: "IMEI No",
        datafield: "imei",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 210,
      },

      {
        text: "Topup Requested",
        datafield: "validityperiod",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 210,
      },
    ];
  }

  ngOnInit() {
    this.createForm();
    if (Object.keys(this.value).length != 0) {
      console.log(this.value.validityperiod);
      this.topupForm.patchValue({
        extendoneyearvaliditymonth: this.value.validityperiod,
      });
      this.getdatas();
    }
  }
}
