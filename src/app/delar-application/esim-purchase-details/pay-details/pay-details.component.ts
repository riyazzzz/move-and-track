import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-pay-details",
  templateUrl: "./pay-details.component.html",
  styleUrls: ["./pay-details.component.scss"],
})
export class PayDetailsComponent implements OnInit {
  @Input() value;
  companyName: any;
  productionForm: FormGroup;
  hideSerialNo: boolean;
  paydetail: any;
  maxDate;
  today = new Date();
  myPlatform: string;
  button: boolean = false;
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
    this.button = true;
    var data;
    data = {
      createdby: localStorage.getItem("userName"),
      headerid: this.value.toString(),
      invoiceno: this.paydetail.invoiceno.toString(),
      paiddate: this.productionForm.value.paiddate + " " + "00:00:00",
      paidamount: this.productionForm.value.paidamount.toString(),
      utrno: this.productionForm.value.utrno.toString(),
    };
    const url = serverUrl.web + "/esim/saveEsimPurchaseInvoiceDetails";
    this.ajaxService
      .ajaxPostWithString(url, JSON.stringify(data))
      .subscribe((res) => {
        if (
          JSON.parse(res).message ==
          "Purchase Invoice Detail Saved Successfully"
        ) {
          this.commonService.showConfirm(
            "Purchase Invoice Detail Saved Successfully"
          );
          this.modalController.dismiss({
            data: "Purchase Invoice Detail Saved Successfully",
          });
          this.button = false;
        } else if (
          res.message == "Purchase Invoice Detail Not Saved Successfully"
        ) {
          this.commonService.showConfirm(res.message);
          this.button = false;
        } else {
          this.commonService.showConfirm(
            "Your Paid Amount is greater than invoice amount"
          );
          this.button = false;
        }
      });
  }

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.productionForm = this.formBuilder.group({
      serviceprovider: [""],
      invoiceno: [""],
      invoiceamount: [""],
      balanceamount: [""],
      totalamountpaid: [""],
      paiddate: [today, Validators.required],
      paidamount: ["", Validators.required],
      utrno: ["", Validators.required],
    });
  }

  reset() {
    this.productionForm.patchValue({
      serviceprovider: "",
      invoiceno: "",
      invoiceamount: "",
      balanceamount: "",
      totalamountpaid: "",
      paiddate: "",
      paidamount: "",
      utrno: "",
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
      serverUrl.web + "/esim/getSingleEsimInvoice?headerid=" + this.value;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      console.log(res);
      {
        this.paydetail = res;
        this.productionForm.patchValue({
          serviceprovider: this.paydetail.serviceprovider,
          invoiceno: this.paydetail.invoiceno,
          invoiceamount: this.paydetail.invoiceamount,
          balanceamount: this.paydetail.balanceamount,
          totalamountpaid: this.paydetail.totalamountpaid,
        });
      }
    });
  }
}
