import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { CommonService } from '../../services/common.service';
import { NavParams, ModalController, Platform, MenuController } from '@ionic/angular';
import { AuthMapService } from '../../services/auth-map.service';
import { GoogleMapService } from '../../services/google-map.service';
import { OpenlayerMapService } from '../../services/openlayer-map.service';
import { serverUrl } from 'src/environments/environment';
import { toLonLat } from 'ol/proj';
import { Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-geofence-model',
  templateUrl: './geofence-model.page.html',
  styleUrls: ['./geofence-model.page.scss'],
})
export class GeofenceModelPage implements OnInit {
  @Input() mode: string;
  @Input() vin: string;
  @Input() vinData: JSON;
  selectedVinData = JSON.parse(localStorage.getItem('selectedVin'));
  //header = this.selectedVinData.plateNo;
  map;
  paramVin: string;
  type: string;
  range = 500;
  click = 1;
  editableData;
  zone = { zoneName: '' };
  selectValue = 'Preferred';
  typeSelector = [{ id: 'Preferred', name: 'Preferred' }, { id: 'Restricted', name: 'Restricted' }];

  @ViewChild('mapElement', { static: false }) mapElement;
  subscription: any;
  constructor(
    public nav: NavParams,
    public modalCtrl: ModalController,
    public mapService: AuthMapService,
    public commonService: CommonService,
    public ajaxService: AjaxService,
    public gMapService: GoogleMapService,
    public olMapService: OpenlayerMapService,
    private modalController: ModalController,
    private menuController: MenuController,
    private platform: Platform,
    private router: Router
  ) {

    // if (localStorage.map === 'GoogleMap') {
    //   this.mapService = new GoogleMapService();
    // } else {
    this.mapService = new OpenlayerMapService();
    // }

  }

  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribe(async () => {
      if (this.menuController.isOpen()) {
        this.menuController.close()
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  createMap(mode) {
    // if (localStorage.map === 'GoogleMap') {
    //   this.map.updateSize();
    //   this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: 11.127123, lng: 78.656891}, false, false);
    // } else {
    this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: 11.127123, lng: 78.656891 }, false, false);
    // }
    this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    const vin = this.vin;
    const dashboard = JSON.parse(localStorage.getItem('dashboardData'));
    let latLng;
    if (mode === 'add') {
      latLng = { lat: 11.127123, lng: 78.656891 };
      this.onClickLocationGetter();
      this.range = 500;
    } else {
      if (this.editableData.Area === 'Restricted') {
        this.selectValue = 'Restricted';
      }
      this.zone.zoneName = this.editableData.Zone;
      const detailsString = this.editableData.Latlng;
      console.log('editlatLng', detailsString);
      const getLatLng = detailsString.split('|');
      const southwest = getLatLng[0].split(',');
      const northeast = getLatLng[1].split(',');
      const south = parseFloat(southwest[0].split(',')[0]);
      const west = parseFloat(southwest[1].split(',')[0]);
      const north = parseFloat(northeast[0].split(',')[0]);
      const east = parseFloat(northeast[1].split(',')[0]);
      latLng = { lat: south, lng: west };
      this.range = this.calculateRadius(north, east, south, west);
    }
    this.mapService.addMarker(this.map, latLng, 'geoFence', 'assets/vtstrackhisIcon/Idle.png');
    this.mapService.createCircle(this.map, latLng, this.range, this.selectValue);
    this.mapService.fitBounds(this.map, 2);

  }

  calculateRadius = function (south, west, north, east) {
    const R = 6378.137; // Radius of earth in KM
    const dLat = (north - south) * Math.PI / 180;
    const dLon = (east - west) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(south * Math.PI / 180)
      * Math.cos(north * Math.PI / 180)
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math
      .sqrt(1 - a));
    const d = R * c;
    return Math.round(d * 1000);
  };

  closeModel() {
    this.modalCtrl.dismiss();
  }

  setRange(range) {
    this.range = range;
    this.mapService.setCircleRadius(this.range);
  }

