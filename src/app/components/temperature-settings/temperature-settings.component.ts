import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LatLongMapPickerPage } from 'src/app/settings/lat-long-map-picker/lat-long-map-picker.page';

@Component({
  selector: 'app-temperature-settings',
  templateUrl: './temperature-settings.component.html',
  styleUrls: ['./temperature-settings.component.scss'],
})
export class TemperatureSettingsComponent implements OnInit {
  temperature = {
    temp1: { sensor: "TEMPERATURESENSOR1", name: "Zone1", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: true, io: 77, latLng: "0,0" },
    temp2: { sensor: "TEMPERATURESENSOR2", name: "Zone2", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 78, latLng: "0,0" },
    temp3: { sensor: "TEMPERATURESENSOR3", name: "Zone3", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 79, latLng: "0,0" },
    temp4: { sensor: "TEMPERATURESENSOR4", name: "Zone4", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 76, latLng: "0,0" },
   }
  imeiNo = [];
  paramMap: any;
  pageType: any;
  @Input() paraVin;
  @Input() vin;
  icon = {
    true: "ios-arrow-up",
    down: "ios-arrow-down"
  }
  userLocation: string;
  fleetLogin: any;
  constructor(
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private geolocation: Geolocation,
    private modalController: ModalController,

  ) { }
  stateChange() {
    // //console.log(this.temperature)
  }

  addMoreTemp() {
    for (let i = 0; i <= Object.keys(this.temperature).length; i++) {
      if (Object.keys(this.temperature).length == i) {
        this.commonService.presentToast("Exceeded maximum number of temperature")
      } else if (Object.values(this.temperature)[i].visible == false) {
        Object.values(this.temperature)[i].visible = true;
        break;
      }
    }
  }
  getImeiNo() {
    var currentVin = JSON.parse(localStorage.getItem('selectedVin'))
   let body = {
      "vin": currentVin["vin"]
   }
    const url = serverUrl.web + "/simcard/temperature/serials?vin= " + currentVin["vin"];
    this.ajaxService.ajaxGet(url).subscribe(res => {
      //console.log(res);
      this.imeiNo = res;
    })
  }
  showHide(data) {
    data["imeiVisible"] = !data["imeiVisible"];
  }

