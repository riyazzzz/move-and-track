import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { FileUploader } from "ng2-file-upload";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { PdfLogoService } from "src/app/services/pdf-logo.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-add-transport-details",
  templateUrl: "./add-transport-details.component.html",
  styleUrls: ["./add-transport-details.component.scss"],
})
export class AddTransportDetailsComponent implements OnInit, OnDestroy {
  tansportForm: FormGroup;
  @Input() value: any;
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  public uploader: FileUploader = new FileUploader({});
  invoiceno: any;
  tableData: any;
  maxDate;
  button: boolean = false;
  today = new Date();
  hideSerialNo: boolean = false;
  Dealer: any;
  myPlatform: string;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private pdfLogoService: PdfLogoService
  ) {}
  cancelBtn() {
    this.modalController.dismiss();
  }

  clear() {
    this.tansportForm.patchValue({
      invoiceno: "",
      transportno: "",
      transportamount: "",
      transportdocument: "",
    });
    this.uploader.queue.length = 0;
  }

  async edit(data) {
    if (data == "edit") {
      this.button = true;
      const file = this.uploader;
      var data;
      data = {
        id: this.value.id.toString(),
        dealer: this.tansportForm.value.dealer.toString(),
        invoiceno: this.tansportForm.value.invoiceno.toString(),
        transportno: this.tansportForm.value.transportno.toString(),
        transportdate: this.tansportForm.value.transportdate + " " + "00:00:00",
        transportamount: this.tansportForm.value.transportamount.toString(),
        createdby: localStorage.getItem("userName"),
      };

      const testData: FormData = new FormData();

      if (file.queue.length != 0) {
        testData.append("TransportDocument", file.queue[0]._file);
        testData.append("data", JSON.stringify(data));
      } else {
        const api = await fetch(this.pdfLogoService.imgdata.no_img);
        const blob = await api.blob();
        const default_file = new File([blob], "File name", {
          type: "image/png",
        });
        testData.append("TransportDocument", default_file);
        testData.append("data", JSON.stringify(data));
      }

      const url = serverUrl.web + "/esim/saveEsimTrasnsportDetails";
      this.ajaxService.ajaxPostWithFile(url, testData).subscribe((res) => {
        if (res.message == "Transport Detail Saved Successfully") {
          this.commonService.showConfirm(res.message);
          this.clear();
          this.modalController.dismiss({ data: "saved success" });
          this.value = {};
          this.button = false;
        } else if (res.message == "Transport Detail Not Saved Successfully") {
          this.commonService.showConfirm(res.message);
          this.clear();
          this.button = false;
        } else {
          this.commonService.showConfirm("Transport Detail already persiste");
          this.button = false;
        }
      });
      this.hideSerialNo = false;
    } else {
      this.button = true;
      const file = this.uploader;
      var data;
      data = {
        id: "",
        dealer: this.tansportForm.value.dealer.toString(),
        invoiceno: this.tansportForm.value.invoiceno.toString(),
        transportno: this.tansportForm.value.transportno.toString(),
        transportdate: this.tansportForm.value.transportdate + " " + "00:00:00",
        transportamount: this.tansportForm.value.transportamount.toString(),
        createdby: localStorage.getItem("userName"),
      };

      const testData: FormData = new FormData();

      if (file.queue.length != 0) {
        testData.append("TransportDocument", file.queue[0]._file);
        testData.append("data", JSON.stringify(data));
      } else {
        const api = await fetch(this.pdfLogoService.imgdata.no_img);
        const blob = await api.blob();
        const default_file = new File([blob], "File name", {
          type: "image/png",
        });
        testData.append("TransportDocument", default_file);
        testData.append("data", JSON.stringify(data));
      }

      const url = serverUrl.web + "/esim/saveEsimTrasnsportDetails";
      this.ajaxService.ajaxPostWithFile(url, testData).subscribe((res) => {
        if (res.message == "Transport Detail Saved Successfully") {
          this.commonService.showConfirm(res.message);
          this.clear();
          this.modalController.dismiss({ data: "saved success" });
          this.button = false;
        } else if (res.message == "Transport Detail Not Saved Successfully") {
          this.commonService.showConfirm(res.message);
          this.clear();
          this.button = false;
        } else {
          this.commonService.showConfirm("Transport Detail already persiste");
          this.button = false;
        }
      });
      this.hideSerialNo = false;
    }
  }

  setValue() {
    var slicedDate = this.value.transportdate.slice(0, 10);
    this.hideSerialNo = true;
    this.tansportForm.patchValue({
      dealer: this.value.dealer,
      invoiceno: this.value.invoiceno,
      transportno: this.value.transportno,
      transportdate: slicedDate,
      transportamount: this.value.transportamount,
    });
  }

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var todaytime = now.getHours() + ":" + now.getMinutes();
    this.tansportForm = this.formBuilder.group({
      dealer: ["", Validators.required],
      invoiceno: ["", Validators.required],
      transportno: ["", Validators.required],
      transportdate: [today, Validators.required],
      transportamount: [""],
      transportdocument: [""],
    });
  }

  getDealer() {
    var url = serverUrl.web + "/esim/getDealer";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.Dealer = res;
    });
  }

  getinvoicelist = (event: {
    component: IonicSelectableComponent;
    value: any;
  }) => {
    if (event.value) this.tansportForm.value.distributor = event.value;
    var url =
      serverUrl.web +
      "/esim/getTransportDealerInvoice?companyid=" +
      localStorage.getItem("corpId") +
      "&dealer=" +
      this.tansportForm.value.distributor;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.invoiceno = res;
    });
  };

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
    if (Object.keys(this.value).length != 0) {
      console.log(this.value);
      this.setValue();
    } else {
      this.clear();
      this.value = {};
    }
    this.getDealer();
  }
  ngOnDestroy(): void {
    this.value = {};
  }
}
