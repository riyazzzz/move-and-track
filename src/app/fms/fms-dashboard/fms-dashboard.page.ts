import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import * as HighCharts from "highcharts";
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-fms-dashboard',
  templateUrl: './fms-dashboard.page.html',
  styleUrls: ['./fms-dashboard.page.scss'],
})
export class FmsDashboardPage implements OnInit {
  myPlatform;
  dashboard;
  @Input() applicationname;
  app: any={logo:'logo.png'};
 appName: string;
 vehicleCount: any = {};
  OverallIncome:any;
  vehicleIncome: any;
  OverallExpense: any;
  vehicleExpense: any;
  fuelExpense: any;
  OverallTrip: any;
  TodayTrip: any;
  YesterdayTrip: any;
  OverallIncomeandExpense: any;
  TodayIncomeandExpense: any;
  YesterdayIncomeandExpense: any;
  today = new Date();
  yesterday = new Date();
  week = new Date();
  month = new Date();
  todayDate;
  yesterdayDate;
  previousWeekDate;
  previousMonthDate;
  statusChanger = [{ status: 'Yesterday', isChecked: true },
  { status: 'Last 7 Days', isChecked: false },
  { status: '1 Month', isChecked: false }
  ];
  OverallTripCount: any;
  profitableVehicle: any;
  LossableVehicle: any;
  constructor(private platform: Platform, private router: Router,private commonService: CommonService,private ajaxService: AjaxService) { }
totalVehicleCount(status,color,chartData) {
let router = this.router;
let commonService = this.commonService;
      HighCharts.chart(status, {
        chart: {
          type: 'pie',
          width:300,
          height:300
        },
        colors:color,
        title: {
          text: '',
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: true,
          pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
                  point: {
                      valueSuffix: '%'
                    }
                },
        plotOptions: {
          pie: {
            
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                format: '<b>{point.name} </b>{point.percentage:.1f}%'
            },
            // events: {
            //   click: function (event) {
              
            //   },
            // }
          },
        },
        series: [{
          type: 'pie',
          animation: false,
          // innerSize: '50%',
          name: 'Percentage',
          data: chartData,
          showInLegend: true,
        }],
        legend: {
          layout:'vertical',
          verticalAlign: 'bottom',
        },
 }); 
    }
    overallCompanyExpense(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsOverAllExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsOverAllExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsOverAllExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        if(res == "No Data" ||res == undefined){
        this.OverallExpense ={"color": ["#4652a2"],"type": [["No Data",0]]}
        }
        else{
          this.OverallExpense =res;
        }
        this.totalVehicleCount("OverallExpense",this.OverallExpense.color,this.OverallExpense.type);
      })
    }
    vehicleexpense(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsVehicleExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsVehicleExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsVehicleExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        if(res == "No Data" ||res == undefined){
          this.vehicleExpense ={"color": ["#4652a2"],"type": [["No Data",0]]}
          }
          else{
            this.vehicleExpense =res;
          }
        this.totalVehicleCount("vehicleExpense",this.vehicleExpense.color,this.vehicleExpense.type); 
      })
    }
    fuelexpense(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsFuelExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsFuelExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsFuelExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
          .subscribe(res => {
            if(res == "No Data" ||res == undefined){
              this.fuelExpense ={"color": ["#4652a2"],"type": [["No Data",0]]}
              }
              else{
                this.fuelExpense =res;
              }
            this.totalVehicleCount("fuelExpense",this.fuelExpense.color,this.fuelExpense.type);
          })
    }
    overallCompanyIncome(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsOverAllIncome?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsOverAllIncome?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsOverAllIncome?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
          .subscribe(res => {
            if(res == "No Data" ||res == undefined){
              this.OverallIncome ={"color": ["#4652a2"],"type": [["No Data",0]]}
              }
              else{
                this.OverallIncome =res;
              }
            this.totalVehicleCount("Overallincome",this.OverallIncome.color,this.OverallIncome.type);
          })
    }
    vehicleincome(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsVehicleIncome?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsVehicleIncome?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsVehicleIncome?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
          .subscribe(res => {
            if(res == "No Data" ||res == undefined){
              this.vehicleIncome ={"color": ["#4652a2"],"type": [["No Data",0]]}
              }
              else{
                this.vehicleIncome =res;
              }
            this.totalVehicleCount("vehicleincome",this.vehicleIncome.color,this.vehicleIncome.type);
          })
    }
    profitablevehicle(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsProfitVehicle?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsProfitVehicle?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsProfitVehicle?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        if(res == "No Data" ||res == undefined){
          this.profitableVehicle ={"color": ["#4652a2"],"type": [["No Data",0]]}
          }
          else{
            this.profitableVehicle =res;
          }
        this.totalVehicleCount("Profitablevehicle",this.profitableVehicle.color,this.profitableVehicle.type);
      })
    }
    lossablevehicle(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsLossVehicle?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsLossVehicle?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getFmsLossVehicle?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
          .subscribe(res => {
            if(res == "No Data" ||res == undefined){
              this.LossableVehicle ={"color": ["#4652a2"],"type": [["No Data",0]]}
              }
              else{
                this.LossableVehicle =res;
              }
            this.totalVehicleCount("Lossable",this.LossableVehicle.color,this.LossableVehicle.type);
          })
    }
    overalltrip(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getTripChart?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getTripChart?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getTripChart?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        if(res == "No Data" ||res == undefined){
          this.OverallTrip = {"color":["#e06b8f"],"count":[{"close":0,"open":0}],"type":[["No Data",0]]}
          this.OverallTripCount=this.OverallTrip.count;
          }
          else{
        this.OverallTrip =res;
        this.OverallTripCount=res.count;
          }
        this.totalVehicleCount("Overalltrip",this.OverallTrip.color,this.OverallTrip.type);
      })
    }
    overallIncomeandExpense(data) {
     
      if (data.detail.value === "Yesterday") {
        var url = serverUrl.fmsUrl +'/dashboard/getOverAllIncomeAndExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.yesterdayDate+'&tdate='+this.yesterdayDate;
      } else if (data.detail.value === "Last 7 Days") {
        var url = serverUrl.fmsUrl +'/dashboard/getOverAllIncomeAndExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousWeekDate+'&tdate='+this.todayDate;
      } else {
        var url = serverUrl.fmsUrl +'/dashboard/getOverAllIncomeAndExpense?companyid='+localStorage.getItem('corpId')+'&fdate='+this.previousMonthDate+'&tdate='+this.todayDate;
      }
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        if(res == "No Data" ||res == undefined){
          this.OverallIncomeandExpense =[{"TotalExpenseCount":0,"TotalExpense":0,"TotalIncomeCount":0,"List":"Loss","TotalIncome":0,"value":"0"}]
          }
          else{
            this.OverallIncomeandExpense =res;
          }
      })
    }
  ngOnInit() {
    // this.app["logo"] = localStorage.companyLogo;
    if(localStorage.getItem('fmslogin') == 'FMS')
    {
      this.app["logo"] = localStorage.getItem('fmslogo');
    }
    else{
      this.app["logo"] = localStorage.companyLogo;
    }
    this.appName = this.app.appName;
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.todayDate = this.today.getFullYear() + "-";
    this.todayDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";
    this.todayDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();
        //yesterday date
        this.yesterday.setDate(this.yesterday.getDate() - 1);
        this.yesterdayDate = this.yesterday.getFullYear() + "-";
        this.yesterdayDate += (this.yesterday.getMonth() + 1 < 10 ? "0" + (this.yesterday.getMonth() + 1).toString() : (this.yesterday.getMonth() + 1).toString()) + "-";
        this.yesterdayDate += this.yesterday.getDate() < 10 ? "0" + this.yesterday.getDate().toString() : this.yesterday.getDate().toString();
        //week date 
        this.week.setDate(this.week.getDate() - 7);
        this.previousWeekDate = this.week.getFullYear() + "-";
        this.previousWeekDate += (this.week.getMonth() + 1 < 10 ? "0" + (this.week.getMonth() + 1).toString() : (this.week.getMonth() + 1).toString()) + "-";
        this.previousWeekDate += this.week.getDate() < 10 ? "0" + this.week.getDate().toString() : this.week.getDate().toString();
    
        //month date
        this.month.setMonth(this.month.getMonth() - 1);
        this.previousMonthDate = this.month.getFullYear() + "-";
        this.previousMonthDate += (this.month.getMonth() + 1 < 10 ? "0" + (this.month.getMonth() + 1).toString() : (this.month.getMonth() + 1).toString()) + "-";
        this.previousMonthDate += this.month.getDate() < 10 ? "0" + this.month.getDate().toString() : this.month.getDate().toString();
  }
}
