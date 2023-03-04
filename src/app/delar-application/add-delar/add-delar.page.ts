import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AjaxService } from "../../services/ajax.service";
import { CommonService } from "../../services/common.service";
import { CountriesService } from "../../services/countries.service";
import { serverUrl } from "src/environments/environment";
import { Platform } from "@ionic/angular";
@Component({
  selector: "app-add-delar",
  templateUrl: "./add-delar.page.html",
  styleUrls: ["./add-delar.page.scss"],
})
export class AddDelarPage implements OnInit {
  details: FormGroup;
  delarDetails: any = {};
  countryCode: any;
  country: any;
  submitted = false;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  mobnumPattern2 = "^((\\+91-?)|0)?[0-9]{12}$";
  mobnumPattern3 = "^((\\+91-?)|0)?[0-9]{15}$";
  Pattern4 = "^((\\+91-?)|0)?[0-9]{6}$";
  expression = "^[A-Za-z][A-Za-z0-9]*$";
  region = { India: "Asia/Kolkata", "Saudi Arabia": "Asia/Riyadh" };
  companyDetail: { companyID: string; userId: string };
  valid: boolean;
  state = [];
  cities = [];
  rtos = [];
  myPlatform: string;
  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private countries: CountriesService,
    private router: Router,
    private commonService: CommonService,
    private platform: Platform
  ) {}
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
  getState(data) {
    if (data == "state") {
      this.state = this.countries.region[this.details.value.country];
    } else if (data == "city") {
      this.cities = this.countries.states[this.details.value.state];

      const url1 = serverUrl.web + "/global/getrtozones";
      this.ajaxService.ajaxGet(url1).subscribe((res) => {
        console.log(res);
        //  rto=res;
        this.rtos = res[this.details.value.state];
      });
    }
  }

  onSubmit() {
    if (
      this.details.value.whatApp != null &&
      JSON.stringify(this.details.value.whatApp).length >= 10
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the WhatApp No");
      this.valid = false;
    }
    if (
      this.details.value.e_Mail != null &&
      this.details.value.e_Mail.length > 2 &&
      this.details.value.adhaarNo != null &&
      JSON.stringify(this.details.value.adhaarNo).length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the E-mail Or AdhaarNo");
      this.valid = false;
    }
    if (
      this.details.value.mobile != null &&
      JSON.stringify(this.details.value.mobile).length >= 10
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the Mobile");
      this.valid = false;
    }
    if (
      this.details.value.pin != null &&
      JSON.stringify(this.details.value.pin).length === 6
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast(
        "Check the Pincode , Is should be 6 Digits"
      );
      this.valid = false;
    }
    // if((this.details.value.district != null   && this.details.value.district.length > 2) && (this.details.value.taluk != null  &&  this.details.value.taluk.length > 2)){
    //   this.valid=true;
    // }else{
    // this.commonService.presentToast("Check the  Taluk");
    // this.valid=false;
    // }
    if (
      this.details.value.taluk != null &&
      this.details.value.taluk.length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the  Taluk");
      this.valid = false;
    }

    if (
      this.details.value.city != null &&
      this.details.value.city.length > 2 &&
      this.details.value.country != null &&
      this.details.value.country.length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the District Or Country");
      this.valid = false;
    }
    if (
      this.details.value.rtoArea != null &&
      this.details.value.rtoArea.length > 0 &&
      this.details.value.dtcZone != null &&
      this.details.value.dtcZone.length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the RTO Area Or Address");
      this.valid = false;
    }
    if (
      this.details.value.password != null &&
      this.details.value.password.length >= 6 &&
      this.details.value.address != null &&
      this.details.value.address.length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast(
        "Check the Password Or Address, Password should be Minimum 6 Digits"
      );
      this.valid = false;
    }
    if (this.details.value.delaarID != null) {
      var my_string = this.details.value.delaarID;
      var spaceCount = my_string.split(" ").length - 1;
      console.log(spaceCount);
      if (
        this.details.value.delaarID != null &&
        this.details.value.delaarID.length < 16 &&
        spaceCount == 0
      ) {
        this.valid = true;
      } else {
        this.commonService.presentToast(
          "Check the Dealer ID, Avoid spaces , 15 Characters only allowed"
        );
        this.valid = false;
      }
    } else {
      this.commonService.presentToast("Check the Dealer ID");
    }
    if (
      this.details.value.dealerName != null &&
      this.details.value.dealerName.length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the DealerName Or Dealer ID");
      this.valid = false;
    }
    if (
      this.details.value.state != null &&
      this.details.value.state.length > 2
    ) {
      this.valid = true;
    } else {
      this.commonService.presentToast("Check the state ");
      this.valid = false;
    }

    if (this.details.status != "INVALID" && this.details.status != "PENDING") {
      this.submitted = true;
      const region = this.region[this.details.value.country];
      const countryCode = this.countryCode[this.details.value.country];
      this.delarDetails = {
        companyId: this.details.value.delaarID,
        // DealerName: this.details.value.dealerName,
        password: this.details.value.password,
        delaarId: this.details.value.dealerName,
        Address: this.details.value.address,
        rtoArea: this.details.value.rtoArea.toString(),
        dtcZone: this.details.value.dtcZone,
        taluk: this.details.value.taluk,
        district: this.details.value.city,
        pincode: this.details.value.pin + "",
        city: this.details.value.city,
        gstin: this.details.value.gstIn,
        mobileNo: this.details.value.mobile + "",
        pancardNo: this.details.value.panNo,
        email: this.details.value.e_Mail,
        adharNo: this.details.value.adhaarNo + "",
        whatsApp: this.details.value.whatApp,
        countryCode: countryCode,
        region: region,
        createBy: localStorage.getItem("companySuffix"),
      };

      console.log(this.delarDetails);
      const url = serverUrl.web + "/global/dealer";
      this.ajaxService
        .ajaxPostWithBody(url, JSON.stringify(this.delarDetails))
        .subscribe((res) => {
          const respData = res;
          if (respData.Message == "Dealer already exist.") {
            this.commonService.presentToast("Dealer already exist.");
          } else if (respData.Message == "Dealer Added Successfully.") {
            this.commonService.presentToast("Dealer Added Successfully.");
            this.router.navigateByUrl("/dashboard");
          } else {
            this.commonService.presentToast(respData.Message);
          }
          console.log(res);
        });
    }
  }
  //  data = this.details.value.dealerName
  // "asdad"
  // 4add-delar.page.ts:201 VALID
  // /[^a-zA-Z0-9\-\/]/.test( data)
  // false
  // data = this.details.value.dealerName
  // "asdad @@ "
  // /[^a-zA-Z0-9\-\/]/.test( data)
  // true

  ionViewWillEnter() {
    this.companyDetail = {
      companyID: localStorage.getItem("companyId"),
      userId: localStorage.getItem("userId"),
    };
    this.details.reset();
    this.getCountryCode();
    this.getCountries();
    this.valid = false;
  }
  ngOnInit() {
    // const yourhandle= require('countrycitystatejson');
    // console.log(yourhandle);
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.details = this.formBuilder.group({
      dealerName: ["", [Validators.required, Validators.maxLength(15)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      city: [""],
      country: [""],
      address: ["", Validators.required],
      delaarID: ["", [Validators.required]],
      rtoArea: ["", Validators.required],
      dtcZone: ["", Validators.required],
      // district:['',Validators.required],
      taluk: ["", Validators.required],
      pin: ["", [Validators.required, Validators.pattern(this.Pattern4)]],
      gstIn: [""],
      // gstIn:['',[Validators.required,Validators.minLength(15),Validators.maxLength(15)]],
      mobile: [""],
      panNo: [""],
      e_Mail: [""],
      adhaarNo: [
        "",
        [
          Validators.required,
          Validators.pattern(this.mobnumPattern2),
          Validators.maxLength(12),
        ],
      ],
      whatApp: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      state: ["", Validators.required],
    });
  }
}
