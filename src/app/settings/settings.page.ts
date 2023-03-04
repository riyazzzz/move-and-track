import { Component, OnInit } from '@angular/core';
import { app, serverUrl, storageVariable } from 'src/environments/environment';
import { CommonService } from '../services/common.service';
import { AjaxService } from '../services/ajax.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  data: any;
  app: any={logo:'logo.png'};
  watchStatus: boolean;
  pageType: string;
  googleMap: boolean;
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
  appName: string;
  myPlatform: string;
  constructor(
    private commonService: CommonService,
    public ajaxService: AjaxService,
    private route: ActivatedRoute,
    private platform: Platform,
    private alertController: AlertController,
  ) { }

  inItLoader(changer) {
    localStorage.setItem('inItPage', changer);
    if (changer == "gridView") {
      this.inItLoading.dashboard = false;
    } else {
      this.inItLoading.gridView = false;
    }
  }

  async changeMap() {
    if (localStorage.mapAllowed != "undefined") {
      let map:any = JSON.parse(localStorage.mapAllowed);
      if (map[0].toLowerCase() == "googlemap") {
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
                localStorage.map = "OpenLayer"
              } else {
                localStorage.map = "GoogleMap"
              }
              document.location.href = 'index.html';
            }
          }]
        });
        await alert.present();
      } else {
        this.googleMap = true;
        this.commonService.presentAlert('Warning', "Sorry your not able to use this function.")
      }
    }else{
      this.commonService.presentAlert('Warning', "Sorry your not able to use this function.")
      this.googleMap = true;
    }
  }

  watchModeNeed(selected, status, event, json){
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

    console.log(parseInt(statusUpdate))
    let url: string = serverUrl.web + "/api/vts/company/assets/update/watchmode";
    let body = {
      "vin": this.data.vin,
      "value": parseInt(statusUpdate)
    };
    this.ajaxService.ajaxPutMethod(url, body)
      .subscribe(res => {
        this.data["watchmode"] = statusUpdate;
        localStorage.setItem("selectedVin", JSON.stringify(this.data));
        let data = storageVariable.upDatedJsonData;
        data.liveDatas[this.data.vin]["watchmode"] = statusUpdate
      })
  }

  toggleWatchmode(event) {
    let statusBitWatchmode: number = 0;
    if (event.currentTarget.checked != true) {
      statusBitWatchmode = 1;
      this.watchStatus = false;
    } else {
      this.watchStatus = true;
    }
    let url: string = serverUrl.web + "/api/vts/company/assets/update/watchmode";
    let body = {
      "vin": this.data.vin,
      "value": statusBitWatchmode.toString()
    };
    this.commonService.presentLoader();
    this.ajaxService.ajaxPutMethod(url, body)
      .subscribe(res => {
        console.log(res);
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
      let url = serverUrl.web + "/api/vts/update/company/settings/" + localStorage.corpId + "/pushNotificationStatus/Enable";
      this.ajaxService.ajaxGetWithString(url)
        .subscribe(res => {
          this.commonService.presentToast("Your notification enabled " + res)
        });
    }
    else {
      const alert = await this.alertController.create({
        header: 'Warning',
        backdropDismiss: false,
        message: "Are you sure you want to diable the app notification",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Confirm',
          handler: data => {
            let url = serverUrl.web + "/api/vts/update/company/settings/" + localStorage.corpId + "/pushNotificationStatus/Disable";
            this.ajaxService.ajaxGetWithString(url)
              .subscribe(res => {
                this.commonService.presentToast("Your notification disable " + res)
              });
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
        console.log(this.data.watchmode.toString()[i])
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

  ngOnInit() {
    this.app["logo"] = localStorage.companyLogo;
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.appName = app.appName
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
    this.pageType = this.route.snapshot.paramMap.get("type");
    if (this.pageType != "All") {
      // this.watchModeUpdate();
    }

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
