import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjaxService} from '../../../services/ajax.service';
import { AuthMapService, coordinates } from '../../../services/auth-map.service';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {
  toAddress;
  fromAddress;
  constructor(
    private modalController: ModalController,
    private mapService: AuthMapService,
    private ajaxService:AjaxService
  ) {
    // if (localStorage.map == "GoogleMap") {
    //   this.mapService = new GoogleMapService();
    // }
    // else {
      this.mapService = new OpenlayerMapService();
    // }
   }

  @Input() plateNo: string;
  @Input() sourceLocation: coordinates;
  @Input() destinationLocation: coordinates;

  @ViewChild('mapElement', { static: false }) mapElement;
  map;

  createMap = () => {
    if (localStorage.map === 'GoogleMap') {
      this.map.updateSize();
      this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: 78.33251953124999, lng: 17.748686651728804}, false, false);
    } else {
      this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: 69.53451763078357, lng: 89.6484375}, false, false);
    }
    this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    this.mapService.addMarker(this.map,this.sourceLocation,'source','assets/vtstrackhisIcon/startFlag.png');
    this.mapService.addMarker(this.map,this.destinationLocation,'destination','assets/vtstrackhisIcon/endFlag.png');
    this.mapService.fitBounds(this.map, 1);
  }

  getBack(){
  this.modalController.dismiss();
  }

  ngOnInit() {    
      setTimeout(() => {
        this.createMap();
      }, 2000);
      this.getFromAddress(this.sourceLocation.lat, this.sourceLocation.lng);
      this.getToAddress(this.destinationLocation.lat, this.destinationLocation.lng);
  }

  getFromAddress(lat,lng){
    const url = serverUrl.web+"/login/company/latlngtoaddress/" + lat+ "/" + lng+ "/" + localStorage.corpId;
    this.ajaxService.ajaxGetObject(url)
    .subscribe( res => {
      this.fromAddress = res;
      console.log(this.fromAddress);
    });
  }
  getToAddress(lat, lng){
    const url = serverUrl.web+"/login/company/latlngtoaddress/" + lat+ "/" + lng+ "/" + localStorage.corpId;
    this.ajaxService.ajaxGetObject(url)
    .subscribe( res => {
      this.toAddress = res;
      console.log(this.toAddress);
    });
  }
  
}
