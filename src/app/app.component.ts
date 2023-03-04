import { Component, Inject } from "@angular/core";

import { Platform, AlertController, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CommonService } from "./services/common.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Market } from "@ionic-native/market/ngx";
import { app, serverUrl, storageVariable } from "src/environments/environment";
import { AjaxService } from "./services/ajax.service";
import { Network } from "@ionic-native/network/ngx";
import { Title } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { WebsocketService } from "./services/websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  loadingRefresh = false;
  appIcon = {
    Dashboard: "home",
    "Grid view": "md-browsers",
    "Map view": "map",
    "Geo fence": "navigate",
    Reports: "ios-clipboard",
    Alerts: "warning",
    Settings: "settings",
    ais_dashboard: "settings",
    Camera: "camera",
    Manage: "folder",
    Profile: "person",
    Users: "people",
    Maintanence: "construct",
    Operators: "nuclear",
    Diagnosis: "globe",
    "User diagnosis": "planet",
    Tickets: "filing",
    Trip_report: "logo-euro",
    "Student details": "md-man",
    "Class details": "ios-people",
    "Parent-details": "ios-contacts",
    "Tag details": "ios-ribbon",
    "Route n Trip": "ios-bus",
    "Gate details": "ios-card",
    "Student attendance": "ios-clipboard",
    "School E&D": "business",
    "Excel validation": "warning",
    "Excell Uploader": "warning",
    "Broadcast sms": "ios-mail",
    "Change number": "cloud-upload",
    "advanced-expense-maintenance": "cloud-upload",
    // "Log out": "log-out",
    // FMS MENUS
    Operator: "nuclear",
    Currency: "ios-card",
    Trip: "logo-model-s",
    Expense: "logo-euro",
    Income: "stats",
    "Inventory Master": "ios-card",
    "Job Card": "ios-card",

    Home: "home",
    Company: "business",
    "Vehicle creation": "car",
    "Vehicle Registration": "clipboard",
    "Dealer creation": "people",
    "Device activation": "today",

    //sensorise Menus
    PurchaseDetail: "appstore",
    ManufactureDetail: "cog",
    ProductionDetail: "construct",
    SalesDetail: "trending-up",
    DealerDetail: "people",
    CARequest: "mail-unread",
    CAReport: "ios-clipboard",
    "Sensorise RSU": "aperture",
    Command: "mail-open",
    "Stock uploader": "cloud-upload",

    Stocks: "stats",
    "Stock Assign": "mail-open",
    "Dealer Stock List": "bookmarks",
    "Dealer Vehicle Assign": "shuffle",
    "Company creation": "logo-buffer",
    Subscription: "create",
    "Stocks report": "logo-euro",
    "Certificate creation": "ribbon",
    Certificate: "stats",
    "Certificate Generation": "ribbon",
    Detach: "send",
    "RSU Details": "bookmarks",
    "RSU Request": "stats",
    "ICCID Detail": "mail-open",
    Renewal: "business",
    // "Dealer Vehicle Assign": "shuffle",
    "Sim Validity Detail": "cellular",
    "Inventory Details": "cube",
    "Add Third Party Vins": "exit",
    "IMEI Details": "mail-open",
    "RSU ICCID Detail": "stats",

    // Esim
    "Esim Dashbord": "home",
    "Esim Menus": "folder",
    "Esim Detail": "document",
    "Device Production": "cog",
    "Device Sales Invoice Details": "trending-up",
    "Product Delivery Details": "construct",
    "Device Transport Details": "airplane",
    "Device Invoice Details": "appstore",
    "Request Details": "people",
    "Device Request Details": "shuffle",
    "Devices Status Update Details": "create",
    "Commercial Activation Request": "people",
    "Device Renewal Invoice Details": "shuffle",
    "Renewal Request": "refresh",
    "Device CA Request": "mail-unread",
    "Device Renewal Request": "shuffle",
    "Device CA Status Update": "ios-clipboard",
    "Device Renewal Status Update": "create",
    "Customer CA Status": "contacts",
    "Device Activation History": "paper",
    // "Esim Billing Plan": "construct",
    // "Esim Account Mapping": "appstore",
    // "Esim Billing Generation": "trending-up",
    "Device Return Details": "construct",
    "Device Topup Invoice Details": "mail-open",
    "Topup Request": "sync",
    "Device Topup Request": "people",
    "Device Extend One Year Invoice Details": "appstore",
    "Extend One Year Request": "sync",
    "Device Extend One Year Request": "ios-clipboard",
    "Device Certificate Invoice Details": "ribbon",
    "Devices Detail Update": "sync",
    "Delear IMEI Check": "cog",
    "Dealer Hierarchy": "stats",

    // "Log-out": "log-out",
    "student-dashboard": "bookmarks",
    About: "md-browsers",
    "Log-Out": "log-out",
    "Log-out": "log-out",
    "Log out": "log-out",
    "poc-geolocation": "pin",
  };

  appUrl = {
    Dashboard: "/tabs/members/dashboard",
    "Grid view": "/tabs/gridview/All",
    "Map view": "/tabs/mapview/All",
    PDF: "/home",
    "Geo fence": "/geofence/All/null",
    Reports: "/reports/null",
    Alerts: "/tabs/alerts/All",
    ais_dashboard: "ais-dashboard",
    Settings: "settings/All",
    Camera: "/camera",
    Manage: "/generalform",
    Profile: "manage-fleet/Profile",
    Operators: "manage-fleet/Operator",
    Users: "manage-fleet/Users",
    Tickets: "ticket",
    Maintanence: "maintanence",
    // "Diagnosis": "/diagnosis",
    Diagnosis: "diagnosis-user",
    "User diagnosis": "diagnosis-user",
    "advanced-expense-maintenance": "advanced-expense-maintenance",

    // FMS MENUS
    // "Dashboard":'/fms-dashboard',
    // "Manage": "/fms-manage",
    // "Profile": '/fms-profile',
    Operator: "/fms-operators",
    Currency: "/currency-settings",
    Expense: "expense-maintenance",
    Income: "income-maintanence",
    Trip: "trip",
    "Inventory Master": "/inventory",
    "Job Card": "/job-card-details",

    // "Log out": "tabs-login/members/login",
    Home: "tabs-login/new-dashboard",
    Company: "tabs-login/dashboard",
    "Vehicle creation": "tabs-login/vehicle-creation",
    "Vehicle Registration": "tabs-login/vehicle-registration",
    "Dealer creation": "tabs-login/add-delar",
    "Device activation": "tabs-login/device-activation",
    //sensorise Pages
    "Purchase Detail": "tabs-login/purchase-detail",
    "Manufacture Detail": "tabs-login/manufacture-detail",
    "Sales Detail": "tabs-login/sales-detail",
    "Production Detail": "tabs-login/production-details",
    "Dealer Detail": "tabs-login/dealer-detail",
    "CA Request": "tabs-login/ca-request",
    "CA Report": "tabs-login/ca-report",
    "Sensorise RSU": "tabs-login/senorise-rsu",
    "RSU Details": "tabs-login/rsu-details",
    "RSU Request": "tabs-login/rsu-request",
    "Inventory Details": "tabs-login/inventory-details",
    "Add Third Party Vins": "tabs-login/third-party-vin",
    "IMEI Details": "tabs-login/imei-full-details",
    "RSU ICCID Detail": "tabs-login/rsu-iccid-details",

    // Esim
    "Esim Dashbord": "tabs-login/esim-home",
    "Esim Menus": "tabs-login/esim-dashboard",
    "Device Invoice Details": "tabs-login/esim-purchase-details",
    "Esim Detail": "tabs-login/esim-details",
    "Device Production": "tabs-login/esim-production-detail",
    "Device Sales Invoice Details": "tabs-login/esim-sales-invoice-details",
    "Product Delivery Details": "tabs-login/esim-sales-detail",
    "Device Transport Details": "tabs-login/esim-transport-details",
    "Commercial Activation Request": "tabs-login/esim-dealer-detail",
    "Renewal Request": "tabs-login/esim-renewal",
    "Device CA Request": "tabs-login/esim-ca-request",
    "Device Renewal Request": "tabs-login/esim-device-renewal-request",
    "Device CA Status Update": "tabs-login/esim-ca-report",
    "Device Renewal Status Update": "tabs-login/esim-renewal-status-update",
    "Customer CA Status": "tabs-login/esim-customer-ca-details",
    "Device Activation History": "tabs-login/device-activation-history",
    // "Esim Billing Plan": "tabs-login/esim-billing-plan",
    // "Esim Account Mapping": "tabs-login/esim-accounts-mapping",
    // "Esim Billing Generation": "tabs-login/esim-billing-generation",

    "Device Return Details": "tabs-login/device-return-details",
    "Device Topup Invoice Details": "tabs-login/device-topup-invoice-details",
    "Device Topup Request": "tabs-login/device-topup-request",
    "Topup Request": "tabs-login/device-topup-request-details",
    "Device Extend One Year Invoice Details":
      "tabs-login/device-extend-oneyear-invoice-details",
    "Extend One Year Request":
      "tabs-login/device-extend-oneyear-request-details",
    "Device Extend One Year Request":
      "tabs-login/device-extend-one-year-request",

    "Device Certificate Invoice Details":
      "tabs-login/device-certificate-invoice-details",
    "Devices Detail Update": "tabs-login/esim-device-detail-update",
    "Delear IMEI Check": "tabs-login/dealer-imeicheck-details",
    "Dealer Hierarchy": "tabs-login/dealer-hierarchy",
    "Device Renewal Invoice Details": "device-renewal-invoice-details",
    "Request Details": "tabs-login/esim-dealer-detail",
    "Device Request Details": "tabs-login/esim-ca-request",
    "Devices Status Update Details": "tabs-login/esim-ca-report",
    //senosrise
    Command: "tabs-login/device-commands",
    "Stock uploader": "tabs-login/stock-uploader",
    "Certificate creation": "tabs-login/certificate",
    Certificate: "tabs-login/custom-certificate",
    "Certificate Generation": "tabs-login/certificate-generation",
    Stocks: "tabs-login/stocks",

    "Stock Assign": "tabs-login/stock-assign",
    "Dealer Stock List": "tabs-login/dealer-stock-list",
    "Dealer Vehicle Assign": "tabs-login/dealer-assign",
    Renewal: "tabs-login/renewal",
    "ICCID Detail": "tabs-login/iccid-details",
    // Assign or Reassign
    // "Dealer Vehicle Assign": "tabs-login/dealer-vehicle-assign",
    "Sim Validity Detail": "tabs-login/warranty-expiry",
    "Company creation": "tabs-login/dashboard/add-company",
    Subscription: "tabs-login/subscription",
    Detach: "tabs-login/check-imei",
    "Sales report": "tabs-login/sales-report",
    Trip_report: "/fms-tripreport",
    "Change number": "/change-number",
    livetrack: "/livetrack",
    "Student details": "/student-details",
    "Class details": "/class-table",
    "Parent-details": "/parent-table",
    "Tag details": "/tag-table",
    "Route n Trip": "/route-trip",
    "Gate details": "/gate-table",
    "Student attendance": "/student-attendence",
    "School E&D": "/school-enable",
    "Excel validation": "/excel-validation",
    "Broadcast sms": "/broadcast-sms",
    "Excell Uploader": "/skt-excell",
    // "Log-out": "tabs-login/members/login",
    "student-dashboard": "/student-dashboard",
    About: "/about",
    // "Log-Out": "tabs-login/members/login",
    "Log-Out": "tabs-login/members/login",

    // "poc-geolocation": "/poc-geolocation",
  };
  public appPages = [
    {
      title: "Dashboard",
      url: "/tabs/members/dashboard",
      icon: "home",
    },
    {
      title: "Grid view",
      url: "/tabs/gridview/All",
      icon: "md-browsers",
    },
    {
      title: "Map view",
      url: "/tabs/mapview/All",
      icon: "map",
    },
    {
      title: "Geo fence",
      url: "/geofence/All/null",
      icon: "navigate",
    },
    {
      title: "Reports",
      url: "/reports/null",
      icon: "stats",
    },
    {
      title: "Alerts",
      url: "/tabs/alerts/All",
      icon: "warning",
    },
    {
      title: "Settings",
      url: "settings/All",
      icon: "settings",
    },
    {
      title: "Manage",
      url: "/generalform",
      icon: "globe",
    },
    {
      title: "Diagnosis",
      url: "/diagnosis",
      icon: "globe",
    },
    {
      title: "Operator",
      url: "manage-fleet/Operator",
      icon: "warning",
    },
    {
      title: "Profile",
      url: "manage-fleet/Profile",
      icon: "person",
    },
    {
      title: "Ticket",
      url: "ticket",
      icon: "md-browsers",
    },
    {
      title: "maintanence",
      url: "maintanence",
      icon: "md-browsers",
    },
    {
      title: "Users",
      url: "manage-fleet/Users",
      icon: "people",
    },
    {
      title: "Log out",
      url: "/login",
      icon: "log-out",
    },
  ];
  myPlatform;
  selectedMenu = "Log out";
  isDealer: boolean = false;
  key: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private commonService: CommonService,
    private router: Router,
    private alertController: AlertController,
    private authenticationService: AuthenticationService,
    private menuController: MenuController,
    private ajaxService: AjaxService,
    private title: Title,
    // private authService: AuthenticationService,
    private websocketService: WebsocketService,
    @Inject(DOCUMENT) private document: HTMLDocument,
    private appVersion: AppVersion,
    private market: Market
  ) {
    this.initializeApp();
  }
  menuObject = [];
  app = {
    logo: "logo.jpg",
    company: "company",
  };

  appSideMenu = "listMenu";
  menuOver = false;

  async appUpdate() {
    if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      if (localStorage.appSettings) {
        console.log(this.appVersion.getAppName());
        let currentVersion = app.appVersion;
        let appSettingsVersion = JSON.parse(localStorage.appSettings)[
          "appComVersion"
        ][app.appName];
        if (appSettingsVersion > currentVersion) {
          const alert = await this.alertController.create({
            header: "Update Alert",
            backdropDismiss: false,
            message:
              "A new update is now available. Please update from the appstore or playstore.",
            buttons: [
              {
                text: "Cancel",
                role: "cancel",
                handler: (data) => {},
              },
              {
                text: "update",
                handler: (data) => {
                  console.log("update that");
                  this.authenticationService.logout();
                  this.router.navigateByUrl("login");
                  this.market.open(app.package);
                },
              },
            ],
          });
          await alert.present();
        }
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      window.addEventListener("offline", () => {
        //Do task when no internet connection
        this.commonService.networkChecker();
      });
      window.addEventListener("online", () => {
        this.commonService.alertController.dismiss();
      });

      this.commonService.companyInfo.subscribe((res) => {
        // this.appUpdate();
        console.table(res);
        this.app["logo"] = res["logo"];
        this.app["company"] = res["companyId"];
        if (app.appName == "FMS") {
          localStorage.setItem(
            "fmslogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/fms.png"
          );
          this.app["logo"] = localStorage.getItem("fmslogo");
        }
        if (app.appName == "ParentApp") {
          this.app["company"] = localStorage.getItem("userName");
        }
        if (app.appName == "fleetPolice") {
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/FleetPoliceLogo.png"
          );
        }
        if (app.appName == "GoodGps") {
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg"
          );
        }
        if (window.location.origin == "https://tracol.apmkingstrack.com") {
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/tracole.jpg"
          );
        }
        if (localStorage.companyLogo) {
          this.app["logo"] = localStorage.companyLogo;
        }

        if (window.location.origin == "http://ilocate.in") {
          this.app["logo"] =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/ilocate.jpg";
          //  localStorage.setItem('companyLogo',this.app["logo"])
        } else if (window.location.origin == "https://track.remon.in") {
          this.app["logo"] =
            "http://kingstrackimages.s3.amazonaws.com/Company/Elint.png";
          // this.app["logo"] = 'http://kingstrackimages.s3.amazonaws.com/Company/Elint.png';
          app.entryPoint = res == "" ? "TTS" : res["entryPoint"];
          app.appName = "Remoncloud";
          serverUrl.Admin = "https://track.remon.in/Admin";
          serverUrl.web = "https://track.remon.in/fleettracking";
          serverUrl.adminSocket = "wss://track.remon.in";
          serverUrl.websocket = "wss://track.remon.in";
          app.loginImgUrl = "assets/loginLogo/remoncloud.png";
          this.title.setTitle("REMON TRACKING");
          this.document
            .getElementById("appFavicon")
            .setAttribute("href", "assets/icon/remon.png");
          app.bgImage =
            "https://kingstrackimages.s3.amazonaws.com/loginimages/track_remon_in_background.jpg";
        } else if (
          window.location.origin == "http://lnt-track.sanjhusecuresystems.in/"
        ) {
          app.appName = "LNT";
          serverUrl.Admin = "http://lnt-track.sanjhusecuresystems.in/Admin";
          serverUrl.web =
            "http://lnt-track.sanjhusecuresystems.in//fleettracking";
          serverUrl.adminSocket =
            "ws://http://lnt-track.sanjhusecuresystems.in";
          serverUrl.websocket = "ws://lnt-track.sanjhusecuresystems.in";

          app.loginImgUrl = "assets/loginLogo/remoncloud.png";
          this.title.setTitle("LNT TRACKING");
          this.document.getElementById("appFavicon").setAttribute("href", "");
          app.bgImage =
            "https://kingstrackimages.s3.amazonaws.com/loginimages/track_remon_in_background.jpg";
        } else if (window.location.origin == "http://localhost:8090") {
          app.entryPoint = "unknown";
          this.title.setTitle("MVT Tracking");
          this.document
            .getElementById("appFavicon")
            .setAttribute("href", "assets/icon/mvt.png");
          serverUrl.Admin = "http://localhost:8090/Admin";
          serverUrl.web = "http://localhost:8090/fleettracking";
          serverUrl.adminSocket = "ws://localhost:8090";
          serverUrl.websocket = "ws://localhost:8090";
        } else if (window.location.origin == "http://122.165.187.106:8090") {
          app.entryPoint = "unknown";
          this.title.setTitle("MVT Tracking");
          this.document
            .getElementById("appFavicon")
            .setAttribute("href", "assets/icon/mvt.png");
          serverUrl.Admin = "http://122.165.187.106:8090/Admin";
          serverUrl.web = "http://122.165.187.106:8090/fleettracking";
          serverUrl.adminSocket = "ws://122.165.187.106";
          serverUrl.websocket = "ws://122.165.187.106";
        } else if (window.location.origin == "http://192.168.1.13:8082") {
          app.entryPoint = "unknown";
          this.title.setTitle("MVT Tracking");
          this.document
            .getElementById("appFavicon")
            .setAttribute("href", "assets/icon/mvt.png");
          serverUrl.Admin = "http://192.168.1.13:8082/Admin";
          serverUrl.web = "http://192.168.1.13:8082/fleettracking";
          serverUrl.adminSocket = "ws://192.168.1.13";
          serverUrl.websocket = "ws://192.168.1.13";
        } else if (window.location.origin == "http://192.168.1.10:8081") {
          app.entryPoint = "unknown";
          this.title.setTitle("MVT Tracking");
          this.document
            .getElementById("appFavicon")
            .setAttribute("href", "assets/icon/mvt.png");
          serverUrl.Admin = "http://192.168.1.10:8081/Admin";
          serverUrl.web = "http://192.168.1.13:8080/fleettracking";
          serverUrl.adminSocket = "ws://192.168.1.13:8081";
          serverUrl.websocket = "ws://192.168.1.13:8081";
          // }else if(window.location.origin == "https://tracknow.apmkingstrack.com"){
        } else if (
          window.location.origin == "https://tracknow.apmkingstrack.com"
        ) {
          let url = window.location.hash;
          if (url.includes("aklive-track")) {
            this.key = window.location.hash.split("/")[2];
            let akUrl = serverUrl.web + "/tracknow/akverify/" + this.key;
            let trackID;
            this.ajaxService.ajaxGet(akUrl).subscribe((res) => {
              let url = serverUrl.web + "/tracknow/verify/" + res.tracknowId;
              trackID = res.tracknowId;
              this.authenticationService.login();
              this.menuController.enable(false);
              localStorage.setItem(
                "appSettings",
                JSON.stringify("SelectedVin")
              );
              localStorage.setItem("inItPage", "livetrack"); // localStorage.setItem('userName','art')              // localStorage.setItem('corpId','art')              // localStorage.setItem('staticIOData',JSON.stringify({"art291":[],"art294":[{"result":null,"unit":null,"min":"0","max":"1","io":1,"totalKM":0,"fuelStatus":0,"fuelTotal":0,"ioname":"fuel sensor","status":null}],"art372":[],"art133":[],"art131":[],"art175":[],"art132":[],"art176":[],"art330":[],"art693":[],"art896":[],"art413":[],"art611":[],"art897":[],"art774":[],"art219":[],"art813":[],"art414":[],"art898":[],"art938":[],"art935":[],"art581":[],"art584":[],"art464":[],"art340":[],"art461":[],"art582":[],"art269":[],"art423":[],"art786":[],"art424":[],"art146":[],"art306":[],"art504":[],"art900":[],"art626":[],"art824":[],"art945":[],"art304":[],"art228":[],"art547":[],"art745":[],"art508":[],"art706":[],"art429":[],"art902":[],"art908":[],"art591":[],"art199":[],"art551":[],"art475":[],"art550":[],"art599":[],"art314":[],"art435":[],"art996":[],"art355":[],"art399":[],"art630":[],"art751":[],"art119":[],"art834":[],"art999":[],"art634":[],"art678":[],"art118":[],"art514":[],"art954":[],"art718":[],"art280":[],"art281":[],"art122":[],"art760":[],"art484":[],"art126":[],"art489":[],"art566":[],"art841":[],"art369":[],"art600":[],"art840":[],"art845":[],"art725":[],"art967":[],"art645":[],"art404":[],"art723":[],"art407":[],"art924":[],"art529":[],"art606":[],"art929":[]}));              // localStorage.setItem('selectedVin',JSON.stringify(data.SelectedVin))
              this.ajaxService.ajaxGet(url).subscribe((res) => {
                if (res) {
                  localStorage.setItem("trip", JSON.stringify(res));
                  localStorage.setItem("selectedVin", JSON.stringify(res));
                  localStorage.setItem("userName", res.userName);
                  localStorage.setItem("corpId", res.userName);
                  localStorage.setItem(
                    "staticIOData",
                    JSON.stringify(res.staticIODatas)
                  );
                  this.router.navigateByUrl("/livetrack/" + trackID);
                }
              });
            });
          } else if (window.location.hash.split("/")[1] == "livetrack") {
            this.key = window.location.hash.split("/")[2];
            let url = serverUrl.web + "/tracknow/verify/" + this.key;
            this.authenticationService.login();
            this.menuController.enable(false);
            localStorage.setItem("appSettings", JSON.stringify("SelectedVin"));
            localStorage.setItem("inItPage", "livetrack");
            // localStorage.setItem('userName','art')
            // localStorage.setItem('corpId','art')
            // localStorage.setItem('staticIOData',JSON.stringify({"art291":[],"art294":[{"result":null,"unit":null,"min":"0","max":"1","io":1,"totalKM":0,"fuelStatus":0,"fuelTotal":0,"ioname":"fuel sensor","status":null}],"art372":[],"art133":[],"art131":[],"art175":[],"art132":[],"art176":[],"art330":[],"art693":[],"art896":[],"art413":[],"art611":[],"art897":[],"art774":[],"art219":[],"art813":[],"art414":[],"art898":[],"art938":[],"art935":[],"art581":[],"art584":[],"art464":[],"art340":[],"art461":[],"art582":[],"art269":[],"art423":[],"art786":[],"art424":[],"art146":[],"art306":[],"art504":[],"art900":[],"art626":[],"art824":[],"art945":[],"art304":[],"art228":[],"art547":[],"art745":[],"art508":[],"art706":[],"art429":[],"art902":[],"art908":[],"art591":[],"art199":[],"art551":[],"art475":[],"art550":[],"art599":[],"art314":[],"art435":[],"art996":[],"art355":[],"art399":[],"art630":[],"art751":[],"art119":[],"art834":[],"art999":[],"art634":[],"art678":[],"art118":[],"art514":[],"art954":[],"art718":[],"art280":[],"art281":[],"art122":[],"art760":[],"art484":[],"art126":[],"art489":[],"art566":[],"art841":[],"art369":[],"art600":[],"art840":[],"art845":[],"art725":[],"art967":[],"art645":[],"art404":[],"art723":[],"art407":[],"art924":[],"art529":[],"art606":[],"art929":[]}));
            // localStorage.setItem('selectedVin',JSON.stringify(data.SelectedVin))

            this.ajaxService.ajaxGet(url).subscribe((res) => {
              if (res) {
                localStorage.setItem("trip", JSON.stringify(res));
                localStorage.setItem("selectedVin", JSON.stringify(res));
                localStorage.setItem("userName", res.userName);
                localStorage.setItem("corpId", res.userName);
                localStorage.setItem(
                  "staticIOData",
                  JSON.stringify(res.staticIODatas)
                );
                this.router.navigateByUrl("/livetrack/" + this.key);
              }
            });
          }

          // http://neo.fleetpolice.com
        } else if (window.location.origin == "https://neo.fleetpolice.com") {
          app.bgImage = undefined;
          this.app["logo"] =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/dfadf.jpg";
          this.document
            .getElementById("appFavicon")
            .setAttribute(
              "href",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/dfadf.jpg"
            );
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/dfadf.jpg"
          );
          app.loginImgUrl =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/dfadf.jpg";
        } else if (
          window.location.origin == "https://goodgps.apmkingstrack.com"
        ) {
          app.bgImage = undefined;
          this.app["logo"] =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg";
          this.document
            .getElementById("appFavicon")
            .setAttribute(
              "href",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg"
            );
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg"
          );
          app.loginImgUrl =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg";
        } else if (
          window.location.origin == "https://tracol.apmkingstrack.com"
        ) {
          app.bgImage = undefined;
          this.app["logo"] =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/tracole.jpg";
          this.document
            .getElementById("appFavicon")
            .setAttribute(
              "href",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/tracole.jpg"
            );
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/tracole.jpg"
          );
          app.loginImgUrl =
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/tracole.png";
        } else if (app.appName == "FMS") {
          if (
            this.platform.platforms()[0] == "desktop" ||
            this.platform.platforms()[0] == "tablet"
          ) {
            // app.entryPoint = "VTS";
            this.title.setTitle("Fleet Management System");
            this.document
              .getElementById("appFavicon")
              .setAttribute(
                "href",
                "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/fmslogo.p"
              );
          }
        } else {
          if (
            this.platform.platforms()[0] == "desktop" ||
            this.platform.platforms()[0] == "tablet"
          ) {
            // app.entryPoint = "VTS";
            this.title.setTitle("Asset Tracking");
            this.document
              .getElementById("appFavicon")
              .setAttribute("href", "assets/icon/mvt.png");
          }
        }

        if (
          this.platform.platforms()[0] == "desktop" ||
          this.platform.platforms()[0] == "tablet"
        ) {
          setTimeout(() => {
            if (localStorage.userName) {
              this.menuObject = [];
              if (localStorage.loginData) {
                this.isDealer = false;
                let mainMenu = JSON.parse(
                  JSON.parse(localStorage.getItem("loginData"))[1].mainmenu
                );
                // this.menuObject = ["Dashboard", "Grid view", "Map view", "Geo fence", "Reports", "Alerts", "Settings", "Log out"];
                for (var i = 0; i < Object.keys(this.appIcon).length; i++) {
                  if (mainMenu.indexOf(Object.keys(this.appIcon)[i]) != -1)
                    this.menuObject.push(Object.keys(this.appIcon)[i]);
                }
              } else if (localStorage.mainMenu) {
                this.isDealer = true;
                let mainMenu = JSON.parse(localStorage.getItem("mainMenu"));
                // this.menuObject = ["Dashboard", "Grid view", "Map view", "Geo fence", "Reports", "Alerts", "Settings", "Log out"];
                for (var i = 0; i < Object.keys(this.appIcon).length; i++) {
                  if (mainMenu.indexOf(Object.keys(this.appIcon)[i]) != -1)
                    this.menuObject.push(Object.keys(this.appIcon)[i]);
                }
              }
              // this.menuObject.push("Maintanence");
              //  if(window.location.origin != "http://localhost:810"){
              if (
                window.location.origin != "https://tracknow.apmkingstrack.com"
              ) {
                const url = serverUrl.web + "/user/branch/InitialPageuser";
                const data = {
                  userId: localStorage.userName,
                  companyId: localStorage.corpId,
                };
                this.ajaxService
                  .ajaxPostWithString(url, data)
                  .subscribe((res) => {
                    localStorage.inItPage = res;
                    if (res == "dashboard" || res == undefined || res == null) {
                      this.selectedMenu = "Dashboard";
                    } else if (res == "gridView") {
                      this.selectedMenu = "Grid view";
                    } else {
                      this.selectedMenu = res;
                    }
                    this.commonService.dismissLoader();
                  });
              }
            }
          }, 2000);
        } else {
          setTimeout(() => {
            this.menuObject = [];
            if (localStorage.loginData) {
              let mainMenu = JSON.parse(
                JSON.parse(localStorage.getItem("loginData"))[1].mainmenu
              );
              // this.menuObject = ["Dashboard", "Grid view", "Map view", "Geo fence", "Reports", "Alerts", "Settings", "Log out"];
              for (var i = 0; i < Object.keys(this.appIcon).length; i++) {
                if (mainMenu.indexOf(Object.keys(this.appIcon)[i]) != -1)
                  this.menuObject.push(Object.keys(this.appIcon)[i]);
              }
            } else if (localStorage.mainMenu) {
              let mainMenu = JSON.parse(localStorage.getItem("mainMenu"));
              let esimremovemenu = JSON.parse(
                localStorage.getItem("esimremovemenu")
              );
              // this.menuObject = ["Dashboard", "Grid view", "Map view", "Geo fence", "Reports", "Alerts", "Settings", "Log out"];
              for (var i = 0; i < Object.keys(this.appIcon).length; i++) {
                if (mainMenu.indexOf(Object.keys(this.appIcon)[i]) != -1) {
                  this.menuObject.push(Object.keys(this.appIcon)[i]);
                  // if (Object.keys(this.appIcon)[i] !== "Esim Menus") {
                  if (esimremovemenu.includes(Object.keys(this.appIcon)[i])) {
                    this.menuObject.pop();
                  }
                }
              }
            }
          }, 2000);
        }
      });
      if (localStorage.companyLogo) {
        this.app["logo"] = localStorage.companyLogo;
      }
      if (localStorage.corpId) {
        this.app["company"] = localStorage.corpId;
      }
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe((state) => {
        if (state == true && sessionStorage.login == "true") {
          if (
            (localStorage.inItPage == "dashboard" ||
              localStorage.inItPage == undefined) &&
            app.appName != "Armoron"
          ) {
            this.router.navigateByUrl("tabs/members/dashboard");
            this.selectedMenu = "Dashboard";
          } else if (
            localStorage.inItPage == "gridView" ||
            app.appName == "Armoron"
          ) {
            this.router.navigateByUrl("tabs/gridview/All");
            this.selectedMenu = "Grid view";
          }
          // tabs-login/members/login
          // /livetrack
        } else if (
          window.location.origin != "https://tracknow.apmkingstrack.com" &&
          state == false &&
          (sessionStorage.login == "false" ||
            sessionStorage.login == undefined ||
            sessionStorage.login == "undefined") &&
          (localStorage.login == "false" ||
            localStorage.login == undefined ||
            localStorage.login == "undefined")
        ) {
          // if(window.location.hash == "#/aklive-track"){
          //   this.router.navigateByUrl('aklive-track');
          // }else if(window.location.hash.split('/')[1] == "livetrack"){
          //      this.router.navigateByUrl('/livetrack/'+this.key, { replaceUrl: true });
          // }
          //  this.router.navigateByUrl('/livetrack/'+this.key, { replaceUrl: true });
          this.router.navigateByUrl("tabs-login/members/login", {
            replaceUrl: true,
          });
          if (
            (localStorage.inItPage == "dashboard" ||
              localStorage.inItPage == undefined) &&
            app.appName != "Armoron"
          ) {
            this.selectedMenu = "Dashboard";
          } else if (
            localStorage.inItPage == "gridView" ||
            app.appName == "Armoron"
          ) {
            this.selectedMenu = "Grid view";
          }
          // }else{
          //   // this.selectedMenu = 'livetrack';
          // }
        } else {
          if (
            (localStorage.inItPage == "dashboard" ||
              localStorage.inItPage == undefined) &&
            app.appName != "Armoron"
          ) {
            this.selectedMenu = "Dashboard";
            this.router.navigateByUrl("tabs/members/dashboard");
          } else if (
            localStorage.inItPage == "gridView" ||
            app.appName == "Armoron"
          ) {
            this.selectedMenu = "Grid view";
            this.router.navigateByUrl("tabs/gridview/All");
          } else if (localStorage.inItPage == "livetrack") {
            this.router.navigateByUrl("/livetrack/" + this.key, {
              replaceUrl: true,
            });
          }
          setTimeout(() => {
            this.loadingRefresh = true;
          }, 10000);
        }
      });
    });

    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    console.log("platform" + this.myPlatform);
  }

  async logOutFunction(router) {
    localStorage.removeItem("modalFilterData");
    localStorage.setItem("pageSelector", router);

    if (router == "Log out" || router == "Log-out") {
      const alert = await this.alertController.create({
        header: "Log out",
        backdropDismiss: false,
        message:
          "Are you sure you want to logout from " +
          localStorage.getItem("corpId") +
          " login",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              storageVariable.upDatedJsonData = undefined;
              storageVariable.dashboardData = undefined;

              if (localStorage.getItem("pushStatus") == "persisted") {
                let pushDetails = {
                  imeiNo: localStorage.getItem("imeiNo"),
                  appName: app.appName,
                  deviceToken: localStorage.getItem("deviceToken"),
                  companyID: localStorage.getItem("corpId"),
                  userId: localStorage.getItem("userName"),
                  // "os": "ionic4",
                  pushStatus: "false",
                };
                if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
                  pushDetails["os"] = "ionic4ios";
                } else if (/(android)/i.test(navigator.userAgent)) {
                  pushDetails["os"] = "ionic4";
                }
                const url = serverUrl.web + "/alert/pushnotification";
                this.ajaxService
                  .ajaxPostWithBody(url, pushDetails)
                  .subscribe((res) => {
                    console.log("push presisted");
                    // this.restartApp();
                  });
              }
              if (this.websocketService.isAlive("livetrack")) {
                this.websocketService.disConnectSocket("livetrack");
              }
              this.menuController.enable(false);
              localStorage.clear();
              sessionStorage.setItem("login", "false");
              localStorage.setItem("login", "false");
              // this.router.navigateByUrl('login');
              this.authenticationService.logout();
              localStorage.clear();
              // window.location.reload();   clearing chache
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.selectedMenu = router;
      if (router == "Map view") {
        localStorage.setItem("statusChanger", "All");
      }
      this.router.navigateByUrl(this.appUrl[router]);
    }
  }

  menuSelection() {
    if (this.appSideMenu == "listMenu") {
      console.log("i am iconMenu");
      this.appSideMenu = "iconMenu";
    } else {
      console.log("i am listMenu");
      this.appSideMenu = "listMenu";
    }
  }

  setMenuOver(status) {
    console.log("Mouse Hover", status);
    this.menuOver = status;
  }
}
