import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthMapService } from 'src/app/services/auth-map.service';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service';
import { Platform } from '@ionic/angular';
import { storageVariable } from 'src/environments/environment';

@Component({
  selector: 'app-vts-nearby',
  templateUrl: './vts-nearby.component.html',
  styleUrls: ['./vts-nearby.component.scss'],
})

export class VtsNearbyComponent implements OnInit {
  map;
  range = 5;
  vehicleIcon;
  myPlatform;
  @Input() gridLiveChange;
  typeSelector = [{id: 5, name: 5}, {id: 10, name: 10}, {id: 20, name: 20}, {id: 40, name: 40}, {id: 100, name: 100}, {id: 250, name: 250}];
  selectedVin = JSON.parse(localStorage.getItem('selectedVin'));
  dashBoardData = storageVariable.dashboardData;

  liveDatas = this.dashBoardData.liveDatas;
  @ViewChild('mapElement', { static: false }) mapElement;
  nearbyVehDetArr = [];
statusIcon={
  'Running': 'assets/vtsicon/BIKE/Running.svg',
  'Idle': 'assets/vtsicon/BIKE/idle.svg',
}
  constructor(
    public mapService: AuthMapService,
    public platform: Platform
  ) {
    // if (localStorage.map === 'GoogleMap') {
    //   this.mapService = new GoogleMapService();
    // } else {
      this.mapService = new OpenlayerMapService();
    // }
    
   }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    setTimeout(() => {
      this.createMap();
    }, 2000);
  }

  createMap() {
    if (localStorage.map === 'GoogleMap') {
      this.map.updateSize();
      this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: -25.344, lng: 131.036}, false, false);
    } else {
      this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: -25.344, lng: 131.036}, false, false);
    }
    this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    const latLng = {lat: this.selectedVin.latitude, lng: this.selectedVin.longitude};
    this.mapService.addMarker(this.map, latLng, 'nearBy', 'assets/vtstrackhisIcon/Idle.png');

    this.nearbyVehDetArr = [];
    const liveDataLength = Object.keys(this.liveDatas).length;
    this.liveDatas = Object.values(this.liveDatas);
    for (let i = 0 ; i < liveDataLength ; i++) {
      const  radlat1 = Math.PI * this.selectedVin.latitude / 180;
      const  radlat2 = Math.PI * this.liveDatas[i].latitude / 180;
      const  theta = this.selectedVin.longitude - this.liveDatas[i].longitude ;
      const  radtheta = Math.PI * theta / 180;
      const latlng = {lat: this.liveDatas[i].latitude, lng: this.liveDatas[i].longitude};
      let  dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)
      * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      dist = Math.ceil(dist);

      switch (this.liveDatas[i].status) {
        case 'Stop':
          this.vehicleIcon = 'assets/vtsicon/BIKE/Stop.svg';
          break;
          case 'Idle':
          this.vehicleIcon = 'assets/vtsicon/BIKE/Idle.svg';
          break;
        case 'Running':
          this.vehicleIcon = 'assets/vtsicon/BIKE/Running.svg';
          break;
        case 'Yet_to_transmit':
          this.vehicleIcon = 'assets/vtsicon/BIKE/Yet_to_transmit.svg';
          break;
        case 'No Transmission':
          this.vehicleIcon = 'assets/vtsicon/BIKE/No Transmission.svg';
          break;
      }

      this.nearbyVehDetArr.push({
        vin : this.liveDatas[i].vin,
        plateno : this.liveDatas[i].plateNo,
        distance : dist,
        status : this.liveDatas[i].status,
        latLng : latlng,
        icon : this.vehicleIcon,
        assert: this.liveDatas[i].icon
      });
      //this.mapService.addMarker(this.map, this.nearbyVehDetArr[i].latLng , 'geofence' , this.nearbyVehDetArr[i].icon);
  }
  console.log(this.nearbyVehDetArr);
  }

  ngOnChanges() {
    if (this.gridLiveChange) {
      this.selectedVin = this.gridLiveChange;
      this.mapService.clearLayers(this.map, [1,2]);
    const latLng = {lat: this.gridLiveChange.latitude, lng: this.gridLiveChange.longitude};
    this.mapService.addMarker(this.map, latLng, 'nearBy', 'assets/vtstrackhisIcon/Idle.png');
    }
  }

  showNearByVehicle() {
    this.mapService.clearLayers(this.map, [1,2]);
    const latLng = {lat: this.selectedVin.latitude, lng: this.selectedVin.longitude};
    this.mapService.addMarker(this.map, latLng, 'nearBy', 'assets/vtstrackhisIcon/Idle.png');
    const near = [];
    for(let i = 0; i < this.nearbyVehDetArr.length; i++){
      if (this.range >= this.nearbyVehDetArr[i].distance) {
      near.push(this.nearbyVehDetArr[i]);
      this.mapService.addMarker(this.map, this.nearbyVehDetArr[i].latLng , this.nearbyVehDetArr[i].vin , 'assets/vtsicon/'+this.nearbyVehDetArr[i].assert+'/'+this.nearbyVehDetArr[i].status+'.svg');
      }
    }
    this.mapService.fitBounds(this.map, 1);
  //   for (let i = 0; i < near.length ; i++) {
  //   if (this.range >= near[i].distance) {
      
  //     this.mapService.fitBounds(this.map, 1);
  //   }
  // }
}
}
