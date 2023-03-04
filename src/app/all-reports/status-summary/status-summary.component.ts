import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-status-summary',
  templateUrl: './status-summary.component.html',
  styleUrls: ['./status-summary.component.scss'],
})
export class StatusSummaryComponent implements OnInit {
  view = 'grid'
  veh;
  statusCard;
  myPlatform: any;
  _showPdf='allPlatforms';
  pdfHead: any= ['Plate No', 'Odometer', 'End Time', 'Stop', 'Towed', 'Running', 'Idle', 'Begin'];
  constructor(
    private location: Location,
    private commonService: CommonService,
    private platform: Platform
    ) { }
    
    createPdf() {
      var obj = [];
      for (let i = 0; i < this.veh.length; i++) {
        obj.push([this.veh[i]['Plate No'], this.veh[i].Odometer,
        this.veh[i].End, this.veh[i].Stop, this.veh[i].Towed,
        this.veh[i].Running, this.veh[i].Idle, this.veh[i].Begin])
      }
      this.commonService.createPdf(this.pdfHead, obj, "status summary report", this.myPlatform, "status summary report");
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
    this.commonService.dismissLoader();
    this._showPdf = localStorage.getItem('device')
      this.veh = JSON.parse(localStorage.getItem('reportsData'));
      for (let i =0; i < this.veh.length; i++){
        this.veh[i]['startTime'] = this.veh[i]['Begin'];
        this.veh[i]['endTime'] = this.veh[i]['End'];
        this.veh[i]['startLocation'] = this.veh[i]['Begin At'];
        this.veh[i]['stopLocation'] = this.veh[i]['End At'];
        // for(let j=0; j < Object.keys(JSON.parse(localStorage.dashboardData).liveDatas).length; j++){
        //   let data : any =Object.values(JSON.parse(localStorage.dashboardData).liveDatas)[j];
        //   if( this.veh[i]['Plate No'] == data.plateNo){
        //     this.veh[i]['vin'] = data.vin
        //     break;
        //   }
        // }
      }
      
      this.statusCard = this.veh;
    }
    
  }
  