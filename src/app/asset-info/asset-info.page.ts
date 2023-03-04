import { Component, OnInit, ViewChild } from '@angular/core';
import { serverUrl } from 'src/environments/environment';
import { AuthMapService } from '../services/auth-map.service';
import { GoogleMapService } from '../services/google-map.service';
import { OpenlayerMapService } from '../services/openlayer-map.service';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.page.html',
  styleUrls: ['./asset-info.page.scss'],
})
export class AssetInfoPage implements OnInit {

  map;
  liveData;
  selectedVin;
  @ViewChild('mapElement', { static: false }) mapElement;
  constructor(
    private mapService: AuthMapService,
    private GMap: GoogleMapService,
    private olMap: OpenlayerMapService,
    public ajaxService: AjaxService) {
    if (localStorage.map == "GoogleMap") {
      this.mapService = new GoogleMapService();
    }
    else {
      this.mapService = new OpenlayerMapService();
    }
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.map.setTarget(this.mapElement.nativeElement);
    }, 2000);
  }
  loadMap = () => {
    setTimeout(() => {
      if (localStorage.map === "Openlayer_OSM") {
        this.map.updateSize();
        this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: -25.344, lng: 131.036 }, false, false);
        this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
      } else {
        this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: -25.344, lng: 131.036 }, false, false);
        this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
        this.loadMarkers();
      }
    })
  }
  loadMarkers() {
    let latLng = {
      "lat": this.selectedVin.latitude,
      "lng": this.selectedVin.longitude
    }
    this.mapService.addMarker(this.map, latLng, "asset-info", "assets/vtsicon/" + this.selectedVin.icon + "/" + this.selectedVin.status + ".svg");
    // this.mapService.setCenter(this.map, latLng);

  }
  ngOnInit() {
    this.selectedVin = JSON.parse(localStorage.selectedVin);
    let url: string = serverUrl.web + "/site/mobilealerts?vin=" + JSON.parse(localStorage.selectedVin).vin;
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.liveData = res;
        this.loadMap();
      })
  }
}
