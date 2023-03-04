import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss'],
})
export class ScheduleMaintenanceComponent implements OnInit, OnChanges {
  @Input() scheduleMaintenance;
  scheduleData = true;
  gridSchedule: any;
  selectedVin: any;
  maintenance: any;
  disabled: boolean;
  myPlatform: any;
  constructor(
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private platform: Platform
  ) { }
  addData() {
    this.scheduleData = false;
    this.selectedVin = JSON.parse(localStorage.selectedVin).vin;
    let data = {
      "vin": this.selectedVin,
      "maintenanceType": "PreventiveMaintenance",
      "timeToNextMaintenance": "3000",
      "lastMaintenanceHours": "0",
      "lastUpdDt": ""
    }
    const url = serverUrl.web + "/site/add/Schedulemaintenance";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe(res => {
      if (res.message == 'Added Successfully') {
        this.commonService.presentToast('Maintenance added successfully.');
        this.submit()
      }
      else {
        this.commonService.presentToast('Try again later.');
      }

    })
}
  submit() {
    const url2 = serverUrl.web + "/site/get/Schedulemaintenance?vin=" + this.selectedVin;
    this.ajaxService.ajaxGet(url2).subscribe(res => {
      if (res != '') {
        this.maintenance = res[0]['timeToNextMaintenance'];
      }
      else if (res == '') {
        this.maintenance = '--';
      }
    })
  }

  getColor(data) {
    if (data < 0) {
      return 'red';
    }
    else if (data < 300) {
      return 'orange';
    }
    else if (data > 300) {
      return 'green';
    }
    else {
      return 'black';
    }

  }


  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    if(localStorage.selectedVin){
    this.selectedVin = JSON.parse(localStorage.selectedVin).vin
    this.submit();
    }
  }

  ngOnChanges() {
    if(localStorage.selectedVin){
      this.selectedVin = JSON.parse(localStorage.selectedVin).vin
      this.submit();
    }
   
  }

}
