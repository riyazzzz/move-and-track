import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl, storageVariable } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-gridfilter',
  templateUrl: './gridfilter.component.html',
  styleUrls: ['./gridfilter.component.scss'],
})
export class GridfilterComponent implements OnInit {
  makeAndModel = {}
  make: any = [];
  modal: any = [];
  vehicleStatus: any = ['Running', 'Idle', 'No Transmission', 'Overspeed', 'Stop'];
  fleetManager: string[];
  filterData = [];
  liveData;
  makeFilter;
  modalFilter;
  vehicleFilter;
  timeFilter;
  fleetFilter;
  fleetVehicle: unknown[];

  constructor(
    private ajaxServices: AjaxService,
    private commonService: CommonService
  ) { }

  filteringValue() {
    let sortFilter = [];
    let data = [];
    this.makeFilter;
    this.modalFilter;
    this.vehicleFilter;
    this.timeFilter;
    this.fleetFilter;
    if (this.makeFilter) {
      if (sortFilter.length > 0) {
        for (let i = 0; i < sortFilter.length; i++) {
          if (sortFilter[i].make == this.makeFilter) {
            data.push(sortFilter[i])
          }
        }
        if (data.length > 0) {
          sortFilter = data;
          data = [];
        } else {
          this.commonService.presentToast("There is no data found, It won't affect your earlier action");
          // this.makeFilter = '';
        }
      } else {
        for (let i = 0; i < this.liveData.length; i++) {
          if (this.liveData[i].make == this.makeFilter) {
            sortFilter.push(this.liveData[i])
          }
        }
      }
    }

    if (this.timeFilter) {
      var date: any = new Date();
      date = date.toJSON().split("T")[0]
      if (sortFilter.length > 0) {
        for (let i = 0; i < sortFilter.length; i++) {
          if (sortFilter[i].timeStamp.split(' ')[0] == date) {
            data.push(sortFilter[i])
          }
        }
        if (parseInt(this.timeFilter) <= 59) {
          for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].timeDifference.split(':')[0]) == parseInt('00') && parseInt(data[i].timeDifference.split(':')[1]) <= parseInt(this.timeFilter)) {
              sortFilter.push(data[i])
            }
          }
        } else if (parseInt(this.timeFilter) == 60) {
          for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].timeDifference.split(':')[0]) == parseInt('01') && parseInt(data[i].timeDifference.split(':')[1]) <= parseInt('00')) {
              sortFilter.push(data[i])
            }
          }
        }
        if (data.length > 0) {
          sortFilter = data;
        } else {
          this.commonService.presentToast("There is no data found, It won't affect your earlier action");
          // this.makeFilter = '';
        }
      } else {
        for (let i = 0; i < this.liveData.length; i++) {
          if (this.liveData[i].timeStamp.split(' ')[0] == date) {
            data.push(this.liveData[i]);
          }
        }
        if (parseInt(this.timeFilter) <= 59) {
          for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].timeDifference.split(':')[0]) == parseInt('00') && parseInt(data[i].timeDifference.split(':')[1]) <= parseInt(this.timeFilter)) {
              sortFilter.push(data[i])
            }
          }
        } else if (parseInt(this.timeFilter) == 60) {
          for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].timeDifference.split(':')[0]) == parseInt('01') && parseInt(data[i].timeDifference.split(':')[1]) <= parseInt('00')) {
              sortFilter.push(data[i])
            }
          }
        }

      }
      data = [];
    }

    if (this.modalFilter) {
      if (sortFilter.length > 0) {
        for (let i = 0; i < sortFilter.length; i++) {
          if (sortFilter[i].model == this.modalFilter) {
            data.push(sortFilter[i])
          }
        }
        if (data.length > 0) {
          sortFilter = data;
          data = [];
        } else {
          this.commonService.presentToast("There is no data found, It wont affect your earlier action");
          // this.modalFilter = '';
        }
      } else {
        for (let i = 0; i < this.liveData.length; i++) {
          if (this.liveData[i].model == this.modalFilter) {
            sortFilter.push(this.liveData[i])
          }
        }
      }
    }

    if (this.vehicleFilter) {
      if (sortFilter.length > 0) {
        for (let i = 0; i < sortFilter.length; i++) {
          if (sortFilter[i].status == this.vehicleFilter) {
            data.push(sortFilter[i])
          }
        }
        if (data.length > 0) {
          sortFilter = data;
          data = [];
        } else {
          this.commonService.presentAlert('Warning', "There is no data found, It wont affect your earlier action");
          // this.vehicleFilter = '';
        }

      } else {
        for (let i = 0; i < this.liveData.length; i++) {
          if (this.liveData[i].status == this.vehicleFilter) {
            sortFilter.push(this.liveData[i])
          }
        }
      }
    }

    if (this.fleetFilter) {
      var fleetData: any = [];
      let liveData = Object.values(storageVariable.upDatedJsonData)[0]
      fleetData = this.fleetVehicle[this.fleetFilter]
      for (let i = 0; i < fleetData.length; i++) {
        data.push(liveData[fleetData[i]]);
      }
      if (sortFilter.length > 0) {
        fleetData = []
        for (let i = 0; i < sortFilter.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (sortFilter[i].vin == data[j].vin) {
              fleetData.push(sortFilter[i]);
              break;
            }
          }
        }
        if (fleetData.length > 0) {
          sortFilter = fleetData;
          fleetData = [];
        } else {
          this.commonService.presentToast("There is no data found, It wont affect your earlier action");
          // this.fleetFilter = '';
        }
      } else {
        if (data.length > 0) {
          sortFilter = data;
          data = [];
        } else {
          this.commonService.presentToast("There is no data found, It wont affect your earlier action");
          // this.fleetFilter = '';
        }
      }
    }
    console.log(sortFilter);
    localStorage.setItem('modalFilterData', JSON.stringify(sortFilter));
  }

  ngOnInit() {
    localStorage.removeItem('modalFilterData')
    this.filterData = [];
    this.liveData = Object.values(JSON.parse(localStorage.upDatedJsonData).liveDatas);
    for (var i = 0; i < this.liveData.length; i++) {
      this.make.push(this.liveData[i].make);
      this.modal.push(this.liveData[i].model);
      //this.vehicleStatus.push(this.liveData[i].status);
    }
    this.make = [...new Set(this.make)];
    this.modal = [...new Set(this.modal)];
    //this.vehicleStatus = [...new Set(this.vehicleStatus)]

    const url = serverUrl.web + '/device/filtervin?compId=' + localStorage.corpId;
    this.ajaxServices.ajaxGet(url)
      .subscribe(res => {
        console.log(res)
        this.fleetManager = Object.keys(res);
        this.fleetVehicle = res;
      })
  }

}
