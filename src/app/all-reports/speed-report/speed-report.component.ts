import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-speed-report',
  templateUrl: './speed-report.component.html',
  styleUrls: ['./speed-report.component.scss'],
})
export class SpeedReportComponent implements OnInit {
  speed;
  myPlatform: any;
  _showPdf='allPlatforms';
  pdfHead: any= ['Plate No', 'Speed', 'Time', 'Date', 'Operator', 'Limit Exceeds'];
  constructor(
    private commonService: CommonService,
    private location: Location,
    private platform: Platform
  ) { }

  createPdf() {
    var obj = [];
    for (let i = 0; i < this.speed.length; i++) {
      obj.push([this.speed[i].plateNo, this.speed[i].speed,
        this.speed[i].timeStamp, this.speed[i].dateStamp, this.speed[i].operator,
        this.speed[i].descripition])
    }
    this.commonService.createPdf(this.pdfHead, obj, "Speed report", this.myPlatform, "Speed report");
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
    this.speed = JSON.parse(localStorage.reportsData)
  
    // for (let i =0; i < this.speed.length; i++){
    //   for(let j=0; j < Object.keys(JSON.parse(localStorage.dashboardData).liveDatas).length; j++){
    //     let data : any =Object.values(JSON.parse(localStorage.dashboardData).liveDatas)[j];
    //     if( this.speed[i]['plateNo'] == data.plateNo){
    //       this.speed[i]['vin'] = data.vin
    //       break;
    //     }
    //   }
    // }
    this.commonService.dismissLoader();
  }

}
