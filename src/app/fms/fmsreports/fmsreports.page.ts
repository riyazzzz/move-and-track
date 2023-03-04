import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AjaxService } from '../../services/ajax.service';
import { app, serverUrl } from 'src/environments/environment';
import { FmsreportsFormPage } from '../fmsreports/fmsreports-form/fmsreports-form.page';
@Component({
  selector: 'app-fmsreports',
  templateUrl: './fmsreports.page.html',
  styleUrls: ['./fmsreports.page.scss'],
})
export class FmsreportsPage implements OnInit {
  subscription: any;
  myPlatform;
   app: any={logo:'logo.png'};
  appName: string;
  constructor(
    private ajaxService:AjaxService,
    private modalController:ModalController,
    private activatedRoute:ActivatedRoute,
    private platform: Platform,
    private menuController: MenuController
    ) { }
    reportTypeItems = new Array();
    plateNo: string;
    async openForm(mode: string) {
      const shownContent : object = {};
      switch(mode){
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
        break;
        case "Trip summary report":
        shownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        shownContent["fromTime"] = true;
        shownContent["toDate"] = true; 
        shownContent["toTime"] = true;
        break;
        case "Executive summary report":
        //sshownContent["plateNo"] = true;
        shownContent["fromDate"] = true;
        //shownContent["toDate"] = true;
        break;
        case "Driver behaviour report":
        shownContent["fromDate"] = true;
        shownContent["toDate"] = true;
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
        
        case "Temprature report":
            shownContent["plateNo"] = true; 
             shownContent["fromDate"] = true;
            shownContent["fromTime"] = true;
            shownContent["toDate"] = true; 
            shownContent["toTime"] = true;
            shownContent["sensor"] = true;
            shownContent["timeExceed"] = true;
            shownContent["condition"] = true;
            break;
          case "Ac report":
          shownContent["fromDate"] = true;
          shownContent["toDate"] = true;
          shownContent["plateNo"] = true; 
          break;
      }
      const modal = await this.modalController.create({
        component: FmsreportsFormPage,
        componentProps: {
          shownContent : shownContent,
          reportName : mode,
          plateNo : this.plateNo
        }
      });
      return await modal.present();
    }
    
    getAvailableReports = () =>{
      const body ={
        "companyId" : localStorage.corpId,
        "userId" : localStorage.userName
      }
      // const url = serverUrl.web+"/api/vts/company/branch/mainMenu/"+JSON.stringify(body);
      // this.ajaxService.ajaxGetWithBody(url)
      // .subscribe(
      //   res =>{
      const reports = JSON.parse(localStorage.getItem('localData'))[1].mainmenu;
      const reportjson = {
        "Executive_Summary" : "Executive summary report",
        "Driver_Behaviour":"Driver behaviour report",
        "Status_Summary":"Status summary report",
        "Over_Speed_Duration_Report":"Overspeed duration report",
        "Speed_Report": "Speed report",
        "Alert_Report" : "Alert report",
        "Movement_Report" : "Movement report",
        "Temprature_Report" : "Temprature report",
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
        "Vehicle_Summary_By_Day" : 'Overall summary report',
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
        "Trip_summary_report": "Trip summary report",
        "Vehicle_tripBy_summary":"Engine Hours summary report",
        "Ac_Report" : 'AC report'
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
    async ionViewDidEnter(){
      this.subscription = this.platform.backButton.subscribe(async ()=>{ 
        if(this.menuController.isOpen()){
          this.menuController.close()
        }
      });
    }
    ionViewWillLeave(){
      this.subscription.unsubscribe(); 
    }
    ngOnInit() {
      this.plateNo = this.activatedRoute.snapshot.paramMap.get("plateNo");  
      // this.app["logo"] = localStorage.companyLogo;
      // this.app["logo"] = localStorage.companyLogo;	
      if(localStorage.getItem('fmslogin') == 'FMS')	
      {	
        this.app["logo"] = localStorage.getItem('fmslogo');	
      }	
      else{	
        this.app["logo"] = localStorage.companyLogo;	
      }
      this.appName = app.appName;
      this.myPlatform = this.platform.platforms()[0];
      if(this.myPlatform == 'tablet'){
        this.myPlatform = 'desktop';
      }
      // this.getAvailableReports();
    }

}
