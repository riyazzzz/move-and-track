import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { serverUrl } from "../../environments/environment";
import { AjaxService } from "../services/ajax.service";
import { ModalController, Platform, AlertController } from "@ionic/angular";
import { ForgotpassModalPage } from "../login/forgotpass-modal/forgotpass-modal.page";
import { app } from "../../environments/environment";
import { CommonService } from "../services/common.service";
import { WebsocketService } from "../services/websocket.service";
import { MenuController } from "@ionic/angular";
import { WebAppInterface } from "../interfaces/AndroidNative";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { host } from "../../environments/environment";

declare var Android: WebAppInterface;
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  login: any;
  forgetPass: any;
  isChecked: boolean = false;
  eye_icon: string = "eye-off";
  password_type: string = "password";
  logo: string;
  exitPopup = false;
  appName: string;
  alarmPlateNo: any;
  subscription: any;
  myPlatform: string;
  entryPoint: any;
  bgImage;
  serverName = "Click here for Demo!";
  check = "asda";
  armoronApp = {
    countryCode: "+91",
    selectedlanguage: "English",
    country: "India",
  };
  countryList: any;
  OTPmessage: any;
  languageOptions: any = [];
  generatedOTP;
  newCompName: string;
  showDemoUrl: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public ajaxService: AjaxService,
    private platform: Platform,
    public router: Router,
    public modalController: ModalController,
    private commonService: CommonService,
    private websocketService: WebsocketService,
    private menuController: MenuController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {}

  changeModule(data) {
    if (data == "user") {
      this.router.navigateByUrl("tabs-login/members/login");
      document.location.href = "index.html";
    } else {
      this.router.navigateByUrl("tabs-login/dealarlogin/login");
    }
  }

  change_demo() {
    if (this.serverName.includes("Live")) {
      this.serverName = "Click here for Demo!";
      this.logo = "../assets/loginLogo/moveandtrack.png";
      window.location.reload();
    } else {
      localStorage.clear();
      this.serverName = "Go Back to Live!";
      this.logo = "../assets/loginLogo/demo-logo.png";
      let urlValue = "http://" + host.demo + ":8081/fleettracking";
      //urlValue = "http://"+host.localIp;
      let cacheURL = "http://" + host.demo + ":8091/Admin";
      let webSocketUrl = "ws://" + host.demo + ":8091";
      //webSocketUrl = host.localIp;
      let adminSocketUrl = "ws://" + host.demo + ":8091";
      serverUrl.Admin,
        serverUrl.web,
        serverUrl.adminSocket,
        (serverUrl.Admin = undefined);
      serverUrl.web = urlValue;
      serverUrl.websocket = webSocketUrl;
      serverUrl.adminSocket = adminSocketUrl;
      serverUrl.Admin = cacheURL;
    }
  }

  showHidePass = () => {
    this.password_type = this.password_type === "text" ? "password" : "text";
    this.eye_icon = this.eye_icon === "eye" ? "eye-off" : "eye";
  };
  submitLogin = () => {
    const login_datas = {
      compName: this.login.value.compName.toLowerCase(),
      password: this.login.value.password.toLowerCase(),
      compId: this.login.value.compId.toLowerCase(),
    };
    this.login.patchValue(login_datas);
    // if (app.entryPoint == 'TTS') {
    app.entryPoint = "unknown";
    // }
    this.commonService.presentLoader();
    let body = {
      username: this.login.value.compName,
      password: this.login.value.password,
      corpid: this.login.value.compId,
      loginMode: "mobile",
      entryPoint: app.entryPoint,
      appsetting: "vts_mobile",
    };

    let url = serverUrl.web + "/login/company/login";
    this.ajaxService.ajaxPostMethod(url, body).subscribe((res) => {
      console.log(res);
      if (res != undefined) {
        if (res.length > 1) {
          if (app.entryPoint == "unknown") {
            app.entryPoint = res[1].entryPoint;
          }
          if (this.isChecked) {
            document.cookie =
              "rememberme=yes;domain=" + window.location.hostname + ";path=/";
            let remValue: object = {
              compName: this.login.value.compName,
              password: this.login.value.password,
              corpid: this.login.value.compId,
              checked: this.isChecked,
            };
            sessionStorage.setItem("rememberMe", JSON.stringify(remValue));
          } else {
            document.cookie =
              "rememberme=no;domain=" + window.location.hostname + ";path=/";
            if (localStorage.rememberMe) {
              localStorage.removeItem("rememberMe");
            }
          }

          let dashboardInput = {
            companyID: this.login.value.compId,
            branchID: this.login.value.compId,
            emailId: this.login.value.compName,
            Check: false,
            entryPoint: app.entryPoint,
            pollingDuration: JSON.parse(res[1]["applicationSettings"])
              .pollingDuration,
            mode: "dashboardData",
            dashboardVin: "",
            defaultInterval: res[1]["applicationSettings"].liveTrackingDelay,
            make: "",
            model: "",
            delay: res[1]["applicationSettings"].liveTrackingDelay,
            ImeiNo: "",
          };
          const messagingServiceData = {
            companyId: this.login.value.compId,
            logo: res[1]["logo"],
            entryPoint: res[1].entryPoint,
          };

          this.commonService.updateLogo(messagingServiceData);
          this.websocketService.connectSocket(dashboardInput, "livetrack");
          // || "https://track.remon.in"
          if (window.location.origin == "https://track.remon.in") {
            localStorage.setItem(
              "companyLogo",
              "http://kingstrackimages.s3.amazonaws.com/Company/Elint.png"
            );
          } else if (window.location.origin == "http://ilocate.in") {
            localStorage.setItem(
              "companyLogo",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/ilocate.jpg"
            );
          } else if (window.location.origin == "https://neo.fleetpolice.com") {
            localStorage.setItem(
              "companyLogo",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/dfadf.jpg"
            );
          } else if (
            window.location.origin == "https://tracol.apmkingstrack.com"
          ) {
            localStorage.setItem(
              "companyLogo",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/tracole.jpg"
            );
          } else if (
            window.location.origin == "https://goodgps.apmkingstrack.com"
          ) {
            localStorage.setItem(
              "companyLogo",
              "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/goodgps.jpg"
            );
          } else {
            localStorage.setItem("companyLogo", res[1]["logo"]);
          }
          // localStorage.setItem('device','ionic4ios')
          localStorage.setItem("mapAllowed", res[1]["mapAllowed"]);
          localStorage.setItem("mainMenu", res[1]["mainmenu"]);
          localStorage.setItem(
            "dashboardWebSocketData",
            JSON.stringify(dashboardInput)
          );
          localStorage.setItem("loginData", JSON.stringify(res));
          localStorage.setItem(
            "staticIOData",
            JSON.stringify(res[0]["staticIODatas"])
          );
          localStorage.setItem("appSettings", res[1]["applicationSettings"]);
          // localStorage.setItem('map', JSON.parse(res[1]["applicationSettings"]).mapview);
          localStorage.setItem("map", res[1]["mapview"]);
          localStorage.setItem("corpId", this.login.value.compId);
          localStorage.setItem("userName", this.login.value.compName);
          localStorage.setItem("password", this.login.value.password);
          localStorage.setItem("commandsData", res[1]["CommandsData"]);
          // this.router.navigateByUrl("/dashboard");
          if (this.myPlatform != "desktop" && serverUrl.web.includes("mvt")) {
            localStorage.setItem("inItPage", res[1]["initialPage"]);
            sessionStorage.setItem("login", "true");
            localStorage.setItem("login", "true");
            this.authService.login();
            this.commonService.dismissLoader();
          } else {
            localStorage.setItem("inItPage", res[1]["initialPage"]);
            if (
              res[1]["initialPage"] == "dashboard" ||
              res[1]["initialPage"] == undefined
            ) {
              this.router.navigateByUrl("/tabs/members/dashboard");
            } else if (
              res[1]["initialPage"] == "gridView" ||
              res[1]["initialPage"] == "gridview"
            ) {
              this.router.navigateByUrl("tabs/gridview/All");
            } else if (
              res[1]["initialPage"].toString().toUpperCase() == "FMSDASHBOARD"
            ) {
              localStorage.setItem("fmslogin", app.appName);
              this.router.navigateByUrl("fms-dashboard");
              localStorage.setItem("fmscurrency", res[1]["currency"]);
              this.menuController.enable(true);
            } else if (
              res[1]["initialPage"].toString().toUpperCase() == "JOBCARD"
            ) {
              this.router.navigateByUrl("job-card-details");
              this.menuController.enable(true);
            } else {
              this.router.navigateByUrl("ais-dashboard");
            }
            sessionStorage.setItem("login", "false");
            localStorage.setItem("login", "false");
            this.commonService.dismissLoader();
          }

          const url =
            serverUrl.web +
            "/login/getPreferences?key=pdfDownloadLogo&companyId=" +
            this.login.value.compId;
          this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
            localStorage.setItem("pdfDownloadLogo", res);
          });
        } else {
          sessionStorage.setItem("login", "false");
          localStorage.setItem("login", "false");
          this.commonService.dismissLoader();
          this.commonService.presentToast("Invalid credential");
        }
      } else {
        this.commonService.dismissLoader();
        var data = navigator.onLine;
        if (data == false) {
          this.commonService.networkChecker();
        } else if (data == true) {
          this.ajaxService
            .ajaxGetWithString(serverUrl.web + "/login/test")
            .subscribe((res) => {
              if (res == '["Hi Web....!"]') console.log("server run");
              else {
                this.commonService.dismissLoader();
                setTimeout(() => {
                  this.commonService.presentAlert(
                    "Server maintanance error",
                    "Sorry for the inconvenience please try after some times"
                  );
                }, 10000);
              }
            });
        }
      }
    });
  };

  async openFpassModal() {
    const modal = await this.modalController.create({
      component: ForgotpassModalPage,
      cssClass: "custome_fleet",
    });
    return await modal.present();
  }
  ionViewWillEnter() {
    this.menuController.enable(false);
    if (this.commonService.isLoading) this.commonService.dismissLoader();
    this.backButtonExit();
    if (this.websocketService.isAlive("livetrack")) {
      this.websocketService.disConnectSocket("livetrack");
    }
  }
  backButtonExit() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
    let thisKey = this;
    let alertController = this.alertController;
    let websocketService = this.websocketService;
    document.addEventListener(
      "backbutton",
      async function (event) {
        if (
          window.location.hash == "#/tabs-login" ||
          window.location.hash == "#/tabs-login/members/login"
        ) {
          event.preventDefault();
          // event.stopImmediatePropagation()
          // event.stopPropagation();
          console.log("hello");
          if (thisKey.exitPopup === false) {
            thisKey.exitPopup = true;
            localStorage.setItem("exitPopup", "true");
            const alert = await thisKey.alertController.create({
              header: "Exit",
              backdropDismiss: false,
              message: "Are you sure? You want to exit!",
              buttons: [
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: (data) => {
                    thisKey.exitPopup = false;
                    localStorage.setItem("exitPopup", "false");
                  },
                },
                {
                  text: "Ok",
                  handler: (data) => {
                    navigator["app"].exitApp();
                    // thisKey.websocketService.disConnectSocket("livetrack");
                  },
                },
              ],
            });
            await alert.present();
          }
        } else {
          if (this.subscription) this.subscription.unsubscribe();
        }
      },
      false
    );
  }

  generateOTP = (cntrl) => {
    this.generatedOTP = Math.floor(Math.random() * 9000) + 1000;
    if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      if (
        this.login.value.compName === "9600696008" ||
        this.login.value.compName === "7010017783"
      ) {
        this.verifyOTPMethod(this.generatedOTP, this.login.value.compName);
      } else {
        this.sendOTP();
        //  this.verifyOTPMethod(this.generatedOTP, this.login.value.compName);
      }
    } else {
      this.verifyOTPMethod(this.generatedOTP, this.login.value.compName);
    }
  };

  sendOTP = () => {
    this.platform.ready().then(() => {
      this.commonService.presentLoader();

      const messageData =
        this.OTPmessage + encodeURIComponent(this.generatedOTP);
      let smsAPI = localStorage.getItem("SMSAPI");
      smsAPI = smsAPI
        .replace(
          "smsAPIMobileNumber",
          encodeURIComponent(this.login.value.compName)
        )
        .replace("smsAPIMessageContent", messageData);
      this.ajaxService.ajaxGet(smsAPI).subscribe(
        (res) => {
          console.log(res);
          this.commonService.presentToast("Enter your Otp");
          this.commonService.dismissLoader();
        },
        (err) => {
          console.log(err);
          this.commonService.dismissLoader();
        }
      );
    });
    //   this.platform.ready().then(() => {
    //     this.commonService.presentLoader();
    //   const url = serverUrl.web +'/parentapp/otp?message=your otp is '+this.generatedOTP+'&contact='+this.login.value.compName
    //   this.ajaxService.ajaxGet(url)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.commonService.presentToast('Enter your Otp');
    //     this.commonService.dismissLoader();
    //   }, err => {
    //     console.log(err);
    //     this.commonService.dismissLoader();
    //   });
    // });
  };

  verifyOTPMethod = (userotp, phoneNum) => {
    if (phoneNum === undefined || phoneNum === "") {
      this.commonService.presentAlert(
        "Phone_Number",
        "Please enter valid phone number"
      );
    } else if (phoneNum !== undefined || phoneNum !== "") {
      if (userotp === "" || userotp === undefined) {
        this.commonService.presentAlert("OTP", "Please enter the OTP");
      } else if (
        this.generatedOTP == userotp &&
        this.generatedOTP !== "" &&
        this.entryPoint !== undefined
      ) {
        this.commonService.presentLoader();
        if (phoneNum.charAt(0) === "0") {
          phoneNum = phoneNum.substr(1);
        }
        //  this.armoronLogin();
        const url =
          serverUrl.web + "/login/checkcompany/" + this.login.value.compName;
        //const url = this._global.getUrlValue() + '/api/company/checkCompany/' + phoneNum;
        this.ajaxService.ajaxGetWithBody(url).subscribe(
          (res) => {
            if (res == "Unchanged") {
              this.armoronLogin(res);
              // this.commonService.presentToast('contact support team');
            } else {
              //  this.generateOTP('cnrl');
              this.newCompName = this.login.value.compName;
              this.login.patchValue({
                compName: res,
              });
              this.armoronLogin(res);
            }
            console.log(res);
            // this.identifyCompany(res);
          },
          (err) => {
            console.log(err);
            this.commonService.dismissLoader();
          }
        );
      } else {
        this.commonService.presentAlert("OTP", "Invalid OTP");
      }
    }
  };

  identifyCompany = (data) => {
    if (data.indexOf("Error") !== -1 || data !== null || data !== "null") {
      const dataConverted = Number(data);
      if (isNaN(dataConverted) === false) {
        // localStorage.setItem('changedNumber', this.login.compName.toString());
        // localStorage.setItem('PhoneNumber', data);
        this.login.compName = data;
      }
      const credentials = {
        companyName: this.login.compName.toString(),
        password: this.login.password.toString(),
        entryPoint: app.entryPoint,
      };
      const url =
        serverUrl.web + "/login/checkcompany/" + this.login.value.compName;
      // const url = this._global.getUrlValue() + '/api/company/user';
      this.ajaxService.ajaxGetWithString(url).subscribe(
        (res) => {
          if (res == "Unchanged") {
            this.commonService.presentToast("contact support team");
          } else {
            this.generateOTP("cnrl");
          }
          console.log(res);
          this.generateOTP("cnrl");
        },
        (err) => {
          console.log(err);
          this.commonService.dismissLoader();
        }
      );
    } else {
      this.commonService.presentAlert("Error", "Try again after sometime.");
      this.commonService.dismissLoader();
    }
  };

  armoronLogin = (data) => {
    let body = {
      username: this.login.value.compName,
      password: this.login.value.compName,
      corpid: this.login.value.compName,
      loginMode: "mobile",
      entryPoint: app.entryPoint,
      appsetting: "vts_mobile",
    };
    let url = serverUrl.web + "/login/company/login";
    this.ajaxService.ajaxPostMethod(url, body).subscribe((res) => {
      if (res.length > 1) {
        localStorage.setItem("inItPage", res[1]["initialPage"]);
        sessionStorage.setItem("login", "true");
        localStorage.setItem("login", "true");
        this.authService.login();
        let dashboardInput = {
          companyID: this.login.value.compName,
          branchID: this.login.value.compName,
          emailId: this.login.value.compName,
          Check: false,
          entryPoint: app.entryPoint,
          pollingDuration: JSON.parse(res[1]["applicationSettings"])
            .pollingDuration,
          mode: "dashboardData",
          dashboardVin: "",
          defaultInterval: res[1]["applicationSettings"].liveTrackingDelay,
          make: "",
          model: "",
          delay: res[1]["applicationSettings"].liveTrackingDelay,
          ImeiNo: "",
        };
        const messagingServiceData = {
          companyId: this.login.value.compName,
          logo: res[1]["logo"],
          entryPoint: res[1].entryPoint,
        };
        if (data != "Unchanged") {
          messagingServiceData["companyId"] = this.newCompName;
        }

        this.commonService.updateLogo(messagingServiceData);
        this.websocketService.connectSocket(dashboardInput, "livetrack");
        // || "https://track.remon.in"
        if (window.location.origin == "https://track.remon.in") {
          localStorage.setItem(
            "companyLogo",
            "http://kingstrackimages.s3.amazonaws.com/Company/Elint.png"
          );
        } else if (window.location.origin == "http://ilocate.in") {
          localStorage.setItem(
            "companyLogo",
            "https://kingstrackimages.s3.ap-southeast-1.amazonaws.com/Company/ilocate.jpg"
          );
        } else {
          localStorage.setItem("companyLogo", res[1]["logo"]);
        }

        localStorage.setItem("mapAllowed", res[1]["mapAllowed"]);
        localStorage.setItem("mainMenu", res[1]["mainmenu"]);
        localStorage.setItem(
          "dashboardWebSocketData",
          JSON.stringify(dashboardInput)
        );
        localStorage.setItem("loginData", JSON.stringify(res));
        localStorage.setItem(
          "staticIOData",
          JSON.stringify(res[0]["staticIODatas"])
        );
        localStorage.setItem("appSettings", res[1]["applicationSettings"]);
        //     localStorage.setItem('map', JSON.parse(res[1]["applicationSettings"]).mapview);
        localStorage.setItem("map", res[1]["mapview"]);
        localStorage.setItem("corpId", this.login.value.compName);
        localStorage.setItem("userName", this.login.value.compName);
        localStorage.setItem("password", this.login.value.compName);
        localStorage.setItem("commandsData", res[1]["CommandsData"]);
      } else {
        localStorage.setItem("PhoneNumber", this.login.value.compName);
        this.router.navigateByUrl("/tabs-login/dashboard/add-company");
      }
      this.commonService.dismissLoader();
    });
  };

  verifyLogin = (data) => {
    if (data === null) {
      this.commonService.presentAlert("Error", "Try again after sometime.");
      this.commonService.dismissLoader();
    } else {
      // $ionicHistory.nextViewOptions({
      //    disableAnimate: true,
      //    disableBack: true
      // });
      // localStorage.setItem('PhoneNumber', this.user.phoneNumber);
      // this.getAlertConfigurationData();
      // this.getCommandsData();
    }
  };

  getAlertConfigurationData = () => {
    // this.commonService.getAlertsConfig()
    //   .subscribe(res => {
    //     localStorage.setItem('alertsData', JSON.stringify(res));
    //   }, err => {
    //     console.log(err);
    //     this.commonService.dismiss();
    //   });
  };

  getCommandsData = () => {
    // this.commonService.getCommonApplicationSettingsData('CommandsData', 'obj')
    //   .subscribe(res => {
    //     localStorage.setItem('commandsData', JSON.stringify(res));
    //     this.getPersonalTrackerCommandsData();
    //   }, err => {
    //     console.log(err);
    //     this.commonService.dismiss();
    //   });
  };

  backButton() {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        document.addEventListener("backbutton", async function (event) {
          event.preventDefault();
          if (
            localStorage.getItem("exitPopup") == "false" ||
            localStorage.getItem("exitPopup") == null
          ) {
            localStorage.setItem("exitPopup", "true");
            const alert = await this.alertController.create({
              header: "Are you sure?",
              backdropDismiss: false,
              message: "You want to exit!",
              buttons: [
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: (data) => {
                    localStorage.setItem("exitPopup", "false");
                  },
                },
                {
                  text: "Ok",
                  handler: (data) => {
                    navigator["app"].exitApp();
                  },
                },
              ],
            });
            await alert.present();
          }
        });
      }
    );
  }
  demo() {
    // this.appName = 'demo'
    app.entryPoint = "unknown";
    // this.title.setTitle("MVT Tracking");
    // this.document.getElementById('appFavicon').setAttribute('href', 'assets/icon/mvt.png');
    serverUrl.Admin = "http://192.168.1.13:8082/Admin";
    serverUrl.web = "http://192.168.1.13:8082/fleettracking";
    serverUrl.adminSocket = "ws://192.168.1.13";
    serverUrl.websocket = "ws://192.168.1.13";
    this.logo = "../assets/Armoron/apmlogo.png";
  }

  async ionViewDidEnter() {}
  ionViewWillLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit() {
    if (
      window.location.origin == "https://neo.fleetpolice.com" ||
      app.appName == "fleetPolice"
    ) {
      this.showDemoUrl = false;
    } else {
      this.showDemoUrl = true;
    }
    if (app.appName == "Armoron") {
      const url =
        serverUrl.web +
        '/login/getPreferences?key=CountrySettings&companyId=""';
      this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
        this.countryList = Object.keys(res);
        this.countryList = Object.keys(res);
        const smsAPI = res[this.armoronApp.country]["smsAPI"];
        this.OTPmessage = res[this.armoronApp.country]["OTPmessage"];
        this.armoronApp.countryCode =
          res[this.armoronApp.country]["countryCode"];
        this.entryPoint = res[this.armoronApp.country]["entryPoint"];
        localStorage.setItem("entryPoint", this.entryPoint);
        for (const x in res[this.armoronApp.country]["languages"]) {
          this.languageOptions.push(
            decodeURI(res[this.armoronApp.country]["languages"][x])
          );
          this.armoronApp.selectedlanguage = decodeURI(
            res[this.armoronApp.country]["defaultLanguage"]
          );
          // this.translateLangService.setLanguage(this.app.selectedlanguage);
        }
        localStorage.setItem("SMSAPI", smsAPI);
        console.log(res);
      });
    }
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    if (this.myPlatform != "desktop") {
      localStorage.clear();
    } else {
      const url =
        serverUrl.web +
        '/login/getPreferences?key=TrackVersion_mvt&companyId=""';
      this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
        console.log(res);
        if (res) {
          if (
            localStorage.TrackVersionMvt < res[0] ||
            localStorage.TrackVersionMvt == null ||
            localStorage.TrackVersionMvt == undefined
          ) {
            localStorage.setItem("TrackVersionMvt", res[0]);
            window.location.reload();
          } else {
            localStorage.clear();
            localStorage.setItem("TrackVersionMvt", res[0]);
          }
        }
      });
    }
    this.bgImage = app.bgImage;
    this.menuController.enable(false);
    this.appName = app.appName.replace(/ /g, "");

    this.logo = app.loginImgUrl;
    this.login = this.formBuilder.group({
      compName: ["", Validators.required],
      compId: ["", Validators.required],
      password: ["", Validators.required],
    });
    if (sessionStorage.rememberMe) {
      let details: object = JSON.parse(sessionStorage.rememberMe);
      this.login.patchValue({
        compName: details["compName"],
        password: details["password"],
        compId: details["corpid"],
        isChecked: details["checked"],
      });
      this.isChecked = details["checked"];
      // this.submitLogin();
    }
    this.router.events.subscribe(() => {
      // if (window.location.hash == "#/tabs-login/members/login")
      // if (this.subscription)
      // this.subscription.unsubscribe();
    });
    this.entryPoint = app.entryPoint;
  }
}
