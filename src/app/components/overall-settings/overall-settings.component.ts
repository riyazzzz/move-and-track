import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { serverUrl, app, storageVariable } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-overall-settings',
  templateUrl: './overall-settings.component.html',
  styleUrls: ['./overall-settings.component.scss'],
})
export class OverallSettingsComponent implements OnInit {
  @Input() pageType;
  @Input() gridLiveChange;
  data: any;
  watchStatus: boolean;
  googleMap: boolean;
  googleMapEnable:boolean=false;
  notification: boolean;
  inItLoading = {
    gridView: false,
    dashboard: false,
    mapView: false
  }
  watchMode = {
    powerCut: false,
    enginStatus: false,
    sos: false
  };
  myPlatform: any;
  appName: string;
  constructor(
    private commonService: CommonService,
    public ajaxService: AjaxService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private platform : Platform,
    public router: Router,
    private menuController: MenuController,
    private authenticationService: AuthenticationService,
  ) { }

  inItLoader(changer) {
    if(changer == "dashboard" && this.inItLoading.dashboard == true){
          changer="gridView";
          this.inItLoading.gridView = true;
    } else if(changer == "gridView" && this.inItLoading.gridView == true){
      changer="dashboard";
          this.inItLoading.dashboard = true;
    }
    const data = {
      "emailAddress":localStorage.userName,
      "companyId": localStorage.corpId,
      "initialPage":changer
    }
    const url = serverUrl.web+'/user/update/initialpage';						
    this.ajaxService.ajaxPostWithBody(url, data)
    .subscribe(res => {
      if(res = "success"){
        localStorage.setItem('inItPage', changer);
        if (changer == "gridView") {
          this.inItLoading.dashboard = false;
        } else {
          this.inItLoading.gridView = false;
        }
      }
     
    })
    
  }

