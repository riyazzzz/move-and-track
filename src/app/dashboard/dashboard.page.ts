import { Component, OnInit, EventEmitter } from "@angular/core";
import { serverUrl, app, storageVariable } from "../../environments/environment";
import { AjaxService } from "../services/ajax.service";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { CommonService } from '../services/common.service';
import { WebsocketService } from '../services/websocket.service';
import { websocket } from '../interfaces/webSocket';
import { Platform, AlertController, ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Device } from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import * as HighCharts from "highcharts";
import highcharts3D from 'highcharts/highcharts-3d.src';
import { WebAppInterface } from 'src/app/interfaces/AndroidNative';
import { JsonPipe, Location } from '@angular/common';
import { AppVersion } from '@ionic-native/app-version/ngx';
declare var Android: WebAppInterface;
import { Market } from '@ionic-native/market/ngx';
import { DealerIntroSlideComponent } from "./dealer-intro-slide/dealer-intro-slide.component";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthenticationService } from "../services/authentication.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit, websocket {
  dashboard;
  total;
  myPlatform;
  totalAlertCount: number = 0;
  applicationSettings;
  statusColor;
  today = new Date();
  yesterday = new Date();
  week = new Date();
  month = new Date();
  todayDate;
  alarmPlateNo;
  yesterdayDate;
  previousWeekDate;
  previousMonthDate;
  statusChanger = [{ status: 'Yesterday', isChecked: true },
  { status: 'Last 7 Days', isChecked: false },
  { status: '1 Month', isChecked: false }
  ];
  summaryStatusChanger = [{ status: 'Current' }, { status: 'Yesterday' }, { status: "Last 7 Days" }
  ];
  summaryStatus = [{ status: 'Yesterday' }, { status: "Last 7 Days" }];
  vehicleCount: any = {};
  odometerData: { "count": string; "vehicle": string; }[];
  subscription: any;
  alertCount: number = 1;
  exitPopup = false;
  sub: any;
  app: any = {};
  donutAndBar = {
    vehicleSummaries: 200,
    vehicleStatus: 200,
    vehicleSummary3d: 200,
    totalHrsDistributionChart: 340,
    totalVehicleCountHeigth: 240,
    totalVehicleCountWidth: 240
  }
  dashbordChart = ['Current Vehicle Status', 'Unused Vehicles Summary', 'Alert Count Summery', 'Odometer Summary', 'Speedometer Summary', 'Distribution Summary', 'Top 5 Overspeed Vehicles', 'Top 5 Unused Assets', 'Top 5 Engine Hours', 'Top 5 Odometer Vehicles', 'Top 5 Power Fail', 'Top 5 Door Open'];
  showDashbordChart = [];
  loginData = [];
  entryPoint: any;
  updatedJsonData: any;
  isIosPlatform: boolean = false;
  
  alertshowNodata: boolean = false;
  alertChartdata: boolean = true;
  OverspeedshowNodata: boolean = false;
  Overspeedchartdata: boolean = true;
  unUsedAssertshowNodata: boolean = false;
  unUsedAssertchartdata: boolean = true;
  Top5EngineshowNodata:boolean = false;
  Top5Enginechartdata: boolean = true;
  Top5odametershowNodata:boolean = false;
  Top5odameterchartdata: boolean = true;
 constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private websocketService: WebsocketService,
    private modalController: ModalController,
    private firebaseX: FirebaseX,
    private device: Device,
    private authenticationService: AuthenticationService,
    private udid: UniqueDeviceID,
    private platform: Platform,
    private statusBar: StatusBar,
    private network: Network,
    private menuController: MenuController,
    private alertController: AlertController,
    private appVersion: AppVersion,
    private market: Market,
    private locat: Location
  ) {
  }

  loadExternalScript() {
    return new Promise(resolve => {
      const scriptElement = document.createElement('script');
      scriptElement.src = "https://maps.googleapis.com/maps/api/js?key=" + this.applicationSettings.GoogleMapKey;
      scriptElement.className = "googleMap";
      scriptElement.id = this.applicationSettings.GoogleMapKey;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  wsResponse(json) {
    var data = json.liveDatas
    if (data) {
      //console.log("recived websocket data")
      if (json.statusCount == null) {
        this.updatedJsonData = storageVariable.upDatedJsonData;
        if (this.updatedJsonData["liveDatas"][Object.keys(json['liveDatas'])[0]]) {
          this.updatedJsonData["liveDatas"][Object.keys(json['liveDatas'])[0]] = Object.values(json['liveDatas'])[0]
        } else {
          return
        }
        json = this.updatedJsonData
      }
      for (let i = 0; i < Object.keys(json.statusCount).length; i++) {
        json['statusCount'][Object.keys(json.statusCount)[i]] = 0;
      }
      let data = [];
      for (let i = 0; i < Object.keys(json.liveDatas).length; i++) {
        let currentCount: any = Object.values(json.liveDatas)[i];
        // if (currentCount.status == "Yet_to_transmit" || currentCount.status == "Yet to Transmit" || currentCount.status == "Online" || currentCount.status == null) {
        //   currentCount.status = "No Transmission"
        // } else if (currentCount.status == "Towed") {
        //   currentCount.status = "Running"
        // }
        // if (currentCount.status == "Overspeed") {
        //   data.push("Running");
        // } else {
        data.push(currentCount.status);
        // }
        Object.values(json.liveDatas)[i]["odometer"] = parseInt(Object.values(json.liveDatas)[i]["odometer"]) / 1000
      }
      data.sort();
      let current = null;
      let cnt = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] != current) {
          if (cnt > 0) {
            // //console.log(current + ' comes --> ' + cnt + ' times<br>');
          }
          current = data[i];
          cnt = 1;
        } else {
          cnt++;
        }
        json.statusCount[current] = cnt
      }
      if (cnt > 0) {
        // //console.log(current + ' comes --> ' + cnt + ' times');
        json.statusCount[current] = cnt
      }

      let updatedJson: object;
      if (localStorage.cacheAddress) {
        const cacheData = JSON.parse(localStorage.cacheAddress);
        let data = this.commonService.updateCacheAddress(cacheData, json.liveDatas);
        updatedJson = storageVariable.dashboardData;
        updatedJson["liveDatas"] = data.liveDatas;
      }
      else {
        updatedJson = json;
      }
      // for(let i=0; i < Object.keys(json.liveDatas).length; i++){
      //   json.liveDatas[i]["odometer"] = parseInt(json.liveDatas[i]["odometer"])/1000
      // }
      json['statusCount']['Total'] = Object.keys(json.liveDatas).length;
      // localStorage.setItem('dashboardData', JSON.stringify(updatedJson));
      storageVariable.dashboardData = updatedJson
      storageVariable.upDatedJsonData = json
      // localStorage.setItem('upDatedJsonData', JSON.stringify(json));
      if (json['statusCount']) {
        json['statusCount']['Total'] = Object.keys(json.liveDatas).length;
        this.updateData(json['statusCount']);
      }
    } else {
      //console.log(json)
    }
  }

  wsOnError() {
    setTimeout(() => {
      this.websocketService.connectSocket(JSON.parse(localStorage.dashboardWebSocketData), "livetrack");
    }, 60000);

  }
  updateData(json) {
    let result = new Array();
    if (json["Total"]) {
      this.total = json["Total"];
      if (json["Total"] == undefined) {
        this.total = 0;
      }
    }
    for (let key of this.statusColor) {
      if (json.hasOwnProperty(Object.keys(key)[0])) {
        result.push({
          type: Object.keys(key)[0],
          count: json[Object.keys(key)[0]],
          percentage: json[Object.keys(key)[0]] / this.total * 100,
          color: Object.values(key)[0]
        });
      }
    }

    this.dashboard = result;
    localStorage.setItem(
      "dataFilter",
      JSON.stringify({ dashboardFilter: result, total: this.total })
    );
    this.totalVehicleCount();

  }
  async restartApp() {
    const alert = await this.alertController.create({
      header: 'Info',
      backdropDismiss: false,
      message: "Device notification enabled need to restart your application.",
      buttons: [
        {
          text: 'Restart',
          handler: data => {
            document.location.href = 'index.html';
          }
        }]
    });
    await alert.present();
  }
  async pushNotificationConfig() {
    let pushDetails: object;
    this.platform.ready().then(res => {

      if (this.platform.is('ios')) {
        this.firebaseX.grantPermission()
          .then((success) => {
            if (success) {
            }
          });
      }
      if (this.network.type !== "none") {
        if (/(android)/i.test(navigator.userAgent)) {
          this.firebaseX.getToken()
            .then(token => {
              //alert("token is "+ token);
              //   alert("uuid is "+ this.device.uuid);
              localStorage.setItem('imeiNo', this.device.uuid)
              localStorage.setItem('deviceToken', token)
              localStorage.setItem('notificationStatus', 'true')
              pushDetails = {
                "imeiNo": this.device.uuid,
                "appName": app.appName,
                "deviceToken": token,
                "companyID": localStorage.getItem("corpId"),
                "userId": localStorage.getItem("userName"),
                "os": "ionic4",
                "pushStatus": "true"
              };
              const url = serverUrl.web + "/alert/pushnotification";
              this.ajaxService.ajaxPostWithBody(url, pushDetails)
                .subscribe(res => {
                  localStorage.setItem('pushStatus', 'persisted');
                  //console.log('push presisted');
                  // this.restartApp();
                })

            })
            .catch(error => {
              //  alert("Token uuid as "+error);
              this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
            })

        } else if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
          this.firebaseX.getToken()
            .then(token => {
              //alert("token is "+ token);
              this.udid.get()
                .then((uuid: any) => {
                  // alert("uuid is "+ uuid);
                  localStorage.setItem('imeiNo', this.device.uuid)
                  localStorage.setItem('deviceToken', token)
                  localStorage.setItem('notificationStatus', 'true')
                  pushDetails = {
                    "imeiNo": this.device.uuid,
                    "appName": app.appName,
                    "deviceToken": token,
                    "companyID": localStorage.getItem("corpId"),
                    "userId": localStorage.getItem("userName"),
                    "os": "ionic4ios",
                    "pushStatus": "true"
                  };
                  localStorage.setItem('device','ionic4ios')
                  //console.log(uuid);
                  //console.log(token);
                  const url = serverUrl.web + "/alert/pushnotification";
                  this.ajaxService.ajaxPostWithBody(url, pushDetails)
                    .subscribe(res => {
                      localStorage.setItem('pushStatus', 'persisted');
                      //console.log('push presisted');
                      // this.restartApp();
                    })
                })
                .catch((error: any) => {
                  //alert("Error uuid as "+error);
                  this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
                });

            })
            .catch(error => {
              //  alert("Token uuid as "+error);
              this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
            })

        }
        this.network.onDisconnect().subscribe(() => {
          //console.log('network was disconnected :-(');
          this.commonService.presentToast('Poor Network Connection');
        });
      }
    })
  }
  async openDelarIntroModal() {
    if (localStorage.delarIntro != "true") {
      const modal = await this.modalController.create({
        component: DealerIntroSlideComponent,
        cssClass: 'custom-modalad'
      });
      return await modal.present();
    }
  }

  ionViewWillEnter() {
    localStorage.setItem('statusChanger', "All")
    this.menuController.enable(true);
    // this.alertCountHeader();
    this.websocketService.setProductService(this);
    if (!this.websocketService.isAlive('livetrack')) {
      this.websocketService.connectSocket(JSON.parse(localStorage.dashboardWebSocketData), "livetrack");
    }
    if (storageVariable.upDatedJsonData) {
      this.updateData(storageVariable.upDatedJsonData['statusCount']);
    }
    this.totalVehicleCount();
    this.alertCountHeader();
    if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      this.statusBar.show()
      if (localStorage.getItem("pushStatus") === null) {
        this.pushNotificationConfig();
      }
    }
    // if(!this.websocketService.isAlive('alertsmanagerendpoint')){
    //   let alertJson = {
    //     "oldVin": "",
    //     "newVin": localStorage.getItem('userName')
    //   }
    //   // this.websocketService.connectSocket(alertJson,"alert"); 
    // }
  }

  filterClick = (filter: string) => {
    this.commonService.presentLoader();
    localStorage.setItem("filterActive", filter);
    this.router.navigateByUrl("/tabs/gridview");
    this.commonService.dismissLoader();
  };
  // routerModal(data){
  //   if(data.count > 0){
  //     this.router.navigateByUrl("tabs/gridview/"+data.type);
  //   }else{
  //     this.commonService.presentToast("You don't have any vehicles.");
  //   }
  // }
  routerModal(count, type) {
    if (count > 0) {
      this.router.navigateByUrl("tabs/gridview/" + type);
      localStorage.setItem('statusChanger', type)
    } else {
      this.commonService.presentToast("You don't have any vehicles.");
    }
  }
  // initForAlarmCheck(){
  //   this.platform.ready().then(res =>{
  //     if (Android.getEntryState()
  //     &&  /(android|iPhone|iPad|iPod)/i.test(navigator.userAgent) ) {
  //       Android.replaceAlarmState();
  //       let messageBody = Android
  //       .getMessageBody();
  //       let message = '';

  //       if (messageBody.indexOf("Engine Turned ON") != -1) {
  //         message = 'ENGINE ON';
  //         this.alarmPlateNo = messageBody.split(':')[2].replace('Time','');
  //         this.commonService.alarmPopup(this.alarmPlateNo,message);
  //       } else if (messageBody.indexOf("SOS") != -1) {
  //         message = 'SOS Alert';
  //         this.alarmPlateNo = messageBody.split(':')[2].replace('Time','');
  //         this.commonService.alarmPopup(this.alarmPlateNo,message);
  //       } else if ((messageBody.indexOf("AntiTheft") != -1) ){
  //         message = 'ANTI THEFT';
  //         this.alarmPlateNo = messageBody.split(':')[2].replace('Time','');
  //         this.commonService.alarmPopup(this.alarmPlateNo,message);
  //       } else if (messageBody.indexOf("PowerCut") != -1) {
  //         message = 'POWER CUT';
  //         this.alarmPlateNo = messageBody.split(':')[1].replace('Time','');
  //         this.commonService.alarmPopup(this.alarmPlateNo,message);
  //       }else if (messageBody.indexOf("Movement Detected!") != -1) {
  //         message = 'MOVEMENT DETECTED';
  //         this.alarmPlateNo = messageBody.split(':')[2].replace('Time','');
  //         this.commonService.alarmPopup(this.alarmPlateNo,message);
  //       }

  //     }
  //   });
  // }
  bellRouter() {
    this.router.navigateByUrl('/tabs/alerts/All')
  }
  alertConfiguration() {
    let url2 = serverUrl.web + '/device/bikeappalerts' + localStorage.corpId;
    this.ajaxService.ajaxGet(url2)
      .subscribe(Response => {
        //console.log(Response);
        var data = JSON.stringify(Response);
        localStorage.setItem('alertData', data);
      });
  }

  async appUpdate() {
    if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      if (localStorage.appSettings) {
        //console.log(this.appVersion.getAppName())
        let currentVersion = app.appVersion;
        let appSettingsVersion = JSON.parse(localStorage.appSettings)['appComVersion'][app.appName];
        if (appSettingsVersion > currentVersion) {
          const alert = await this.alertController.create({
            header: 'Update Alert',
            backdropDismiss: false,
            message: "A new update is now available. Please update from the appstore or playstore.",
            buttons: [{
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
              }
            },
            {
              text: 'update',
              handler: data => {
                //console.log("update that")
                this.authenticationService.logout();
                this.router.navigateByUrl('login')
                this.market.open(app.package);
              }
            }]
          });

          await alert.present();

        }
      }
    }

  }
  ngOnInit() {
    // this.openDelarIntroModal();
    this.appUpdate();
    this.websocketService.setProductService(this);
    let mainMenu = JSON.parse(localStorage.getItem("mainMenu"));
    for (var i = 0; i < this.dashbordChart.length; i++) {
      if (mainMenu.indexOf(this.dashbordChart[i]) != -1)
        this.showDashbordChart.push(this.dashbordChart[i])
    }
    this.entryPoint = app.entryPoint;
    this.app["logo"] = localStorage.companyLogo;
    // this.alertConfiguration();
    this.menuController.enable(true);
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      this.isIosPlatform = true;
    }
    else {
      this.isIosPlatform = false;
    }
    if (this.myPlatform == "desktop") {
      this.donutAndBar = {
        vehicleSummaries: 160,
        vehicleStatus: 180,
        vehicleSummary3d: 160,
        totalHrsDistributionChart: 300,
        totalVehicleCountWidth: 200,
        totalVehicleCountHeigth: 200
      }
    }
    //this.initForAlarmCheck();
    //today date
    this.todayDate = this.today.getFullYear() + "-";
    this.todayDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";
    this.todayDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();
    //yesterday date
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.yesterdayDate = this.yesterday.getFullYear() + "-";
    this.yesterdayDate += (this.yesterday.getMonth() + 1 < 10 ? "0" + (this.yesterday.getMonth() + 1).toString() : (this.yesterday.getMonth() + 1).toString()) + "-";
    this.yesterdayDate += this.yesterday.getDate() < 10 ? "0" + this.yesterday.getDate().toString() : this.yesterday.getDate().toString();
    //week date 
    this.week.setDate(this.week.getDate() - 7);
    this.previousWeekDate = this.week.getFullYear() + "-";
    this.previousWeekDate += (this.week.getMonth() + 1 < 10 ? "0" + (this.week.getMonth() + 1).toString() : (this.week.getMonth() + 1).toString()) + "-";
    this.previousWeekDate += this.week.getDate() < 10 ? "0" + this.week.getDate().toString() : this.week.getDate().toString();

    //month date
    this.month.setMonth(this.month.getMonth() - 1);
    this.previousMonthDate = this.month.getFullYear() + "-";
    this.previousMonthDate += (this.month.getMonth() + 1 < 10 ? "0" + (this.month.getMonth() + 1).toString() : (this.month.getMonth() + 1).toString()) + "-";
    this.previousMonthDate += this.month.getDate() < 10 ? "0" + this.month.getDate().toString() : this.month.getDate().toString();

    /****************************End new Dashboard**************/
    if (app.entryPoint == 'TTS') {
      app.entryPoint = "unknown"
    }
    let body = {
      "username": localStorage.userName,
      "password": localStorage.password,
      "corpid": localStorage.corpId,
      "loginMode": "mobile",
      "entryPoint": app.entryPoint,
      "appsetting": "vts_mobile"
    }
    let url = serverUrl.web + "/login/company/login";
    this.ajaxService.ajaxPostMethod(url, body)
      .subscribe(res => {
        if (res != undefined) {
          if (app.entryPoint == 'unknown') {
            app.entryPoint = res[1].entryPoint
            this.entryPoint = app.entryPoint;
          }
          this.loginData = Object.keys(res[0]);
          localStorage.setItem('appSettings', res[1]["applicationSettings"]);
          localStorage.setItem("mapAllowed", res[1]["mapAllowed"]);
          localStorage.setItem('commandsData', res[1]["CommandsData"]);
          localStorage.setItem('loginData', JSON.stringify(res));
          localStorage.setItem('appSettings', res[1]["applicationSettings"]);
          //  localStorage.setItem('map', JSON.parse(res[1]["applicationSettings"]).mapview);
          localStorage.setItem('map', res[1]["mapview"]);
          localStorage.setItem('mainMenu', res[1]["mainmenu"]);

        } else {
          this.commonService.dismissLoader();
          var data = navigator.onLine;
          if (data == false) {
            this.commonService.networkChecker()
          } else if (data == true) {
            this.ajaxService.ajaxGetWithString(serverUrl.web + "/login/test")
              .subscribe(res => {
                if (res == '["Hi Web....!"]')
                  console.log("server run")
                else {
                  this.commonService.dismissLoader();
                  setTimeout(()=>{
                    this.commonService.presentAlert("Server maintanance error", "Sorry for the inconvenience please try after some times");
                  },30000)
                }
              })
          }
        }
      });


    // let data = {
    //   "companyID": localStorage.corpId,
    //   "branchID": localStorage.corpId,
    //   "emailId": localStorage.userName,
    //   "Check": "false",
    //   "entryPoint": app.entryPoint,
    //   "dashboardMode": "mobile"
    // }
    // const url2 = serverUrl.web + "/api/vts/company/dashboarddata/" + JSON.stringify(data);
    // this.ajaxService.ajaxGet(url2)
    //   .subscribe(res => {
    //     if(res!=undefined){
    //       localStorage.setItem('dashboardData', JSON.stringify(res));
    //       localStorage.setItem('upDatedJsonData', JSON.stringify(res));
    //     }else{
    //       this.commonService.dismissLoader();
    //       var data = navigator.onLine;
    //     if(data == false){
    //      this.commonService.networkChecker()
    //     }else if(data == true){
    //       this.ajaxService.ajaxGetWithString(serverUrl.web + "/api/vts/test")
    //     .subscribe(res=>{
    //       if(res == '["Hi Web....!"]')
    //      //console.log("server run")
    //      else{
    //       this.commonService.dismissLoader();
    //       this.commonService.presentAlert("Server maintanance error", "Sorry for the inconvenience please try after some times");
    //      }
    //     })
    //     }
    //   }
    //   })

    this.applicationSettings = JSON.parse(localStorage.appSettings);
    const ele: any = document.querySelector(".googleMap");
    if (ele === null) {
      this.loadExternalScript().then(() => { console.warn("Init Map Loaded") }).catch(() => { });
    }
    else if (ele.id !== this.applicationSettings.GoogleMapKey) {
      document.body.removeChild(ele);
      this.loadExternalScript().then(() => { console.warn("Map Key Changed") }).catch(() => { });
    }
    let json = JSON.parse(localStorage.loginData);
    this.statusColor = this.applicationSettings.statusColor;
    if (json) {
      this.updateData(json[0]);
    }
    if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
      if (localStorage.getItem("pushStatus") === null) {
        this.pushNotificationConfig();
      }
    }
    // this.appUpdate();
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationStart) {
      if (window.location.hash == "#/tabs/members/dashboard") {
        this.backButtonExit();
      } else if (window.location.hash == '#/tabs/gridview/All' || window.location.hash == '#/tabs/mapview/All' || window.location.hash == '#/tabs/alerts/null' || window.location.hash == '#/tabs/alerts/All') {
        this.backButtonExit();
      }
      else {
        if (this.subscription)
          this.subscription.unsubscribe();
        document.removeEventListener('backbutton', function () {
          //console.log("end")
        });
      }
      // if (window.location.hash == "#/geofence/All/null")
      //   this.subscription.unsubscribe();
      //   document.removeEventListener('backbutton', function(event){
      //     //console.log("end")
      //   })
      // if (window.location.hash == "#/reports/null")
      //   this.subscription.unsubscribe();
      //   document.removeEventListener('backbutton', function(event){
      //     //console.log("end")
      //   })
      // if (window.location.hash == "#/settings/All")
      //   this.subscription.unsubscribe();
      //   document.removeEventListener('backbutton', function(){
      //     //console.log("end")
      //   })
      // }
    });
  }


  /************************** New Dashboard Services*************************************/
  alertCountHeader() {
    let basicAlertsAndCount = { 'Overspeed': '', 'Idle': '', 'Stop': '', 'Engine On': '' };
    let reqJson = {
      "userId": localStorage.getItem('userName'),
      "fromDate": this.todayDate,
      "toDate": this.todayDate
    };
    const url = serverUrl.web + '/alert/alertcounts?userId=' + localStorage.getItem('userName') + '&fromDate=' + this.todayDate + '&toDate=' + this.todayDate
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        basicAlertsAndCount = res;
        this.totalAlertCount = 0;
        for (let i = 0; i < Object.keys(basicAlertsAndCount).length; i++) {

          this.totalAlertCount += parseInt(Object.values(basicAlertsAndCount)[i]);
        }
      })
  }

  backButtonExit() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      let thisKey = this;
      let alertController = this.alertController;
      let websocketService = this.websocketService
      let locat = this.locat;
      document.addEventListener('backbutton', async function (event) {
        if (window.location.hash == "#/tabs/members/dashboard") {
          event.preventDefault();
          // event.stopImmediatePropagation()
          // event.stopPropagation();
          //console.log('hello');
          if (thisKey.exitPopup === false) {
            thisKey.exitPopup = true;
            localStorage.setItem("exitPopup", "true")
            const alert = await thisKey.alertController.create({
              header: 'Exit',
              backdropDismiss: false,
              message: "Are you sure? You want to exit!",
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                  thisKey.exitPopup = false;
                  localStorage.setItem("exitPopup", "false");
                }
              },
              {
                text: 'Ok',
                handler: data => {
                  navigator['app'].exitApp();
                  // thisKey.websocketService.disConnectSocket("livetrack");

                }
              }]
            });
            await alert.present();
          }
        } else {
          event.stopImmediatePropagation()
          event.stopPropagation();
          event.preventDefault();
          thisKey.locat.back();
        }
      }, false);
    });
    // this.subscription = this.platform.backButton.subscribe(async () => {
    //   document.addEventListener('backbutton', function (event) {});
    //   event.preventDefault();
    //     event.stopPropagation();
    //   localStorage.setItem("exitPopup", "false")
    //   if (this.exitPopup === false) {

    //     this.exitPopup = true;
    //     localStorage.setItem("exitPopup", "true")
    //     const alert = await this.alertController.create({
    //       header: 'Are you sure?',
    //       backdropDismiss: false,
    //       message: "You want to exit!",
    //       buttons: [{
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: data => {
    //           this.exitPopup = false;
    //           localStorage.setItem("exitPopup", "false");
    //         }
    //       },
    //       {
    //         text: 'Ok',
    //         handler: data => {
    //           if (window.location.pathname == "/tabs/members/dashboard")
    //             navigator['app'].exitApp();
    //         }
    //       }]
    //     });
    //     await alert.present();
    //   }

    //   if (this.menuController.isOpen()) {
    //     this.menuController.close()
    //   }
    // });


  }
  
  async ionViewDidEnter() {
    // this.backButt onExit();
  }

  ionViewWillLeave() {
    //console.log('leave')
    //  this.subscription.unsubscribe();
    // this.ngOnInit()
  }
  totalVehicleCount() {
    let router = this.router;
    let commonService = this.commonService;
    this.dashboard;
    let chartData = [];
    let colors = [];
    let name = [];
    let dataShow = [];
    for (let i = 0; i < this.dashboard.length; i++) {
      // if (this.dashboard[i].type === "Overspeed" || this.dashboard[i].type === "Yet_to_transmit" || this.dashboard[i].type === "Yet to Transmit" || this.dashboard[i].type === "Online" || this.dashboard[i].type === "Towed") {
      //   continue;
      // }
      // else {
      this.vehicleCount['all'] = this.total;
      // //console.log(this.dashboard[i].type +' '+ this.dashboard[i].count);
      chartData.push([this.dashboard[i].type, this.dashboard[i].count]);
      name.push(this.dashboard[i].type);
      ////console.log(chartData);
      let chartValue = [];
      chartValue.push(this.dashboard[i].type);
      chartValue.push(this.dashboard[i].count);
      dataShow.push(chartValue);
      if (this.dashboard[i].type === "Running") {
        this.vehicleCount['RUNNING'] = this.dashboard[i].count
      }
      switch (this.dashboard[i].type) {
        case "Running":
          this.vehicleCount['running'] = this.dashboard[i].count;
          break;
        case "Idle":
          this.vehicleCount['idle'] = this.dashboard[i].count;
          break;
        case "Stop":
          this.vehicleCount['stop'] = this.dashboard[i].count;
          break;
        case "No Transmission":
          this.vehicleCount['noTransmit'] = this.dashboard[i].count;
          break;
        case "DoorOpen":
          this.vehicleCount['dooropen'] = this.dashboard[i].count;
          break;
        case "Geofence":
          this.vehicleCount['geofence'] = this.dashboard[i].count;
          break;
        case "HighTemp":
          this.vehicleCount['hightemp'] = this.dashboard[i].count;
          break;
        case "PowerFail":
          this.vehicleCount['powerfail'] = this.dashboard[i].count;
          break;
        case "Good":
          this.vehicleCount['good'] = this.dashboard[i].count;
          break;
        case "Overspeed":
          this.vehicleCount['Overspeed'] = this.dashboard[i].count;
          break;
        case "Towed":
          this.vehicleCount['Towed'] = this.dashboard[i].count;
          break;
        case "Online":
          this.vehicleCount['Online'] = this.dashboard[i].count;
          break;
        case "Yet_to_transmit":
          this.vehicleCount['Yet_to_transmit'] = this.dashboard[i].count;
          break;
      }
      // }
      // if (this.dashboard[i].color === "#00E1BC" || this.dashboard[i].color === "#c200b8" || this.dashboard[i].color === "#7d410f" || this.dashboard[i].color === "#f28918") {
      //   continue;
      // }
      // else {
      // //console.log( this.dashboard[i].color);
      colors.push(this.dashboard[i].color);
      ////console.log(colors);

      // }

    }
    this.total = this.total == undefined ? "0" : this.total
    if (this.myPlatform == 'desktop') {


      HighCharts.chart('totalVehicleStatusDesktop', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          width: this.donutAndBar.totalVehicleCountWidth,
          height: this.donutAndBar.totalVehicleCountHeigth
        },
        colors: colors,
        tooltip: {
          enabled: false
        },
        title: {
          text: "<p  style='color: black;font-family:Impact; font-size: 15px; '>Total <br> </p>" + this.total,
          floating: true,
          y: 80,
          style: {
            fontSize: '25px',
            fontFamily: "Impact",
            color: "black"
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%'],
            size: '110%',
            events: {
              click: function (event) {
                ////console.log(event.point.options);

                const routingData = {
                  type: event.point.options.name,
                  count: event.point.options.y
                }
                if (routingData.count > 0) {
                  router.navigateByUrl("tabs/gridview/" + routingData.type);
                } else {
                  commonService.presentToast("You don't have any vehicles.");
                }
              },
            }
          },
        },
        series: [{
          type: 'pie',
          name: 'Vehicles',
          innerSize: '50%',
          animation: false,
          dataLabels: {
            enabled: false,
            connectorWidth: 0,
            connectorPadding: 10
          },
          data: chartData
        }]
      });
    } else {
      HighCharts.chart('totalVehicleStatus', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          width: 240,
          height: 240
        },
        colors: colors,
        tooltip: {
          enabled: false
        },
        title: {
          text: "<p  style='color: black;font-family:Impact; font-size: 20px; '>Total <br> </p>" + this.total,
          floating: true,
          y: 100,
          style: {
            fontSize: '35px',
            fontFamily: "Impact",
            color: "black"
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%'],
            size: '110%',
            events: {
              click: function (event) {
                ////console.log(event.point.options);

                const routingData = {
                  type: event.point.options.name,
                  count: event.point.options.y
                }
                if (routingData.count > 0) {
                  router.navigateByUrl("tabs/gridview/" + routingData.type);
                } else {
                  commonService.presentToast("You don't have any vehicles.");
                }
              },
            }
          },
        },
        series: [{
          type: 'pie',
          name: 'Vehicles',
          innerSize: '50%',
          animation: false,
          dataLabels: {
            enabled: false,
            connectorWidth: 0,
            connectorPadding: 10
          },
          data: chartData
        }]
      });
    }
  }

  totalHrsDistributionChart(chartData, text, colors) {
    highcharts3D(HighCharts);
    HighCharts.chart('totalHrsDistributionChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        // width: 240,
        height: this.donutAndBar.totalHrsDistributionChart,
      },
      colors: colors,
      title: {
        text: text,
        floating: true,
        y: 110,
        style: {
          fontSize: '20px',
          fontFamily: "Impact",
          color: "black"
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          center: ['50%', '50%'],
          size: '110%',
        }
      },
      legend: {
        //align: 'left',
        layout: 'horizontal',
        //verticalAlign: 'top',
        // x: 40,
        // y: 0
      },
      series: [{
        type: 'pie',
        name: 'Percentage ',
        innerSize: '40%',
        dataLabels: {
          enabled: false,
          connectorWidth: 0,
          connectorPadding: 10
        },
        data: chartData,
        showInLegend: true,

      }]
    });
  }


  totalHrsDistributionSummary(data) {
    let commonService = this.commonService;
    let firstChartWord = "";
    let secondChartWord = "";
    let reqJson;
    let text = "";
    //let chartData=[['Running',10],['Idle',14],['Stop',65],['Overspeed',10],['No Transmission',6]];
    let chartData = [];
    let colors = ['#1eb15d', '#FF0000', '#1f5baa', '#000000', '#f28918'];
    if (data.detail.value === "Yesterday") {
      firstChartWord = "YESTERDAY";
      secondChartWord = "STATUS";
      reqJson = {
        "vin": "All",
        "companyId": localStorage.getItem('corpId'),
        "branchId": localStorage.getItem('corpId'),
        "currentDate": "No",
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate
      };
    } else if (data.detail.value === "Last 7 Days") {
      firstChartWord = "LAST";
      secondChartWord = "7 DAYS";
      reqJson = {
        "vin": "All",
        "companyId": localStorage.getItem('corpId'),
        "branchId": localStorage.getItem('corpId'),
        "currentDate": "No",
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate
      };
    } else {
      firstChartWord = "LAST";
      secondChartWord = "1 MONTH";
      reqJson = {
        "vin": "All",
        "companyId": localStorage.getItem('corpId'),
        "branchId": localStorage.getItem('corpId'),
        "currentDate": "No",
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate
      };
    }
    //  const url = 'http://localhost:8080/Web/api/vts/company/totalHrsDistribution/{"vin":"All","companyId":"jana","branchId":"art","userId":"art-ca","fromDate":"2015-08-09","toDate":"2015-08-10","currentDate":"NO"}';
    const url = serverUrl.web + "/report/totalHrsDistribution";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        // //console.log(res);
        for (let i = 0; i < Object.keys(res).length; i++) {
          let chartKey: any = [];
          let chartValue: any = [];
          chartKey.push(Object.keys(res)[i].toUpperCase());
          chartValue.push(Object.values(res)[i]);
          chartData.push([chartKey[0], parseFloat(chartValue[0])]);
        }
        // //console.log("distribution"+ chartData);
        text = "<div  style=';color: black;font-family: Impact; font-size: 15px;'>" + firstChartWord + "</div>" + "<br/>" + "<div>" + secondChartWord + "</div>";
        this.totalHrsDistributionChart(chartData, text, colors)
      });
  }

  vehicleStatus(statusType, categories, data, color, format) {
    let count = 0;
    HighCharts.chart(statusType, {
      chart: {
        backgroundColor: '#FFFFFF00',
        height: this.donutAndBar.vehicleStatus,
        type: 'bar',
        animation: true
      },
      title: {
        text: null
      },
      tooltip: {
        enabled: true
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: categories,
        allowDecimals: false,
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        gridLineWidth: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          enabled: false//default is true
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            format: '{y}' + format,
            color: 'black',
            borderWidth: 0,
            style: {
              textOutline: "none"
            }
          }
        }
      },
      series: [{
        type: undefined,
        name: format,
        //name: null,
        data: data,
        color: color,
        borderRadius: 3,
        pointWidth: 30,

        // dataLabels: {
        //   enabled: true,
        //   format: data[count++]+'+hrs'
        // }
      }]
    });

  }

  overspeedStatus(data) {
    let overSpeedVehicleName = [];
    let overSpeedVehicleValue = [];
    let reqJson;
    let hoursOrDays = " kmph"
    let overSpeed = { 'TN 09 MK 8754': '', 'TN 09 MK 8654': '', 'TN 09 MK 8758': '', 'TN 09 MK 8750': '' };
    if (data.detail.value === "Yesterday") {
      hoursOrDays = " kmph";
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "overSpeed"
      };
    } else if (data.detail.value === "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "overSpeed"
      };
    } else {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate,
        "mode": "overSpeed"
      };
    }
    const url = serverUrl.web + "/report/gettop5data"
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        overSpeed = res;
          var sortable = [];
          for (let vehicle in overSpeed) {
            sortable.push([vehicle, overSpeed[vehicle]]);
          }
          sortable.sort(function (a, b) {
            return a[1] - b[1];
          });
          ////console.log(sortable);
          for (let i = sortable.length - 1; i >= 0; i--) {
            let value = sortable[i][1].split(":");
            overSpeedVehicleName.push(sortable[i][0]);
            if (hoursOrDays == " kmph") {
              overSpeedVehicleValue.push(parseInt(value[0]));
            } else {
              overSpeedVehicleValue.push(Math.round(parseInt(value[0]) / 24));
            }
          }
          // for(let i=0; i < Object.keys(overSpeed).length ;i++){
          //   overSpeedVehicleValue.push(parseInt(Object.values(overSpeed)[i]));
          //   overSpeedVehicleName.push(Object.keys(overSpeed)[i]);
          // }
          if(overSpeedVehicleValue.length == 0 || Object.keys(res).length == 0)
          {
            this.OverspeedshowNodata = true
            this.Overspeedchartdata = false
          }
          else{
            this.OverspeedshowNodata = false
            this.Overspeedchartdata = true
            this.vehicleStatus("overspeedvehicles", overSpeedVehicleName, overSpeedVehicleValue, '#f58220', hoursOrDays);
          }
      });
  }

  unUsedAssert(data) {
    let unUsedAssertName = [];
    let unUsedAssertValue = [];
    let reqJson;
    let hoursOrDays = " days"
    let unUsedAssert = { 'TN 09 MK 8754': '', 'TN 09 MK 8654': '', 'TN 09 MK 8758': '', 'TN 09 MK 8750': '' };
    if (data.detail.value === "Yesterday") {
      hoursOrDays = " hours";
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "unUsedAsset"
      };
    } else if (data.detail.value === "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "unUsedAsset"
      };
    } else {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate,
        "mode": "unUsedAsset"
      };
    }
    const url = serverUrl.web + "/report/gettop5data";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        ////console.log(res);
        unUsedAssert = res;
        var sortable = [];
        for (let vehicle in unUsedAssert) {
          sortable.push([vehicle, unUsedAssert[vehicle]]);
        }
        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        ////console.log(sortable);
        for (let i = sortable.length - 1; i >= 0; i--) {
          let value = sortable[i][1].split(":");
          unUsedAssertName.push(sortable[i][0]);
          if (hoursOrDays == " hours") {
            unUsedAssertValue.push(parseInt(value[0]));
          } else {
            // unUsedAssertValue.push(parseFloat((parseInt(value[0]) / 24).toFixed(1)));
            unUsedAssertValue.push(parseFloat(value[0]));
          }
        }
        // for(let i=0; i < Object.keys(unUsedAssert).length ;i++){
        //   unUsedAssertValue.push(parseInt(Object.values(unUsedAssert)[i]));
        //   unUsedAssertName.push(Object.keys(unUsedAssert)[i]);
        // }
        //let pic = this.overspeedImage;
        if(unUsedAssertValue.length == 0 || Object.keys(res).length == 0)
        {
          this.unUsedAssertshowNodata = true
          this.unUsedAssertchartdata = false
        }
        else{
          this.unUsedAssertshowNodata = false
          this.unUsedAssertchartdata = true
      this.vehicleStatus("unUsedAssert", unUsedAssertName, unUsedAssertValue, '#8e4eeb', hoursOrDays);
        }
  
      });

  }


  engineHours(data) {
    let engineHoursName = [];
    let engineHoursValue = [];
    let reqJson;
    let hoursOrDays = " hours";
    let engineHours = { '05': '', '21': '', '60': '', '90': '' };
    if (data.detail.value === "Yesterday") {
      hoursOrDays = " hours"
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "engineHrs"
      };
    } else if (data.detail.value === "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "engineHrs"
      };
    } else {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate,
        "mode": "engineHrs"
      };
      ////console.log("reqJson"+reqJson)
    }
    const url = serverUrl.web + "/report/gettop5data";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        // //console.log(res);
        engineHours = res;
        var sortable = [];
        for (let vehicle in engineHours) {
          sortable.push([vehicle, engineHours[vehicle]]);
        }
        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        // //console.log(sortable);
        for (let i = sortable.length - 1; i >= 0; i--) {
          let value = sortable[i][1].split(":");
          engineHoursName.push(sortable[i][0]);
          if (hoursOrDays == " hours") {
            engineHoursValue.push(parseFloat(value[0]));
          } else {
            engineHoursValue.push(Math.round(parseInt(value[0]) / 24));
          }
        }
        if(engineHoursValue.length == 0  || Object.keys(res).length == 0)
        {
          this.Top5EngineshowNodata = true
          this.Top5Enginechartdata = false
        }
        else{
          this.Top5EngineshowNodata = false
          this.Top5Enginechartdata = true
          this.vehicleStatus("engineHours", engineHoursName, engineHoursValue, '#1198aa', hoursOrDays);
        }
      });

  }


  vehicleOdometer(data) {
    let vehicleOdometerName = [];
    let vehicleOdometerValue = [];
    let reqJson;
    let km = " km";
    let vehicleOdometer = { 'TN 09 MK 8754': '', 'TN 09 MK 8654': '', 'TN 09 MK 8758': '', 'TN 09 MK 8750': '' };
    if (data.detail.value === "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "odometer"
      };
    } else if (data.detail.value === "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "odometer"
      };
    } else {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate,
        "mode": "odometer"
      };
    }
    const url = serverUrl.web + "/report/gettop5data";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        ////console.log(res);
        vehicleOdometer = res;
        var sortable = [];
        for (let vehicle in vehicleOdometer) {
          sortable.push([vehicle, vehicleOdometer[vehicle]]);
        }
        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        ////console.log(sortable);
        for (let i = sortable.length - 1; i >= 0; i--) {
          let value = sortable[i][1].split(":");
          vehicleOdometerName.push(sortable[i][0]);
          vehicleOdometerValue.push(parseInt(value[0]));
        }
        // for(let i=0; i < Object.keys(vehicleOdometer).length ;i++){
        //   vehicleOdometerValue.push(parseInt(Object.values(vehicleOdometer)[i]));
        //   vehicleOdometerName.push(Object.keys(vehicleOdometer)[i]);
        // }
        if(vehicleOdometerValue.length == 0  || Object.keys(res).length == 0)
        {
          this.Top5odametershowNodata = true
          this.Top5odameterchartdata = false
        }
        else{
          this.Top5odametershowNodata = false
          this.Top5odameterchartdata = true
          this.vehicleStatus("vehicleOdometer", vehicleOdometerName, vehicleOdometerValue, '#27aae2', km);
        }
      });

  }

  vehicleSummaries(statusType, categories, data, color) {
    let i = 0;
    let xText = "";
    let yText = "";
    let enabled = false;
    let value;
    let commonService = this.commonService;
    let router = this.router;
    if (statusType == "odometerSummery") {
      xText = "Odometer (km)";
      yText = "Vehicles";
      value = this.odometerData;
    } else if (statusType == "speedometerSummery") {
      xText = "Speedometer (km/h)";
      yText = "Vehicles";
    }
    else {
      enabled = true;
      xText = "";
      yText = "";
    }
    let labels123 = ['0', '54', '70', '80', '140', '180', '200', '240'];
    HighCharts.chart(statusType, {
      chart: {
        height: this.donutAndBar.vehicleSummaries,
        type: 'column',
        animation: true,
        alignTicks: true
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: enabled
      },
      title: {
        text: null
      },
      xAxis: {
        categories: categories,
        allowDecimals: false,
        labels: {
          style: {
            fontSize: '0.8em'
          }
        },
        title: {
          text: xText
        }

      },
      yAxis: {

        allowDecimals: false,
        title: {
          text: yText,
        },
        gridLineWidth: 0,
        lineWidth: 0,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            color: 'black',
            borderWidth: 0,
            style: {
              textOutline: "none"
            }
          }
        }
      },
      series: [
        {
          events: {
            click: function (event) {
              var data: any = event.point.options.name;
              if (data != undefined) {
                data = data.split(",");
                const routingData = {
                  type: "Vin",
                  count: event.point.options.y,
                  data: data
                }
                if (routingData.count > 0) {
                  localStorage.setItem('vinGridViewData', JSON.stringify(routingData));
                  localStorage.setItem('statusChanger', "Vin");
                  router.navigateByUrl("tabs/gridview/Vin");
                  // //console.log(routingData);
                } else {
                  commonService.presentToast('You don\'t have any vehicles.')
                }
              }
            },
          },
          type: undefined,
          data: data,
          name: 'Vehicles',
          pointWidth: 30,
          color: color,
          dataLabels: {
            enabled: true
          },

        }
      ]
    });
  }

  alertsAndCounts(data) {
    let alertsType = [];
    let basicAlertsAndCount = { 'Overspeed': '', 'Idle': '', 'Stop': '', 'Engine On': '' };
    let alertsCount = [];
    let reqJson;
    if (data.detail.value == "Current") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.todayDate,
        "toDate": this.todayDate
      };
    } else if (data.detail.value == "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate
      };
      ////console.log(reqJson);
    } else if (data.detail.value == "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate
      };
    }
    const url = serverUrl.web + '/alert/alertcounts?userId=' + localStorage.getItem('userName') + '&fromDate=' + reqJson.fromDate + '&toDate=' + reqJson.toDate
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        if(Object.keys(res).length == 0)
        {
        this.alertshowNodata = true
        this.alertChartdata = false
        }
        else
        {
          this.alertshowNodata = false
          this.alertChartdata = true
          basicAlertsAndCount = res;
          //this.totalAlertCount = 0;
          for (let i = 0; i < Object.keys(basicAlertsAndCount).length; i++) {
            alertsCount.push(parseInt(Object.values(basicAlertsAndCount)[i]));
            // if(data.detail.value == "Current"){
            //   this.totalAlertCount += parseInt(Object.values(basicAlertsAndCount)[i]);
            // }
            if (Object.keys(basicAlertsAndCount)[i] == "PreventiveMaintenance") {
              alertsType.push("PM");
            } else {
              alertsType.push((Object.keys(basicAlertsAndCount)[i]).toUpperCase());
            }
          }
          this.vehicleSummaries('alertCountSummery', alertsType, alertsCount, "#f7b921");
        }
      });

  }

  odometer(data) {
    let speedRatio = [];
    let odometer: Object = {};
    let speedVehicle = [];
    let reqJson;
    if (data.detail.value == "Current") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.todayDate,
        "toDate": this.todayDate,
        "mode": "odometerSummary"
      };
    } else if (data.detail.value == "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "odometerSummary"
      };
      ////console.log(reqJson);
    } else if (data.detail.value == "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "odometerSummary"
      };
    }
    const url = serverUrl.web + "/report/ChartSummaryData";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        ////console.log(res);
        odometer = res
        // Object.keys(res).sort().forEach(function(key) {
        //   odometer[key] = res[key];
        // });
        // //console.log(odometer);
        let sortKey: any = Object.keys(odometer)
        sortKey.sort(function (a, b) { return parseInt(a) - parseInt(b) });
        for (let i = 0; i < sortKey.length; i++) {
          speedRatio.push([(odometer[sortKey[i]].vehicle).toString(), parseInt(odometer[sortKey[i]].count)])
          speedVehicle.push(sortKey[i].toUpperCase());
        }
        // for(let i=0; i < Object.keys(odometer).length ;i++){
        //   speedRatio.push([(Object.values(odometer)[i].vehicle).toString() ,parseInt(Object.values(odometer)[i].count)]);
        //   speedVehicle.push((Object.keys(odometer)[i]).toUpperCase());
        // }
        this.odometerData = Object.values(odometer);
        speedVehicle = ['0-40', '40-80', '80-120', '120-160', '160-200', '200-240', '240-280', '280-320']
       // speedRatio = [['', 0],['', 0] ,['', 0], ['', 0],['art745,art404', 2]]
        this.vehicleSummaries("odometerSummery", speedVehicle, speedRatio, "#27aae2");
      });
  }

  speedometer(data) {
    let speedRatio = [];
    let speedometer: Object = {};
    let speedVehicle = [];
    let reqJson;
    if (data.detail.value == "Current") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.todayDate,
        "toDate": this.todayDate,
        "mode": "speedometerSummary"
      };
    } else if (data.detail.value == "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "speedometerSummary"
      };
      ////console.log(reqJson);
    } else if (data.detail.value == "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "speedometerSummary"
      };
    }
    const url = serverUrl.web + "/report/ChartSummaryData"
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        ////console.log(res);
        speedometer = res;
        let colors = [];
        // Object.keys(res).sort().forEach(function(key) {
        //   speedometer[key] = res[key];
        // });
        // for(let i=0; i < Object.keys(speedometer).length ;i++){
        //   speedRatio.push([(Object.values(speedometer)[i].vehicle).toString(),parseInt(Object.values(speedometer)[i].count)]);
        //   colors.push(speedRatio[i] <= 50 ? "#009933" : speedRatio[i] <= 75 ? "#ffdd1f" : speedRatio[i] > 76? "#f58220": "#f58220");
        //   speedVehicle.push((Object.keys(speedometer)[i]).toUpperCase());
        // }
        ////console.log(colors)
        let sortKey: any = Object.keys(speedometer)
        sortKey.sort(function (a, b) { return parseInt(a) - parseInt(b) });
        for (let i = 0; i < sortKey.length; i++) {
          speedRatio.push([(speedometer[sortKey[i]].vehicle).toString(), parseInt(speedometer[sortKey[i]].count)])
          speedVehicle.push(sortKey[i].toUpperCase());
        }
        let color = "#009933"
        this.vehicleSummaries("speedometerSummery", speedVehicle, speedRatio, color);
      });
  }

  unUsedVehicleStatus(data) {
    let speedRatio = [];
    let unUsedSummary = { "0-50": { "count": "String", "vehicle": "String" } };
    let speedVehicle = [];
    let reqJson;
    if (data.detail.value == "Current") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.todayDate,
        "toDate": this.todayDate,
        "mode": "unUsedAssetSummary"
      };
    } else if (data.detail.value == "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "unUsedAssetSummary"
      };
      ////console.log(reqJson);
    } else if (data.detail.value == "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "unUsedAssetSummary"
      };
    }
    const url = serverUrl.web + "/report/ChartSummaryData";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        unUsedSummary = res;
        let sortKey: any = Object.keys(unUsedSummary)
        sortKey.sort(function (a, b) { return parseInt(a) - parseInt(b) });
        for (let i = 0; i < sortKey.length; i++) {
          speedRatio.push([(unUsedSummary[sortKey[i]].vehicle).toString(), parseInt(unUsedSummary[sortKey[i]].count)])
          speedVehicle.push(sortKey[i].toUpperCase());
        }
        // for(let i=0; i < Object.keys(unUsedSummary).length ;i++){
        //   speedRatio.push([(Object.values(unUsedSummary)[i].vehicle).toString(),parseInt(Object.values(unUsedSummary)[i].count)]);
        //   speedVehicle.push((Object.keys(unUsedSummary)[i]).toUpperCase());
        // }
        this.vehicleSummary3d('unUsedVehicleStatus', speedVehicle, speedRatio);
      });

  }
  noOfDoorOpen(data) {
    let deviceDoorOpenName = [];
    let deviceDoorOpenValue = [];
    let reqJson;
    let km = " Times";
    let DoorOpen = { 'TN 09 MK 8754': '', 'TN 09 MK 8654': '', 'TN 09 MK 8758': '', 'TN 09 MK 8750': '' };
    if (data.detail.value === "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "doorCount"
      };
    } else if (data.detail.value === "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "doorCount"
      };
    } else {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate,
        "mode": "doorCount"
      };
    }

    const url = serverUrl.web + "/report/gettop5data"
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        ////console.log(res);
        DoorOpen = res;
        var sortable = [];
        for (let device in DoorOpen) {
          sortable.push([device, DoorOpen[device]]);
        }
        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        ////console.log(sortable);
        for (let i = sortable.length - 1; i >= 0; i--) {
          let value = sortable[i][1].split(":");
          deviceDoorOpenName.push(sortable[i][0]);
          deviceDoorOpenValue.push(parseInt(value[0]));
        }
        // for(let i=0; i < Object.keys(vehicleOdometer).length ;i++){
        //   vehicleOdometerValue.push(parseInt(Object.values(vehicleOdometer)[i]));
        //   vehicleOdometerName.push(Object.keys(vehicleOdometer)[i]);
        // }
        this.vehicleStatus("noOfDoorOpen", deviceDoorOpenName, deviceDoorOpenValue, '#FF851B', km);
      });
  }

  noOfPowerFail(data) {
    let devicePowerFailName = [];
    let devicePowerFailValue = [];
    let reqJson;
    let km = " Times";
    let powerFail = { 'TN 09 MK 8754': '', 'TN 09 MK 8654': '', 'TN 09 MK 8758': '', 'TN 09 MK 8750': '' };
    if (data.detail.value === "Yesterday") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.yesterdayDate,
        "toDate": this.yesterdayDate,
        "mode": "powerFail"
      };
    } else if (data.detail.value === "Last 7 Days") {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousWeekDate,
        "toDate": this.todayDate,
        "mode": "powerFail"
      };
    } else {
      reqJson = {
        "userId": localStorage.getItem('userName'),
        "fromDate": this.previousMonthDate,
        "toDate": this.todayDate,
        "mode": "powerFail"
      };
    }

    const url = serverUrl.web + "/report/gettop5data";
    this.ajaxService.ajaxPostMethod(url, reqJson)
      .subscribe(res => {
        ////console.log(res);
        powerFail = res;
        var sortable = [];
        for (let device in powerFail) {
          sortable.push([device, powerFail[device]]);
        }
        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        ////console.log(sortable);
        for (let i = sortable.length - 1; i >= 0; i--) {
          let value = sortable[i][1].split(":");
          devicePowerFailName.push(sortable[i][0]);
          devicePowerFailValue.push(parseInt(value[0]));
        }
        // for(let i=0; i < Object.keys(vehicleOdometer).length ;i++){
        //   vehicleOdometerValue.push(parseInt(Object.values(vehicleOdometer)[i]));
        //   vehicleOdometerName.push(Object.keys(vehicleOdometer)[i]);
        // }
        this.vehicleStatus("noOfPowerFail", devicePowerFailName, devicePowerFailValue, '#412525', km);
      });
  }

  vehicleSummary3d(statusType, categories, data) {
    let router = this.router;
    let commonService = this.commonService;
    highcharts3D(HighCharts);
    HighCharts.chart(statusType, {
      chart: {
        // width: 330,
        height: this.donutAndBar.vehicleSummary3d,
        type: 'column',
        animation: true,
        options3d: {
          enabled: true,
          alpha: 5,
          beta: 15,
          depth: 40,
          viewDistance: 0,
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false,
      },
      title: {
        text: null
      },
      xAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        categories: categories,
        title: {
          text: 'Hours'
        }
      },
      colors: ['#00b359', '#ff3399', '#80aaff', '#ff751a', '#00b3b3'],
      yAxis: {
        title: {
          text: "Vehicle Count",
        },
        gridLineWidth: 0,
        lineWidth: 0,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            format: '{y}',
            color: 'black',
            borderWidth: 0,
            style: {
              textOutline: "none"
            }
          }
        }
      },
      series: [
        {
          events: {
            click: function (event) {
              var data: any = event.point.options.name;
              data = data.split(",");
              const routingData = {
                type: "Vin",
                count: event.point.options.y,
                data: data
              }
              if (routingData.count > 0) {
                localStorage.setItem('vinGridViewData', JSON.stringify(routingData));
                router.navigateByUrl("tabs/gridview/Vin");
                //          //console.log(routingData);
              }
              else {
                commonService.presentToast('There is no vehicle data to show')
              }
            },
          },
          type: undefined,
          name: 'Vehicle Count',
          data: data,
          colorByPoint: true,
          pointWidth: 30,
          //colors: ['#00b359', '#ff3399', '#80aaff', '#ff751a', '#00b3b3']
        }
      ]
    });
  }

}
