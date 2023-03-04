import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-temprature',
  templateUrl: './temprature.page.html',
  styleUrls: ['./temprature.page.scss'],
})
export class TempraturePage implements OnInit {
  veh: any;
  myPlatform: any;
  _showPdf='allPlatforms';
  pdfHead: any = [];

  constructor(
    private commonService: CommonService,
    private platform: Platform,
    private location: Location
  ) { }
  createPdf() {
    var obj = [];
    for (let i = 0; i < this.veh.length; i++) {
      if (this.veh[i].TEMPERATURESENSOR4) {
        this.pdfHead = ['Plate No', 'Timestamp', 'Temprature Sensor 1', 'Temprature Sensor 2', 'Temprature Sensor 3', 'Temprature Sensor 4'];

        obj.push([this.veh[i].PlateNo, this.veh[i].TimeStamp,
        "Name:" + this.veh[i].TEMPERATURESENSOR1.name + ", Min:" + this.veh[i].TEMPERATURESENSOR1.min + ", Max:" + this.veh[i].TEMPERATURESENSOR1.max + ", Value:" + this.veh[i].TEMPERATURESENSOR1value,
        "Name:" + this.veh[i].TEMPERATURESENSOR2.name + ", Min:" + this.veh[i].TEMPERATURESENSOR2.min + ", Max:" + this.veh[i].TEMPERATURESENSOR2.max + ", Value:" + this.veh[i].TEMPERATURESENSOR2value,
        "Name:" + this.veh[i].TEMPERATURESENSOR3.name + ", Min:" + this.veh[i].TEMPERATURESENSOR3.min + ", Max:" + this.veh[i].TEMPERATURESENSOR3.max + ", Value:" + this.veh[i].TEMPERATURESENSOR3value,
        "Name:" + this.veh[i].TEMPERATURESENSOR4.name + ", Min:" + this.veh[i].TEMPERATURESENSOR4.min + ", Max:" + this.veh[i].TEMPERATURESENSOR4.max + ", Value:" + this.veh[i].TEMPERATURESENSOR4value])
      } else if (this.veh[i].TEMPERATURESENSOR3) {
        this.pdfHead = ['Plate No', 'Timestamp', 'Temprature Sensor 1', 'Temprature Sensor 2', 'Temprature Sensor 3'];

        obj.push([this.veh[i].PlateNo, this.veh[i].TimeStamp,
        "Name:" + this.veh[i].TEMPERATURESENSOR1.name + ", Min:" + this.veh[i].TEMPERATURESENSOR1.min + ", Max:" + this.veh[i].TEMPERATURESENSOR1.max + ", Value:" + this.veh[i].TEMPERATURESENSOR1value,
        "Name:" + this.veh[i].TEMPERATURESENSOR2.name + ", Min:" + this.veh[i].TEMPERATURESENSOR2.min + ", Max:" + this.veh[i].TEMPERATURESENSOR2.max + ", Value:" + this.veh[i].TEMPERATURESENSOR2value,
        "Name:" + this.veh[i].TEMPERATURESENSOR3.name + ", Min:" + this.veh[i].TEMPERATURESENSOR3.min + ", Max:" + this.veh[i].TEMPERATURESENSOR3.max + ", Value:" + this.veh[i].TEMPERATURESENSOR3value])
      } else if (this.veh[i].TEMPERATURESENSOR2) {
        this.pdfHead = ['Plate No', 'Timestamp', 'Temprature Sensor 1', 'Temprature Sensor 2'];

        obj.push([this.veh[i].PlateNo, this.veh[i].TimeStamp,
        "Name:" + this.veh[i].TEMPERATURESENSOR1.name + ", Min:" + this.veh[i].TEMPERATURESENSOR1.min + ", Max:" + this.veh[i].TEMPERATURESENSOR1.max + ", Value:" + this.veh[i].TEMPERATURESENSOR1value,
        "Name:" + this.veh[i].TEMPERATURESENSOR2.name + ", Min:" + this.veh[i].TEMPERATURESENSOR2.min + ", Max:" + this.veh[i].TEMPERATURESENSOR2.max + ", Value:" + this.veh[i].TEMPERATURESENSOR2value])
      } else if (this.veh[i].TEMPERATURESENSOR1) {
        this.pdfHead = ['Plate No', 'Timestamp', 'Temprature Sensor 1'];

        obj.push([this.veh[i].PlateNo, this.veh[i].TimeStamp,
        "Name:" + this.veh[i].TEMPERATURESENSOR1.name + ", Min:" + this.veh[i].TEMPERATURESENSOR1.min + ", Max:" + this.veh[i].TEMPERATURESENSOR1.max + ", Value:" + this.veh[i].TEMPERATURESENSOR1value]);
      }
    }
    this.commonService.createPdf(this.pdfHead, obj, "Temperature report", this.myPlatform, "Temperature report");
  }
  getBack() {
    this.location.back();
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.commonService.dismissLoader();
    this._showPdf = localStorage.getItem('device')
    this.veh = JSON.parse(localStorage.getItem('reportsData'));
    // this.veh = JSON.parse('[{"date":"2020-09-15 14:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone1","value":"29.1"},{"date":"2020-09-15 12:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone2","value":"28.6"}]')
  }

}