  async changeMap() {
    var mapName='OpenLayer';
   if (localStorage.mapAllowed != "undefined") {
      let map:any = JSON.parse(localStorage.mapAllowed);
     // if (map[0].toLowerCase() == "googlemap") {
        const alert = await this.alertController.create({
          header: 'Are you sure?',
          backdropDismiss: false,
          message: "The application get restart",
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              if (localStorage.map == "GoogleMap") {
                this.googleMap = true;
              } else {
                this.googleMap = false;
              }
            }
          },
          {
            text: 'Confirm',
            handler: data => {
              if (localStorage.map == "GoogleMap") {
                this.googleMap = false;
             //   localStorage.map = "OpenLayer"
                mapName='OpenLayer';
              //  document.location.href = 'index.html';
              } else {
                mapName='GoogleMap';
              //  localStorage.map = "GoogleMap"
             
              }
              const url = serverUrl.web +'/login/change/mapview?company_id='+localStorage.getItem("corpId")+'&user_id='+ localStorage.getItem("userName")+'&maptype='+mapName
              this.ajaxService.ajaxGetObject(url)
                .subscribe(res => {
               console.log(res)
           //    document.location.href = 'index.html';
         //  this.router.navigateByUrl('/ tabs');
          
         this.menuController.enable(false);
         localStorage.clear();
         sessionStorage.setItem('login', 'false')
         localStorage.setItem('login', 'false')
         // this.router.navigateByUrl('login');
         this.authenticationService.logout();
         localStorage.clear();
               }), err=>{
                this.commonService.presentToast('contact support team')
               }
            }
          }]
        });
        await alert.present();
      // } else {
      //   this.googleMap = true;
      //   this.commonService.presentAlert('Warning', "Sorry you are not able to use this function.")
       
      // }
    }else{
      this.commonService.presentAlert('Warning', "Sorry you are not able to use this function.")
      this.googleMap = true;
     
    }

    // if (localStorage.mapAllowed != "undefined") {
    //   let map:any = JSON.parse(localStorage.mapAllowed);
    //   if (map[0].toLowerCase() == "googlemap") {
    //     const alert = await this.alertController.create({
    //       header: 'Are you sure?',
    //       backdropDismiss: false,
    //       message: "The application get restart",
    //       buttons: [{
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: data => {
    //           if (localStorage.map == "GoogleMap") {
    //             this.googleMap = true;
    //           } else {
    //             this.googleMap = false;
    //           }
    //         }
    //       },
    //       {
    //         text: 'Confirm',
    //         handler: data => {
    //           if (localStorage.map == "GoogleMap") {
    //             this.googleMap = false;
    //             localStorage.map = "OpenLayer"
    //           } else {
    //             localStorage.map = "GoogleMap"
    //           }
    //           document.location.href = 'index.html';
    //         }
    //       }]
    //     });
    //     await alert.present();
    //   } else {
    //     this.googleMap = true;
    //     this.commonService.presentAlert('Warning', "Sorry you are not able to use this function.")
    //   }
    // }else{
    //   this.commonService.presentAlert('Warning', "Sorry you are not able to use this function.")
    //   this.googleMap = true;
    // }
  }

  watchModeNeed(selected, status, event, json) {
    let powercut = '';
    let enginStatus = '';
    let sos = '';
    let statusUpdate = ''
    if (json.powerCut) {
      powercut = '1';
    }
    if (json.enginStatus) {
      enginStatus = '2';
    }
    if (json.sos) {
      sos = '3';
    }
    if (!json.powerCut && !json.enginStatus && !json.sos) {
      statusUpdate = '0';
      this.watchStatus = false;
    } else {
      statusUpdate = powercut + enginStatus + sos;
    }

    //console.log(parseInt(statusUpdate))
    let url: string =  serverUrl.web + "/device/updatewatchmode?vin="+this.data.vin+"&value="+parseInt(statusUpdate).toString();						
    let body = {
      "vin": this.data.vin,
      "value": parseInt(statusUpdate)
    };
    this.ajaxService.ajaxGetWithString(url)
      .subscribe(res => {
        this.data["watchmode"] = statusUpdate;
        localStorage.setItem("selectedVin", JSON.stringify(this.data));
        let data = storageVariable.upDatedJsonData;
        data.liveDatas[this.data.vin]["watchmode"] = statusUpdate
        data = storageVariable.dashboardData;
        data.liveDatas[this.data.vin]["watchmode"] = statusUpdate
      })
  }

  toggleWatchmode(event) {
    this. watchMode = {
      powerCut: false,
      enginStatus: false,
      sos: false
    };
    let statusBitWatchmode: number = 0;
    if (event.currentTarget.checked != true) {
      statusBitWatchmode = 1;
      this.watchStatus = false;
    } else {
      this.watchStatus = true;
    }
    let url: string = serverUrl.web + "/device/updatewatchmode?vin="+this.data.vin+"&value="+statusBitWatchmode.toString()						
    let body = {
      "vin": this.data.vin,
      "value": statusBitWatchmode.toString()
    };
    this.commonService.presentLoader();
    this.ajaxService.ajaxGetWithString(url)
      .subscribe(res => {
        //console.log(res);
        if (res.length > 1) {
          this.commonService.dismissLoader();
          statusBitWatchmode = 0;
          if (this.watchStatus == true) {
            statusBitWatchmode = 1;
          }
          this.data["watchmode"] = statusBitWatchmode;
          localStorage.setItem("selectedVin", JSON.stringify(this.data));
          let data = storageVariable.upDatedJsonData;
          data.liveDatas[this.data.vin]["watchmode"] = statusBitWatchmode
        } else {
          this.watchStatus = !this.watchStatus;
          this.commonService.dismissLoader();
          this.commonService.presentToast('Invalid credential');
        }
        this.watchModeUpdate();
      });

  }

  async notificationSetting(enDis) {
    this.notification = enDis;
    if (!this.notification) {
                localStorage.setItem('notificationStatus', 'true')
                  var pushDetails = {
                    "imeiNo": localStorage.imeiNo,
                    "appName": app.appName,
                    "deviceToken": localStorage.deviceToken,
                    "companyID": localStorage.getItem("corpId"),
                    "userId": localStorage.getItem("userName"),
                    "pushStatus": "true"
                  };
                  if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
                      pushDetails['os'] ="ionic4ios"
                  }else  if (/(android)/i.test(navigator.userAgent)) {
                      pushDetails['os'] ="ionic4"
                  }
                  const url = serverUrl.web + "/alert/pushnotification";
                  this.ajaxService.ajaxPostWithBody(url, pushDetails)
                    .subscribe(res => {
                      localStorage.setItem('pushStatus', 'persisted');
                      //console.log('push presisted');
                     
                    })
    }
    else {
      const alert = await this.alertController.create({
        header: 'Warning',
        backdropDismiss: false,
        message: "Are you sure you want to disable the app notification",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.notification = !this.notification ;
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            localStorage.setItem('notificationStatus', 'true')
                  var pushDetails = {
                    "imeiNo": localStorage.imeiNo,
                    "appName": app.appName,
                    "deviceToken": localStorage.deviceToken,
                    "companyID": localStorage.getItem("corpId"),
                    "userId": localStorage.getItem("userName"),
                    "pushStatus": "false"
                  };
                  if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
                      pushDetails['os'] ="ionic4"
                  }else  if (/(android)/i.test(navigator.userAgent)) {
                      pushDetails['os'] ="ionic4ios"
                  }
                  const url = serverUrl.web + "/alert/pushnotification";
                  this.ajaxService.ajaxPostWithBody(url, pushDetails)
                    .subscribe(res => {
                      localStorage.setItem('pushStatus', 'persisted');
                      //console.log('push presisted');
                     
                    })
          }
        }]
      });

      await alert.present();
    }

  }

  watchModeUpdate() {
    this.data = JSON.parse(localStorage.selectedVin);
    if (this.data.hasOwnProperty("watchmode") && this.data.watchmode == 0) {
      this.watchStatus = false;
    }
    else {
      this.watchStatus = true;
      for (let i = 0; i < this.data.watchmode.toString().length; i++) {
        //console.log(this.data.watchmode.toString()[i])
        if (this.data.watchmode.toString()[i] == 1) {
          this.watchMode.powerCut = true;
        } else if (this.data.watchmode.toString()[i] == 2) {
          this.watchMode.enginStatus = true;
        } else if (this.data.watchmode.toString()[i] == 3) {
          this.watchMode.sos = true;
        }
      }
    }
  }

  ngOnChanges(){
    this.pageType = this.pageType;
    if (this.pageType != "All") {
      this.watchModeUpdate();
    }
    if (localStorage.inItPage == 'dashboard' || localStorage.inItPage == undefined) {
      this.inItLoading.dashboard = true;
    } else if (localStorage.inItPage == 'gridView') {
      this.inItLoading.gridView = true;
    }
    if (localStorage.map == "GoogleMap") {
      this.googleMap = true;
    } else {
      this.googleMap = false;
    }
    

    let url =  serverUrl.web + '/login/getPreferences?key=pushNotificationStatus&companyId='+localStorage.corpId;						
    this.ajaxService.ajaxGetWithString(url)
      .subscribe(res => {
        if (res == "Enable") {
          this.notification = true;
        } else {
          this.notification = false;
        }
      })
  }

