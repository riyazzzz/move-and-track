import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
})
export class AttendanceReportComponent implements OnInit {
  commonData;
  displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  count = 10;
  myPlatform: string;
  constructor(
    private platform: Platform,
    private location: Location
  ) { }

  getBack() {
    this.location.back();
  }
  doInfinite(event) {
    console.log("event trigger")
    setTimeout(() => {
      console.log(this.commonData)
      this.displayData.push(...this.commonData.slice(this.currentPage * this.displayCount, (this.currentPage + 1) * this.displayCount));
      this.currentPage++;
      event.target.complete();
      if (this.displayData.length == this.commonData.length) {
        event.target.disabled = true;
      }
      console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
  }
  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
      console.log();
    }
    else {
      this.displayData = this.commonData;
    }
  }
  ngOnInit() {
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
    console.log(this.commonData);
    //  this.commonData = JSON.parse('[{"date":"2020-09-15 14:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone1","value":"29.1"},{"date":"2020-09-15 12:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone2","value":"28.6"}]')
  }
  ngOnChanges() {
    this.myPlatform = this.platform.platforms()[0];
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
  }
  }


