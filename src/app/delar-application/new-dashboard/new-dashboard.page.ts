import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, ModalController, Platform } from "@ionic/angular";
import { CommonService } from "src/app/services/common.service";
import { adminLocalStorage } from "src/environments/environment";
import { AssertStatusListPage } from "./assert-status-list/assert-status-list.page";
@Component({
  selector: "app-new-dashboard",
  templateUrl: "./new-dashboard.page.html",
  styleUrls: ["./new-dashboard.page.scss"],
})
export class NewDashboardPage implements OnInit {
  dashboardColData = [
    "Company",
    "Subscription",
    "Sales report",
    "Company creation",
    "Dealer creation",
    "Vehicle creation",
    "Device activation",
  ];
  countRow = ["Total", "Stocks", "Expiry"];

  dashboardColSvg = {
    Company: "business",
    Subscription: "list-box",
    "Sales report": "logo-buffer",
    "Company creation": "albums",
    "Dealer creation": "people",
    "Vehicle creation": "car",
    "Device activation": "card",
    "Esim Menus": "folder",
    // "Certificate creation": "print"
  };
  dashboardRouter = {
    Company: "/tabs-login/dashboard",
    Subscription: "/tabs-login/subscription",
    "Sales report": "/tabs-login/sales-report",
    "Company creation": "/tabs-login/dashboard/add-company",
    "Dealer creation": "/tabs-login/add-delar",
    "Vehicle creation": "/tabs-login/vehicle-creation",
    "Device activation": "/tabs-login/device-activation",
    "Esim Menus": "/tabs-login/esim-dashboard",
    // "Certificate creation": "/tabs-login/certificate"
  };
  countRowData = {
    Total: 0,
    Expiry: 0,
    Stocks: 0,
  };
  dasboardDetail: any;
  companyName: any;
  myPlatform: string;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private menuController: MenuController,
    private platform: Platform
  ) {}
  openProfile() {
    this.router.navigateByUrl("profile-detail");
  }
  async openAssertModal(data) {
    if (data == "Total") data = "All";
    if (data != "Stocks")
      this.router.navigateByUrl("/assert-status-list/" + data);
    else this.router.navigateByUrl("/stocks");
  }
  ngOnInit() {
    localStorage.getItem("userName") == "apm-sa" &&
      this.dashboardColData.push("Esim Menus");

    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.menuController.enable(true);
    this.commonService.dismissLoader();
    // localStorage.setItem("dealerLoginData", JSON.stringify({"companyId":"jana","password":"12345","mainmenu":"[\"Company\",\"CompanyCreation\",\"VehicleCreation\",\"DealerCreation\",\"DeviceActivation\",\"StockUploader\",\"Command\",\"Stocks\",\"Profile\",\"Log-out\"]","assets":{"Stocks":[{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"---","simcardNo":"6565","imeiNo":"654655","warrantyExpiryDate":"---","plateNo":"---","icon":"---","vin":"---","currentAgency":"414"}],"All":[{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"vechicletesting","simcardNo":"103103103103103","imeiNo":"103103103103103","warrantyExpiryDate":"2021-10-04","plateNo":"12458","icon":"COMPRESSORS","vin":"jana545","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"testingapm","simcardNo":"104104104104104","imeiNo":"104104104104104","warrantyExpiryDate":"2019-01-16","plateNo":"45854","icon":"DEEPSEA GENERATOR","vin":"jana566","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"2020-11-10 13:04:40.0","companyId":"entry","simcardNo":"107107107107107","imeiNo":"107107107107107","warrantyExpiryDate":"2021-10-04","plateNo":"1445","icon":"REFRIGERATOR","vin":"jana809","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"entry","simcardNo":"108108108108108","imeiNo":"108108108108108","warrantyExpiryDate":"2021-10-04","plateNo":"---","icon":"---","vin":"---","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"2020-11-05 16:00:48.0","companyId":"entry","simcardNo":"109109109109109","imeiNo":"109109109109109","warrantyExpiryDate":"2021-10-04","plateNo":"4550","icon":"COMPRESSORS","vin":"jana572","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"---","simcardNo":"6565","imeiNo":"654655","warrantyExpiryDate":"---","plateNo":"---","icon":"---","vin":"---","currentAgency":"414"},{"additional_simcard1":"","serverTimeStamp":"2020-12-26 15:55:39.0","companyId":"cdac","simcardNo":"10789698761","imeiNo":"861551046267076","warrantyExpiryDate":"2021-12-23","plateNo":"861551046267076","icon":"CAR","vin":"cdac901","currentAgency":"414"}],"Offline":[{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"vechicletesting","simcardNo":"103103103103103","imeiNo":"103103103103103","warrantyExpiryDate":"2021-10-04","plateNo":"12458","icon":"COMPRESSORS","vin":"jana545","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"testingapm","simcardNo":"104104104104104","imeiNo":"104104104104104","warrantyExpiryDate":"2019-01-16","plateNo":"45854","icon":"DEEPSEA GENERATOR","vin":"jana566","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"2020-11-10 13:04:40.0","companyId":"entry","simcardNo":"107107107107107","imeiNo":"107107107107107","warrantyExpiryDate":"2021-10-04","plateNo":"1445","icon":"REFRIGERATOR","vin":"jana809","currentAgency":"414"},{"additional_simcard1":"---","serverTimeStamp":"2020-11-05 16:00:48.0","companyId":"entry","simcardNo":"109109109109109","imeiNo":"109109109109109","warrantyExpiryDate":"2021-10-04","plateNo":"4550","icon":"COMPRESSORS","vin":"jana572","currentAgency":"414"}],"Online":[{"additional_simcard1":"","serverTimeStamp":"2020-12-26 15:55:39.0","companyId":"cdac","simcardNo":"10789698761","imeiNo":"861551046267076","warrantyExpiryDate":"2021-12-23","plateNo":"861551046267076","icon":"CAR","vin":"cdac901","currentAgency":"414"}],"Expiry":[{"additional_simcard1":"---","serverTimeStamp":"---","companyId":"testingapm","simcardNo":"104104104104104","imeiNo":"104104104104104","warrantyExpiryDate":"2019-01-16","plateNo":"45854","icon":"DEEPSEA GENERATOR","vin":"jana566","currentAgency":"414"}]},"companySuffix":"414","companyName":"JANA","logo":"http://kingstrackimages.s3.amazonaws.com/Company/m021.png","username":"janakumar"}))
    this.dasboardDetail = JSON.parse(adminLocalStorage.dealerLoginData);
    this.companyName = this.dasboardDetail.companyName;
    this.countRowData = {
      Total: this.dasboardDetail.assets["All"].length,
      Expiry: this.dasboardDetail.assets["Expiry"].length,
      Stocks: this.dasboardDetail.assets["Stocks"].length,
    };
    if (this.myPlatform == "desktop") {
      this.countRow = ["Total", "Online", "Offline", "Stocks", "Expiry"];
      this.countRowData["Online"] = this.dasboardDetail.assets["Online"].length;
      this.countRowData["Offline"] =
        this.dasboardDetail.assets["Offline"].length;
    }
  }
}