  async submit() {
    let text = this.pageType == 'All' ? "This changes affect the whole vehicle belong to this company!" : "This changes affect this " + JSON.parse(localStorage.selectedVin).plateNo + " vehicle";
    if (this.temperature.temp1.editEnable == true || this.temperature.temp2.editEnable == true || this.temperature.temp3.editEnable == true || this.temperature.temp4.editEnable == true) {
      const alert = await this.alertController.create({
        header: 'Warning',
        backdropDismiss: false,
        message: text,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Confirm',
          handler: confirm => {
            let services = false;
            const data = {
              companyId: localStorage.getItem("corpId"),
              userId: localStorage.getItem("userName"),
              tempVal: []
            }
            if (this.pageType == "Vin") {
              data["vin"] = JSON.parse(localStorage.getItem("selectedVin")).vin;
              for (let i = 0; i < 4; i++) {
                if (Object.values(this.temperature)[i].editEnable == true) {
                  if (Object.values(this.temperature)[i].imei != "") {
                    Object.values(this.temperature)[i]["status"] = 1;
                    data["tempVal"].push(Object.values(this.temperature)[i]);
                  } else {
                    this.commonService.presentAlert("Alert", "Add device id in " + Object.values(this.temperature)[i]["name"]);
                    services = false;
                    break;
                  }

                } else if (Object.values(this.temperature)[i].editEnable == false && Object.values(this.temperature)[i].imei != "") {
                  Object.values(this.temperature)[i]["status"] = 0;
                  data["tempVal"].push(Object.values(this.temperature)[i]);
                }
                if (i == 3) {
                  services = true;
                }
              }
            } else {
              data["vin"] = "All";
              for (let i = 0; i < 4; i++) {
                if (Object.values(this.temperature)[i].editEnable == true) {
                  Object.values(this.temperature)[i]["status"] = 1;
                  data["tempVal"].push(Object.values(this.temperature)[i]);
                }
                if (i == 3) {
                  services = true;
                }
              }
            }
            if (services == true && data.tempVal.length > 0) {
              //console.log(JSON.stringify(data));
              const url = serverUrl.web + "/simcard/updatetemp";
              this.ajaxService.ajaxPostWithErrorBody(url, JSON.stringify(data))
                .subscribe(res => {
                  if (res == "c") {
                    this.commonService.presentToast("Changes saved");
                  } else if (res == "f") {
                    this.commonService.presentToast("Changes not saved");
                  }
                })
            }
          }
        }]
      });
      await alert.present();
    } else {
      this.commonService.presentToast("Sorry your request cann't access. Please make sure any check box are enabled")
    }
  }
  async remove(data, io) {
    const alert = await this.alertController.create({
      header: 'Warning',
      backdropDismiss: false,
      message: "Are you sure you want to remove this " + this.temperature[data].name + " device from " + JSON.parse(localStorage.getItem("selectedVin")).plateNo,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Confirm',
        handler: confirm => {
          const body = {
            vin: JSON.parse(localStorage.getItem("selectedVin")).vin,
            io: io
          }
          const url = serverUrl.web + "/simcard/remove/io";
          this.ajaxService.ajaxPostWithBody(url, body)
            .subscribe(res => {
              if (JSON.parse(res).message == "Success") {
                this.commonService.presentToast("Device removed successfully");
                this.temperature[data].editEnable = false;
                this.temperature[data].imei = "";
                // this.getVehicleTemp();
              } else if (JSON.parse(res).message == "No Data") {
                this.commonService.presentToast("Device not available")
              }
            })

        }
      }]
    });
    await alert.present();

  }

  getVehicleTemp() {
    let url = serverUrl.web + "/device/vehicletemp?vin=" + JSON.parse(localStorage.getItem("selectedVin")).vin;
    this.ajaxService.ajaxGetWithString(url)
      .subscribe(res => {
        if (res != "") {
          this.temperature = {
            temp1: { sensor: "TEMPERATURESENSOR1", name: "Zone1", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: true, io: 77, latLng: "" },
            temp2: { sensor: "TEMPERATURESENSOR2", name: "Zone2", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 78, latLng: "" },
            temp3: { sensor: "TEMPERATURESENSOR3", name: "Zone3", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 79, latLng: "" },
            temp4: { sensor: "TEMPERATURESENSOR4", name: "Zone4", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 76, latLng: "" },
          }
          let data = res.split(",")
          data = data.slice(0, data.length - 1);
          let arrayFourthIndex = data.shift();
          data.splice(3, 0, arrayFourthIndex);
          for (let i = 0; i < data.length; i++) {
            let splitTemp;
            splitTemp = data[i].split("|");
            for (let j = 0; j < 4; j++) {
              if (splitTemp[1] == ("TEMPERATURESENSOR" + [j + 1])) {
                this.temperature["temp" + [j + 1]].name = splitTemp[6];
                this.temperature["temp" + [j + 1]].min = splitTemp[2];
                this.temperature["temp" + [j + 1]].max = splitTemp[3];
                this.temperature["temp" + [j + 1]].visible = true;
                this.temperature["temp" + [j + 1]].imei = splitTemp[7];
                this.temperature["temp" + [j + 1]].latLng = splitTemp[8].split('_')[0] + ',' + splitTemp[8].split('_')[1];
                if (splitTemp[5] == "1" || splitTemp[5] == 1) {
                  this.temperature["temp" + [j + 1]].editEnable = true;
                }
                j = 4;
              }
            }
          }
        } else {
          this.temperature = {
            temp1: { sensor: "TEMPERATURESENSOR1", name: "Zone1", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: true, io: 77, latLng: "" },
            temp2: { sensor: "TEMPERATURESENSOR2", name: "Zone2", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 78, latLng: "" },
            temp3: { sensor: "TEMPERATURESENSOR3", name: "Zone3", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 79, latLng: "" },
            temp4: { sensor: "TEMPERATURESENSOR4", name: "Zone4", unit: "C", min: "-20", max: "40", editEnable: false, imeiVisible: false, imei: "", visible: false, io: 76, latLng: "" },
          }
        }
      })
  }

  ngOnChanges() {

    if (this.paraVin == "Vin") {
      this.getVehicleTemp();
      this.getImeiNo();
    }
  }
  currentLocation(mode) {
    if (mode == "temp1") {
      let t1 = "";
      this.geolocation.getCurrentPosition().then((resp) => {
        //console.log(resp)
        t1 = resp.coords.latitude + ',' + resp.coords.longitude
        this.temperature.temp1.latLng = t1
      }).catch((error) => {
        //console.log('Error getting location', error);
      });

    }

    if (mode == "temp2") {
      let t2 = "";
      this.geolocation.getCurrentPosition().then((resp) => {
        //console.log(resp)
        t2 = resp.coords.latitude + ',' + resp.coords.longitude
        this.temperature.temp2.latLng = t2
      }).catch((error) => {
        //console.log('Error getting location', error);
      });

    }

    if (mode == "temp3") {
      let t3 = "";
      this.geolocation.getCurrentPosition().then((resp) => {
        //console.log(resp)
        t3 = resp.coords.latitude + ',' + resp.coords.longitude
        this.temperature.temp3.latLng = t3
      }).catch((error) => {
        //console.log('Error getting location', error);
      });

    }

    if (mode == "temp1") {
      let t4 = "";
      this.geolocation.getCurrentPosition().then((resp) => {
        //console.log(resp)
        t4 = resp.coords.latitude + ',' + resp.coords.longitude
        this.temperature.temp4.latLng = t4
      }).catch((error) => {
        //console.log('Error getting location', error);
      });

    }
  }

  async mapLocation(mode) {
    if (mode == 'temp1') {
      this.userLocation = this.temperature.temp1.latLng
    } else if (mode == 'temp2') {
      this.userLocation = this.temperature.temp2.latLng
    } else if (mode == 'temp3') {
      this.userLocation = this.temperature.temp3.latLng
    } else if (mode == 'temp4') {
      this.userLocation = this.temperature.temp4.latLng
    }

    const modal = await this.modalController.create({
      component: LatLongMapPickerPage,
      componentProps: {
        currentLocation: this.userLocation != undefined || this.userLocation != null ? this.userLocation : ""
      }
    });
    modal.onDidDismiss().then(() => this.mapReturnFunction(mode));
    return await modal.present();
  }

  mapReturnFunction(mode) {
    if (mode == 'temp1') {
      this.temperature.temp1.latLng = localStorage.getItem('mapLocationPicker');
      localStorage.removeItem('mapLocationPicker')
    }
    if (mode == 'temp2') {
      this.temperature.temp2.latLng = localStorage.getItem('mapLocationPicker');
      localStorage.removeItem('mapLocationPicker')
    }
    if (mode == 'temp3') {
      this.temperature.temp3.latLng = localStorage.getItem('mapLocationPicker');
      localStorage.removeItem('mapLocationPicker')
    }
    if (mode == 'temp4') {
      this.temperature.temp4.latLng = localStorage.getItem('mapLocationPicker');
      localStorage.removeItem('mapLocationPicker')
    }
  }
  ngOnInit() {
    // this.getImeiNo();
    // this.pageType = this.route.snapshot.paramMap.get("type");
    this.pageType = this.paraVin;

  }

}
