import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-door-open-report',
  templateUrl: './door-open-report.component.html',
  styleUrls: ['./door-open-report.component.scss'],
})
export class DoorOpenReportComponent implements OnInit {
  commonData;
  displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  count = 10;
  myPlatform: string;
  pdfHead: any = ['Plate No', "Timestamp"];

  constructor(
    private platform: Platform,
    private location: Location,
    private commonService: CommonService
  ) { }

  createPdf() {
    var obj = [];
    for (let i = 0; i < this.commonData.length; i++) {
      obj.push([this.commonData[i].plateNo, this.commonData[i].timeStamp])
    }
    this.commonService.createPdf(this.pdfHead, obj, "Door open report", this.myPlatform, "Door open report");
  }

  getBack() {
    this.location.back();
  }
  doInfinite(event) {
    //console.log("event trigger")
    setTimeout(() => {
      //console.log(this.commonData)
      this.displayData.push(...this.commonData.slice(this.currentPage * this.displayCount, (this.currentPage + 1) * this.displayCount));
      this.currentPage++;
      event.target.complete();
      if (this.displayData.length == this.commonData.length) {
        event.target.disabled = true;
      }
      //console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
  }
  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
      //console.log();
    }
    else {
      this.displayData = this.commonData;
    }
  }
  ngOnInit() {
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
    //  this.commonData = JSON.parse('[{"date":"2020-09-15 14:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone1","value":"29.1"},{"date":"2020-09-15 12:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone2","value":"28.6"}]')
  }
  ngOnChanges() {
    this.myPlatform = this.platform.platforms()[0];
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
  }

}
