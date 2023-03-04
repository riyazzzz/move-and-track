import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { AlertController, ModalController } from "@ionic/angular";
import { AjaxService } from "../../../services/ajax.service";
import { CommonService } from "../../../services/common.service";
import { serverUrl } from "src/environments/environment";
import { Router } from "@angular/router";
import { FilePath } from "@ionic-native/file-path/ngx";
import { PdfLogoService } from "src/app/services/pdf-logo.service";

@Component({
  selector: "app-create-certificate",
  templateUrl: "./create-certificate.component.html",
  styleUrls: ["./create-certificate.component.scss"],
})
export class CreateCertificateComponent implements OnInit {
  @Input() value;
  certificatedetails: FormGroup;
  update = "";
  type = "text";
  type1 = "text";
  minDate: string;
  today = new Date();
  MessageAlert: any;
  RenewalDate = ["1YEAR", "2YEAR"];
  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private modalController: ModalController,
    private router: Router,
    public alertCtrl: AlertController,
    private pdfLogoService: PdfLogoService
  ) {}
  public uploader: FileUploader = new FileUploader({});
  submit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var ddd = String(today.getDate() - 1).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var curDate = dd + "-" + mm + "-" + yyyy;
    var certificatedate = new Date(this.certificatedetails.value.RenewalDate);
    this.method(certificatedate, today);
    this.showConfirm();
  }

  method(date1, date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    var message = days + " days ";
    message += months + " months ";
    message += years + " years \n";
    this.MessageAlert = message;
  }
  async showConfirm() {
    const confirm = await this.alertCtrl.create({
      header: "Are You Sure",
      subHeader: "Certificate Valid Date is",
      message: this.MessageAlert,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.commonService.dismissLoader();
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            this.sendDatas();
          },
        },
      ],
    });
    await confirm.present();
  }
  async sendDatas() {
    var datas;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var ddd = String(today.getDate() - 1).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var curDate = dd + "-" + mm + "-" + yyyy;
    var dateformat = this.certificatedetails.value.RenewalDate.split("-");
    var renewal = dateformat[2] + "-" + dateformat[1] + "-" + dateformat[0];
    datas = {
      RegistraionNo: this.certificatedetails.value.RegistraionNo,
      RegistraionDate: this.certificatedetails.value.RegistraionDate,
      ChassisNo: this.certificatedetails.value.ChassisNo,
      EngineNo: this.certificatedetails.value.EngineNo,
      Make: this.certificatedetails.value.Make,
      Model: this.certificatedetails.value.Model,
      Category: this.certificatedetails.value.Category,
      OwnerName: this.certificatedetails.value.OwnerName,
      OwnerAddress: this.certificatedetails.value.OwnerAddress,
      PhoneNo: this.certificatedetails.value.PhoneNo,
      Emailid: this.certificatedetails.value.Emailid,
      AadharNo: this.certificatedetails.value.AadharNo,
      PanNo: this.certificatedetails.value.PanNo,
      VltdCode: "APM1K2",
      VltdSerialNo: this.certificatedetails.value.VltdSerialNo,
      CenterCode: "122",
      CenterName: "APM KINGSTRACK TECHNOLOGIES",
      DeviceManufactureYear:
        this.certificatedetails.value.DeviceManufactureYear,
      IccidNo: this.certificatedetails.value.IccidNo,
      VltdModelNo: "1819001A/1819001B",
      CertificateActivaton: curDate,
      TacNo: "CL8506",
      CopNo: "CC0GR8735",
      Validitydate: "31-03-2023",
      Certficatevaliddate: renewal,
      Vltdtest: "IRNSS CTOGO0273",
      imeiNumber: this.certificatedetails.value.imeiNumber.toString(),
      Sim1: this.certificatedetails.value.Sim1,
      Sim2: this.certificatedetails.value.Sim2,
      Certifiedby: "International Centre For Automative, Technology(ICAT)",
      InstallationName: this.certificatedetails.value.InstallationName,
      InstallationAddress: this.certificatedetails.value.InstallationAddress,
      RenewalDate: renewal,
      City: this.certificatedetails.value.City,
      Pincode: this.certificatedetails.value.Pincode,
      IssuedName: "APM KINGSTRACK TECHNOLOGIES",
      IssuedAddress:
        "NO-813,5th floor Nizara Bonanza, opp. LIC Building, Anna Salai",
      IssuedCity: "Chennai",
      IssuedPincode: "600002",
      Cameraimei: this.certificatedetails.value.Cameraimei,
      Cameraserial: this.certificatedetails.value.Cameraserial,
      vehicleimage: this.certificatedetails.value.vehicleimage,
      cameraimage: this.certificatedetails.value.cameraimage,
      captureimage: this.certificatedetails.value.captureimage,
      CertificateNo:
        "APMKT" + this.certificatedetails.value.imeiNumber.toString().slice(8),
    };

    const url = serverUrl.web + "/global/save/certificate";
    const file = this.uploader;

    const testData: FormData = new FormData();

    if (file.queue[0]) {
      testData.append("vehicle", file.queue[0]._file);
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("vehicle", default_file);
    }
    if (file.queue[1]) {
      testData.append("capture", file.queue[1]._file);
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("capture", default_file);
    }
    if (file.queue[2]) {
      testData.append("camera", file.queue[2]._file);
    } else {
      const api = await fetch(this.pdfLogoService.imgdata.no_img);
      const blob = await api.blob();
      const default_file = new File([blob], "File name", {
        type: "image/png",
      });
      testData.append("camera", default_file);
    }
    // testData.append("vehicle", file.queue[0]._file);
    // testData.append("capture", file.queue[1]._file);
    // testData.append("camera", file.queue[2]._file);
    testData.append("data", JSON.stringify(datas));
    this.ajaxService.ajaxPutMethod(url, testData).subscribe((res) => {
      console.log(res);
      res = JSON.parse(res);
      if (res.message == "Success") {
        this.commonService.presentToast("Certificate Added Sucessfully");
        this.router.navigateByUrl("/tabs-login/certificate", {
          state: { imeiNumber: this.certificatedetails.value.imeiNumber },
        });
        this.certificatedetails.reset();
        this.modalController.dismiss();
        this.commonService.dismissLoader();
        this.uploader.queue.length = 0;
      } else {
        this.commonService.presentToast(res.message);
        this.commonService.dismissLoader();
      }
    });
  }
  createForm() {
    this.certificatedetails = this.formBuilder.group({
      RegistraionNo: ["", Validators.required],
      RegistraionDate: ["", Validators.required],
      ChassisNo: ["", Validators.required],
      EngineNo: ["", Validators.required],
      Make: ["", Validators.required],
      Model: ["", Validators.required],
      Category: ["", Validators.required],
      OwnerName: ["", Validators.required],
      OwnerAddress: ["", Validators.required],
      PhoneNo: ["", Validators.required],
      Emailid: ["", Validators.required],
      AadharNo: ["", Validators.required],
      PanNo: ["", Validators.required],
      VltdSerialNo: ["", Validators.required],
      DeviceManufactureYear: ["", Validators.required],
      IccidNo: ["", Validators.required],
      imeiNumber: ["", Validators.required],
      Sim1: ["", Validators.required],
      Sim2: [""],
      RenewalDate: ["", Validators.required],
      InstallationName: ["", Validators.required],
      InstallationAddress: ["", Validators.required],
      City: ["", Validators.required],
      Pincode: ["", Validators.required],
      Cameraimei: [""],
      Cameraserial: [""],
      vehicleimage: [""],
      cameraimage: [""],
      captureimage: [""],
    });
  }

  ngOnInit() {
    this.minDate = this.today.getFullYear() + "-";
    this.minDate +=
      (this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1).toString()
        : (this.today.getMonth() + 1).toString()) + "-";
    this.minDate +=
      this.today.getDate() < 10
        ? "0" + this.today.getDate().toString()
        : this.today.getDate().toString();
    this.createForm();
  }
}
