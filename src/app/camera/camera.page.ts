import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WebAppInterface } from '../interfaces/AndroidNative';
import { CommonService } from '../services/common.service';

declare var Android : WebAppInterface;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  deviceList;
  constructor(
    public commonServices: CommonService,
    public modalCtrl: ModalController,
    public router: Router

  ) { }

  async addDevice(){
    this.router.navigateByUrl('add-camera')
// Android.addDeviceInAdmin("dvds","sdv","svs");
  }

  videoSteam(data){
    if(data.devStatus == 0){
      this.commonServices.presentToast('Device is in offline');
    }else{
      Android.onClickVideo(data.devId, "imran@eitworks.com", "inside123");
    }
 
  }

  doRefresh(){
    var dat = Android.getDeviceList();
    this.deviceList = JSON.parse(dat);
    // this.deviceList=[{"devId":"123436789012","devStatus":0},{"devId":"9be435a75df691e1","devStatus":0}]
  }

  addDevThroughWifi(){
    Android.wifiAccess()
  }

  ngOnInit() {
    // var dat = Android.getDeviceList();
    // this.deviceList = JSON.parse(dat);
    this.deviceList=[{"devId":"123436789012","devStatus":0},{"devId":"12345678","devStatus":0},{"devId":"1234567890","devStatus":0},{"devId":"123456789012","devStatus":0},{"devId":"123556688","devStatus":0},{"devId":"14012020665","devStatus":0},{"devId":"2357785147786","devStatus":0},{"devId":"23577851477868","devStatus":0},{"devId":"36853885","devStatus":0},{"devId":"4334546335686","devStatus":0},{"devId":"4796835838553","devStatus":0},{"devId":"79464863","devStatus":0},{"devId":"863583853","devStatus":0},{"devId":"863886363854","devStatus":0},{"devId":"9be435a75df691e1","devStatus":0}]
    console.log(this.deviceList);

  }
}
