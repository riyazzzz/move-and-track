import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { serverUrl, app } from "../../../environments/environment";
import { GeofenceModelPage } from '../../geofence/geofence-model/geofence-model.page';
import { GeofenceListModelPage } from '../../geofence/geofence-list-model/geofence-list-model.page';
import { ModalController, MenuController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vts-geofence',
  templateUrl: './vts-geofence.component.html',
  styleUrls: ['./vts-geofence.component.scss'],
})
export class VtsGeofenceComponent implements OnInit {
  geoFenceJson = [];
  geoFenceJsonAll = [];
  index = 0;
  zoneType: string = "prefer";
  selectedVin;
  selectedZoneData = [];
  selectItem = true;
  type: string;
  filterValue: any;
  subscription: any;
  constructor(
    private ajaxService: AjaxService,
    private modalController: ModalController,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController,
    private platform: Platform,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.filterValue = this.activatedRoute.snapshot.paramMap.get("type");
    this.getGeoFenceData(this.zoneType);
    //   this.selectedVin = JSON.parse(localStorage.getItem('selectedVin'));
    //   const modal = await this.modalController.create({
    //     component: GeofenceModelPage,
    //     componentProps: {
    //       'mode': 'add',
    //       'vin': this.selectedVin.vin,
    //       'vinData': this.selectedVin
    //     }
    //   });
    // return await modal.present();
  }
  ionViewWillEnter() {
    this.getGeoFenceData(this.zoneType);
  }

