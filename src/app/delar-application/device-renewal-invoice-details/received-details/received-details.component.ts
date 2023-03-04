import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-received-details",
  templateUrl: "./received-details.component.html",
  styleUrls: ["./received-details.component.scss"],
})
export class ReceivedDetailsComponent implements OnInit {
  @Input() value;
  companyName: any;
  receiveForm: FormGroup;
  hideSerialNo: boolean;
  receivedetail: any;
  maxDate;
  today = new Date();
  myPlatform: string;

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

  submitBtn() {
    var data;
    data = {
      createdby: localStorage.getItem("userName"),
      headerid: this.value.toString(),
      receiveddate: this.receiveForm.value.receiveddate + " " + "00:00:00",
      receivedamount: this.receiveForm.value.receivedamount.toString(),
      suppliedunits: this.receiveForm.value.suppliedunits.toString(),
    };
    const url = serverUrl.web + "/esim/saveEsimRenewalInvoiceDetails";
    this.ajaxService
      .ajaxPostWithString(url, JSON.stringify(data))
      .subscribe((res) => {
        if (
          JSON.parse(res).message == "Renewal Invoice Detail Saved Successfully"
        ) {
          this.commonService.showConfirm(
            "Renewal Invoice Detail Saved Successfully"
          );
          this.modalController.dismiss({
            data: "Renewal Invoice Detail Saved Successfully",
          });
        } else if (
          res.message == "Renewal Invoice Detail Not Saved Successfully"
        ) {
          this.commonService.showConfirm(
            "Renewal Invoice Detail Not Saved Successfully"
          );
        } else {
          this.commonService.showConfirm(
            "Your Amount is greater than invoice amount"
          );
        }
      });
  }

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.receiveForm = this.formBuilder.group({
      dealerid: [""],
      invoiceno: [""],
      invoiceamount: [""],
      totalamountreceived: [""],
      balanceamount: [""],
      noofunits: [""],
      receiveddate: [today, Validators.required],
      receivedamount: ["", Validators.required],
      suppliedunits: [""],
    });
  }

  reset() {
    this.receiveForm.patchValue({
      dealerid: "",
      invoiceno: "",
      invoiceamount: "",
      totalamountreceived: "",
      balanceamount: "",
      noofunits: "",
      receiveddate: "",
      receivedamount: "",
      suppliedunits: "",
    });
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate +=
      (this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1).toString()
        : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate +=
      this.today.getDate() < 10
        ? "0" + this.today.getDate().toString()
        : this.today.getDate().toString();

    console.log(this.value);
    const url =
      serverUrl.web +
      "/esim/getSingleRenewalEsimInvoice?headerid=" +
      this.value;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      console.log(res);
      {
        this.receivedetail = res;
        this.receiveForm.patchValue({
          dealerid: this.receivedetail.dealerid,
          invoiceno: this.receivedetail.invoiceno,
          invoiceamount: this.receivedetail.invoiceamount,
          totalamountreceived: this.receivedetail.totalamountreceived,
          balanceamount: this.receivedetail.balanceamount,
          noofunits: this.receivedetail.noofunits,
        });
      }
    });
  }
}
