import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-primitive-maintanance',
  templateUrl: './primitive-maintanance.component.html',
  styleUrls: ['./primitive-maintanance.component.scss'],
})
export class PrimitiveMaintananceComponent implements OnInit {
  displayData;
  myPlatform: string;
  constructor(
    private commonService: CommonService,
    private platform: Platform
  ) { }
  createPdf() {
    var obj = [];
    for (let i = 0; i < this.displayData.length; i++) {
      obj.push([this.displayData[i].plateno, this.displayData[i].currentOdometer, this.displayData[i].lastmaintenance,
        this.displayData[i].lastmaintenancetime, this.displayData[i].duekilometer, this.displayData[i].status])
    }
    this.commonService.createPdf(['Plate No', "Odometer", "Last maintanance", "Last maintenance time", "Due kilometer", "Status"], obj, "Primitive maintanance report", this.myPlatform, "Primitive maintanance report");
  }
  ngOnInit() {
    this.commonService.dismissLoader()
    this.displayData = JSON.parse(localStorage.getItem('reportsData'));
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
  }

}
