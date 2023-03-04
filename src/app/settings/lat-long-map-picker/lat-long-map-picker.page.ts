import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthMapService } from 'src/app/services/auth-map.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service';
import { toLonLat } from 'ol/proj';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-lat-long-map-picker',
  templateUrl: './lat-long-map-picker.page.html',
  styleUrls: ['./lat-long-map-picker.page.scss'],
})
export class LatLongMapPickerPage implements OnInit {
  @Input() currentLocation;
  map;
  @ViewChild('mapElement', { static: false }) mapElement;
  latitude: any;
  longitude: any;
  constructor(
    public mapService: AuthMapService,
    public geolocation: Geolocation,
    private modelController: ModalController,
    public ajaxService: AjaxService,
    public commonService: CommonService,
  ) {
    this.mapService = new OpenlayerMapService();
  }
  getAddressLatlng(address) {
    if (address != "") {
      let data: any = parseFloat(address.split(",")[0])
      if (data.toString() != "NaN") {
        if (address.split(",")[1]) {
          this.mapService.setCenter(this.map, { lat: parseFloat(address.split(",")[0]), lng: parseFloat(address.split(",")[1]) })
        }
      } else if (data.toString() == "NaN") {
        this.ajaxService.ajaxGet('https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=' + address + '&format=json&limit=1')
          .subscribe(res => {
            if (res.length > 0) {
              let latLng = { lat: res[0].lat, lng: res[0].lon }
              this.mapService.setCenter(this.map, { lat: parseFloat(res[0].lat), lng: parseFloat(res[0].lon) })
            }
            else
              this.commonService.presentToast("Can't able to get your location")
          })
      }
    }
  }
  getBack() {
    const geoBounds = this.mapService.circleGeoZone();
    localStorage.setItem("latLongPickerGeoFence", geoBounds)
    console.log("Geo Bounce " + geoBounds)
    this.modelController.dismiss();
  }
  createMap() {
    this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: 11.127123, lng: 78.656891 }, false, false);
    this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    this.onClickLocationGetter()
    if (this.currentLocation == "") {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.mapService.setCenter(this.map, { lat: parseInt(resp.coords.latitude.toFixed(2)), lng: parseInt(resp.coords.longitude.toFixed(2)) });
        console.log(resp)
        this.latitude = resp.coords.latitude.toFixed(2);
        this.longitude = resp.coords.longitude.toFixed(2)
        this.mapService.addMarker(this.map, { lat: resp.coords.latitude, lng: resp.coords.longitude }, "LatLngPicker", 'assets/vtstrackhisIcon/Idle.png');
        this.mapService.createCircle(this.map, { lat: resp.coords.latitude, lng: resp.coords.longitude }, 500, 'Preferred');
        this.mapService.fitBounds(this.map, 2);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    } else {
      this.latitude = parseFloat(this.currentLocation.split(',')[0]).toFixed(2);
      this.longitude = parseFloat(this.currentLocation.split(',')[1]).toFixed(2)
      this.mapService.addMarker(this.map, { lat: parseFloat(this.currentLocation.split(',')[0]), lng: parseFloat(this.currentLocation.split(',')[1]) }, "LatLngPicker", 'assets/vtstrackhisIcon/Idle.png');
    }
  }

  onClickLocationGetter() {
    this.map.on('click', async (evt) => {
      this.mapService.clearLayers(this.map, [1, 2]);
      const coordinates = evt.coordinate;
      let latLng = toLonLat([coordinates[0], coordinates[1]]);
      this.latitude = latLng[1].toFixed(2);
      this.longitude = latLng[0].toFixed(2)
      latLng = { lat: latLng[1], lng: latLng[0] };
      localStorage.setItem("mapLocationPicker", latLng.lat + ',' + latLng.lng)
      this.mapService.addMarker(this.map, latLng, 'updateZone', 'assets/vtstrackhisIcon/Idle.png');
      this.mapService.createCircle(this.map, latLng, 500, 'Preferred');
      const geoBounds = this.mapService.circleGeoZone();
      localStorage.setItem("latLongPickerGeoFence", geoBounds)
    });
  }

  ngOnInit() {
    console.log(this.currentLocation)
    setTimeout(() => {
      this.createMap();
    }, 2000);
  }

}
