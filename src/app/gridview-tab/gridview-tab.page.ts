import { Component, Output, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AjaxService } from '../services/ajax.service';
import { serverUrl, app, storageVariable } from 'src/environments/environment';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';

import { interval } from 'rxjs';
import { CommonService } from '../services/common.service';
import { MenuController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
//gokul
import { SubscriptionAlertComponent } from './subscription-alert/subscription-alert.component'
import { FleetFormComponent } from '../components/fleet-form/fleet-form.component';
import { WebsocketService } from '../services/websocket.service';
// import { url } from 'inspector';
@Component({
  selector: 'app-gridview-tab',
  templateUrl: './gridview-tab.page.html',
  styleUrls: ['./gridview-tab.page.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0.8 }),
            animate('0.7s ease-out')
          ]
        )
      ]
    ), trigger('fade', [
      transition('void => *', [
        style({ opacity: 0.3 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class GridviewTabPage implements OnInit {
  filter: any = [];
  entryPoint;
  initialHeader: boolean = true;
  showSearch: boolean = false;
  searchInput;
  gridViewData = [];
  sub: any;
  timer: any;
  data: any;
  filterValue: any;
  subscription: any;
  total: any;
  statusColor: any;
  applicationSettings: any;
  vehicleCount: any = { "All": 0, "Running": 0, "Stop": 0, "Idle": 0, "NoTransmit": 0 };
  statusBarVehicle = ["All", "Running", "Idle", "Overspeed", "No Transmission", "Stop", "Overspeed", "Door Open", "Geofence Voilation", "Power Fail", "High Temp"];
  statusBarOthers = ["All", "Door Open", "Geofence Voilation", "Power Fail", "No Trans, High Temp"];
  dashboard: any;
  myPlatform: string;
  totalAlertCount: any = 0;
  app: any = {};
  temperatureData = false;
  loginData = [];
  appName: string;
  VehicleDetails: any;
  companyDetail: { branchID: string; companyID: string; userId: string; };
  constructor(
    private router: Router,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController,
    private modalController: ModalController,
    private platform: Platform,
    private websocketService : WebsocketService
  ) { }



  showModal(data) {
    if (document.getElementById('modal').style.bottom == "0px") {
      document.getElementById('modal').style.bottom = "-280px";
    } else {
      localStorage.setItem('selectedVin', JSON.stringify(data))
      document.getElementById('modal').style.bottom = "0px";
    }
  }

  hideModal() {
    document.getElementById('modal').style.bottom = "-280px";
  }
  scroll(event) {
    if (event.detail.scrollTop > 0) {
      this.initialHeader = false;
    } else {
      this.initialHeader = true;
    }
  }
  searchActivity(task) {
    if (task == "open") {
      this.showSearch = true;
    } else {
      this.showSearch = false;
      this.searchInput = '';
    }
  }
  handleChange(value) {
    this.searchInput = value.detail.value;
  }

  dashboardCountLoader() {
    if (storageVariable.upDatedJsonData) {
      let data: any = storageVariable.upDatedJsonData;
      this.vehicleCount = data.statusCount;
      this.statusBarOthers = Object.keys(this.vehicleCount)
    }
  }
  vehicleAlert(event) {
    this.totalAlertCount = event;

  }

  async openModalAddAsset() {
    const modal = await this.modalController.create({
      component: FleetFormComponent,
      cssClass: 'custome_fleet'
    });
    modal.onDidDismiss().then(() => {
      this.websocketService.reSendRequest(JSON.parse(localStorage.dashboardWebSocketData));
    })
    return await modal.present();

  }

  changeGridView(data) {
    this.filter = [];
    if (data) {
      if (data.count > 0) {
        localStorage.removeItem('modalFilterData');
        if (data.type === "Notransmit") {
          this.data = "No Transmission";
          localStorage.setItem('statusChanger', "No Transmission")
        } else {
          this.data = data.type;
          localStorage.setItem('statusChanger', data.type)
        }
      } else if (data.count == 0) {
        this.commonService.presentToast('You didn\'t have any vehicle to show');
      }
    }
  }
  //gokul model 
  async openModel() {
    var today = new Date();
    var hours = today.getHours();
    localStorage.setItem('SubscriptionDate', JSON.stringify(hours))
    const modal = await this.modalController.create({
      component: SubscriptionAlertComponent,
      cssClass: 'custom-modaladv',
      componentProps: {
        value: this.VehicleDetails,
      },
    });
    modal.onDidDismiss().then(() => {
    
    })
    return await modal.present();
  }
  ionViewWillEnter() {

    this.dashboardCountLoader();

    //gokul
    var today = new Date();
    var hours = today.getHours();
    const url = serverUrl.web + "/device/expiry?companyId=" + this.companyDetail.companyID + "&userId=" + this.companyDetail.userId
    this.ajaxService.ajaxGet(url).subscribe(res => {
      console.log(res);
      this.VehicleDetails = res;
      var oldHours = JSON.parse(localStorage.getItem('SubscriptionDate'));
      var hour = today.getHours();
      var currenttime = hour - oldHours;
      if (!JSON.parse(localStorage.getItem('SubscriptionDate')) && this.VehicleDetails.message == "Expired") {
        this.openModel();

      } else if (currenttime >= parseInt(this.VehicleDetails.interval)) {
        //  var oldDate = JSON.parse(localStorage.getItem('SubscriptionDate'));
        this.openModel();

      }
    })

  }
  temperature() {
    this.filter = [];
    this.temperatureData = !this.temperatureData;
    this.data = localStorage.getItem('statusChanger');
  }
  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    this.loginData = Object.keys(JSON.parse(localStorage.getItem("loginData"))[0]);
    this.appName = app.appName;
    this.app["logo"] = localStorage.companyLogo;
    this.applicationSettings = JSON.parse(localStorage.appSettings);
    this.myPlatform = this.platform.platforms()[0]
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.statusColor = this.applicationSettings.statusColor;
    this.entryPoint = app.entryPoint;
  }


}
