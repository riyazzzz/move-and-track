import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { serverUrl } from 'src/environments/environment';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { AuthMapService } from 'src/app/services/auth-map.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service';


@Component({
  selector: 'app-report-modal2',
  templateUrl: './report-modal2.component.html',
  styleUrls: ['./report-modal2.component.scss'],
})
export class ReportModal2Component implements OnInit {
  map: any;
  @Input() commonData: any;
  @Input() report: any;
  @Input() displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  @ViewChild('mapElement', { static: false }) mapElement;
  sourceLocation: { "lat": number; "lng": number; };
  destinationLocation: { "lat": number; "lng": number; };
  mapView: boolean = false;
  reportData = [];
  reportName: any;
  trackLine: any;
  
  constructor(
    private mapService: AuthMapService,
    private ajaxService: AjaxService,
    private commonService: CommonService,

  ) {
    // if (localStorage.map === 'GoogleMap') {
    //   this.mapService = new GoogleMapService();
    // } else {
    this.mapService = new OpenlayerMapService();
    // }
  }

  toggleMapView = (data) => {
    this.mapService.clearLayers(this.map, [1, 2]);
    // this.commonService.presentLoader();
    // if (this.reportName != 'overspeed' || this.reportName != 'speed') {
    //   if (data.start.split(" ")[0] == data.end.split(" ")[0]) {
    //     var d1 = new Date(data.start);
    //     var d2 = new Date(data.end);
    //     const url = serverUrl.web + '/device/trackhistory?vehicleNo=' + data.vin + '&fromDate=' + data.start.split(" ")[0] +
    //       '&fromtime=' + d1.toTimeString().split(" ")[0] + '&totime=' + d2.toTimeString().split(" ")[0]

    //     this.ajaxService.ajaxGet(url)
    //       .subscribe(res => {
    //         if (res.routeGeometry.length > 0) {
    //           this.plotPointer(data, res.routeGeometry);
    //         } else {
    //           this.commonService.dismissLoader();
    //           this.commonService.presentToast("No data found");
    //         }
    //       });
    //   } else {
    //     var d1 = new Date(data.start);
    //     var d2 = new Date(data.end);
    //     let mulitLinedraw = [];
    //     const url = serverUrl.web + '/device/trackhistory?vehicleNo=' + data.vin + '&fromDate=' + data.start.split(" ")[0] +
    //       '&fromtime=' + d1.toTimeString().split(" ")[0] + '&totime=' + "23:59:59"

    //     this.ajaxService.ajaxGet(url)
    //       .subscribe(res => {
    //         for (let i = 0; i > res.routeGeometry; i++) {
    //           mulitLinedraw.push(res.routeGeometry[i]);
    //         }
    //         const url = serverUrl.web + '/device/trackhistory?vehicleNo=' + data.vin + '&fromDate=' + data.start.split(" ")[0] +
    //           '&fromtime=' + "00:00:00" + '&totime=' + d2.toTimeString().split(" ")[0];
    //         this.ajaxService.ajaxGet(url)
    //           .subscribe(res => {
    //             for (let i = 0; i > res.routeGeometry; i++) {
    //               mulitLinedraw.push(res.routeGeometry[i]);
    //             }
    //             this.plotPointer(data, mulitLinedraw);
    //           })

    //       });
    //   }
    // } 
if(this.reportName == 'overspeed'){
  let location = {
    "lat": parseFloat("10.05284111111111"),
    "lng": parseFloat("78.1544088888889")
  }
  this.mapService.addMarker(this.map, location, 'start', 'assets/vtstrackhisIcon/startFlag.png');
  this.mapView = true;
}
else {
      let location = {
        "lat": parseFloat(data["lat"]),
        "lng": parseFloat(data["lng"])
      }
      this.mapService.addMarker(this.map, location, 'start', 'assets/vtstrackhisIcon/startFlag.png');
      this.mapView = true;

  }
}
  plotPointer(data, mulitLinedraw) {
    this.commonService.dismissLoader()
    data['startLocation'] = mulitLinedraw[0].latitude + ',' + mulitLinedraw[0].longitude;
    data['stopLocation'] = mulitLinedraw[mulitLinedraw.length - 1].latitude + ',' + mulitLinedraw[mulitLinedraw.length - 1].longitude
    this.sourceLocation = {
      "lat": parseFloat(data["startLocation"].split(",")[0]),
      "lng": parseFloat(data["startLocation"].split(",")[1])
    }
    this.destinationLocation = {
      "lat": parseFloat(data["stopLocation"].split(",")[0]),
      "lng": parseFloat(data["stopLocation"].split(",")[1])
    }

    // this.mapService.removeMarkersById(this.map, 'source');
    // this.mapService.removeMarkersById(this.map, 'destination');
    setTimeout(() => {
      this.mapService.addMarker(this.map, this.sourceLocation, 'start', 'assets/vtstrackhisIcon/startFlag.png');
      this.mapService.addMarker(this.map, this.destinationLocation, 'end', 'assets/vtstrackhisIcon/endFlag.png');
    });
    this.mapService.fitBounds(this.map, 1);
    this.plotBackTrackingPath(mulitLinedraw)
  }
  plotBackTrackingPath(finalPath) {
    if (finalPath.length === 0) {
      this.commonService.presentToast('No data available');
      this.mapService.clearLayers(this.map, [1, 2]);
      this.mapView = false;
    } else {
      this.mapView = true;
      for (let i = 0; i < finalPath.length; i++) {
        finalPath[i]["lat"] = finalPath[i]["latitude"]
        finalPath[i]["lng"] = finalPath[i]["longitude"]
      }

      this.mapService.createLine(this.map, finalPath);
    }
  }
  closeMap() {
    this.mapView = false;
  }

  doInfinite(event) {
    //console.log("event trigger")
    setTimeout(() => {
      //console.log(this.commonData)
      this.displayData.push(...this.commonData.slice(this.currentPage * this.displayCount, (this.currentPage + 1) * this.displayCount));
      this.currentPage++;
      event.target.complete();
      if (this.displayData.length == this.commonData.length) {
        event.target.disabled = true;
      }
      //console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
  }

  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
    }
    else {
      this.displayData = this.commonData;
    }
  }

  loadMap = () => {
    setTimeout(() => {
      if (localStorage.map === "GoogleMap") {
        this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: -25.344, lng: 131.036 }, true, false);
      } else {
        this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: -25.344, lng: 131.036 }, true, false);
      }
      this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    })
  }
  ionViewWillEnter() {
    //console.log('ionview')
  }
  ngOnInit() {
    this.reportData = this.commonData;
    this.reportName = this.report;
    this.loadMap();
    this.setDisplayData();
  }
  ngOnChanges() {
    this.setDisplayData();
  }
}
