import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { adminLocalStorage } from 'src/environments/environment';
@Component({
  selector: 'app-movement-report',
  templateUrl: './movement-report.component.html',
  styleUrls: ['./movement-report.component.scss'],
})
export class MovementReportComponent implements OnInit {

  objValues;
  show = "grid";
  myPlatform: any;
  _showPdf='allPlatforms';
  pdfHead: any = ['Plate No', 'Speed', 'Status', 'Time', 'Operator Name', 'Address'];
  data: any;
  constructor(
    private commonService: CommonService,
    private location: Location,
    private platform: Platform
  ) { }
  createPdf() {
    var obj = [];
    for (let i = 0; i < this.objValues.length; i++) {
      obj.push([this.objValues[i].plateNo, this.objValues[i].speed,
        this.objValues[i].status, this.objValues[i].timeStamp, this.objValues[i].operatorName,
        this.objValues[i].emailAddress])
    }
    this.commonService.createPdf(this.pdfHead, obj, "Movement report", this.myPlatform, "Movement report");
  }
  getBack() {
    this.location.back();
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
      // this.objValues = history.state.data
      this.objValues = JSON.parse(adminLocalStorage.reportData)
    this.commonService.dismissLoader();
    this._showPdf = localStorage.getItem('device')
  }

}
