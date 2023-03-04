import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ExportExcelService } from '../../../services/export-excel.service';
import { app, serverUrl, storageVariable } from 'src/environments/environment';

@Component({
  selector: 'app-fms-reports-form',
  templateUrl: './fms-reports-form.component.html',
  styleUrls: ['./fms-reports-form.component.scss'],
})
export class FmsReportsFormComponent implements OnInit {
  titles = 'jspdf-autotable-demo';
  title = 'angular-export-to-excel';
  myPlatform: any;
  showReport: string;
  head = [];
  exportTitle = [];
  excelTitle = {};
  newTitle = [];
  column = [];
  reportKeys: any;
  reportTitle: string;
  page;
  dataForExcel = [];
  tableData: any;
  reportsData;
  objValues = [];
  odj = [];
  commonData: any;
  temp = 'Temprature report';
  reportData: any;
  routetype: any;
  test: any;
  tripname: any;
  vehicleName: any;
  appName: string;
  tripName: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private ete: ExportExcelService
  ) {

  }
  @Input() shownContent: any;
  @Input() reportName: string;
  @Input() plateNo: string;

  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;

  data = [];
  reports: any;
  reportsContent: any;
  reportsTitle: string;
  liveData: any;
  dashboarData: Array<object>;
  vin: string;
  today = new Date();
  yesterday = new Date(this.today.setDate(this.today.getDate() - 1));
  maxDate;
  segment = "cardView";

  onsubmit() {
    this.showReport = "";
    const body: object = {};
    let mode: string;
    let router: string;
    if (this.reportsTitle == "Executive summary report" || this.reportsTitle == 'Driver behaviour report' || this.reportsTitle == 'Alert report' || this.reportsTitle == "Fuel consumption report") {
      this.vin = "All";
    }

    if (this.vin == undefined) {
      this.commonService.presentToast('Please select the vehicle')
      return null;
    }
    if (this.plateNo !== "null") {
      this.reports.patchValue({ 'plateNo': this.plateNo });
      this.vin = JSON.parse(localStorage.selectedVin).vin;
    } else {
      if (this.reportsTitle == "Executive summary report" || this.reportsTitle == 'Driver behaviour report' || this.reportsTitle == 'Alert report') {
        this.vin = "All";
      }
    }
    switch (this.reportsTitle) {

      case "Overall summary report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data');
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0];
          body["toDate"] = this.reports.value.toDate.split("T")[0];
          body["companyId"] = localStorage.corpId;
          body["userId"] = localStorage.userName;
        //mysql  mode = "/report/executiveSummary";
          mode = "/report/overallSummary";
          router = "overallSummaryReport";
        }
        break;

        case "Engine Hours summary report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "" || this.reports.value.fromTime == "" || this.reports.value.toTime == "") {
          this.commonService.presentToast('Please select the valid data');
          return null;
        } else {
          body["vin"] = this.vin;
          this.commonService.presentLoader();
        }
        body['address'] = this.reports.value.addressCheckbox
        body["fromDate"] = this.reports.value.fromDate.split("T")[0] + " " + this.reports.value.fromTime;
        body["toDate"] = this.reports.value.toDate.split("T")[0] + " " + this.reports.value.toTime;
        mode = "/report/tripBasedSummary"
        router = "tripSummaryReport";
        // this.plateNo = localStorage.selectedVin.plateNo;
        break;
        case "Trip summary report":
          if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "" || this.reports.value.fromTime == "" || this.reports.value.toTime == "") {
            this.commonService.presentToast('Please select the valid data');
            return null;
          } else {
            body["vin"] = this.vin;
            this.commonService.presentLoader();
          }
          body['address'] = this.reports.value.addressCheckbox
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + " " + this.reports.value.fromTime;
          body["toDate"] = this.reports.value.toDate.split("T")[0] + " " + this.reports.value.toTime;
          mode = "/report/tripBasedSummary"
          router = "tripSummaryReport";
          break;
      case "Executive summary report":

        if (this.vin == undefined || this.reports.value.fromDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0];
          body["toDate"] = this.reports.value.fromDate.split("T")[0];
          body["companyId"] = localStorage.corpId;
          body["userId"] = localStorage.userName;
          mode = "/report/executiveSummary";
          router = "executiveSummaryReport";
        }
        break;

      case "Driver behaviour report":
        if (this.vin == undefined || this.reports.value.fromDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0];
          body["toDate"] = this.reports.value.fromDate.split("T")[0];
          body["companyId"] = localStorage.corpId;
          body["userId"] = localStorage.userName;
          mode = "/report/driverBehaviour";
          router = "driverBehavior";
        }
        break;

      case "Status summary report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0];
          body["toDate"] = this.reports.value.toDate.split("T")[0];
          body["companyId"] = localStorage.corpId;
          body["userId"] = localStorage.userName;
          body["branchId"] = localStorage.corpId;
          body["showAddress"] = "false";
          body["currentDate"] = "No";
          mode = "/report/statussummary";
          router = "statusSummary";
        }
        break;

      case "Alert report":
        if (this.reports.value.fromDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["fromDate"] = this.reports.value.fromDate.split("T")[0];
          body["toDate"] = this.reports.value.fromDate.split("T")[0];
          body["userId"] = localStorage.userName;
          body["address"] = false;
          body["vin"] = this.vin
          mode = "/alert/mobileAlert";
          router = "alertReport";
        }
        break;

      case "Overspeed duration report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fdate"] = this.reports.value.fromDate.split("T")[0];
          body["tdate"] = this.reports.value.toDate.split("T")[0];
          body["userID"] = localStorage.userName;
          mode = "/report/overspeed";
          router = "overspeedReport";
        }
        break;

      case "Speed report":
        if (this.vin == undefined || this.reports.value.fromDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00 AM';
          body["toDate"] = this.reports.value.fromDate.split("T")[0] + ' 11:59:59 PM';
          body["userId"] = localStorage.userName;
          body['speed'] = this.reports.value.speed.toString();
          if (this.reports.value.condition == "") {
            body['condition'] = '<';
          } else {
            body['condition'] = this.reports.value.condition;
          }
          //%7B"vin":"art630","fromDate":"2020-02-15%2000:00:00%20AM","toDate":"2020-02-15%2011:59:59%20PM","userId":"art-ca","speed":"0","condition":">"%7D
          mode = "/device/speedreport";
          router = "speedReport";
        }
        break;

      case "Movement report":
        if (this.vin == undefined || this.reports.value.fromDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + "00:00:00";
          body["toDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + "23:59:59";
          body["userID"] = localStorage.userName;
          body["branchID"] = localStorage.corpId;
          body["companyID"] = localStorage.corpId;
          body['seconds'] = this.reports.value.timeExceed;
          body['showAddress'] = "True";
          body['newreport'] = "";
          mode = "/report/movement";
          router = "movementReport";
        }
        break;

      case "Temperature report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00';
          body["toDate"] = this.reports.value.toDate.split("T")[0] + ' 23:59:59';
          body["userId"] = localStorage.userName;
          body["branchId"] = localStorage.corpId;
          body["companyId"] = localStorage.corpId;
          body["tempType"] = this.reports.value.sensorType;
          body["errorCode"] = "{}";
          body["tempSign"] = this.reports.value.condition;
          body['tempValue'] = this.reports.value.limit.toString();
          body['seconds'] = this.reports.value.timeExceed;
          body['newreport'] = "";
          // body['mode'] = app.entryPoint =='TTS'?"BASIC" : JSON.parse(localStorage.dashboardData)["liveDatas"][this.vin]["model"]
          body['mode'] = 'BASIC'
          mode = "/report/temperature";
          router = "temprature";
        }
        break;
      case "Door open report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          body["vin"] = this.vin;
          this.commonService.presentLoader();
        }
        body["companyId"] = localStorage.corpId
        body["userId"] = localStorage.userName
        body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00';
        body["toDate"] = this.reports.value.toDate.split("T")[0] + ' 23:59:59';
        mode = "/report/dooropen";
        router = "doorOpenReport";
        break;
      case "Door summary report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          body["vin"] = this.vin;
          this.commonService.presentLoader();
        }
        body["companyId"] = localStorage.corpId
        body["userId"] = localStorage.userName
        body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00';
        body["toDate"] = this.reports.value.toDate.split("T")[0] + ' 23:59:59';
        mode = "/report/dooropen";
        router = "doorSummaryReport";
        break;

      case "Door count report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = "All";
          body["companyId"] = localStorage.corpId
          body["userId"] = localStorage.userName
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00';
          body["toDate"] = this.reports.value.toDate.split("T")[0] + ' 23:59:59';
          mode = "/report/dooropen/count";
          router = "doorCountReport";
        }
        break;

      case "Alarm report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["companyId"] = localStorage.corpId
          body["userId"] = localStorage.userName
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00';
          body["toDate"] = this.reports.value.toDate.split("T")[0] + ' 23:59:59';
          mode = "/report/alarmsummary";
          router = "alarmreport";
        }
        break;

      case "Fuel consumption report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["companyId"] = localStorage.corpId
          body["userId"] = localStorage.userName
          body["fromDate"] = this.reports.value.fromDate.split("T")[0];
          body["toDate"] = this.reports.value.toDate.split("T")[0];
          mode = "/sensor/getfuelconsumptionreport";
          router = "fuelreport";
        }
        break;

      case "Odometer report":
        if (this.vin == undefined) {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          mode = "/report/weekodometer";
          router = "weekodometerreport";
        }
        break;

      case "Student Alert Report":
        if (this.reports.value.fromDate == undefined || this.reports.value.fromDate == '' || this.reports.value.toDate == undefined || this.reports.value.toDate == '') {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["fromDate"] = this.reports.value.fromDate.split("T")[0]+" "+"00:00:00";
          body["toDate"] = this.reports.value.toDate.split("T")[0]+" "+"23:59:59";
          body["companyId"] = localStorage.corpId;
          body['routeType'] = this.reports.value.routetype;
          mode = "/report/studentAlertReport";
          router = "studentreport";
        }
        break;

      case "Attendance report":
        if (this.reports.value.date == undefined || this.reports.value.date == '') {
          this.commonService.presentToast('Please select the Date')
        }
        else {
          this.commonService.presentLoader();
          body["vin"] = "All";
          body["date"] = this.reports.value.date.split("T")[0];
          body["companyId"] = localStorage.corpId;
          body["branchId"] = localStorage.corpId;
          mode = "/report/attendenceReport";
          router = "attendancereport";
        }
        break;

      case "Ac Report":
        if (this.vin == undefined || this.reports.value.fromDate == "" || this.reports.value.toDate == "" || this.reports.value.fromTime == "" || this.reports.value.toTime == "") {
          this.commonService.presentToast('Please select the valid data')
          return null;
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.vin;
          body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + this.reports.value.fromTime;
          body["toDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + this.reports.value.toTime;
          body["userID"] = localStorage.userName;
          body["branchID"] = localStorage.corpId;
          body["companyID"] = localStorage.corpId;
          mode = "/sensor/getairconditionerreport";
          router = "acreport";
        }
        break;
        
        case "Fms Trip Report":
          if (this.reports.value.vin == undefined || this.reports.value.vin == "" || this.reports.value.tripname == "" || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
            this.commonService.presentToast('Please select the valid data')
          } else {
          this.commonService.presentLoader();
          body["vin"] = this.reports.value.vin;
          body["tripName"] = this.reports.value.tripname;
          body["fromdate"] = this.reports.value.fromDate;
          body["todate"] = this.reports.value.toDate;
          body["companyid"] = localStorage.corpId;
          mode = "/report/getFmsTripSearch";
          router = "fmstripReport";
        }
        break;
    
        case "Income and Expense Report":
        if (this.reports.value.vin == undefined || this.reports.value.vin == "" || this.reports.value.tripname == "" || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
          this.commonService.presentToast('Please select the valid data')
        } else {
          this.commonService.presentLoader();
          body["vin"] = this.reports.value.vin;
          body["tripName"] = this.reports.value.tripname;
          body["fromtransactionDate"] = this.reports.value.fromDate;
          body["totransactionDate"] = this.reports.value.toDate;
          body ["transaction"] = "";
          body["companyid"] = localStorage.corpId;
          mode = "/report/getFmsIncomeAndExpenseSearch";
          router = "income&expensereport";
        }
        break;

        case "Income and Expense Group Report":
        if (this.reports.value.vin == undefined || this.reports.value.vin == "" || this.reports.value.tripname == "" || this.reports.value.fromDate == "" || this.reports.value.toDate == "") {
this.commonService.presentToast('Please select the valid data')
        } else {
         this.commonService.presentLoader();
          body["vin"] = this.reports.value.vin;
          body["tripName"] = this.reports.value.tripname;
          body["startDate"] = this.reports.value.fromDate;
          body["endDate"] = this.reports.value.toDate;
          body ["transaction"] = "";
          body["companyid"] = localStorage.corpId;
          mode = "/report/getFmsIncomeAndExpenseGroupSearch";
          router = "income&expensegroupreport";
        }
        break;

    }

    this.ajaxService.ajaxReportServices(mode, body, router, this.successCallback,);
    // this.router.navigateByUrl("reports/All/fuelreport");
    // this.getBack();
  }

  // async armoronOdometer() {
  //   this.getBack();
  //   const modal = await this.modalController.create({
  //     component: WeekOdometerComponent
  //   });
  //   return await modal.present();
  // }

  successCallback = (res: any, outputRouter: string) => {
    this.segment = "cardView";
    if (res == undefined) {
      this.ajaxService.ajaxGetWithString(serverUrl.web + "/login/test")
        .subscribe(res => {
          if (res == '["Hi Web....!"]')
            console.log("server run")
          else {
            this.commonService.dismissLoader();
            this.commonService.presentAlert("Server maintanance error", "Sorry for the inconvenience please try after some times");
          }
        })

    } else {
      let validation: boolean = false;
      if (outputRouter != "studentreport" && typeof (res) == "object" && Object.keys(res).length > 0 && !Array.isArray(res)) {
        if (outputRouter == "overallSummaryReport") {
          for (let i = 0; i < res.summary.length; i++) {
            if (res.summary[i]["duration"] !== "0:00:00:00") {
              validation = true;
              break;
            }
          }
        }
      } else if (outputRouter == "studentreport"  ||  res.length > 0) {
        validation = true;
        this.objValues = res;
        this.odj.length = 0;
        if(outputRouter != "studentreport"){
          this.objValues.sort((a, b) => (a.timeStamp - b.timeStamp))
        }else if(outputRouter == "studentreport"){
           this.objValues = res.data
           localStorage.setItem("reportsHeaders",JSON.stringify(this.head))
        }
    
        ////console.log(this.objValues, res);
        if (this.myPlatform == 'desktop') {
          for (let i = 0; i < this.objValues.length; i++) {
            if (this.reportsTitle == "Movement report") {
              this.head = ['Plate No', 'Speed', 'Status', 'Time', 'Operator Name', 'Address'];
              this.excelTitle = {
                'Plate No': 0, 'Speed': 1, 'Status': 2, 'Time': 3, 'Operator Name': 4,
                'Address': 5
              }
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].speed,
              this.objValues[i].status, this.objValues[i].timeStamp, this.objValues[i].operatorName,
              this.objValues[i].emailAddress])
              //////console.log(this.odj, "----------Odj", this.head);
            } else if (this.reportsTitle == "Overall summary report") {

              this.excelTitle = {
                'Plate No': 0, 'Begin': 1, 'Begin Location': 2, 'End Time': 3, 'End Location': 4,
                'Max Speed': 5, 'Odometer': 6, 'Running': 7, 'Stop': 8, 'Towed': 9
              }

              this.head = ['Plate No', 'Begin', 'Begin Location', 'End Time', 'End Location', 'Max Speed', 'Odometer', 'Running', 'Stop', 'Towed'];

              this.odj.push([this.objValues[i].plateNo, this.objValues[i].begin,
              this.objValues[i].beginLocation, this.objValues[i].end, this.objValues[i].endLocation,
              this.objValues[i].maxSpeed, this.objValues[i].odometer, this.objValues[i].runningDuration,
              this.objValues[i].stopDuration, this.objValues[i].towedDuration])
              //////console.log(this.odj, "----------Odj")

            } else if (this.reportsTitle == "Trip summary report") {
              this.head = ['Plate no', 'Start time', 'Start location', 'End time', 'End location', 'Odometer', 'Running', 'Idle'];
              this.excelTitle = { 'Plate no': 0, 'Start time': 1, 'Start location': 2, 'End time': 3, 'End location': 4, 'Odometer': 5, 'Running': 6, 'Idle': 7 }
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].startTime, this.objValues[i].startAddress, this.objValues[i].endTime, this.objValues[i].stopAddress, this.objValues[i].odometer,
              this.objValues[i].runningDuration, this.objValues[i].idleDuration])
              //////console.log(this.odj, "----------Odj")

            }else if (this.reportsTitle == "Engine Hours summary report") {
              this.head = ['Plate no', 'Start time', 'Start location', 'End time', 'End location', 'Odometer', 'Running', 'Idle'];
              this.excelTitle = { 'Plate no': 0, 'Start time': 1, 'Start location': 2, 'End time': 3, 'End location': 4, 'Odometer': 5, 'Running': 6, 'Idle': 7 }
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].startTime, this.objValues[i].startAddress, this.objValues[i].endTime, this.objValues[i].stopAddress, this.objValues[i].odometer,
              this.objValues[i].runningDuration, this.objValues[i].idleDuration])
              //////console.log(this.odj, "----------Odj")

            }
            else if (this.reportsTitle == "Executive summary report") {
              this.excelTitle = {
                'Plate No': 0, 'Begin': 1, 'Begin Location': 2, 'End Time': 3, 'End Location': 4,
                'Max Speed': 5, 'Odometer': 6, 'Running': 7, 'Stop': 8, 'Towed': 9
              }
              this.head = ['Plate No', 'Begin', 'Begin Location', 'End Time', 'End Location', 'Max Speed', 'Odometer', 'Running', 'Stop', 'Towed'];
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].begin,
              this.objValues[i].beginLocation, this.objValues[i].end, this.objValues[i].endLocation,
              this.objValues[i].maxSpeed, this.objValues[i].odometer, this.objValues[i].runningDuration,
              this.objValues[i].stopDuration, this.objValues[i].towedDuration])
              //////console.log(this.odj, "----------Odj");
            }
            else if (this.reportsTitle == "Driver behaviour report") {
              this.head = ['Plate No', 'Driver Name', 'Engine On', 'Idle', 'Running', 'Top Speed', 'Harsh Acceleration', 'Harsh Break', 'Tilt', 'AvgSpeed', 'Distance Travelled',
                'Fuel Consumption', 'Over All Score'];

              this.excelTitle = {
                'Plate No': 0, 'Driver Name': 1, 'Engine On': 2, 'Idle': 3, 'Running': 4, 'Top Speed': 5, 'Harsh Acceleration': 6, 'Harsh Break': 7, 'Tilt': 8, 'AvgSpeed': 9, 'Distance Travelled': 10,
                'Fuel Consumption': 11, 'Over All Score': 12
              }
              this.odj.push([
                this.objValues[i].plateNo,
                this.objValues[i].driverName,
                this.objValues[i].engineOnDuration,
                this.objValues[i].excessiveIdling,
                this.objValues[i].runningDuration,
                this.objValues[i].topSpeed,
                this.objValues[i].HARSHACCELERATION,
                this.objValues[i].HARSHBRAKING,
                this.objValues[i].TILT,
                this.objValues[i].avgSpeed,
                this.objValues[i].distanceTravelled,
                this.objValues[i].fuelConsumption,
                this.objValues[i].overAllScore

              ])
              //////console.log(this.odj, "----------Odj");
            }

            else if (this.reportsTitle == "Speed report") {

              this.head = ['Plate No', 'Speed', 'Time', 'Date', 'Operator', 'Limit Exceeds'];
              this.excelTitle = { 'Plate No': 0, 'Speed': 1, 'Time': 2, 'Date': 3, 'Operator': 4, 'Limit Exceeds': 5 }
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].speed,
              this.objValues[i].timeStamp, this.objValues[i].dateStamp, this.objValues[i].operator,
              this.objValues[i].descripition])
              //////console.log(this.odj, "----------Odj");
            }
            else if (this.reportsTitle == "Status summary report") {
              this.head = ['Plate No', 'Odometer', 'Begin', 'Begin At', 'End Time', 'End At', 'Stop', 'Running', 'Towed', 'Idle'];
              this.excelTitle = { 'Plate No': 0, 'Odometer': 1, 'Begin': 2, 'Begin At': 3, 'End Time': 4, 'End At': 5, 'Stop': 6, 'Running': 7, 'Towed': 8, 'Idle': 9 }
              this.odj.push([this.objValues[i]['Plate No'], this.objValues[i].Odometer, this.objValues[i].Begin, this.objValues[i]['Begin At'],
              this.objValues[i].End, this.objValues[i]['End At'], this.objValues[i].Stop, this.objValues[i].Towed,
              this.objValues[i].Running, this.objValues[i].Idle])
              //////console.log(this.odj, "----------Odj");
            }
            else if (this.reportsTitle == "Alert report") {
              this.head = ['Plate No', 'Operator Name', 'Alert Types', 'Date & Time'];
              this.excelTitle = { 'Plate No': 0, 'Operator Name': 1, 'Alert Types': 2, 'Date & Time': 3 }
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].operatorName,
              this.objValues[i].alertTypes, this.objValues[i].timeStamp])
              //////console.log(this.odj, "----------Odj");
            }

            else if (this.reportsTitle == "Overspeed duration report") {
              this.head = ['Plate No', 'Over Speed Duration', 'Start Time', 'End Time', 'Min Speed', 'Max Speed', 'Avg Speed',];
              this.excelTitle = {
                'Plate No': 0, 'Over Speed Duration': 1, 'Start Time': 2, 'End Time': 3, 'Min Speed': 5, 'Max Speed': 6, 'Avg Speed': 7
              }

              this.odj.push([this.objValues[i].plateNo, this.objValues[i].duration, this.objValues[i].start, this.objValues[i].end, this.objValues[i].min,
              this.objValues[i].max, this.objValues[i].avg])
              //////console.log(this.odj, "----------Odj");
            } else if (this.reportsTitle == "Temperature report") {
              this.head = [];
              this.excelTitle = {}
              if (this.objValues[i].TEMPERATURESENSOR4) {
                this.head = ['Plate No', 'Timestamp', 'Temprature Sensor 1', 'Temprature Sensor 2', 'Temprature Sensor 3', 'Temprature Sensor 4']
                this.excelTitle = {
                  'Plate No': 0, 'Timestamp': 1, 'Temprature Sensor 1': 2, 'Temprature Sensor 2': 3, 'Temprature Sensor 3': 4,
                  'Temprature Sensor 4': 5
                }
                this.odj.push([this.objValues[i].PlateNo, this.objValues[i].TimeStamp,
                "Name:" + this.objValues[i].TEMPERATURESENSOR1.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR1.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR1.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR1value,
                "Name:" + this.objValues[i].TEMPERATURESENSOR2.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR2.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR2.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR2value,
                "Name:" + this.objValues[i].TEMPERATURESENSOR3.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR3.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR3.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR3value,
                "Name:" + this.objValues[i].TEMPERATURESENSOR4.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR4.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR4.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR4value])
              } else if (this.objValues[i].TEMPERATURESENSOR3) {
                this.head = ['Plate No', 'Timestamp', 'Temprature Sensor 1', 'Temprature Sensor 2', 'Temprature Sensor 3']
                this.excelTitle = {
                  'Plate No': 0, 'Timestamp': 1, 'Temprature Sensor 1': 2, 'Temprature Sensor 2': 3, 'Temprature Sensor 3': 4
                }
                this.odj.push([this.objValues[i].PlateNo, this.objValues[i].TimeStamp,
                "Name:" + this.objValues[i].TEMPERATURESENSOR1.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR1.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR1.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR1value,
                "Name:" + this.objValues[i].TEMPERATURESENSOR2.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR2.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR2.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR2value,
                "Name:" + this.objValues[i].TEMPERATURESENSOR3.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR3.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR3.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR3value])
              } else if (this.objValues[i].TEMPERATURESENSOR2) {
                this.excelTitle = {
                  'Plate No': 0, 'Timestamp': 1, 'Temprature Sensor 1': 2, 'Temprature Sensor 2': 3
                }
                this.head = ['Plate No', 'Timestamp', 'Temprature Sensor 1', 'Temprature Sensor 2']
                this.odj.push([this.objValues[i].PlateNo, this.objValues[i].TimeStamp,
                "Name:" + this.objValues[i].TEMPERATURESENSOR1.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR1.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR1.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR1value,
                "Name:" + this.objValues[i].TEMPERATURESENSOR2.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR2.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR2.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR2value])
              } else if (this.objValues[i].TEMPERATURESENSOR1) {
                this.excelTitle = {
                  'Plate No': 0, 'Timestamp': 1, 'Temprature Sensor 1': 2
                }
                this.head = ['Plate No', 'Timestamp', 'Temprature Sensor 1']
                this.odj.push([this.objValues[i].PlateNo, this.objValues[i].TimeStamp,
                "Name:" + this.objValues[i].TEMPERATURESENSOR1.name + ", Min:" + this.objValues[i].TEMPERATURESENSOR1.min + ", Max:" + this.objValues[i].TEMPERATURESENSOR1.max + ", Value:" + this.objValues[i].TEMPERATURESENSOR1value]);
              }
              //////console.log(this.odj, "----------Odj");

            } else if (this.reportsTitle == "Door open report") {
              this.head = ['Plate No', "Timestamp"];
              this.excelTitle = {
                'Plate No': 0, 'Timestamp': 1
              };
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].timeStamp])
              //////console.log(this.odj, "----------Odj");

            } else if (this.reportsTitle == "Door summary report") {
              this.head = ['Plate No', "Door Status", "Time Duration", "Start Time", "End Time"];
              this.excelTitle = {
                'Plate No': 0, "Door Status": 1, "Time Duration": 2, "Start Time": 3, "End Time": 4
              };
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].DoorStatus, this.objValues[i].timeDuration,
              this.objValues[i].startTimeStamp, this.objValues[i].endTimeStamp])
              //////console.log(this.odj, "----------Odj");
            }
            else if (this.reportsTitle == "Door count report") {
              this.head = ['Plate No', "Door Open Count"];
              this.excelTitle = {
                'Plate No': 0, "Door Open Count": 1
              };
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].count])
              //////console.log(this.odj, "----------Odj");
            }
            else if (this.reportsTitle == "Alarm report") {
              this.head = ['Plate No', "Alert Type", "Status", "Start Time", "End Time", "Time Duration"];
              this.excelTitle = {
                'Plate No': 0, "Alert Type": 1, "Status": 2, "Start Time": 3, "End Time": 4, "Time Duration": 5
              };
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].AlertType, this.objValues[i].status,
              this.objValues[i].startTime, this.objValues[i].endTime, this.objValues[i].duration])
              //////console.log(this.odj, "----------Odj");
            }
            else if (this.reportsTitle == "Fuel consumption report") {
              this.head = ['Plate No', "Date","Begin Location","End Location","Consume price", "Odometer", "Fuel type", "Price", "Consume quantity", "Mileage"];
              this.excelTitle = {
                'Plate No': 0, "Date": 1,"Begin Location": 2,"End Location": 3, "Consume price": 4, "Odometer": 5, "Fuel type": 6, "Price": 7, "Consume quantity": 8, "Mileage": 9
              };
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].date, this.objValues[i].beginLocation, this.objValues[i].endLocation, this.objValues[i].consumePrice,
              this.objValues[i].odometer, this.objValues[i].fuelType, this.objValues[i].price,
              this.objValues[i].consumeQuantity, this.objValues[i].mileage])
              //////console.log(this.odj, "----------Odj");
            } else if (this.reportsTitle == "Primitive maintanance report") {
              this.head = ['Plate No', "Odometer", "Last maintanance", "Last maintenance time", "Due kilometer", "Status"];
              this.excelTitle = {
                'Plate No': 0, "Odometer": 1, "Last maintanance": 2, "Last maintenance time": 3, "Due kilometer": 4, "Status": 5
              };
              this.odj.push([this.objValues[i].plateno, this.objValues[i].currentOdometer, this.objValues[i].lastmaintenance,
              this.objValues[i].lastmaintenancetime, this.objValues[i].duekilometer, this.objValues[i].status])
            } else if (this.reportsTitle == "Student Alert Report") {
              this.head = res.header;
             
              let arr=[]
              this.head.map(element => {
                if(element != 'ContactNo' || element != 'StudentName')
                arr.push(this.objValues[i][element])
              });
              this.odj.push([this.objValues[i].StudentName, this.objValues[i].ContactNo].concat(arr))
            } else if (this.reportsTitle == "Attendance report") {
              this.head = ['Roll No', "First Name", "Class", "Section", "Status"];
              this.odj.push([this.objValues[i].plateno, this.objValues[i].currentOdometer, this.objValues[i].lastmaintenance,
              this.objValues[i].lastmaintenancetime, this.objValues[i].duekilometer, this.objValues[i].status])
            } else if (this.reportsTitle == "Ac Report") {
              this.head = ['Plate No', "From Time", "To Time", "Duration"];
              this.excelTitle = {
                'Plate No': 0, "From Time": 1, "To Time": 2, "Duration": 3
              };
              this.odj.push([this.objValues[i].plateNo, this.objValues[i].from, this.objValues[i].to,
              this.objValues[i].duration])
            } else if (this.reportsTitle == "Attendance report") {
              this.head = ['Roll No', "First Name", "Class", "Section", "Status"];
              this.odj.push([this.objValues[i].rollNo, this.objValues[i].firstName, this.objValues[i].classId,
              this.objValues[i].sectionId, this.objValues[i].mode])
            }
            else if (this.reportsTitle == "Fms Trip Report") {
              this.head = ['Vehicle No', "Start Location", "Start Date", "Start Time", "End Location","End Date","End Time","Total Duration","Total Distance"];
              this.excelTitle = {
              'Vehicle No': 0, "Start Location": 1, "Start Date": 2, "Start Time": 3,"End Location":4,"End Date":5,"End Time":6,"Total Duration":7,"Total Distance":8
              };
              this.odj.push([this.objValues[i].vin, this.objValues[i].startlocation, this.objValues[i].startdate,
              this.objValues[i].starttime, this.objValues[i].endlocation, this.objValues[i].enddate,
              this.objValues[i].endtime, this.objValues[i].duration, this.objValues[i].distance])
              }               else if (this.reportsTitle == "Income and Expense Report") {	
                this.head = ['Reg No', "Driver Name", "Start Date", "Start Time","End Date","End Time", "Trip Name","Total Income","Total Expense","Amout Remained"];	
                this.excelTitle = {	
                   'Reg No': 0, "Driver Name": 1, "Start Date": 2,"Start Time":3,"End Date":4,"End Time":5, "Trip Name": 6,"Total Income":7,"Total Expense":8,"Amout Remained":9	
                  };                	
                this.odj.push([this.objValues[i].PlateNo, this.objValues[i].Driver, this.objValues[i].StartDate,this.objValues[i].StartTime,	
                  this.objValues[i].EndDate,this.objValues[i].EndTime,this.objValues[i].tripname,this.objValues[i].Total.TotalIncome, this.objValues[i].Total.TotalExpense, this.objValues[i].Total.AmountRemained])	
                }	
                else if (this.reportsTitle == "Income and Expense Group Report") {	
                this.head = ["Total Income","Total Expense","Amout Remained"];	
                this.excelTitle = {	
                  "Total Income":0,"Total Expense":1,"Amout Remained":2	
                 };	
                this.odj.push([this.objValues[1].Income, this.objValues[1].Expense, 	
                this.objValues[1].Profit])	
               }
                }
          if(this.reportsTitle == "Student Alert Report"){
            localStorage.setItem("studentReportsData",JSON.stringify(this.odj))
          }
        }
      }
      if (validation) {
        if(this.reportsTitle != "Movement report"){
          localStorage.setItem('reportsData', JSON.stringify(res));
         } 
       
        this.test = res;
        if (this.myPlatform != 'desktop') {
          this.router.navigateByUrl("reports/" + this.plateNo + "/" + outputRouter,  { state: { data: res }});
          this.getBack();
        } else {
          this.showReport = outputRouter;
        }
      } else {
        this.commonService.presentToast('No data available');
      }
    }
    this.commonService.dismissLoader();
  }

  getBack() {
    this.modalController.dismiss();
  }
  portChange = (event: {
    component: IonicSelectableComponent,
    value: any
  }) => {
    if(event.value.vin)
    this.vin = event.value.vin; 
    else 
    this.vin = event.value
    var url = serverUrl.fmsUrl +'/trip/getFmsTrip?companyid='+localStorage.getItem('corpId')+'&vin='+this.reports.value.vin;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.tripname = res;
        this.tripName = res;
      })
    }
    porttrip = (event: {
      component: IonicSelectableComponent,
      value: any
    }) => {
      if(event.value)
      this.tripname = event.value;
      if(this.tripname == 0){
        this.commonService.presentToast('No Trip Found')
      }
      else{
        this.tripname
      }
      }   
    
  ngOnChanges() {
    this.showReport = "";
    this.segment = "cardView";
    this.vin = undefined;
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }

    this.maxDate = this.today.getFullYear() + "-";	
    this.maxDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";	
    this.maxDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();
    let loopArray = []
    if(app.appName != 'FMS'){
      this.liveData = storageVariable.dashboardData.liveDatas;
      this.dashboarData = Object.values(this.liveData);
     
    for (let i = 0; i < this.dashboarData.length; i++) {
      let loopData: any = this.dashboarData[i];
      if (loopData.warrantyExpiry == true) {
        loopArray.push(loopData)
      }
    }
     }  
  
    
    this.data = loopArray
    this.reportsContent = {
      plateNo: false,
      fromDate: false,
      fromTime: false,
      toDate: false,
      toTime: false,
      speed: false,
      condition: false,
      timeExceed: false,
      sensor: false,
      addressCheckbox: false,
      odometerWeek: false,
      date: false,
      routetype: false,
       vin: false,
       tripname: false
    };
    this.reportsTitle = this.reportName;
    if (this.myPlatform == "desktop" && this.shownContent == undefined) {
      this.reportsTitle = "Overall summary report";
      this.shownContent = {
        fromDate: true,
        toDate: true,
      }
    }
    Object.assign(this.reportsContent, this.shownContent)
    this.reports = this.formBuilder.group({
      plateNo: [''],
      fromDate: [''],
      fromTime: ['00:00:00'],
      // fromTime: [this.yesterday.toTimeString().split(" ")[0]],
      toDate: [''],
      toTime: [this.today.toTimeString().split(" ")[0]],
      speed: ['50', Validators.max(100)],
      condition: ['>'],
      timeExceed: ['900'],
      sensor: ["2"],
      limit: ["2"],
      sensorType: ["TEMP1"],
      addressCheckbox: ['false'],
      odometerWeek: [""],
      date: [''],
      routetype: ['BUS-Z'],
       vin:[''],
       tripname: ['']
    });
    if (this.plateNo !== "null") {
      this.reports.patchValue({ 'plateNo': this.plateNo });
      this.vin = JSON.parse(localStorage.selectedVin).vin;
    } else {
      if (this.reportsTitle == "Executive summary report" || this.reportsTitle == 'Driver behaviour report' || this.reportsTitle == 'Door count report' || this.reportsTitle == 'Fuel consumption report' || this.reportsTitle == 'Alert report' || this.reportsTitle == 'Student Alert Report' || this.reportsTitle == 'Attendance report') {
        this.vin = "All";
      }
    }
    if (this.reportsTitle == "Alarm report" || this.reportsTitle == "Temperature report" || this.reportsTitle == "Door open report" || this.reportsTitle == "Door summary report" || this.reportsTitle == "Door count report" || this.reportsTitle == "Alarm report") {
      let today = new Date();
      this.maxDate = today.getFullYear() + "-";
      this.maxDate += (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()) + "-";
      this.maxDate += today.getDate() < 10 ? "0" + today.getDate().toString() : today.getDate().toString();
    }
    this.tableData = JSON.parse(localStorage.getItem('reportsData'));
    this.objValues = this.tableData;
    this.odj.length = 0;
    this.getData();
    //////console.log(this.odj, this.head);
  }

  // exportToExcel() {
  //   let reportData = {
  //     title: 'Reports',
  //     data: this.odj,
  //     headers: Object.keys(this.excelTitle)
  //   }
  //   this.ete.exportExcel(reportData);
  //   ////console.log("Export Excel")
  // }
  exportToExcel() {
    let reportData = {
      title: this.reportsTitle,
      data: Object.values(this.odj),
      headers: Object.keys(this.excelTitle)
    }
    this.ete.exportExcel(reportData);
    ////console.log("Export Excel")
  }
  createPdf() {

    this.commonService.createPdf(this.head, this.odj, this.reportsTitle, this.myPlatform, this.reportsTitle)
  }
  ngAfterViewInit() {
  }
  getData() {
    this.tableData = JSON.parse(localStorage.getItem('reportsData'));
    this.tableData = this.objValues;
  }

  getRoutetype() {
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    var url = serverUrl.web + `/routetrip/getRoutename?compId=${companyDetail.companyID}&branchId=${companyDetail.branchID}`;
    this.ajaxService.ajaxGet(url).subscribe(res => {
      console.log(res)
      this.routetype = res;
    })

  }

  getvehicletype() {
    var url= serverUrl.fmsUrl +'/dashboard/getVehicleList?companyid='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGet(url).subscribe(res => {
      console.log(res)
      this.vehicleName = res;
      this.vin = res;
    })

  }

  
  ngOnInit() {
    // this.vin = undefined;
    // localStorage.removeItem('reportsData')
    this.appName = app.appName;
    this.odj = [];
    this.getData();
    this.getRoutetype()
    this.page = localStorage.getItem('pageSelector');
     this.getvehicletype()

  }

}
