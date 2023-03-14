import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { app, serverUrl } from "src/environments/environment";

@Component({
  selector: "app-company-creation",
  templateUrl: "./company-creation.component.html",
  styleUrls: ["./company-creation.component.scss"],
})
export class CompanyCreationComponent implements OnInit {
  @Input() value: any;
  isData: boolean = false;
  CompanyInput: boolean = false;
  addCompany: FormGroup;
  datas;
  vehicle: FormGroup;
  companyId: string[];
  companydetails: boolean;
  companyDetail: { companyID: string; userId: string };
  assests: boolean = true;
  countryCode;
  suffix: string;
  region = { India: "Asia/Kolkata", "Saudi Arabia": "Asia/Riyadh" };
  country: any;
  selectedCompany: string;
  assertCategories = [
    "Car",
    "Bike",
    "Bus",
    "Truck",
    "Auto",
    "Fork Lifts",
    "Light Towers",
    "Welding Machines",
    "Deepsea Generator",
    "Compressors",
    "32kw CEM7 Generators",
    "Battery",
    "Bobcat",
    "Tanker",
    "Loader",
    "Dabbab",
    "Dumper",
    "Street Sweeper",
    "Towed Street Sweeper",
    "Compactor",
    "Double Cabin",
    "Hook Lift",
    "Crane",
    "Small Truck",
  ];

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  viewcompany() {
    this.companydetails = true;
    this.assests = false;
  }
  dismisscompany() {
    this.companydetails = false;
    this.reset();
    this.assests = true;
  }

