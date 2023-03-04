import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-driver-behaviour',
  templateUrl: './driver-behaviour.component.html',
  styleUrls: ['./driver-behaviour.component.scss'],
})
export class DriverBehaviourComponent implements OnInit {
  @Input() commonData;
  view: string = 'grid';
  tableValues = {};
  gridValues = [];
  myPlatform: any;
  _showPdf='allPlatforms';
  searchInput;
  @Input() displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  pdfHead: any = ['Plate No', 'Harsh Acceleration', 'Harsh Break', 'Tilt', 'AvgSpeed', 'Distance Travelled',
    'Driver Name', 'Engine On', 'Idle', 'Fuel Consumption', 'Over All Score', 'Running', 'Speed'];
  constructor(
    private commonServices: CommonService,
    private location: Location,
    private platform: Platform
  ) { }
  typeOfView(viewType: string) {
    this.view = viewType;
  }
  getBack() {
    this.location.back();
  }
  createPdf() {
    var obj = [];
    for (let i = 0; i < this.commonData.length; i++) {
      obj.push([
        this.commonData[i].plateNo,
        this.commonData[i].HARSHACCELERATION,
        this.commonData[i].HARSHBRAKING,
        this.commonData[i].TILT,
        this.commonData[i].avgSpeed,
        this.commonData[i].distanceTravelled,
        this.commonData[i].driverName,
        this.commonData[i].engineOnDuration,
        this.commonData[i].excessiveIdling,
        this.commonData[i].fuelConsumption,
        this.commonData[i].overAllScore,
        this.commonData[i].runningDuration,
        this.commonData[i].topSpeed])
    }
    this.commonServices.downloadPdfReports(this.pdfHead, obj, "Door open report")
  }

  ngOnInit() {

    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    
    this.commonServices.dismissLoader();
    this._showPdf = localStorage.getItem('device')
    let veh = JSON.parse(localStorage.getItem('reportsData'));
    for (let i = 0; i < veh.length; i++) {
      veh[i]["overAllScore"] = parseInt(veh[i].overAllScore)
    }
    // let veh = [
    //   {
    //     "driver": "aaaaa",
    //     "plateNo": "Tn18a7353",
    //     "overallScore": 71,
    //     "excessiveIdling": "15",
    //     "runningDuration": "0 day 14:25:45",
    //     "engineOnDuration": "39.5",
    //     "topSpeed": "105",
    //     "averageSpeed": "68",
    //     "harshBraking": "6",
    //     "harshAcceleration": "5",
    //     "drift": "3",
    //     "tilt": "1",
    //     "distanceTravelled": "320",
    //     "averageFuelConsumption": "25"
    //   }
    // ];
    this.gridValues = veh;
    this.tableValues =
    {
      localData: veh
    };
    this.commonData = this.gridValues;
  }

}
