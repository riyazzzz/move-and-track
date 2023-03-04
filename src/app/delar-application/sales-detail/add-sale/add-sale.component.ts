import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "app-add-sale",
  templateUrl: "./add-sale.component.html",
  styleUrls: ["./add-sale.component.scss"],
})
export class AddSaleComponent implements OnInit {
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  companyName: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  isshow = false;
  salesForm: FormGroup;
  tableData = [];
  imeidetail: any;
  maxDate: string;
  today = new Date();
  Dealer: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }
  getdealerlist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.salesForm.value.distributor = event.value;
  };
  submitBtn() {
    var data;
    data = {
      companyid: localStorage.getItem("corpId"),
      branchid: localStorage.getItem("corpId"),
      invoiceno: this.salesForm.value.InvoiceNo,
      saledistributor: this.salesForm.value.distributor,
      saledate: this.salesForm.value.salesdate,
      totalquantity: this.salesForm.value.salesqty,
      createdby: null,
      createddate: null,
      updatedby: "null",
      updateddate: null,
      salesdetail: this.tableData,
    };
    const url = serverUrl.web + "/sensorise/saveSensoriseSales";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Sales Saved Successfully") {
        this.commonService.showConfirm("Sales Details Added Succesfully");
        this.modalController.dismiss();
      } else {
        this.commonService.showConfirm("Please Contact Support Team");
      }
    });
  }
  click(event) {
    if (this.salesForm.value.SerialNo == "") {
      this.commonService.showConfirm("Enter the Serial Number");
    } else {
      let show = true;
      if (this.myGrid)
        this.myGrid["attrSource"]["originaldata"].map((res) => {
          if (res.serialno == this.salesForm.value.SerialNo) show = false;
        });
      if (show) {
        {
          const url =
            serverUrl.web +
            "/sensorise/getSensoriseSerialNoValidation?companyid=" +
            localStorage.getItem("corpId") +
            "&serialno=" +
            this.salesForm.value.SerialNo;
          this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
            if (res[0].message == "Invalid Serial No") {
              this.commonService.showConfirm(res[0].message);
            } else if (res[0].message == "Serial No Already Exists") {
              this.commonService.showConfirm(res[0].message);
            } else {
              let detailValue = {
                serialno: this.salesForm.value.SerialNo,
              };
              this.tableData.push(detailValue);
              this.reset();
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
                  text: "Serial Number",
                  datafield: "serialno",
                  cellsrenderer: this.renderer,
                  cellsalign: "center",
                  align: "center",
                },
                {
                  text: "Delete",
                  datafield: "Delete",
                  columntype: "button",
                  cellsalign: "center",
                  align: "center",
                  width: 200,
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
      } else {
        this.commonService.showConfirm("Serial No Already Assigned");
      }
    }
  }
  deleteAnalogRow(row: any) {
    this.tableData.splice(row, 1);
    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }
  reset() {
    this.salesForm.patchValue({
      SerialNo: "",
    });
  }
  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.salesForm = this.formBuilder.group({
      distributor: ["", Validators.required],
      salesdate: [today, Validators.required],
      salesqty: ["", Validators.required],
      InvoiceNo: ["", Validators.required],
      SerialNo: [""],
    });
  }
  getDealer() {
    var url = serverUrl.web + "/sensorise/getDealer";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Dealer = res;
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
    this.getDealer();
    this.createForm();
  }
}
