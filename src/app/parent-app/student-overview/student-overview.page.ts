import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
import { reduce } from 'rxjs/operators';
import { AjaxService } from 'src/app/services/ajax.service';
import { AuthMapService } from 'src/app/services/auth-map.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.page.html',
  styleUrls: ['./student-overview.page.scss'],
})
export class StudentOverviewPage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement;
  map: any;
  alert;
  date = new Date();
  atteData = {present:0,absent:0,week: "",month:""}
  // trackdata = [{
  //   count: "",
  //   started: " ",
  //   place: " ",
  //   location: ""
  // }]
  // trackdata;
  trackdata = [{
    count: "01",
    started: "Started at ",
    place: "Gurukural matriculation higher sec school ",
    location: "No 13: gst road, west tambarm chennai 45"
  },
  {
    count: "02",
    place: "Nandthanam signal",
    location: "NH11 highway, greenmens road, chennai 43"
  },
  {
    count: "03",
    place: "Nandthanam signal",
    location: "NH11 highway, greenmens road, chennai 43"
  },
  {
    count: "04",
    started: "End at",
    place: "Nandthanam signal",
    location: "NH11 highway, greenmens road, chennai 43"
  }];

  // alertTextColor = {
  //   "Route NH11 bus has started": "#ffca4d",
  //   "Route NH11 bus has arrived soon to pick up": "#3287eb",
  //   "In route NH11 your child has borded the bus": "#48d765",
  //   "Your child has reached school": "#ff0000"
  // };

  // alert = [{
  //   color: '#ffca4d',
  //   text: "Route NH11 bus has started at 2021-04-15 08:00:00 AM",
  //   title: "Bus Started",
  //   icon: "M282.55 56.5l-20.41 0 0 70.19 8.16 0 0 32.23 -15.5 0 0 -106.49c0,-21.64 -17.54,-39.17 -39.17,-39.17l-128.94 0c-21.62,0 -39.16,17.53 -39.16,39.17l0 104.45 -13.47 0 0 -34.28 8.57 0 0 -70.17 -20.4 0 0 70.17 8.57 0 0 37.55 16.73 0 0 76.71c0,14.82 8.24,27.73 20.4,34.38l0 20.27 34.27 0 0 -15.49 97.1 0 0 15.5 34.29 0 0 -19.89c12.59,-6.49 21.21,-19.63 21.21,-34.78l0 -74.68 18.77 0 0 -35.49 8.98 0 0 -70.18 0 0zm-176.26 -35.09l91.38 0 0 21.23 -91.38 0 0 -21.23zm9.78 213.81l-50.59 0 0 -22.84 50.59 0 0 22.84zm122.41 0l-50.59 0 0 -22.84 50.59 0 0 22.84zm0 -73.44c0,0 -9.8,31.01 -88.13,31.01 -78.35,0 -86.51,-31.01 -86.51,-31.01l0 -107.73 174.64 0 0 107.73z"
  // },
  // {
  //   color: '#3287eb',
  //   text: "Route NH11 bus has arrived soon to pick up at 2021-04-15 08:40:00 AM",
  //   title: "Bus Arriving",
  //   icon:"M10.86 96.51c0,14.5 9.62,27.31 24.03,27.31l0 128.9c-9.59,0 -16.39,2.67 -16.39,14.19l42.61 0c-0.87,-10.54 -7.23,-14.19 -16.38,-14.19l0 -128.9c11.96,0 22.93,-10.34 22.93,-21.84 0,-11.49 1.48,-20.6 -8.53,-28.62 -14.17,-11.35 -48.27,-9.91 -48.27,23.15zm283.06 -23.05l-16.79 0 0 57.78 6.71 0 0 26.52 -12.76 0 0 -87.65c0.01,-17.81 -14.43,-32.24 -32.24,-32.24l-106.13 0c-17.8,0 -32.23,14.43 -32.23,32.24l0 85.98 -11.09 -0.01 0 -28.21 7.05 0 0 -57.76 -16.78 0 0 57.76 7.05 0 0 30.91 13.77 0 0 63.14c0,12.19 6.78,22.83 16.79,28.3l0 16.69 28.21 -0.01 0 -12.75 79.92 0 0 12.76 28.22 0 0 -16.37c10.37,-5.35 17.46,-16.16 17.46,-28.63l0 -61.47 15.45 0 0 -29.21 7.39 0 0 -57.77 0 0zm-145.08 -28.88l75.22 0 0 17.47 -75.22 0 0 -17.47zm8.06 175.99l-41.64 0 0 -18.8 41.64 0 0 18.8zm100.75 0l-41.64 0 0 -18.8 41.64 0 0 18.8zm0 -60.45c0,0 -8.06,25.52 -72.54,25.52 -64.49,0 -71.21,-25.52 -71.21,-25.52l0 -88.67 143.75 0 0 88.67z"
  // },
  // {
  //   color: '#48d765',
  //   text: "In route NH11 your child has borded the bus at 2021-04-15 09:00:00 AM",
  //   title: "Child Onboard",
  //   icon:"M54.42 204.43c0.25,13.96 0.08,30.74 3.56,42.77 14.04,1.94 9.94,-7.61 9.09,-20.62 -0.54,-7.97 -2.39,-10.34 -8.2,-17.52 -0.3,-0.39 -1.82,-2.08 -2.01,-2.29 -1.44,-1.51 -1.01,-1.11 -2.44,-2.34zm237.67 -129.35l-16.45 0 0 56.59 6.58 0 0 25.98 -12.5 0 0 -85.85c0.01,-17.44 -14.14,-31.58 -31.58,-31.58l-103.95 0c-17.43,0 -31.58,14.14 -31.58,31.58l0 84.21 -10.85 0 0 -27.64 6.91 0 0 -56.57 -16.45 0 0 56.57 6.91 0 0 30.28 13.48 0 0 61.84c0,11.95 6.65,22.36 16.45,27.72l0 16.35 27.63 0 0 -12.5 78.29 0 0 12.5 27.64 0 0 -16.03c10.15,-5.24 17.1,-15.83 17.1,-28.04l0 -60.21 15.13 0 0 -28.61 7.24 0 0 -56.59 0 0zm-72.82 106.86l-67.36 0c8.88,1.84 19.91,3.02 33.6,3.02 13.69,0 24.78,-1.18 33.76,-3.02zm-82.98 -4.65c20.65,0.64 49.63,-0.65 62.17,-0.29 3.09,-36.09 42.9,-21.62 47.59,-18.19 3.16,2.3 4.01,5.65 4.69,9.05 4.71,-4.39 5.82,-7.9 5.82,-7.9l0 -86.85 -140.79 0 0 86.85c0,0 2.64,9.98 20.52,17.33zm1.9 -50.51c-14.52,4.11 -9.33,26.74 6.66,22.06 13.57,-3.97 8.21,-26.28 -6.66,-22.06zm33.38 -0.2c-13.62,4.48 -9.12,26.37 6.97,22.23 13.79,-3.52 8.05,-27.16 -6.97,-22.23zm50.58 -6.93c-20.66,5.01 -12.91,34.94 7.31,30.26 18.08,-4.19 13.32,-35.25 -7.31,-30.26zm-63.54 42.05c-4.81,-6.87 -7.06,-10.76 -20.32,-9.59 -10.42,0.93 -13.19,5.57 -13.57,15.69l66.7 0.13c-0.46,-10.12 -3.39,-14.92 -13.57,-15.81 -10.82,-0.94 -16.79,1.51 -19.24,9.58zm48.79 15.27c2.33,-18.46 29.26,-21.48 35.33,-3.31 -1.36,0.78 -2.86,1.55 -4.49,2.3 -5.76,-2.59 -2.74,-8.79 -13.54,-8.13 -12.28,0.76 -4.53,8.86 -17.3,9.14zm-57.41 -130.18l73.68 0 0 17.12 -73.68 0 0 -17.12zm7.89 172.38l-40.79 0 0 -18.41 40.79 0 0 18.41zm98.68 0l-40.78 0 0 -18.41 40.78 0 0 18.41zm-209.58 -73.14c4.26,16.46 32.52,12.95 27.7,-7.76 -4.13,-17.81 -32.61,-11.2 -27.7,7.76zm8.21 37.13c3.35,10.68 6.81,8.87 19.08,11.77 14.56,3.42 17.08,-5.7 6.8,-9.63 -12.82,-4.89 -10.73,-0.76 -16.76,-12.72 -3.84,-7.6 -5.74,-14.56 -13.97,-15.43 -3.89,-0.4 -21.87,1.95 -25.99,2.97 -5.55,1.4 -5,2.09 -6.8,7.93 -1.26,4.08 -2.11,7.09 -3.57,11.17 -3.91,10.98 1.43,25.23 12.73,0.45 3.05,-6.7 1.34,-6.37 7.95,-6.69 -5.82,23.86 -6.05,13.58 -2.39,39.92 1.78,12.89 -16.87,18.31 -11.74,31.61 7.66,2.26 7.34,0.7 15.3,-7.13 1.19,-1.17 10.21,-11.73 10.99,-13.23 3.27,-6.16 -0.86,-30.34 8.37,-40.99z"
  // },
  // {
  //   color: '#ff0000',
  //   text: "Your child has reached school at 2021-04-15 09:30:00 AM",
  //   title: "Reached school",
  //   icon:"M45.58 209.32c-0.23,12.67 -0.08,27.92 -3.23,38.84 -12.75,1.76 -9.03,-6.91 -8.25,-18.72 0.48,-7.25 2.16,-9.4 7.44,-15.92 0.27,-0.35 1.65,-1.88 1.82,-2.07 1.31,-1.38 0.92,-1.02 2.22,-2.13zm243.5 -134.24l-16.45 0 0 56.59 6.58 0 0 25.98 -12.5 0 0 -85.85c0.01,-17.44 -14.14,-31.58 -31.58,-31.58l-103.95 0c-17.43,0 -31.58,14.14 -31.58,31.58l0 84.21 -10.85 0 0 -27.64 6.91 0 0 -56.57 -16.45 0 0 56.57 6.91 0 0 30.28 13.48 0 0 61.84c0,11.95 6.65,22.36 16.45,27.72l0 16.35 27.63 0 0 -12.5 78.29 0 0 12.5 27.64 0 0 -16.03c10.15,-5.24 17.1,-15.83 17.1,-28.04l0 -60.21 15.13 0 0 -28.61 7.24 0 0 -56.59 0 0zm-72.82 106.86l-67.36 0c8.88,1.84 19.91,3.02 33.6,3.02 13.69,0 24.78,-1.18 33.76,-3.02zm-82.98 -4.65c20.65,0.64 49.63,-0.65 62.17,-0.29 3.09,-36.09 42.9,-21.62 47.59,-18.19 3.16,2.3 4.01,5.65 4.69,9.05 4.71,-4.39 5.82,-7.9 5.82,-7.9l0 -86.85 -140.79 0 0 86.85c0,0 2.64,9.98 20.52,17.33zm1.9 -50.51c-14.52,4.11 -9.33,26.74 6.66,22.06 13.57,-3.97 8.21,-26.28 -6.66,-22.06zm33.38 -0.2c-13.62,4.48 -9.12,26.37 6.97,22.23 13.79,-3.52 8.05,-27.16 -6.97,-22.23zm50.58 -6.93c-20.66,5.01 -12.91,34.94 7.31,30.26 18.08,-4.19 13.32,-35.25 -7.31,-30.26zm-63.54 42.05c-4.81,-6.87 -7.06,-10.76 -20.32,-9.59 -10.42,0.93 -13.19,5.57 -13.57,15.69l66.7 0.13c-0.46,-10.12 -3.39,-14.92 -13.57,-15.81 -10.82,-0.94 -16.79,1.51 -19.24,9.58zm48.79 15.27c2.33,-18.46 29.26,-21.48 35.33,-3.31 -1.36,0.78 -2.86,1.55 -4.49,2.3 -5.76,-2.59 -2.74,-8.79 -13.54,-8.13 -12.28,0.76 -4.53,8.86 -17.3,9.14zm-57.41 -130.18l73.68 0 0 17.12 -73.68 0 0 -17.12zm7.89 172.38l-40.79 0 0 -18.41 40.79 0 0 18.41zm98.68 0l-40.78 0 0 -18.41 40.78 0 0 18.41zm-201.21 -62.89c-3.87,14.95 -29.54,11.76 -25.16,-7.05 3.75,-16.18 29.62,-10.17 25.16,7.05zm-7.46 33.72c-3.04,9.7 -6.18,8.06 -17.33,10.69 -13.22,3.11 -15.51,-5.18 -6.17,-8.75 11.64,-4.44 9.74,-0.69 15.22,-11.55 3.49,-6.9 5.21,-13.22 12.68,-14.01 3.54,-0.37 19.87,1.77 23.61,2.7 5.04,1.27 4.54,1.89 6.18,7.19 1.14,3.72 1.91,6.44 3.24,10.15 3.55,9.97 -1.3,22.92 -11.56,0.41 -2.77,-6.09 -1.22,-5.78 -7.22,-6.08 5.28,21.67 5.49,12.34 2.17,36.26 -1.62,11.71 15.32,16.63 10.66,28.71 -6.96,2.05 -6.67,0.63 -13.9,-6.48 -1.08,-1.06 -9.27,-10.65 -9.98,-12.01 -2.97,-5.6 0.79,-27.56 -7.6,-37.23z"
  // }]
  constructor(
    private location: Location,
    public mapService: AuthMapService,
    public ajaxService: AjaxService,
    public router: Router,
  ) {
    this.mapService = new OpenlayerMapService();
  }
  locationBack() {
    this.router.navigateByUrl('student-dashboard')
  
  }

  highChart() {
    highcharts3D(Highcharts);
    Highcharts.chart('container', {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        },
        width: 320,
        height: 250
      },
      colors: ["#ff9025", "#7d7d7d"],
      title: {
        text: null
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            distance: 0,
            format: '<span style="font-size: 1.2em; font-weight: bold">{point.name}</span><br>' + '<span style="font-size: 1.2em; font-weight: normal"> {point.percentage:.2f}%</span>'
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Percentege',
        data: [
          {
            name: 'Present',
            y: this.atteData.present,
            sliced: true,
            selected: true
          },
          ['Absent', this.atteData.absent],
        ]
      }]
    });
  }

  createMap() {
    setTimeout(() => {
      this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: 17.8998, lng: 12.85655 }, false, false);
      this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
      // this.getHistory();
    }, 500);

  }

  getHistory() {
    let getHour = this.date.getHours()
    const url = serverUrl.web + '/device/trackhistory';
    let body = {
      "vin": "art118",
      "fromDate": this.date.toJSON().split('T')[0] + " " + "12:00:00 AM",
      "toDate": this.date.toJSON().split('T')[0] + " " + "11:59:59 AM"
    }
    if (getHour >= 12) {
      body = {
        "vin": "art118",
        "fromDate": this.date.toJSON().split('T')[0] + " " + "12:00:00 PM",
        "toDate": this.date.toJSON().split('T')[0] + " " + "11:59:59 PM"
      }
    }
    this.ajaxService.ajaxPostWithBody(url, body)
      .subscribe(res => {
        let trackHistoryCurrentRes = res.routeGeometry;
        let trackHistoryArray;
        trackHistoryCurrentRes.forEach(function (
          value) {
          if (value.latitude !== 0 && value.longitude !== 0) {
            trackHistoryArray.push({
              lat: value.latitude,
              lng: value.longitude
            });
          }
        });
        this.mapService.createLine(this.map, trackHistoryArray);
      });
  }

getAlerts(){
  const url =serverUrl.web+'/parentapp/getPreferences?key=ParentappAlerts&companyId='+localStorage.getItem('userName')
  this.ajaxService.ajaxGetPerference(url).subscribe(res=>{
    console.log(res)
    this.alert = res;
  })
}
getRoutes(){
  const url =serverUrl.web+'/parentapp/routes?vin='+JSON.parse(localStorage.getItem('selectedVin')).dashboardVin
  this.ajaxService.ajaxGetPerference(url).subscribe(res=>{
    console.log(res)
    this.trackdata = res;
    
  })
}
getAttendanceDatas(){
 const url =serverUrl.web+'/parentapp/attendanceReport'
  this.ajaxService.ajaxGet(url).subscribe(res=>{
    console.log(res)
    this.atteData = res;
    this.highChart();
    
  })
}

  ngOnInit() {
    this.getAttendanceDatas();
    this.getAlerts();
    this.getRoutes();
   
    this.createMap();
 
    
    this.highChart();
  }

}
