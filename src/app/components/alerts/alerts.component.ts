import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { app, serverUrl, storageVariable } from '../../../environments/environment';
import { AjaxService } from '../../services/ajax.service';
import { CommonService } from '../../services/common.service';
import { WebsocketService } from '../../services/websocket.service';
import { Router, NavigationStart, Event } from '@angular/router';
import { Platform, IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})

export class AlertsComponent {
  alertData: Array<any> = [];
  dashboardData;
  myPlatform;
  initiate = true;
  currentPlateno: string;
  @Input() searchInput: string;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @Input() mode: string;
  @Input() commonData;
  @Output() total = new EventEmitter();
  fullData: any;
  count: number = 30;
  alertShow: Array<any>;
  constructor(public websocketService: WebsocketService,
    public commonService: CommonService,
    public ajaxService: AjaxService,
    private router: Router,
    private platform: Platform,
  ) { }

  getAlerts() {
    let url: string;
    if (this.mode == "all") {
      let date = new Date();
      let data = {
        "address": "false",
        "vin": "All",
        "userId": localStorage.userName,
        "fromDate": date.toJSON().split("T")[0],
        "toDate": date.toJSON().split("T")[0],
      };

      if(app.appName != 'ParentApp'){
        url = serverUrl.web + "/alert/mobileAlert";						
      }else{
        url = serverUrl.web + "/parentapp/mobileAlert";
        data['stin'] = localStorage.getItem('stin');
        data['vin'] = JSON.parse(localStorage.getItem('selectedVin')).vin
      }
          
      // url = serverUrl.web + "/api/vts/company/branch/user/mobileAlert/" + localStorage.getItem("userName");
      this.ajaxService.ajaxPostWithBody(url, data)
        .subscribe(res => {
          //console.log(res);
          this.initiate = false
          if (res != "" && res != []) {
            this.fullData = res;
            this.total.emit(this.fullData.length);
            this.alertData = this.searchResult(this.fullData, this.searchInput);
            this.setDisplayData();
          } else {
            // this.commonService.presentToast("No Alerts for this Vehicle");
            this.alertData = [];
            this.alertShow = [];
          }
        });

    } else if (this.mode == 'vin') {
      let localData = JSON.parse(localStorage.selectedVin);
      this.currentPlateno = localData.plateNo;
      let cId = localStorage.corpId;  
      let date = new Date();
      let data = {
        "address": "false",
        "vin": localData.vin,
        "userId": localStorage.userName,
        "fromDate": date.toJSON().split("T")[0],
        "toDate": date.toJSON().split("T")[0],
      };
      url = serverUrl.web + "/alert/mobileAlert";	
      this.ajaxService.ajaxPostWithBody(url, data)
        .subscribe(res => {
          this.initiate = false
          //console.log(res);
          if (res != "" && res != []) {
            this.fullData = res;
            this.total.emit(this.fullData.length);
            this.alertData = this.searchResult(this.fullData, this.searchInput);
            this.setDisplayData();
          } else {
            // this.commonService.presentToast("No Alerts for this Vehicle");
            this.alertData = [];
            this.alertShow = [];
          }
        });
    } else {
      if (this.commonData != "" && this.commonData != []) {
        this.fullData = this.commonData;
        this.alertData = this.searchResult(this.fullData, this.searchInput);
        // this.alertData =this.commonData
        this.setDisplayData();
      } else {
        // this.commonService.presentToast("No Alerts for this Vehicle");
        this.alertData = [];
        this.alertShow = [];
      }

    }

  }

  getBgColor(type) {
    switch (type.alertTypes) {
      case "IDLE":
        return "idle";

      case "OVERSPEED":
        return "overspeed";

      case "ENGINESTATUS":
        if (type.additionalInfo == 'ENGINESTATUS ON') {
          return "engineon";
        } else {
          return "engineoff";
        }

      case "STOP":
        return "stop";

      case "POWERCUT":
        return "powercut";

      case "WOKEUP":
        return "wokeup";

      default:
        return "idle";
    }
  }
  getBg(type) {
    type.alertTypes = "STOP"
    switch (type.alertTypes) {
      case "IDLE":
        return "idle";

      case "OVERSPEED":
        return "overspeed";

      case "ENGINESTATUS":
        if (type.additionalInfo == 'ENGINESTATUS ON') {
          return "engineon";
        } else {
          return "engineoff";
        }

      case "STOP":
        return "stop";

      case "POWERCUT":
        return "powercut";

      case "WOKEUP":
        return "wokeup";

      default:
        return "idle";
    }
  }
  searchResult(items: any[], terms: string) {
    if (!items) return [];
    let data: any;
    if (!terms) {
      data = items;
    }
    else {
      terms = terms.toLowerCase();
      data = items.filter(it => {
        if (it.plateNo != null) {
          if (terms.replace(/ /g, '') == "enginestatuson" || terms.replace(/ /g, '') == "engineon" || terms.replace(/ /g, '') == "on" || terms.replace(/ /g, '') == "statuson") {
            return it.description.toLowerCase().includes('on');
          } else if (terms.replace(/ /g, '') == "enginestatusoff" || terms.replace(/ /g, '') == "engineoff" || terms.replace(/ /g, '') == "off" || terms.replace(/ /g, '') == "statusoff" || terms.replace(/ /g, '') == "enginestatusof" || terms.replace(/ /g, '') == "engineof" || terms.replace(/ /g, '') == "of" || terms.replace(/ /g, '') == "statusof") {
            return it.description.toLowerCase().includes('off');
          }
          return it.plateNo.replace(/ /g, '').toLowerCase().includes(terms.replace(/ /g, '')) || it.alertTypes.replace(/ /g, '').toLowerCase().includes(terms.replace(/ /g, ''));
        }
        else {
          return false;
        }
      });
    }
    let alignData = data.sort(function (a: any, b: any) {
      return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime();
    });
    this.alertShow = alignData;
    return alignData;
  }

  setDisplayData() {
    if (this.alertData.length > this.count) {
      this.alertShow = this.alertData.slice(0, this.count);
    }
    else {
      this.alertShow = this.alertData;
    }
  }
  ionViewWillEnter() {
    this.getAlerts();
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    // this.dashboardData = storageVariable.dashboardData.liveDatas;
    this.getAlerts();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url.indexOf("tab") !== -1) {
          this.total.emit(this.alertData.length);
        }
      }
    })
  }
  loadMoreData = (event) => {
    setTimeout(() => {
      //console.log("hit successfull!");
      this.count += 30;
      this.setDisplayData();
      event.target.complete();
      if (this.count >= this.fullData.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  ngOnChanges() {
    //console.log("change");
    if (this.alertData)
      this.alertData = this.searchResult(this.fullData, this.searchInput);
  }
}
