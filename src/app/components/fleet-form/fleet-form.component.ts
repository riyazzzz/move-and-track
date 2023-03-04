import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ManageFleetTableComponent } from '../manage-fleet-table/manage-fleet-table.component';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { HttpClient } from '@angular/common/http';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { serverUrl, app } from '../../../environments/environment';
import { LatLongMapPickerPage } from 'src/app/settings/lat-long-map-picker/lat-long-map-picker.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebsocketService } from 'src/app/services/websocket.service';
import { OperatorformComponent } from 'src/app/manage-fleet/operator/operatorform/operatorform.component';
@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss'],
})
export class FleetFormComponent implements OnInit {

  daysArray:any= [];
hours = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
minandSec = ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']
loader = false;  
@Input() myGrid;
  @Input() value;
  fleetLogin: FormGroup;
  selectedVin = ''
  formDisplay = false;
  valuePro = "0.25";
  displayBar = false;
  statusBar = false;
  // fleetLogin:any;
  appName: any = "";
  loginStatus;
  data: any;
  editrow: number;
  dataGrid: any = {};
  user: any = {};
  selectedCompany: any;
  fleetManager: any[];
  companyVehicle: FormGroup;
  fleet: any[];
  model: any = [];
  vin: any;
  progressText = "Checking inventory";
  editVehType = "Vehicle type";
  editfleet = "Fleet manager";
  fuelTypes = ["Petrol", "Diesel", "Gas"]
  editfuelType = "Petrol / Gas / Diesel";
  serviceName: any;
  hideSerialNo: boolean = false;
  fleetNames = "";
  operatorName = "Select operator name";
  imei = []
  show: boolean = true;
  imeiShow: boolean;
  companyDetail: { companyID: string; userId: string; };
  operators: any;
  geoFenceForRef: any;
  isDeleteShow: any =false;
  today: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    public websocketService: WebsocketService,
    private userService: UserDetailService,
    private http: HttpClient,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private router: Router,
    private geolocation: Geolocation,
    private alertController: AlertController,
  ) { }
  async closeModal() {
    this.modalController.dismiss();
  }
  vehicleTypes = [];
  
  provider = [
    { sim: 'Idea' },
    { sim: 'Airtel' },
    { sim: 'Vodafone' },
    { sim: 'Bsnl' }
  ];
  
  manufacture = [];
  modelTypes = [];
  getManufactures() {
    const url = serverUrl.web + '/login/getPreferences?key=manufactures&companyId='+this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.manufacture = res;
        //console.log(res);
      })
  }

  async addOperator() {
    const modal = await this.modalController.create({
      component: OperatorformComponent,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then(() => {
      this.getOperators();

    })
    return await modal.present();

  }

  getModelData() {
    this.model = this.modelTypes[this.fleetLogin.value.manufacture]
  }
  getModels() {
    const url = serverUrl.web + '/login/getPreferences?key=dealerModel&companyId='+this.companyDetail.companyID;						
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.modelTypes = res;
        //console.log(res);
      })
  }
  createForm() {
    this.fleetLogin = this.formBuilder.group({
      plateNo: ['', Validators.required],
      imei: ['', Validators.required],
      serialNo: [''],
      travelledKm: ['0'],
      fleetManager: ['', Validators.required],
      vehicleType: ['', Validators.required],
      assertLocation: [""],
      assertAddress: [""],
      manufacture: ['',],
      model: ['',],
      provider: ['',],
      cost: [''],
      fuelType: [''],
      km: [''],
      operator: [''],
      hours:[''],
      minutes:[''],
      seconds:[''],
      days:[''],
      totalhours:[''],
      totalMinutes:[''],
      totalSeconds:[''],

    });
  }
  armoronCreateForm(){
    this.fleetLogin = this.formBuilder.group({
      plateNo: ['', Validators.required],
      imei: ['', Validators.required],
     
      travelledKm: ['0',Validators.required],
     
      vehicleType: ['', Validators.required],
      serialNo: [''],
      fleetManager: [''],
     
      assertLocation: [""],
      assertAddress: [""],
      manufacture: ['',],
      model: ['',],
      provider: ['',],
      cost: [''],
      fuelType: [''],
      km: [''],
      operator: [''],
      todayEnginehours: [''],
      totalEnginehours: [''],
     
    });
  }

  addTheImei() {
    this.displayBar = true;
    if ((this.fleetLogin.value.imei).toString().length === 15) {
      const addImei = {
        imei: JSON.stringify(this.fleetLogin.value.imei),
        imeiNo: JSON.stringify(this.fleetLogin.value.imei),
        manufactureName: this.fleetLogin.value.manufacture,
        modelName: this.fleetLogin.value.model,
        providerName: this.fleetLogin.value.provider,
        simNo: this.fleetLogin.value.serialNo.toString(),
        dealerId: '3'
      }
      const url = serverUrl.web + '/device/branch/inventory';						
      this.ajaxService.ajaxPostWithBody(url, JSON.stringify(addImei))
        .subscribe(res => {
          var data = JSON.parse(res);
          if (data == null) {
            this.commonService.presentToast("your request wasn't solved, Kindly Contact support team")
            this.displayBar = false;
          } else if (data.result == "error") {
            this.commonService.presentToast("your request wasn't solved, Kindly Contact support team")
            this.displayBar = false;
          }
          else if (data.result == 'persisted successfully') {
            this.getImeiDetails();

            setTimeout(() => {
              this.valuePro = "0.60"
              this.progressText = "Plate number added successfully"
            }, 2000);
          } else if (data.imeiNo == "exists") {
            this.commonService.presentToast("Imei number already exists")
            this.displayBar = false;
          } else if (data.simCardNo == "exists") {
            this.commonService.presentToast("Sim number already exists")
            this.displayBar = false;
          }
          else {
            this.commonService.presentToast("Please check the sim number")
            this.displayBar = false;
          }
        })
    } else {
      this.displayBar = false;
      this.commonService.presentToast('Please enter 15 digit imei number');
    }
  }
  assign() {

    const arrayData = [];
    const date = new Date();
    let currentDate = date.getFullYear() + '-';
    currentDate += (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    currentDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let expDate = date.getFullYear() + 1 + '-';
    expDate += (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    expDate += date.getDate() < 10 ? '0' + (date.getDate() - 1) : date.getDate() - 1;

    const assignImeiTocom = {
      "manufacture": this.fleetLogin.value.manufacture,
      "provider": this.fleetLogin.value.provider,
      "imei":this.fleetLogin.value.imei.toString(),
      "checked": "false",
      "simno": this.fleetLogin.value.serialNo.toString(),
      "modal": this.fleetLogin.value.model,
      //"$$hashKey": "object:8022",
      "companyId": localStorage.getItem('corpId'),
      "userId": localStorage.getItem('userName'),
      "DefaultWarnty": expDate,
      "convertedDate": currentDate
    }
    arrayData.push(assignImeiTocom);
    const url = serverUrl.web + '/simcard/assignimei'
    this.ajaxService.ajaxPostWithBody(url, arrayData)
      .subscribe(res => {
        //console.log(res);
        // res = JSON.parse(res);
        if (res.devicestatus === "persisted") {
          this.commonService.presentToast('Your imei assign successfully');
          setTimeout(() => {
            this.valuePro = "0.85"
            this.progressText = "Sim added successfully"
          }, 4000);
          this.generateVin();
        }
        else {
          this.displayBar = false;
          this.commonService.presentToast('There was a problem to assign imei');
        }
      });
  }
  getImei() {
    const url = serverUrl.web + '/simcard/get/imei/list';

    this.ajaxService.ajaxGetWithString(url)
      .subscribe(res => {
      this.imei = JSON.parse(res);
      })
  }

  availableImei() {
    if ((this.fleetLogin.value.imei).toString().length >= 15) {
      const data={ "imeiNo" : this.fleetLogin.value.imei.toString() }
      var url = serverUrl.web +  '/device/validate/imei' 						
      this.ajaxService.ajaxPostWithString(url, data)
        .subscribe(res => {
          res = JSON.parse(res)
          if (res.message == "Error") {
            this.commonService.presentToast("Your request wasn't solved, Kindly contact support team");
          } else if (res.message == "Imei Already Available") {
            this.commonService.presentToast('Imei already exists');
          } else if (res.message == "Imei Not Available") {
            this.hideSerialNo = true;
          } if (res.message == 'Imei Available') {
            this.fleetLogin.patchValue({
              serialNo: res.simcardNo,
              manufacture: res.deviceManufacturer,
              model: res.deviceModel,
              provider: res.provider
            });
          }
        })
    }
  }

  getImeiDetails() {
    const data={ "imeiNo" : this.fleetLogin.value.imei.toString() }
    const url = serverUrl.web + '/device/getimeiDetails'
    this.ajaxService.ajaxPostWithBody(url, data).subscribe(res => {
      this.fleetLogin.patchValue({
        manufacture: res["manufacturerName"],
        model: res["modelName"],
        provider: res["provider"],
        serialNo: res["simCardNo"],
      });
      this.assign();

    })
  }


  fleetSubmition() {
    if (this.fleetLogin.value.vehicleType == "REFRIGERATOR") {
      if (this.fleetLogin.value.assertLocation == null || this.fleetLogin.value.assertAddress == null || this.fleetLogin.value.assertLocation == undefined || this.fleetLogin.value.assertAddress == undefined || this.fleetLogin.value.assertLocation == "" || this.fleetLogin.value.assertAddress == "") {
        this.commonService.presentToast('Please enter assert location and address')
        return null;
      }
    }
    if (this.serviceName != "available") {

      if (this.hideSerialNo) {
        this.addTheImei();
      } else {
        this.displayBar = true
        this.assign();
      }
    } else if (this.serviceName == "available") {
      this.vehicleDetails();
    }
  }

  getOperators() {
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }

    var datas = { "compnyID": companyDetail.companyID, "branchID": companyDetail.branchID, "companyNme": companyDetail.userId + '' }
    var url2 = serverUrl.web + '/operator/operatorinfo?companyId='+companyDetail.companyID+'&branchId='+ companyDetail.branchID;						
    this.ajaxService.ajaxPostMethodWithoutData(url2).subscribe(res => {
      //console.log(res);
      this.operators = JSON.parse(res);
    })
  }
  vehicleDetails() {
    var engineHours = "00:00:00"
    var totalEngineHours  = "00:00:00:00"
    if(this.fleetLogin.value.hours){
      engineHours = this.fleetLogin.value.hours  + ":" + this.fleetLogin.value.minutes +":" + this.fleetLogin.value.seconds ;
      totalEngineHours  = this.fleetLogin.value.days   + ":" + this.fleetLogin.value.totalhours  + ":" + this.fleetLogin.value.totalMinutes +":"+ this.fleetLogin.value.totalSeconds ; 
    }
  
    var fleetManage = localStorage.getItem('userName');
    if (this.fleetLogin.value.fleetManager.includes("NoFleet")) {
      var fleetManager = localStorage.getItem('userName');
      //  this.fleetLogin.value.fleetManager.splice(this.fleetLogin.value.fleetManager.findIndex("NoFleet"), 1, fleetManage);
    }
    var checkedValues = [];
    var unCheckedValues = [];
    unCheckedValues = this.fleet.filter(val => !this.fleetLogin.value.fleetManager.includes(val));
    for (var i = 0; i < unCheckedValues.length; i++) {
      if (unCheckedValues[i] === "NoFleet") {
        unCheckedValues.splice(i, 1);
        i--;
      }
    }
    if (checkedValues.length == 0) {

      (checkedValues).toString()

    }
    var addDetails = {
      "companyID": localStorage.getItem('corpId'), "branchID": localStorage.getItem('corpId'), "username": localStorage.getItem('userName'),
      "emailId": unCheckedValues.toString(), "imeiNo":this.fleetLogin.value.imei.toString(),
      "userEntry": "kingstrackalerts@gmail.com", "groupColor": "",
      "fleetUser": fleetManage + ',' + (this.fleetLogin.value.fleetManager).toString(),
      "plateNo": this.fleetLogin.value.plateNo, "oldCheckRoad": 0,
      "oldcheckFreeForm": 0, "oldcheckGeoZone": 0, "oldchecklandMark": 0,
      "oldcheckshift": 0, "type": "BikeApp", "icon": this.fleetLogin.value.vehicleType, "iconUrl": this.fleetLogin.value.vehicleType,"model": "Model",
      "group": "true", "dateofpurchase": "true", "insuranceExpiry": "true", "landMark": "true", "prefRest": "true",
      "expectedvehiclemilage": "0", "contactNo": "true", "fuelTanklit": "true", "roadGeo": "true", "freeForm": "true",
      "additionalWarranty": "true", "dateofreg": "true", "regexpiry": "true",
      "mileageInit": this.fleetLogin.value.km + '-' + this.fleetLogin.value.fuelType + '-' + this.fleetLogin.value.cost + '', "odometer": (this.fleetLogin.value.travelledKm).toString(), "preventiveselect": 3000,
      "preventivelimitselect": 30, "scheduleselect": 3000,
      "schedulelimitselect": 30,
      "PreventiveMaintenanceType": "hours", "operatorID": this.fleetLogin.value.operator,

      "reverseSetting": "0|0|0", "digitalInput1": "|",
      "digitalInput2": "|", "digitalInput3": "|", "digitalInput4": "|", "DigitalOutput": "|||",
      "analoginput1": "|||", "analoginput2": "|||", "analoginput3": "|||", "analoginput4": "|||",
      "onewiredinput": "", "actual1": "", "mv1": "", "actual2": "", "mv2": "", "actual3": "", "mv3": "",
      "actual4": "", "mv4": "", "checkDevice": 0, "checkOperator": 0, "checkshift": -1,
      "checkRoadGeo": -1, "checkFreeForm": -1, "checkGeoZone": -1, "checklandMark": -1,
      "showHierarchy": false, "vin": this.vin
    }
    const url = serverUrl.web +  '/site/add/vehicle';						;
    if (this.serviceName != "available") {
      this.ajaxService.ajaxPostWithString(url, addDetails)
        .subscribe(res => {
          //console.log(res);
          if (res === "persisted") {
            this.commonService.presentToast(' Vehicle added successfully!');
            if (this.fleetLogin.value.vehicleType == "REFRIGERATOR") {
              var data = {
                location: this.fleetLogin.value.assertLocation + "|" + this.fleetLogin.value.assertAddress,
                vin: this.vin,
                area: 'Preferred',
                latlng: this.geoFenceForRef,
                shape: 'Circle',
                zone: this.fleetLogin.value.plateNo,
                userId: localStorage.getItem('userName'),
                companyId: localStorage.getItem('corpId'),
                branchId: localStorage.getItem('corpId'),
                operation: 'association'
              }
              let url = serverUrl.web + "/device/addassetlocation";						
              this.ajaxService.ajaxPostWithBody(url, data)
                .subscribe(res => {
                  //console.log(res)
                  if (JSON.parse(res).message == "Success") {
                    this.commonService.presentToast("Device location added successfully")
                    if (JSON.parse(res).geozone == "Success") {
                      const detailsForAssign = { vin: this.vin, geoIds: [JSON.parse(res).geoId.toString()], operation: 'association' };
                      const url = serverUrl.web + '/zone/geozone/vehicle/associate';
                      this.ajaxService.ajaxPostWithString(url, detailsForAssign)
                        .subscribe(res => {
                          //console.log(res);
                          this.dashboardData();
                          const url2 = serverUrl.Admin + '/api/alerts/config';
                          let body = { "vin": this.vin, "method": "alertconfigCache" }
                          this.ajaxService.ajaxPostWithString(url2, body)
                            .subscribe(res => {
                              if (res == 'Done') {
                                this.commonService.presentToast('Alerts are enabled')
                              }
                            })
                          // this.commonService.dismissLoader();
                        }, err => {
                          //console.log(err);
                        });
                    }
                  } else if (JSON.parse(res).message != "Success")
                    this.commonService.presentToast("Device location update error")
                })
            }
            // this.router.navigateByUrl('/dashboard');
            // this.modalController.dismiss();

            setTimeout(() => {
              this.loginStatus = "Form submited succesfully";
              this.statusBar = false;
              this.fleetLogin.reset();
              this.modalController.dismiss();
            }, 6000);
          } else {
            this.commonService.presentToast(' Vehicle not added, Please check the details ');
            this.displayBar = false;
          }
        });
    } else {
      const url1 = serverUrl.web + '/site/update/vehicleinfo'
      var todayEnginehours = (this.fleetLogin.value.todayEnginehours * 60);
      var totalEnginehours = (this.fleetLogin.value.totalEnginehours * 60)
      var data = {
        "vin": this.selectedVin, "plateNo": this.fleetLogin.value.plateNo, "odometer": JSON.stringify(this.fleetLogin.value.travelledKm), "mileageInit": this.fleetLogin.value.km + '-' + this.fleetLogin.value.fuelType + '-' + this.fleetLogin.value.cost + '',
        "icon": this.fleetLogin.value.vehicleType,"iconUrl": this.fleetLogin.value.vehicleType, "operatorID": this.fleetLogin.value.operator,
        "checkedUser": (this.fleetLogin.value.fleetManager).toString(), "uncheckedUser": unCheckedValues.toString(),
        location: this.fleetLogin.value.assertLocation + "|" + this.fleetLogin.value.assertAddress,
        "EngineHours":engineHours ,"totalEngineHours":totalEngineHours
     }
      var count = 0;
      this.ajaxService.ajaxPostWithErrorBody(url1, JSON.stringify(data))
        .subscribe(res => {
          //   //console.log(res);
          if (count == 0) {
            count = 1;
            if (res === "U") {
              this.commonService.presentToast(' Vehicle updated successfully!');
              this.dashboardData();
              this.modalController.dismiss();
            } else if (res === "F") {
              this.commonService.presentToast(' Vehicle not added !');
              this.displayBar = false;
            }
          }
        })

    }
  }
  dashboardData() {
    this.appName = app.appName;
    this.websocketService.reSendRequest(JSON.parse(localStorage.dashboardWebSocketData));
    // let data = {
    //   "companyID": localStorage.corpId,
    //   "branchID": localStorage.corpId,
    //   "emailId": localStorage.userName,
    //   "Check": "false",
    //   "entryPoint": app.entryPoint,
    //   "dashboardMode": "mobile"
    // }
    // const url = serverUrl.web + "/api/vts/company/dashboarddata/" + JSON.stringify(data);
    // this.ajaxService.ajaxGet(url)
    //   .subscribe(res => {
    //     if (res != undefined) {
    //       // this.loginData = Object.keys(res[0]);
    //       let data = [];
    //       for (let i = 0; i < Object.keys(res.liveDatas).length; i++) {
    //         let currentCount: any = Object.values(res.liveDatas)[i];
    //         if (currentCount.status == "Yet_to_transmit" || currentCount.status == "Online" || currentCount.status == null) {
    //           currentCount.status = "No Transmission"
    //         } else if (currentCount.status == "Towed") {
    //           currentCount.status = "Running"
    //         }

    //         if (currentCount.status == "Overspeed") {
    //           data.push("Overspeed");
    //         } else {
    //           data.push(currentCount.status);
    //         }
    //         Object.values(res.liveDatas)[i]["odometer"] = parseInt(Object.values(res.liveDatas)[i]["odometer"]) / 1000
    //       }
    //       localStorage.setItem('dashboardData', JSON.stringify(res));
    //       localStorage.setItem('upDatedJsonData', JSON.stringify(res));
    //     }
    //   })
  }
  generateVin() {
    if (this.fleetLogin.value.imei != "" || this.fleetLogin.value.imei != " ") {
      const url = serverUrl.web + '/login/getPreferences?key=vinGenerationValue&companyId='+this.companyDetail.companyID;
      this.ajaxService.ajaxGetPerference(url)
        .subscribe(res => {
          const vehicleVin = this.selectedCompany + (Math.floor(Math.random() * res) + 100);
          const url = serverUrl.web + '/device/validate/vin?vin=' +vehicleVin;						
          this.ajaxService.ajaxGetWithString(url)
            .subscribe(res => {
              if (res == "available") {
                this.generateVin();
              } else if (res == "notavailable") {
                this.vin = vehicleVin;
                this.vehicleDetails();
              }
            });
        })
    } else {
      this.commonService.presentToast('Please assign imei properly');
    }
  }
  editForm() {
    if (this.value.submit == "available") {
      this.fleetLogin = this.formBuilder.group({
        plateNo: [this.value.plateNo, Validators.required],
        imei: [this.value.imeiNo, Validators.required],
        serialNo: [""],
        travelledKm: [this.value.odometer, Validators.required],
        fleetManager: [this.value.alerts, Validators.required],
        vehicleType: [this.value.type, Validators.required],
        assertAddress: [this.value.assertAddress],
        assertLocation: [this.value.assertLocation],
        manufacture: ['', Validators.required],
        model: [this.value.model, Validators.required],
        provider: ["", Validators.required]

      });
      this.formDisplay = true;
      // if(this.value.submit == "available"){
      //   this.serviceName ="";
      // }else{

      // }
      // this.model =this.value.alerts;
      this.editVehType = this.value.vehicleType;
      this.editfleet = this.value.alerts;
      // this.vehicleTypes=[];
      // this.vehicleTypes.push(this.value.vehicleType);
    }
  }
  hide(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {

      this.imei = this.imei.filter((item) => {
        return (item.indexOf(val) > -1);

      })
     
    }

  }
  getFleetManager() {
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    const url = serverUrl.web + '/user/fleetmanager?companyId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId');						
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.fleet = [];
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            this.fleet.push(res[i].fleetManager);
          }
        } else {
          this.fleet = []
        }

      })
  }
  getModelType() {
    const url = serverUrl.web + '/device/assettype?companyId='+localStorage.getItem('corpId')+'&userId='+localStorage.getItem('userName');						
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.vehicleTypes = res;
        //console.log(res);
      })

  }

  async deleteSelectedOperator() {
    //console.log(this.value)
    if (this.value) {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        backdropDismiss: false,
        message: "You want to delete!",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {



          }
        },
        {
          text: 'Ok',
          handler: data => {

            const deleteData = {
              "companyID": localStorage.getItem('corpId'),
              "branchID": localStorage.getItem('corpId'),
              "emailId": localStorage.getItem('userName'),
              "vin": this.value.vin,
              "plateNo": this.value.plateNo,
              "imeiNo": this.value.imeiNo,
              "operatorId": this.value.operator,
              "effFrom": "AM"
            }

            const url = serverUrl.web + '/site/delete/vehicle';
            this.ajaxService.ajaxDeleteWithBody(url, deleteData).subscribe(res => {
              //console.log(res);
              if (res.error.text == "Operator is already Associated") {
                this.commonService.presentToast("Associated operator cannot be deleted")
              } else if (res.error.text == "persisted" || res.statusText == "OK") {
                this.commonService.presentToast("Deleted successfully");
                this.modalController.dismiss();
              }

            })
          }
        }]
      });
      await alert.present();

    }
    else {
      this.commonService.presentToast('Please Select a Row to Delete');
      return "";

    }

  }

  currentLocation(mode) {

    this.geolocation.getCurrentPosition().then((resp) => {
      //console.log(resp)
      this.fleetLogin.patchValue({ assertLocation: resp.coords.latitude + ',' + resp.coords.longitude })
    }).catch((error) => {
      //console.log('Error getting location', error);
    });


  }

  async mapLocation(mode) {
    const modal = await this.modalController.create({
      component: LatLongMapPickerPage,
      componentProps: {
        currentLocation: this.fleetLogin.value.assertLocation != undefined || this.fleetLogin.value.assertLocation != null ? this.fleetLogin.value.assertLocation : ""
      }
    });
    modal.onDidDismiss().then(() => this.mapReturnFunction(mode));
    return await modal.present();
  }

  mapReturnFunction(mode) {
    this.fleetLogin.patchValue({ assertLocation: localStorage.getItem('mapLocationPicker') })
    this.geoFenceForRef = localStorage.latLongPickerGeoFence;
  }
  
  ngOnInit() {

    this.appName = app.appName;
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
    this.companyDetail = {
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    this.getManufactures();
    this.getModels();
    this.getImei();

    if(app.appName == 'Armoron'){
      this.armoronCreateForm();
    }else{
      this.createForm();
    }
    
    this.getOperators();
    // this.editForm();
    this.getModelType();
    this.getFleetManager();
    this.selectedCompany = localStorage.getItem('corpId');
    if (this.value) {
      if (this.value.submit == "available") {
        this.hideSerialNo = false;
        this.loader = true;
        this.serviceName = "available";
        this.selectedVin = this.value.vin;
        for (var i = 0; i < this.value.alerts.length; i++) {
          this.fleetNames += this.value.alerts[i]
        }
        var mileageInit = (this.value.mileageInit).split("-")
        for(var j:any = 0; j < 366; j++){
          this.daysArray.push(j);
          }
          var totalArr = [];
          var todayArr = [];   
          var todayNew = this.value.engineHours.split(":");
          var hoursNew = this.value.totalEngineHours.split(":");
          todayArr.push(todayNew);
          totalArr.push(hoursNew);
  
      
        this.fleetLogin.patchValue({
          plateNo: this.value.plateNo,
          imei: this.value.imeiNo,
          serialNo: "",
          fleetManager: this.value.alerts,
          travelledKm: this.value.odometer,
          vehicleType: this.value.iconUrl,
          assertLocation: this.value.location.split("|")[0],
          assertAddress: this.value.location.split("|")[1],
          manufacture: this.value.make,
          model: this.value.model,
          provider: '',
          cost: mileageInit[2],
          fuelType: mileageInit[1],
          km: mileageInit[0],
          operator: this.value.operator =="-NA-"? "" : this.value.operator ,
          hours:todayArr[0][0],
          minutes:todayArr[0][1],
          seconds:todayArr[0][2],
          days:totalArr[0][0],
          totalhours:totalArr[0][1],
          totalMinutes:totalArr[0][2],
          totalSeconds:totalArr[0][3],
});
        this.formDisplay = true;
        this.editVehType = this.value.type;
        this.editfleet = this.fleetNames;
      }
    }
    if (this.value) {
      this.fleetLogin.patchValue({
        plateNo: this.value.plateNo,
        imei: this.value.imeiNo,
        serialNo: "",
        fleetManager: this.value.alerts,
        travelledKm: this.value.odometer,
        assertLocation: this.value.location.split("|")[0],
        assertAddress: this.value.location.split("|")[1],
        vehicleType: this.value.iconUrl,
        manufacture: '',
        model: this.value.model,
        provider: '',
      });
    }
  }


}
