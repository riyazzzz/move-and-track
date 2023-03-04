import { Component, OnInit } from '@angular/core';
import { AlertsTabPage } from '../../alerts-tab/alerts-tab.page';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-overspeed',
  templateUrl: './overspeed.page.html',
  styleUrls: ['./overspeed.page.scss'],
})
export class OverspeedPage implements OnInit {
  overSpeedReport;
  myPlatform: any;
  _showPdf='allPlatforms';
  pdfHead = ['Plate No', 'Avg Speed', 'Max Speed', 'Min Speed', 'Over Speed Duration', 'Start Time', 'End Time'];
  constructor(
    private commonService: CommonService,
    private location: Location,
    private platform: Platform
  ) { }

  createPdf() {
    var obj = [];
    for (let i = 0; i < this.overSpeedReport.length; i++) {
      obj.push([this.overSpeedReport[i].plateNo, this.overSpeedReport[i].avg,
        this.overSpeedReport[i].max, this.overSpeedReport[i].min, this.overSpeedReport[i].duration,
        this.overSpeedReport[i].start, this.overSpeedReport[i].end])
    }
    this.commonService.createPdf(this.pdfHead, obj, "Overspeed report", this.myPlatform, "Overspeed report");
  }

  getBack() {
    this.location.back();
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this._showPdf = localStorage.getItem('device')
    this.overSpeedReport = JSON.parse(localStorage.reportsData)

    this.commonService.dismissLoader();
  }

}
