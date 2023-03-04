import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-alarmreport',
  templateUrl: './alarmreport.component.html',
  styleUrls: ['./alarmreport.component.scss'],
})
export class AlarmreportComponent implements OnInit {
  myPlatform: string;
  pdfHead: any = ['Plate No', "Alert Type", "Status", "Start Time", "End Time", "Time Duration"];

  constructor(
    private platform: Platform,
    private location: Location,
    private commonService: CommonService
  ) { }
  commonData: any;
  displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  count = 10;
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

  getBack() {
    this.location.back();
  }

  createPdf() {
    var obj = [];
    for (let i = 0; i < this.commonData.length; i++) {
      obj.push([this.commonData[i].plateNo, this.commonData[i].AlertType, this.commonData[i].status,
        this.commonData[i].startTime, this.commonData[i].endTime, this.commonData[i].duration])
    }
    this.commonService.createPdf(this.pdfHead, obj, "Alarm report", this.myPlatform, "Alarm report");
  }


  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
    //  this.commonData = JSON.parse('[{"date":"2020-09-15 14:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone1","value":"29.1"},{"date":"2020-09-15 12:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone2","value":"28.6"}]')
  }
  ngOnChanges() {
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
  }
}
