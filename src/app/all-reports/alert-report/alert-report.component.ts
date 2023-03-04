import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-alert-report',
  templateUrl: './alert-report.component.html',
  styleUrls: ['./alert-report.component.scss'],
})
export class AlertReportComponent implements OnInit {
  alert;
  view = 'grid'
  myPlatform: any;
  _showPdf='allPlatforms';
  pdfHead: any = ['Plate No', 'Operator Name', 'Alert Types', 'Date & Time'];
  constructor(
    private location: Location,
    private commonService: CommonService,
    private platform : Platform
    ) { }

    createPdf() {
      var obj = [];
      for (let i = 0; i < this.alert.length; i++) {
        obj.push([this.alert[i].plateNo, this.alert[i].operatorName,
          this.alert[i].alertTypes, this.alert[i].timeStamp])
      }
      this.commonService.createPdf(this.pdfHead, obj, "Alert report", this.myPlatform, "Alert report");
    }

    typeOfView(viewType: string) {
      this.view = viewType;
    }
    
    getBack() {
      this.location.back();
    }
    ngOnInit() {
      this.myPlatform = this.platform.platforms()[0];
      if(this.myPlatform == 'tablet'){
        this.myPlatform = 'desktop';
      }
      this._showPdf = localStorage.getItem('device')
      this.alert = JSON.parse(localStorage.reportsData);
      this.commonService.dismissLoader();
    }
  }
  