import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';
//import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.page.html',
  styleUrls: ['./reports-form.page.scss'],
})
// const customPopoverOptions = {
//   header: 'Select Device',
//   message: 'Only select Device'
// };
export class ReportsFormPage implements OnInit {
constructor(){

}
ngOnInit(){
  
}
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private modalController: ModalController,
  //   private ajaxService: AjaxService,
  //   private router: Router,
  //   private activatedRoute: ActivatedRoute,
  //   private commonService: CommonService,
  // ) {

  // }
  // @Input() shownContent: any;
  // @Input() reportName: string;
  // @Input() plateNo: string;

  // @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;

  // data = [];
  // reports: any;
  // reportsContent: any;
  // reportsTitle: string;
  // liveData: any;
  // dashboarData: Array<object>;
  // vin: string;
  // today = new Date();
  // yesterday = new Date(this.today.setDate(this.today.getDate() - 1));
  // maxDate;
  // onsubmit() {
  //   const body: object = {};
  //   let mode: string;
  //   let router: string;
  //   switch (this.reportsTitle) {
  //     case "Overall summary report":
  //       if (this.vin == undefined) {
  //         this.commonService.presentToast('Please select the vehicle')
  //       } else {
  //         this.commonService.presentLoader();
  //         body["vin"] = this.vin;
  //         body["fromDate"] = this.reports.value.fromDate.split("T")[0];
  //         body["toDate"] = this.reports.value.toDate.split("T")[0];
  //         body["companyId"] = localStorage.corpId;
  //         body["userId"] = localStorage.userName;
  //         mode = "/api/vts/company/assets/report/executiveSummary";
  //         router = "overallSummaryReport";
  //       }
  //       // body["fromDate"] = this.reports.value.fromDate.split("T")[0];
  //       // body["toDate"] = this.reports.value.toDate.split("T")[0];
  //       // mode = "/api/vts/company/assets/report/overAllSummary";
  //       // router = "overallSummaryReport";
  //       break;

