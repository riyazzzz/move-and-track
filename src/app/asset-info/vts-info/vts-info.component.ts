import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthMapService } from '../../services/auth-map.service';
import { OpenlayerMapService } from '../../services/openlayer-map.service';
import { GoogleMapService } from '../../services/google-map.service';
import { AjaxService } from '../../services/ajax.service';
import { serverUrl } from '../../../environments/environment';
import { Platform } from '@ionic/angular';
import {app} from '../../../environments/environment'
@Component({
  selector: 'app-vts-info',
  templateUrl: './vts-info.component.html',
  styleUrls: ['./vts-info.component.scss'],
})
export class VtsInfoComponent implements OnInit {
  map;
  liveData;
  selectedVin;
  @Input() gridView;
  moreData = true;
  myPlatform: any;
  vin: any;
  entryPoint: any;
  constructor(
    public ajaxService: AjaxService,
    private platform:Platform) {
  
  }
  ionViewWillEnter() {

  }
  toggleData(){
    this.moreData=!this.moreData;
  }
  
 
  ngOnInit() {
    this.entryPoint = app.entryPoint;
    console.log(this.entryPoint)
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    if(this.gridView){
      this.selectedVin = this.gridView;
    }else{
      this.selectedVin = JSON.parse(localStorage.selectedVin).vin;
    }
    let url: string = serverUrl.web + "/site/vehicleInfo?vin=" + this.selectedVin;
      this.ajaxService.ajaxGet(url)
        .subscribe(res => {
          this.liveData = res;
        })
  }
  ngOnChanges(changes): void {
    if(this.gridView){
      this.selectedVin = this.gridView;
    }else{
      this.selectedVin = JSON.parse(localStorage.selectedVin).vin;
    }
    let url: string = serverUrl.web + "/site/vehicleInfo?vin=" + this.selectedVin;
      this.ajaxService.ajaxGet(url)
        .subscribe(res => {
          this.liveData = res;
        })
     
  }
 
}
