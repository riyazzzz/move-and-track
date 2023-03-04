import { Component, Input, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { ModalController, Platform, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FmsreportsFormPage } from '../fmsreports-form/fmsreports-form.page';
@Component({
  selector: 'app-fms-reports',
  templateUrl: './fms-reports.component.html',
  styleUrls: ['./fms-reports.component.scss'],
})
export class FmsReportsComponent implements OnInit {
  subscription: any;
  @Input() plateNo;
  myPlatform: string;
  reportShowContent: object;
  reportName: string = 'Overall summary report';
  reportPlatNo: any;
  constructor(
    private ajaxService: AjaxService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private menuController: MenuController
  ) { }
  reportTypeItems = new Array();
  async openForm(mode: string) {
    this.plateNo = this.plateNo;
    const shownContent: object = {};
    switch (mode) {
      case "Overall summary report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Engine Hours summary report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["fromTime"] = true;
        shownContent["toDate"] = true;
        shownContent["toTime"] = true;
        shownContent["addressCheckbox"] = true
        break;
        case "Trip summary report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["fromTime"] = true;
        shownContent["toDate"] = true;
        shownContent["toTime"] = true;
        shownContent["addressCheckbox"] = true
        break;
      case "Executive summary report":
        //sshownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        //shownContent["toDate"] = true;
        break;
      case "Driver behaviour report":
        shownContent["fromDate"] = true;
        break;
      case "Status summary report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Alert report":
        shownContent["fromDate"] = true;
        break;
      case "Overspeed duration report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;

      case "Speed report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["speed"] = true;
        shownContent["condition"] = true;
        break;

      case "Movement report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["timeExceed"] = true;
        break;

      case "Temperature report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        // shownContent["fromTime"] = true;
        shownContent["toDate"] = true;
        // shownContent["toTime"] = true;
        shownContent["sensor"] = true;
        shownContent["timeExceed"] = true;
        // shownContent["condition"] = true;
        break;

      case "Door open report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Door summary report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Door count report":
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Alarm report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Fuel consumption report":
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        break;
      case "Odometer report":
        shownContent["odometerWeek"] = true;
        break;
      case "Student Alert Report":
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        shownContent["routetype"] = true;
        break;
      case "Attendance report":
        shownContent["date"] = true;
        break;
        case "Ac Report":
      shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
        shownContent["plateNo"] = true;
          break;
          case "Fms Trip Report":
             shownContent["vin"] = true;
             shownContent["tripname"] = true;
            shownContent["fromDate"] = true;
            shownContent["toDate"] = true;
            break;
            case "Income and Expense Report":
              shownContent["vin"] = true;
              shownContent["tripname"] = true;
             shownContent["fromDate"] = true;
             shownContent["toDate"] = true;
             break;
             case "Income and Expense Group Report":
              shownContent["vin"] = true;
              shownContent["tripname"] = true;
             shownContent["fromDate"] = true;
             shownContent["toDate"] = true;
             break;
    }
    if (this.myPlatform != 'desktop') {
      const modal = await this.modalController.create({
        component: FmsreportsFormPage,
        componentProps: {
          shownContent: shownContent,
          reportName: mode,
          plateNo: this.plateNo
        }
      });
      return await modal.present();
    } else {
      this.reportShowContent = shownContent;
      this.reportName = mode;
      this.reportPlatNo = this.plateNo;
    }
  }

  getAvailableReports = () => {
    const body = {
      "companyId": localStorage.corpId,
      "userId": localStorage.userName
    }
    // const url = serverUrl.web+"/api/vts/company/branch/mainMenu/"+JSON.stringify(body);
    // this.ajaxService.ajaxGetWithBody(url)
    // .subscribe(
    //   res =>{
    var reports = JSON.parse(JSON.parse(localStorage.getItem('loginData'))[1].mainmenu);
    reports = reports.filter((c, index) => {
      return reports.indexOf(c) === index;
    });
    // const reports = ["Vehicle_Summary_By_Day","Vehicle_tripBy_summary", "Executive_Summary", "Driver_Behaviour", "Status_Summary", "Alert_Report","Over_Speed_Duration_Report", "Speed_Report", "Movement_Report","Temprature_Report", "Door_Summary", "Door_Open_Report", "Door_Count"];
    const reportjson = {
      "Executive_Summary": "Executive summary report",
      "Driver_Behaviour": "Driver behaviour report",
      "Status_Summary": "Status summary report",
      "Over_Speed_Duration_Report": "Overspeed duration report",
      "Speed_Report": "Speed report",
      "Alert_Report": "Alert report",
      "Movement_Report": "Movement report",
      "Temprature_Report": "Temperature report",
      "Door_Open_Report": "Door open report",
      "Door_Summary": "Door summary report",
      "Door_Count": "Door count report",
      "Alarm_Report": "Alarm report",
      "Fuel_Consumption_Report": "Fuel consumption report",
      "Primitive_Maintanance_Report": "Primitive maintanance report",
      "Odometer_Report": "Odometer report",
      "Student_Alert_Report": "Student Alert Report",
      "Attendance_Report": "Attendance report",
      "fms_tripreport": "Fms Trip Report",
      "incomeandexpense_report":"Income and Expense Report",
      "Income and Expense Group Report":"Income and Expense Group Report",

      // "Alert_Report" : "Alert report",
      // "Vehicle_Summary_Report" : 'Summary Report',
      // "Vehicle_Movement_Report" : 'Movement Report',
      // "Vehicle_Speed_Report" : 'Speed Report',
      // "Vehicle_Stop_Report" : 'Stop Report',
      // "Vehicle_Idle_Report" : "Idle Report",
      // "Vehicle_Alerts_Report" : 'Alert Report',
      // "Digital_Input_Report" : 'Digital Input Report',
      // "Idle_Fuel_History_Report" : 'IDLEFUEL_HISTORY_REPORT',
      // "Maintenance_Report" : 'Maintenance Report',
      // "Temperature_Report" : 'TEMPERATURE_REPORT',
      // "Vehicle_Cumulative_Summary_Report" : "Cumulative Summary Report",
      // "Employee_Summary_Report" : 'EMPLOYEE_SUMMARY_REPORT',
      // "NO_Transmission_Report" : 'NO Transmission Report',
      "Vehicle_Summary_By_Day": 'Overall summary report',
      // "Vehicle_Status_Summary_Report" :
      // 'STATUS_SUMMARY_REPORT',
      // "Garbage_Collector_Report" : 'GARBAGE_COLLECTOR_REPORT',
      // "Mechanical_Sweeper_Report" : 'SWEEPER_REPORT',
      // "Asset_Event_Report" : "Asset Event Report",
      // "Tabuk_Municipality_Report" : 'Tabuk Municipality Report',
      // "Compactor_Report" : 'Compactor Report',
      // "Street_Sweeper_Report" : 'STREET_SWEEPER_REPORT',
      // "Monthly_Discount_Report" : 'Monthly Discount Report',
      // "Month_NO_Transmission_Report" : 'Monthly NO Transmission Report',
      // "Out_Zone_Report" : 'Out Zone Report',
      // "Fuel_Consumption_Report" : 'Fuel_Consumption_Report',
      // "Seat_Belt_Report" : 'Seat_Belt_Report',
      // "BT_Temperature_Report" : 'BT_TEMPERATURE_REPORT',
      // "Common_Report" : 'Common_Report',
      // "All_Company_Details" : 'All_Company_Details',
      // "Mokafha_Report" : 'Mokafha_Report',
      // "testing_Report" : 'testing_Report',
      // "service_maintenance_report" : 'SERVICE_MAINTENANCE_REPORT',
      // "Utilization_Report" : 'Utilization_Report',
      // "Assignment_Report" : 'Assignment_Report',
      // "Driver_Event_Report" : 'Driver_Event_Report',
      // "OBD_OVERALL_REPORT" : 'OBD_OVERALL_REPORT',
      // "OBD_Fuel_Report" : "OBD_Fuel_Report",
      // "Overspeed_Timing_Report" : "OVERSPEED_TIMING_REPORT",
      // "non_running_report" : 'NON_RUNNING_REPORT',
      "Vehicle_tripBy_summary": "Engine Hours summary report",
    "Trip_summary_report": "Trip summary report",
        "Ac_Report" : 'Ac Report'
    };
    //  const loginMenu = res.replace("[",'').replace("]",'').replace(/'/g,'').split(",");
    for (var i = 0; i < reports.length; i++) {
      if (reportjson.hasOwnProperty(reports[i])) {
        this.reportTypeItems.push(reportjson[reports[i]]);
      }
    }
    // }
    // )
  }
  async ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(async () => {
      if (this.menuController.isOpen()) {
        this.menuController.close()
      }
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  ngOnChanges() {
    this.plateNo = this.plateNo
    if (this.myPlatform == 'desktop') {
      this.openForm(this.reportName);
    }
  }

  ngOnInit() {
    this.plateNo = this.plateNo;
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.getAvailableReports();

    if (this.myPlatform == 'desktop') {
      this.openForm(this.reportTypeItems[0]);
    }

}
}