  omit_special_char(event) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }
  // createForm() {
  //   this.addCompany = this.formBuilder.group({
  //     companyId: ["", Validators.required],
  //     imeiNo: [""],
  //     companyName: ["", Validators.required],
  //     email: ["", Validators.required],
  //     contactNo: [""],
  //     address: ["", Validators.required],
  //     city: ["", Validators.required],
  //     country: ["", Validators.required],
  //   });
  //   this.vehicle = this.formBuilder.group({
  //     // companyId: ["", Validators.required],
  //     plateNo: ["", Validators.required],
  //     assetCategory: ["", Validators.required],
  //     engineno: "",
  //     chassisno: "",
  //   });
  // }

  createForm() {
    this.addCompany = this.formBuilder.group({
      companyId: [""],
      imeiNo: [""],
      companyName: ["", Validators.required],
      email: ["", Validators.required],
      contactNo: [""],
      address: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
    });
    this.vehicle = this.formBuilder.group({
      plateNo: ["", Validators.required],
      assetCategory: ["", Validators.required],
      engineno: "",
      chassisno: "",
    });
  }

  reset() {
    this.addCompany.patchValue({
      companyId: "",
      companyName: "",
      email: "",
      contactNo: "",
      address: "",
      city: "",
      country: "",
    });
  }

  clear() {
    this.vehicle.patchValue({
      imeiNo: "",
      plateNo: "",
      assetCategory: "",
      engineno: "",
      chassisno: "",
    });
  }

  checkCompany() {
    if (this.addCompany.value.companyId.length != 0) {
      const url =
        serverUrl.web +
        "/global/getDealerAddressInfo?companyid=" +
        this.addCompany.value.companyId;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (Object.keys(res).length == 0) {
          this.commonService.showConfirm("Company Does Not Exits");
          this.reset();
        }
      });
    }
  }

  onadd() {
    if (this.addCompany.value.contactNo.toString().length != 10) {
      this.commonService.presentToast("Enter the 10 Digit Contact Number");
    } else if (this.addCompany.valid) {
      const url =
        serverUrl.web +
        "/global/validate/contact?contactNo=" +
        this.addCompany.value.contactNo;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res.message == "Not Available") {
          this.addTheCompany();
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
    } else {
      this.commonService.presentToast("Fill required field..");
    }
  }

  addTheCompany() {
    let adminData;
    let addCompany;
    if (app.appName != "Armoron") {
      adminData = {
        loginId: this.addCompany.value.companyName,
        loginCompany: localStorage.getItem("companyId"),
      };
      const countryCode = this.countryCode[this.addCompany.value.country];
      console.log(countryCode);
      const region = this.region[this.addCompany.value.country];
      addCompany = {
        password: "12345",
        companyName: this.addCompany.value.companyName,
        address: this.addCompany.value.address,
        city: this.addCompany.value.city,
        region: region,
        countryCode: countryCode,
        companyAdminID: "",
        firstName: this.addCompany.value.companyName,
        contactNo: this.addCompany.value.contactNo,
        branchID: this.addCompany.value.loginId,
        emailId: this.addCompany.value.email,
        emailID: this.addCompany.value.email,
        companyID: this.addCompany.value.loginId,
      };
    } else {
      adminData = {
        loginId: this.addCompany.value.companyName,
        loginCompany: "apm",
      };
      const countryCode = this.countryCode[this.addCompany.value.country];
      console.log(countryCode);
      const region = this.region[this.addCompany.value.country];
      addCompany = {
        password: this.addCompany.value.contactNo,
        companyName: this.addCompany.value.contactNo,
        address: this.addCompany.value.address,
        city: this.addCompany.value.city,
        region: region,
        countryCode: countryCode,
        companyAdminID: "",
        firstName: this.addCompany.value.firstName,
        contactNo: this.addCompany.value.contactNo,
        branchID: this.addCompany.value.contactNo,
        emailId: this.addCompany.value.email,
        emailID: this.addCompany.value.email,
        companyID: this.addCompany.value.contactNo,
      };
    }
    const dataJson = JSON.stringify(addCompany);
    const url =
      serverUrl.web +
      "/user/provider/company?providerName=" +
      adminData.loginCompany +
      "&companyid=" +
      adminData.loginId;
    this.ajaxService.ajaxPostWithBody(url, dataJson).subscribe((res) => {
      this.isData = true;
      this.CompanyInput = true;
      this.datas = res.CompanyID;

      this.newFleetCreation(res);
      this.addCompany.patchValue({
        companyId: res.CompanyID,
      });
      this.addCompany.controls["companyId"].disable();
    });
  }

  newFleetCreation(res) {
    if (res) {
      if (res.Message === "Company added successfully.") {
        const datetoday = new Date();
        const expDate =
          datetoday.getFullYear() +
          1 +
          "-" +
          (datetoday.getMonth() + 1) +
          "-" +
          (datetoday.getDate() - 1);
        const countryCode = this.countryCode[this.addCompany.value.country];
        let fleetData;
        if (app.appName != "Armoron") {
          fleetData = {
            userName: this.addCompany.value.companyName,
            password: this.addCompany.value.contactNo,
            firstName: this.addCompany.value.companyName,
            categoryrole: "FleetManager",
            userCity: this.addCompany.value.city,
            contactNo: this.addCompany.value.contactNo,
            useraddress1: this.addCompany.value.address,
            useraddress2: " ",
            userCountry: countryCode,
            emailId: this.addCompany.value.email,
            emailID: this.addCompany.value.email,
            userExpiryDate: expDate,
            companyId: this.addCompany.value.companyName,
            branchID: this.addCompany.value.companyName,
            applicationType: "false",
          };
        } else {
          fleetData = {
            userName: this.addCompany.value.contactNo,
            password: this.addCompany.value.contactNo,
            firstName: this.addCompany.value.firstName,
            categoryrole: "FleetManager",
            userCity: this.addCompany.value.city,
            contactNo: this.addCompany.value.contactNo,
            useraddress1: this.addCompany.value.address,
            useraddress2: " ",
            userCountry: countryCode,
            emailId: this.addCompany.value.email,
            emailID: this.addCompany.value.email,
            userExpiryDate: expDate,
            companyId: this.addCompany.value.contactNo,
            branchID: this.addCompany.value.contactNo,
            applicationType: "false",
          };
        }
        localStorage.setItem("fleetData", JSON.stringify(fleetData));

        const url = serverUrl.web + "/global/newFleetCreation";
        this.ajaxService.ajaxPostMethod(url, fleetData).subscribe((res) => {
          this.newCompanyCreation(res);
        });
        console.log("this is call back end");
      } else if (res["Error Message"] === "Company already exist.") {
        this.commonService.presentToast("Company already exist.");
      } else {
        this.commonService.presentToast(
          "sorry, not able process your request."
        );
      }
    }
  }

  newCompanyCreation(data) {
    const fleetData = JSON.parse(localStorage.getItem("fleetData"));
    let userDetail;
    if (app.appName != "Armoron") {
      userDetail = {
        companyname: fleetData["firstName"],
        companyId: fleetData["userName"],
        userId: fleetData["userName"] + "-ca",
        fmid: fleetData["userName"],
        email: fleetData["emailId"],
        contact: fleetData["contactNo"],
        password: fleetData["password"],
        suffix: localStorage.getItem("companySuffix"),
      };
    } else {
      userDetail = {
        companyname: fleetData["firstName"],
        companyId: fleetData["userName"],
        userId: fleetData["userName"],
        fmid: fleetData["userName"],
        email: fleetData["emailId"],
        contact: fleetData["contactNo"],
        password: fleetData["password"],
        suffix: "21",
      };
    }
    const url = serverUrl.web + "/global/companyCreation";
    this.ajaxService.ajaxPostMethod(url, userDetail).subscribe((res) => {
      this.alterNewCompanySuccess(res);
    });
  }

  alterNewCompanySuccess(res) {
    if (res.result == "updated successfully") {
      // const loginData = {
      //   userId: localStorage.getItem('userId'),
      //   password: localStorage.getItem('password')
      // };
      // const url = serverUrl.web + '/api/vts/superadmin/auth/' + JSON.stringify(loginData);
      // this.ajaxService.ajaxGetWithString(url)
      // .subscribe(res => {
      // localStorage.removeItem("dashboardData");
      // localStorage.setItem('dashboardData', JSON.stringify(res.CompanyDetials));
      this.commonService.showConfirm("Successfully Presisted");
      this.companydetails = false;
      this.assests = true;
      this.reset();

      //   });
      // }else {
      //   this.commonService.presentToast('Presisted Failed...!');
    }
  }

  onSubmit() {
    var data;
    data = {
      companyId: this.addCompany.controls.companyId.value,
      imeiNo: this.value.imei,
      icon: this.vehicle.value.assetCategory,
      plateNo: this.vehicle.value.plateNo,
      engineno: this.vehicle.value.engineno,
      chassisno: this.vehicle.value.chassisno,
    };

    const url = serverUrl.web + "/site/NewVehicleCreation";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Added Successfully") {
        this.modalController.dismiss({
          data: "Successfully Presisted",
        });
      } else {
        this.commonService.showConfirm(res.message);
      }
      // if (res.message == "Added Successfully") {
      //   this.modalController.dismiss({
      //     data: "Added Successfully",
      //   });
      //   this.clear();
      // } else {
      //   this.commonService.showConfirm(res.message);
      //   this.clear();
      // }
    });
  }

  getCompanyID() {
    const url =
      serverUrl.web + "/global/getdealercompanylist?suffix=" + this.suffix;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.companyId = res;
    });
  }

  getdetails() {
    this.addCompany.patchValue({
      imeiNo: this.value.imei,
    });
  }

  getCountries() {
    const url =
      serverUrl.web +
      "/login/getPreferences?key=countries&companyId=" +
      this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.country = res;
    });
  }

  getCountryCode() {
    const url =
      serverUrl.web +
      "/login/getPreferences?key=countrycode&companyId=" +
      this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.countryCode = res;
    });
  }

  ngOnInit() {
    this.selectedCompany = localStorage.getItem("companyId");
    this.companyDetail = {
      companyID: localStorage.getItem("companyId"),
      userId: localStorage.getItem("userId"),
    };
    this.suffix = localStorage.getItem("companySuffix");
    this.createForm();
    this.getCompanyID();
    this.getdetails();
    this.getCountries();
    this.getCountryCode();
  }
}
