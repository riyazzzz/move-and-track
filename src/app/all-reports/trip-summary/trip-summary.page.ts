import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.page.html',
  styleUrls: ['./trip-summary.page.scss'],
})
export class TripSummaryPage implements OnInit {
  tripReportData: Array<object> = new Array();
  reportName = 'TripSummary';
  myPlatform: any;
  _showPdf='allPlatforms';
  trip: any;
  pdfHead: any =['Plate no', 'Start time', 'Start location', 'End time', 'End location', 'Odometer', 'Running', 'Idle'];
  constructor(
    private commonService: CommonService,
    private location: Location,
    private platform: Platform
    ) {}
    createPdf() {
      var obj = [];
      for (let i = 0; i < this.trip.length; i++) {
        obj.push([this.trip[i].plateNo, this.trip[i].startTime, this.trip[i].startAddress, this.trip[i].endTime, this.trip[i].stopAddress, this.trip[i].odometer,
          this.trip[i].runningDuration, this.trip[i].idleDuration])
      }
      this.commonService.createPdf(this.pdfHead, obj, "trip report", this.myPlatform, "trip report");
    }
    
    getTripReport = () => {
      const res = JSON.parse(localStorage.reportsData);
      let obj: object = {};
      if(res.length === 0){
        this.commonService.presentAlert('OOPs', 'There is no report');
      }else{
        for(let i: number = 0; i < res.length ; i++){
          obj = res[i];
          obj["idleDuration"] = this.commonService.timeConverter(obj["idleDuration"],"display");
          obj["runningDuration"] = this.commonService.timeConverter(obj["runningDuration"],"display");
          this.tripReportData.push(obj);
        }
      }
    }
    
    ngOnInit() {
      this.trip = JSON.parse(localStorage.reportsData)
      this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this._showPdf = localStorage.getItem('device')
      this.getTripReport();
    }
   
    getBack() {
      this.location.back();
    }
    
  }
  
  