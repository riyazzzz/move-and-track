import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { AlertController, ModalController } from "@ionic/angular";
import { AjaxService } from "../../../services/ajax.service";
import { CommonService } from "../../../services/common.service";
import { serverUrl } from "src/environments/environment";
import { Router } from "@angular/router";
import { FilePath } from "@ionic-native/file-path/ngx";
import { PdfLogoService } from "../../../services/pdf-logo.service";
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
  imeiDatas: any;
  logo: string;
  MessageAlert: string;
  certificatedata: any;
  constructor(
    private pdfLogoService: PdfLogoService,
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private modalController: ModalController,
    private router: Router,
    public alertCtrl: AlertController
  ) {}
  public uploader: FileUploader = new FileUploader({});

  tst() {
    const url1 =
      serverUrl.web +
      "/global/getInventorydevice?imeiNo=" +
      this.certificatedetails.value.imeiNumber;
    this.ajaxService.ajaxGetJson(url1).subscribe((res) => {
      console.log(res);

      this.imeiDatas = res;
    });
  }

  cancelBtn() {
    this.modalController.dismiss();
  }

  submit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var ddd = String(today.getDate() - 1).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var yyyyy = today.getFullYear() + 1;
    let curDate = dd + "-" + mm + "-" + yyyy;
    let OneyearDate = ddd + "-" + mm + "-" + yyyyy;
    if (
      this.certificatedetails.value.EngineNo == null ||
      this.certificatedetails.value.EngineNo == ""
    ) {
      this.certificatedetails.value.EngineNo = "N/A";
    }
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
  sendDatas() {
    if (!this.value) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var ddd = String(today.getDate() - 1).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      var yyyyy = today.getFullYear() + 1;
      let curDate = dd + "-" + mm + "-" + yyyy;
      let OneyearDate = ddd + "-" + mm + "-" + yyyyy;
      var dateformat = this.certificatedetails.value.RenewalDate;
      var datas = {
        RegistraionNo: this.certificatedetails.value.RegistraionNo,
        RTO: this.certificatedetails.value.RTO,
        ChassisNo: this.certificatedetails.value.ChassisNo,
        EngineNo: this.certificatedetails.value.EngineNo,
        OwnerName: this.certificatedetails.value.OwnerName,
        OwnerAddress: this.certificatedetails.value.OwnerAddress,
        PhoneNo: this.certificatedetails.value.PhoneNo,
        RenewalDate: dateformat,
        CenterName:
          "APM KINGSTRACK TECHNOLOGIES,NO-813,5th floor Nizara Bonanza, opp. LIC Building, Anna Salai,Chennai-600002",
        VltdModelNo: "1819001A",
        Validitydate: OneyearDate,
        Certficatevaliddate: curDate,
        CDACNo: "CDAC-CR057",
        Vltdtest: "IRNSS CTOGO0273",
        imeiNumber: this.certificatedetails.value.imeiNumber,
        Sim1: this.imeiDatas.simCardNo,
        Sim2: this.imeiDatas.additionalSimcard1,
        Certifiedby:
          "International Centre For Automative, Technology(ICAT) & Centre for Development of Advanced Computing (C-DAC)",
        InstallationName: this.certificatedetails.value.InstallationName,
        IssuedName: "APM KINGSTRACK TECHNOLOGIES",
        IssuedAddress: "NO-813,5th floor Nizara Bonanza, opp. LIC Building",
        IssuedCity: "Anna Salai,Chennai",
        IssuedPincode: "600002",
        vehicleimage: this.certificatedetails.value.vehicleimage,
        cameraimage: this.certificatedetails.value.cameraimage,
        captureimage: this.certificatedetails.value.vehicleimage,
        CertificateNo:
          "APMKT" + this.certificatedetails.value.imeiNumber.slice(8),
      };

      const url = serverUrl.web + "/global/save/certificate";
      const file = this.uploader;

      const testData: FormData = new FormData();
      if (file.queue.length != 0) {
        testData.append("vehicle", file.queue[0]._file);
        testData.append("capture", file.queue[0]._file);
        testData.append("camera", file.queue[1]._file);
        testData.append("data", JSON.stringify(datas));
        this.ajaxService.ajaxPutMethod(url, testData).subscribe((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.message == "Success") {
            this.commonService.presentToast("Certificate Added Sucessfully");
            this.router.navigateByUrl("/tabs-login/custom-certificate", {
              state: { imeiNumber: this.certificatedetails.value.imeiNumber },
            });
            this.certificatedetails.reset();
            this.modalController.dismiss();
            this.commonService.dismissLoader();
          } else {
            this.commonService.presentToast("Please contact support team");
            this.commonService.dismissLoader();
          }
        });
      } else {
        fetch(this.pdfLogoService.imgdata.no_img)
          .then((res) => res.blob())
          .then((blob) => {
            var default_file = new File([blob], "File name", {
              type: "image/png",
            });
            testData.append("vehicle", default_file);
            testData.append("capture", default_file);
            testData.append("camera", default_file);
            testData.append("data", JSON.stringify(datas));
            this.ajaxService.ajaxPutMethod(url, testData).subscribe((res) => {
              console.log(res);
              res = JSON.parse(res);
              if (res.message == "Success") {
                this.commonService.presentToast(
                  "Certificate Added Sucessfully"
                );
                this.router.navigateByUrl("/tabs-login/custom-certificate", {
                  state: {
                    imeiNumber: this.certificatedetails.value.imeiNumber,
                  },
                });
                this.certificatedetails.reset();
                this.modalController.dismiss();
                this.commonService.dismissLoader();
              } else {
                this.commonService.presentToast("Please contact support team");
                this.commonService.dismissLoader();
              }
            });
          });
      }
    } else {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var ddd = String(today.getDate() - 1).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      var yyyyy = today.getFullYear() + 1;
      let curDate = dd + "-" + mm + "-" + yyyy;
      let OneyearDate = ddd + "-" + mm + "-" + yyyyy;
      var data = {
        RegistraionNo: this.certificatedetails.value.RegistraionNo,
        RTO: this.certificatedetails.value.RTO,
        ChassisNo: this.certificatedetails.value.ChassisNo,
        EngineNo: this.certificatedetails.value.EngineNo,
        OwnerName: this.certificatedetails.value.OwnerName,
        OwnerAddress: this.certificatedetails.value.OwnerAddress,
        PhoneNo: this.certificatedetails.value.PhoneNo,
        RenewalDate: this.certificatedetails.value.RenewalDate,
        CenterName:
          "APM KINGSTRACK TECHNOLOGIES,NO-813,5th floor Nizara Bonanza, opp. LIC Building, Anna Salai,Chennai-600002",
        VltdModelNo: "1819001A",
        Validitydate: OneyearDate,
        Certficatevaliddate: curDate,
        CDACNo: "CDAC-CR057",
        Vltdtest: "IRNSS CTOGO0273",
        imeiNumber: this.certificatedetails.value.imeiNumber,
        Sim1: this.imeiDatas.simCardNo,
        Sim2: this.imeiDatas.additionalSimcard1,
        Certifiedby:
          "International Centre For Automative, Technology(ICAT) & Centre for Development of Advanced Computing (C-DAC)",
        InstallationName: this.certificatedetails.value.InstallationName,
        IssuedName: "APM KINGSTRACK TECHNOLOGIES",
        IssuedAddress: "NO-813,5th floor Nizara Bonanza, opp. LIC Building",
        IssuedCity: "Anna Salai,Chennai",
        IssuedPincode: "600002",
        vehicleimage: this.certificatedetails.value.vehicleimage,
        cameraimage: this.certificatedetails.value.cameraimage,
        captureimage: this.certificatedetails.value.vehicleimage,
        CertificateNo:
          "APMKT" + this.certificatedetails.value.imeiNumber.slice(8),
      };

      const url = serverUrl.web + "/global/save/certificate";
      const file = this.uploader;

      const testData: FormData = new FormData();
      if (file.queue.length != 0) {
        testData.append("vehicle", file.queue[0]._file);
        testData.append("capture", file.queue[0]._file);
        testData.append("camera", file.queue[1]._file);
        testData.append("data", JSON.stringify(data));
        this.ajaxService.ajaxPutMethod(url, testData).subscribe((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.message == "Success") {
            this.commonService.presentToast("Certificate Updated Sucessfully");
            this.router.navigateByUrl("/tabs-login/custom-certificate", {
              state: { imeiNumber: this.certificatedetails.value.imeiNumber },
            });
            this.certificatedetails.reset();
            this.modalController.dismiss();
            this.commonService.dismissLoader();
          } else {
            this.commonService.presentToast("Please contact support team");
            this.commonService.dismissLoader();
          }
        });
      } else {
        fetch(this.pdfLogoService.imgdata.no_img)
          .then((res) => res.blob())
          .then((blob) => {
            var default_file = new File([blob], "File name", {
              type: "image/png",
            });
            testData.append("vehicle", default_file);
            testData.append("capture", default_file);
            testData.append("camera", default_file);
            testData.append("data", JSON.stringify(data));
            this.ajaxService.ajaxPutMethod(url, testData).subscribe((res) => {
              console.log(res);
              res = JSON.parse(res);
              if (res.message == "Success") {
                this.commonService.presentToast(
                  "Certificate Updated Sucessfully"
                );
                this.router.navigateByUrl("/tabs-login/custom-certificate", {
                  state: {
                    imeiNumber: this.certificatedetails.value.imeiNumber,
                  },
                });
                this.certificatedetails.reset();
                this.modalController.dismiss();
                this.commonService.dismissLoader();
              } else {
                this.commonService.presentToast("Please contact support team");
                this.commonService.dismissLoader();
              }
            });
          });
      }
    }
  }
  createform() {
    this.certificatedetails = this.formBuilder.group({
      RegistraionNo: ["", Validators.required],
      RTO: ["", Validators.required],
      // RegistraionDate:['',Validators.required],
      ChassisNo: ["", Validators.required],
      EngineNo: [""],
      // Make:['',Validators.required],
      // Model:['',Validators.required],
      // Category:['',Validators.required],
      OwnerName: ["", Validators.required],
      OwnerAddress: ["", Validators.required],
      PhoneNo: ["", Validators.required],
      // Emailid:['',Validators.required],
      // AadharNo:['',Validators.required],
      // PanNo:['',Validators.required],
      // VltdSerialNo:['',Validators.required],
      // DeviceManufactureYear:['',Validators.required],
      // IccidNo:['',Validators.required],
      // CertificateActivaton:['',Validators.required],
      // Certficatevaliddate:['',Validators.required],
      imeiNumber: ["", Validators.required],
      RenewalDate: ["", Validators.required],
      // Sim1:['',Validators.required],
      // Sim2:['',Validators.required],
      InstallationName: ["", Validators.required],
      // InstallationAddress:['',Validators.required],
      // City:['',Validators.required],
      // Pincode:['',Validators.required],
      // Cameraimei:[''],
      // Cameraserial:[''],
      vehicleimage: [""],
      cameraimage: [""],
      // captureimage:[''],
    });
  }
  editform() {
    if (this.value) {
      const url1 =
        serverUrl.web + "/global/getInventorydevice?imeiNo=" + this.value;
      this.ajaxService.ajaxGetJson(url1).subscribe((res) => {
        console.log(res);

        this.imeiDatas = res;
      });
      const url =
        serverUrl.web + "/global/get/certificate?imeiNo=" + this.value;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        this.certificatedata = JSON.parse(res.certificatedetails);
        this.certificatedetails.patchValue({
          RegistraionNo: this.certificatedata.RegistraionNo,
          RTO: this.certificatedata.RTO,
          ChassisNo: this.certificatedata.ChassisNo,
          EngineNo: this.certificatedata.EngineNo,
          OwnerName: this.certificatedata.OwnerName,
          OwnerAddress: this.certificatedata.OwnerAddress,
          PhoneNo: this.certificatedata.PhoneNo,
          imeiNumber: this.certificatedata.imeiNumber,
          RenewalDate: this.certificatedata.RenewalDate,
          InstallationName: this.certificatedata.InstallationName,
          vehicleimage: this.certificatedata.vehicleimage,
          cameraimage: this.certificatedata.cameraimage,
        });
      });
    }
  }
  ngOnInit() {
    this.logo =
      "https://kingstrackimages.s3.amazonaws.com/loginimages/track_apmkingstrack_com_background.jpg";
    this.createform();
    this.editform();
  }
}