  saveGeoFence() {
    let detailsForUpdate = {};
    if (this.zone.zoneName === undefined || this.zone.zoneName === '') {
      this.commonService.presentAlert('Empty', 'Enter your zone name');
    } else {
      console.log(this.zone.zoneName);
      this.commonService.presentLoader();
      const geoBounds = this.mapService.circleGeoZone();
      console.log('geobounds', geoBounds);
      if (this.type === 'edit') {
        detailsForUpdate = {
          type: this.selectValue,
          latLng: geoBounds,
          shape: this.editableData.Shape,
          name: this.zone.zoneName,
          userID: localStorage.getItem('userName'),
          id: this.editableData.Id,
          companyID: localStorage.getItem('corpId'),
          branchID: localStorage.getItem('corpId')
        };
        const url = serverUrl.web + '/zone/updateshapezone';
        this.ajaxService.ajaxPostWithString(url, detailsForUpdate)
          .subscribe(res => {

            this.modalController.dismiss();
            console.log(res);
            this.commonService.dismissLoader();
            this.succSaveZone(res);
          }, err => {
            console.log(err);
            this.commonService.dismissLoader();
          });
      } else {
        detailsForUpdate = {
          type: this.selectValue,
          latLng: geoBounds,
          shape: 'Circle',
          name: this.zone.zoneName,
          userID: localStorage.getItem('userName'),
          companyID: localStorage.getItem('corpId'),
          branchID: localStorage.getItem('corpId')
        };
        //detailsForUpdate = JSON.stringify( detailsForUpdate);
        const url = serverUrl.web + '/zone/setshape';
        this.ajaxService.ajaxPostWithString(url, detailsForUpdate)
          .subscribe(res => {
            this.modalController.dismiss();
            console.log(res);
            this.succSaveZone(res);
            this.commonService.dismissLoader();
          }, err => {
            console.log(err);
            this.commonService.dismissLoader();
          });
      }
    }
  }

  succSaveZone(data) {
    if (data === 'success') {
      let mode = 'added';
      if (this.type === 'edit') {
        mode = 'updated';
      }
      this.commonService.presentToast('Your, Zone ' + mode + ' successfully');
    } else {
      this.commonService.presentAlert('Error', 'Zone not saved successfully');
      this.closeModel();
    }
  }

  getAddressLatlng(address) {
    if(address != ""){
      let data:any = parseFloat(address.split(",")[0])
    if( data.toString() != "NaN"){
      if(address.split(",")[1]){
        this.mapService.setCenter(this.map, { lat: parseFloat(address.split(",")[0]), lng: parseFloat(address.split(",")[1]) })
      }
    }else if( data.toString() == "NaN"){
      this.ajaxService.ajaxGet('https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=' + address + '&format=json&limit=1')
      .subscribe(res => {
        if (res.length > 0) {
          let latLng = { lat: res[0].lat, lng: res[0].lon }
          this.mapService.setCenter(this.map, { lat: parseFloat(res[0].lat), lng: parseFloat(res[0].lon) })
          // this.mapService.addMarker(this.map, latLng, 'geoFence', 'assets/vtstrackhisIcon/Idle.png');
          // this.mapService.createCircle(this.map, latLng, this.range, this.selectValue);
          // this.mapService.fitBounds(this.map, 2);
        }
        else
          this.commonService.presentToast("Can't able to get your location")
      })}
    }
  }

  ngOnInit() {
    this.paramVin = this.vin;
    this.type = this.mode;
    this.editableData = this.vinData;
    console.log(this.editableData);
    setTimeout(() => {
      this.createMap(this.type);
    }, 2000);
  }

  getBack() {
    this.modalController.dismiss();
    // this.vtsGeofenceComponent.getGeoFenceData('prefer')
  }

  onClickLocationGetter() {
    this.map.on('click', async (evt) => {
      this.mapService.clearLayers(this.map, [1, 2]);
      const coordinates = evt.coordinate;
      let latLng = toLonLat([coordinates[0], coordinates[1]]);
      latLng = { lat: latLng[1], lng: latLng[0] };
      if (this.click > 1) {
        this.mapService.clearLayers(this.map, [1, 2]);
      }
      this.mapService.addMarker(this.map, latLng, 'addGeoZone', 'assets/vtstrackhisIcon/Idle.png');
      this.mapService.createCircle(this.map, latLng, this.range, this.selectValue);
      this.click++;
    });
  }

}