  //     case "Trip summary report":
  //       if (this.vin == undefined) {
  //         this.commonService.presentToast('Please select the vehicle')
  //       } else {
  //         body["vin"] = this.vin;
  //         this.commonService.presentLoader();
  //       }
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0] + " " + this.reports.value.fromTime;
  //       body["toDate"] = this.reports.value.toDate.split("T")[0] + " " + this.reports.value.toTime;
  //       mode = "/api/vts/company/assets/report/tripBasedSummary";
  //       router = "tripSummaryReport";
  //       break;

  //     case "Executive summary report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0];
  //       body["toDate"] = this.reports.value.fromDate.split("T")[0];
  //       body["companyId"] = localStorage.corpId;
  //       body["userId"] = localStorage.userName;
  //       mode = "/api/vts/company/assets/report/executiveSummary";
  //       router = "executiveSummaryReport";
  //       break;

  //     case "Driver behaviour report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0];
  //       body["toDate"] = this.reports.value.fromDate.split("T")[0];
  //       body["companyId"] = localStorage.corpId;
  //       body["userId"] = localStorage.userName;
  //       mode = "/api/vts/company/assets/report/driverBehaviour";
  //       router = "driverBehavior";
  //       break;

  //     case "Status summary report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fromdata"] = this.reports.value.fromDate.split("T")[0];
  //       body["todate"] = this.reports.value.toDate.split("T")[0];
  //       body["companyID"] = localStorage.corpId;
  //       body["userID"] = localStorage.userName;
  //       body["branchID"] = localStorage.corpId;
  //       body["showAddress"] = "false";
  //       body["currentDate"] = "No";
  //       mode = "/api/vts/company/assets/report/statussummary";
  //       router = "statusSummary";
  //       break;

  //     case "Alert report":
  //       this.commonService.presentLoader();
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0];
  //       body["toDate"] = this.reports.value.fromDate.split("T")[0];
  //       body["userId"] = localStorage.userName;
  //       body["address"] = false;
  //       body["vin"] = "All"
  //       mode = "/api/vts/company/branch/user/mobileAlert";
  //       router = "alertReport";
  //       break;

  //     case "Overspeed duration report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fdate"] = this.reports.value.fromDate.split("T")[0];
  //       body["tdate"] = this.reports.value.toDate.split("T")[0];
  //       body["userID"] = localStorage.userName;
  //       mode = "/api/vts/company/branch/assets/reports/overspeed";
  //       router = "overspeedReport";
  //       break;

  //     case "Speed report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' 00:00:00 AM';
  //       body["toDate"] = this.reports.value.fromDate.split("T")[0] + ' 11:59:59 PM';
  //       body["userId"] = localStorage.userName;
  //       body['speed'] = this.reports.value.speed.toString();
  //       if (this.reports.value.condition == "") {
  //         body['condition'] = '<';
  //       } else {
  //         body['condition'] = this.reports.value.condition;
  //       }
  //       //%7B"vin":"art630","fromDate":"2020-02-15%2000:00:00%20AM","toDate":"2020-02-15%2011:59:59%20PM","userId":"art-ca","speed":"0","condition":">"%7D
  //       mode = "/api/vts/company/assets/report/speed";
  //       router = "speedReport";
  //       break;

  //     case "Movement report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + "00:00:00";
  //       body["toDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + "23:59:59";
  //       body["userID"] = localStorage.userName;
  //       body["branchID"] = localStorage.corpId;
  //       body["companyID"] = localStorage.corpId;
  //       body['seconds'] = this.reports.value.timeExceed;
  //       body['showAddress'] = "True";
  //       body['newreport'] = "";
  //       mode = "/api/vts/company/assets/report/movement";
  //       router = "movementReport";
  //       break;

  //     case "Temprature report":
  //       this.commonService.presentLoader();
  //       body["vin"] = this.vin;
  //       body["fromDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + this.reports.value.fromTime;
  //       body["toDate"] = this.reports.value.fromDate.split("T")[0] + ' ' + this.reports.value.toTime;
  //       body["userID"] = localStorage.userName;
  //       body["branchID"] = localStorage.corpId;
  //       body["companyID"] = localStorage.corpId;
  //       body["tempType"] = this.reports.value.sensorType;
  //       body["errorCode"] = "{}";
  //       body["tempSign"] = this.reports.value.condition;
  //       body['tempValue'] = this.reports.value.limit.toString();
  //       body['seconds'] = this.reports.value.timeExceed;
  //       body['newreport'] = "";
  //       mode = "/api/vts/company/assets/report/temperature";
  //       router = "temprature";
  //       break;
  //   }

  //   this.ajaxService.ajaxReportServices(mode, body, router, this.successCallback);
  //   // this.router.navigateByUrl("reports/All/temprature");
  //   // this.getBack();
  // }

  // successCallback = (res: any, outputRouter: string) => {
  //   let validation: boolean = false;
  //   if (typeof (res) == "object" && Object.keys(res).length > 0 && !Array.isArray(res)) {
  //     if (outputRouter == "overallSummaryReport") {
  //       for (let i = 0; i < res.summary.length; i++) {
  //         if (res.summary[i]["duration"] !== "0:00:00:00") {
  //           validation = true;
  //           break;
  //         }
  //       }
  //     }
  //   } else if (res.length > 0) {
  //     validation = true;
  //   }
  //   if (validation) {
  //     this.router.navigateByUrl("reports/" + this.plateNo + "/" + outputRouter);
  //     localStorage.setItem('reportsData', JSON.stringify(res));
  //     this.getBack();
  //   } else {
  //     this.commonService.presentToast('No data available');
  //   }
  //   this.commonService.dismissLoader();
  // }

  // getBack() {
  //   this.modalController.dismiss();
  // }
  // portChange = (event: {
  //   component: IonicSelectableComponent,
  //   value: any
  // }) => {
  //   this.vin = event.value.vin;
  // }
  // ngOnInit() {
  //   this.maxDate = this.yesterday.getFullYear() + "-";
  //   this.maxDate += (this.yesterday.getMonth() + 1 < 10 ? "0" + (this.yesterday.getMonth() + 1).toString() : (this.yesterday.getMonth() + 1).toString()) + "-";
  //   this.maxDate += this.yesterday.getDate() < 10 ? "0" + this.yesterday.getDate().toString() : this.yesterday.getDate().toString();
  //   this.liveData = JSON.parse(localStorage.dashboardData).liveDatas;
  //   this.dashboarData = Object.values(this.liveData);
  //   let loopArray = []
  //   for (let i = 0; i < this.dashboarData.length; i++) {
  //     let loopData: any = this.dashboarData[i];
  //     if (loopData.warrantyExpiry == true) {
  //       loopArray.push(loopData)
  //     }
  //   }
  //   this.data = loopArray
  //   this.reportsContent = {
  //     plateNo: false,
  //     fromDate: false,
  //     fromTime: false,
  //     toDate: false,
  //     toTime: false,
  //     speed: false,
  //     condition: false,
  //     timeExceed: false,
  //     sensor: false
  //   };
  //   this.reportsTitle = this.reportName;
  //   Object.assign(this.reportsContent, this.shownContent)
  //   this.reports = this.formBuilder.group({
  //     plateNo: [''],
  //     fromDate: ['', Validators.required],
  //     fromTime: ['00:00:00'],
  //     toDate: [''],
  //     toTime: [this.yesterday.toTimeString().split(" ")[0]],
  //     speed: ['50', Validators.max(100)],
  //     condition: ['>'],
  //     timeExceed: ['900'],
  //     sensor: ["2"],
  //     limit: ["2"],
  //     sensorType: ["TEMP1"],
  //   });
  //   if (this.plateNo !== "null") {
  //     this.reports.patchValue({ 'plateNo': this.plateNo });
  //     this.vin = JSON.parse(localStorage.selectedVin).vin;
  //   } else {
  //     if (this.reportsTitle == "Executive summary report" || this.reportsTitle == 'Driver behaviour report') {
  //       this.vin = "All";
  //     }
  //   }
  //   if (this.yesterday.getDate() < 10) {

  //   }
  // }

}
