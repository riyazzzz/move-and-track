import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-sensor-configuration',
  templateUrl: './sensor-configuration.component.html',
  styleUrls: ['./sensor-configuration.component.scss'],
})
export class SensorConfigurationComponent implements OnInit {

  @Input() paraVin;
  @Input() vin;
  myPlatform: any;
  digitalValues = [];
  labelDigitalValues: any;
  selectedValues;
  selectedVin: string;
  resData: any;
  commonData: any;
  getPreferenceData: any;
  object = []
  constructor(
    private commonService: CommonService,
    public ajaxService: AjaxService
  ) { }

  submit(number, selectedUnit, selectedData, selectedValue) {
    //console.log(number);

    var data = { "vin": this.selectedVin["vin"], min: 0, max: 1, "io": selectedValue, "ioname": selectedUnit, "lastUpdBy": localStorage.getItem('userName'), "unit": "0" }

    const url = serverUrl.web + "/sensor/addsensors"
    this.ajaxService.ajaxPostWithBody(url, data).subscribe(res => {
      //console.log(res);
      this.commonService.presentToast(res.message);
    })
  }

  selectbarChange(event, index) {
    this.object[index] = event.detail.value
  }

  getSensors() {
    //console.log(this.paraVin, this.vin);
    this.selectedVin = JSON.parse(localStorage.getItem('selectedVin'));
    const url = serverUrl.web + '/login/getPreferences?key=SensorInputs&companyId=""'
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.digitalValues = res;
        this.getPreferenceData = res;
        const url2 = serverUrl.web + '/sensor/getsensors?vin=' + this.selectedVin["vin"]
        this.ajaxService.ajaxGet(url2)
          .subscribe(res => {
            this.object = []
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < this.digitalValues.length; j++) {
                if (res[i].id.io == this.digitalValues[j].itemvalue) {
                  this.object[j] = res[i]['ioname']
                  break;
                }
              }
            }
          })

      })
  }
  ngOnChanges() {

    if (this.paraVin == "Vin") {
      this.getSensors();
    }
  }
  ngOnInit() {
    //console.log(this.paraVin, this.vin,);
    this.getSensors();
  }
}