  getGeoFenceData(data) {
    this.commonService.presentLoader();
    this.zoneType = data;
    let selectedVin = "";
    if (this.filterValue != "All")
      selectedVin = JSON.parse(localStorage.getItem('selectedVin')).vin;
    const body = {
      companyID: localStorage.corpId,
      branchID: localStorage.corpId
    };
    const url = serverUrl.web + '/api/vts/company/zone/shape/mobile/' + this.zoneType + '/' + JSON.stringify(body);
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        console.log(res);
        this.geoFenceJsonAll = [];
        this.geoFenceJson = [];
        let keys = Object.keys(res);
        for (let i = 0; i < keys.length; i++) {
          let filterVal = [];
          filterVal = res[keys[i]].filter(element => {
            this.geoFenceJsonAll.push(element);
            if (element.Vin == selectedVin) {
              return true;
            } else {
              return false;
            }
          });
          if (filterVal.length > 0) {
            filterVal[0]['associated'] = false;
            this.geoFenceJson.push(filterVal[0]);
          } else {
            res[keys[i]][0]['associated'] = true;
            this.geoFenceJson.push(res[keys[i]][0]);
          }
        }
        // for (let i = 0; i < res.length; i++) {
        //   if (res[i].shape === 'Circle') {
        //     if (res[i].vin == selectedVin) {
        //       res[i]['associated'] = false;
        //     } else {
        //       res[i]['associated'] = true;
        //     }
        //     this.geoFenceJson.push(res[i]);
        //   }
        // }
        // if (res.length === 0) {
        //   this.geoFenceJson = res;
        // }
        this.commonService.dismissLoader();
      },
        err => {
          this.commonService.dismissLoader();
          console.log(err);
        });

  }
  async geoFenceModel(selectedVin, selectedVinData) {
    if (this.selectItem === true) {
      if (this.filterValue == 'All') {
        localStorage.setItem('selectedZone', JSON.stringify(selectedVinData));
        const modal = await this.modalController.create({
          component: GeofenceModelPage,
          componentProps: {
            mode: 'edit',
            vin: selectedVin,
            vinData: selectedVinData
          }
        });
        modal.onDidDismiss().then(() => this.ionViewWillEnter());
        return await modal.present();
      } else {
        this.commonService.presentToast('press + icon to associate geo-fence to vehicle');
      }
    } else {
      this.onLongPress('', selectedVinData);
    }

  }
  onLongPress($event, selectedVinData) {
    if (this.filterValue != "All") {
      this.selectItem = false;
      selectedVinData['clicked'] = true;
      if (document.getElementById(selectedVinData.id).style.background !== 'lightgrey') {
        this.selectedZoneData.push(selectedVinData);
        document.getElementById(selectedVinData.id).style.background = 'lightgrey';
      } else {
        for (let x = 0; x < this.selectedZoneData.length; x++) {
          if (this.selectedZoneData[x].id === selectedVinData.id) {
            this.selectedZoneData.splice(x, 1);
            break;
          }
        }
        selectedVinData.clicked = false;
        document.getElementById(selectedVinData.id).style.background = 'white';
      }
    } else {
      this.commonService.presentToast('Can\'t able to assign here!, Go to the vehicle and assign')
    }
  }
  cancelSelected = function () {
    this.getGeoFenceData(this.zoneType)
    // this.selectItem = true;
    // for (let x = 0; x < this.selectedZoneData.length; x++) {
    //   document.getElementById(this.selectedZoneData[x].id).style.background = 'white';
    // }
    this.selectedZoneData = [];
  }

  async deleteSelectedGeoZone(data) {
    let selectedJsonFormat = { id: data.Status };
    this.selectedZoneData.push(data);
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      backdropDismiss: false,
      message: "You want to delete this zone",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        text: 'Ok',
        handler: data => {
          const url = serverUrl.web + '/api/vts/company/zone/shape';
          this.ajaxService.ajaxDeleteWithBody(url, selectedJsonFormat)
            .subscribe(res => {
              console.log(res);
              this.getGeoFenceData(this.zoneType);
              this.succSaveZone(res.error.text, 'Zone');
              this.commonService.dismissLoader();
              this.selectedZoneData = [];
            }, err => {
              this.commonService.dismissLoader();
              console.log(err);
              this.succSaveZone(err, 'Zone');
              this.selectedZoneData = [];
            });
        }
      }]
    });

    await alert.present();

  }

  assignGeoToVehicle(assign, status) {
    const selectedId = [];
    let associateValue = "association";
    if (assign != undefined) {
      if (assign == true) {
        associateValue = "association";
      } else {
        associateValue = "disassociation";
      }
    }
    for (let i = 0; i < this.selectedZoneData.length; i++) {
      selectedId.push(this.selectedZoneData[i].Status);
    }
    if (selectedId.length == 0) {
      selectedId.push(status);
    }
    let selectedVin = JSON.parse(localStorage.getItem('selectedVin'));
    selectedVin = selectedVin.vin;
    const detailsForAssign = { vin: selectedVin, geoIds: selectedId, operation: associateValue };
    const url = serverUrl.web + '/api/vts/company/geozone/vehicle/associate';
    this.ajaxService.ajaxPostWithString(url, detailsForAssign)
      .subscribe(res => {
        console.log(res);
        this.succSaveZone(res, 'Vehicle');
        // this.commonService.dismissLoader();
      }, err => {
        console.log(err);
      });
  }
  succSaveZone(data, type) {
    if (data === 'success') {
      let mode = 'added';
      if (this.type === 'edit' || type == "Vehicle") {
        mode = 'updated';
      }
      this.ionViewWillEnter();
      this.commonService.presentToast('Your,' + type + ' ' + mode + ' successfully');
    } else {
      this.commonService.presentAlert('Error', type + ' not added');
    }
  }
  async listAssociated(status) {
    let zonePlateNos = [];
    zonePlateNos = this.geoFenceJsonAll.filter(geo => {
      if (geo.Status == status && geo.Vin !== null && geo.Vin !== "---")
        return true;
    });
    if (zonePlateNos.length != 0) {
      const modal = await this.modalController.create({
        component: GeofenceListModelPage,
        componentProps: {
          geozoneObject: zonePlateNos
        }
      });
      modal.onDidDismiss().then(() => this.ionViewWillEnter());
      return await modal.present();
    } else {
      this.commonService.presentToast('No vehicles associated');
    }
  }
  async open() {
    this.selectedVin = JSON.parse(localStorage.getItem('selectedVin'));
    if (this.selectedVin != null) {
      const modal = await this.modalController.create({
        component: GeofenceModelPage,
        componentProps: {
          mode: 'add',
          vin: this.selectedVin.vin,
          vinData: this.selectedVin
        }
      });
      modal.onDidDismiss().then(() => this.ionViewWillEnter());
      return await modal.present();
    } else {
      const modal = await this.modalController.create({
        component: GeofenceModelPage,
        componentProps: {
          mode: 'add',
        }
      });
      modal.onDidDismiss().then(() => this.ionViewWillEnter());
      return await modal.present();
    }
  }
  async ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(async () => {
      if (this.menuController.isOpen()) {
        this.menuController.close()
      }
    });
  }
  ionViewWillLeave(){
    this.subscription.unsubscribe(); 
  }
}
