import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { app, serverUrl } from "src/environments/environment";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { Location } from "@angular/common";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-add-company",
  templateUrl: "./add-company.page.html",
  styleUrls: ["./add-company.page.scss"],
})
export class AddCompanyPage implements OnInit {
  addCompany: FormGroup;
  checkno: FormGroup;
  country;
  countryCode;
  region = { India: "Asia/Kolkata", "Saudi Arabia": "Asia/Riyadh" };
  selectedData;
  //selectManufacture = 'Concox';
  thisData: any;
  modelTypes = {
    "APMKT01 Basic": "KT-Mini",
    "APMKT01 Advance": "KT-Mini",
    "APMKT02 Basic": "TK003",
    "APMKT02 Advance": "TK003",
    "APMKT03 Basic": "KT-Mini",
    "APMKT03 Advance": "KT-Mini",
    APMKT04: "wetrack",
    APMKT05: "GT06N",
    APMKT06: "GT300",
    APMKT07: "JV200",
    APMKT08: "KT-Mini",
    APMKT09: "KT-Mini",
    APMKT10: "GT800",
    APMKT11: "GT06D",
    AIS1401A: "AIS1401A",
  };
  model: any = [];
  provider = [
    { sim: "Idea" },
    { sim: "Airtel" },
    { sim: "Vodafone" },
    { sim: "Bsnl" },
  ];
  manufacture = [
    { name: "APMKT", type: "Concox" },
    { name: "APMKT-AIS140", type: "APMKT" },
  ];
  header: any;
  companyDetail: { companyID: string; userId: string };
  appName: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ajaxService: AjaxService,
    private commonService: CommonService,
    private location: Location
  ) {}

  clear() {
    this.checkno.patchValue({
      phoneno: "",
    });
  }

  getBack() {
    this.router.navigateByUrl("/dashboard");
  }
  backbutton() {
    this.location.back();
  }
  check() {
    if (this.checkno.value.phoneno.toString().length != 10) {
      this.commonService.showConfirm("Enter the 10 Digit Contact Number");
    } else if (this.checkno.valid) {
      const url =
        serverUrl.web +
        "/global/validate/contact?contactNo=" +
        this.checkno.value.phoneno;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res.message == "Available") {
          this.commonService.showConfirm("Available");
          this.clear();
        } else {
          this.commonService.showConfirm(res.message);
          this.clear();
        }
      });
    }
  }

  onSubmit() {
    if (this.addCompany.value.contactNo.toString().length != 10) {
      this.commonService.presentToast("Enter the 10 Digit Contact Number");
    } else if (this.addCompany.value.password.toString().length <= 4) {
      this.commonService.presentToast("Please Enter 5 digit Password");
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
        loginId: this.addCompany.value.loginId,
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
        loginId: this.addCompany.value.contactNo,
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
      this.newFleetCreation(res);
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
            userName: this.addCompany.value.loginId,
            password: this.addCompany.value.password,
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
            companyId: this.addCompany.value.loginId,
            branchID: this.addCompany.value.loginId,
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
      this.location.back();
      this.commonService.presentToast("Successfully Presisted");
      this.addCompany.reset();
      //   });
      // }else {
      //   this.commonService.presentToast('Presisted Failed...!');
    }
  }
  getCountries() {
    const url =
      serverUrl.web +
      "/login/getPreferences?key=countries&companyId=" +
      this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.country = res;
      console.log(res);
    });
  }
  getCountryCode() {
    const url =
      serverUrl.web +
      "/login/getPreferences?key=countrycode&companyId=" +
      this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.countryCode = res;
      console.log(res);
    });
  }
  ngOnInit() {
    this.companyDetail = {
      companyID: localStorage.getItem("companyId"),
      userId: localStorage.getItem("userId"),
    };
    this.checkno = this.formBuilder.group({
      phoneno: ["", Validators.required],
    });
    this.selectedData = "company";
    this.header = "Company";
    this.appName = app.appName;
    this.getCountries();
    this.getCountryCode();
    if (this.appName != "Armoron") {
      this.addCompany = this.formBuilder.group({
        companyName: ["", [Validators.required, Validators.maxLength(15)]],
        email: [""],
        password: ["", Validators.required],
        loginId: ["", Validators.required],
        address: ["", Validators.required],
        contactNo: [""],
        region: [""],
        city: ["", Validators.required],
        country: ["", Validators.required],
      });
    } else {
      this.addCompany = this.formBuilder.group({
        firstName: ["", Validators.required],
        lastname: ["", Validators.required],
        email: ["", Validators.email],
        date: ["", Validators.required],
        address: ["", Validators.required],
        region: [""],
        country: ["", Validators.required],
        city: ["", Validators.required],
        contactNo: [localStorage.getItem("PhoneNumber"), Validators.required],
        gender: ["male", Validators.required],
      });
    }
  }
  ionViewWillEnter() {
    this.addCompany.reset();
    this.clear();
  }
}
