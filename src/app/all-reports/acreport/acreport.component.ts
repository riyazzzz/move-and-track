import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-acreport',
  templateUrl: './acreport.component.html',
  styleUrls: ['./acreport.component.scss'],
})
export class AcreportComponent implements OnInit {
  commonData;
  displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  count = 10;
  myPlatform: string;
  pdfHead: any = ['Plate No', "From Time", "To Time", "Duration"];

  constructor(
    private platform: Platform,
    private location: Location,
    private commonService: CommonService
  ) { }

  createPdf() {
    var obj = [];
    for (let i = 0; i < this.commonData.length; i++) {
      obj.push([this.commonData[i].plateNo, this.commonData[i].from, this.commonData[i].to,
        this.commonData[i].duration])
    }
    this.commonService.createPdf(this.pdfHead, obj, "AC report", this.myPlatform, "AC report");
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
    this.commonService.dismissLoader()
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));

    // this.commonData = JSON.parse('[{"vin":"demo100","plateNo":"TN78AD6789","from":"2021-01-01 10:00:00","to":"2021-01-01 11:00:00","duration":"01:00:00"},{"vin":"demo100","plateNo":"TN78AD6789","from":"2021-01-01 15:00:00","to":"2021-01-01 15:30:00","duration":"00:30:00"}]')
    this.setDisplayData();
  }
  ngOnChanges() {
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    // this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    // this.setDisplayData();
  }
}