getGoogleMapEnable(){
  let url =  serverUrl.web + '/login/getPreferences?key=GoogleMapEnable&companyId='+localStorage.corpId;						
  this.ajaxService.ajaxGetWithString(url)
    .subscribe(res => {
      if(res == 0){
        this.googleMapEnable = false;
      }else{
        this.googleMapEnable = true;
      }
   
    //  this.googleMapEnable = true;
    })
}

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0]
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.pageType = this.pageType;
    this.appName = app.appName;
    this.getGoogleMapEnable()
    // if (this.pageType != "All") {
    //   this.watchModeUpdate();
    // }
    // if (localStorage.inItPage == 'dashboard' || localStorage.inItPage == undefined) {
    //   this.inItLoading.dashboard = true;
    // } else if (localStorage.inItPage == 'gridView') {
    //   this.inItLoading.gridView = true;
    // }
    // if (localStorage.map == "GoogleMap") {
    //   this.googleMap = true;
    // } else {
    //   this.googleMap = false;
    // }
    

    // let url = serverUrl.web + "/api/vts/company/preference/{'companyID':" + localStorage.corpId + ",'key':'pushNotificationStatus'}";
    // this.ajaxService.ajaxGetWithString(url)
    //   .subscribe(res => {
    //     if (res == "Enable") {
    //       this.notification = true;
    //     } else {
    //       this.notification = false;
    //     }
    //   })

  }

}
