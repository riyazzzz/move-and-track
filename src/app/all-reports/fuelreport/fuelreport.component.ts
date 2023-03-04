import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-fuelreport',
  templateUrl: './fuelreport.component.html',
  styleUrls: ['./fuelreport.component.scss'],
})
export class FuelreportComponent implements OnInit {
  pdfHead = ['Plate No', "Date", "Consume price", "Odometer", "Fuel type", "Price", "Consume quanity", "Mileage"];
  data = []
  base = []
  myPlatform: any;
  _showPdf='allPlatforms';
  constructor(
    private commonService: CommonService,
    private platform: Platform
  ) {

  }
  createPdf() {
    for (let i = 0; i < this.data.length; i++) {
      this.base.push([this.data[i].plateNo, this.data[i].date, this.data[i].consumePrice,
        this.data[i].odometer, this.data[i].fuelType, this.data[i].price,
        this.data[i].consumeQuantity, this.data[i].mileage])
    }
    this.commonService.createPdf(this.pdfHead, this.base, "Fuel report", this.myPlatform, "Fuel report");
  }
  ngOnInit() {
    this.commonService.dismissLoader()
    this.data = JSON.parse(localStorage.getItem('reportsData'));
    this.myPlatform = this.platform.platforms()[0];
      if(this.myPlatform == 'tablet'){
        this.myPlatform = 'desktop';
      }
    this._showPdf = localStorage.getItem('device')
  }

}
