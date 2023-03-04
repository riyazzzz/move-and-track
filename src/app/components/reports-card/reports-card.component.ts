import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthMapService } from '../../services/auth-map.service';
import { OpenlayerMapService } from '../../services/openlayer-map.service';
import { GoogleMapService } from '../../services/google-map.service';
import { CommonService } from '../../services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
@Component({
  selector: 'app-reports-card',
  templateUrl: './reports-card.component.html',
  styleUrls: ['./reports-card.component.scss'],
})
export class ReportsCardComponent implements OnInit {
  map: any;
  @Input() commonData: any;
  @Input() report: any;
  @Input() displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  @ViewChild('mapElement', { static: false }) mapElement;
  sourceLocation: { "lat": number; "lng": number; };
  destinationLocation: { "lat": number; "lng": number; };
  mapView: boolean = true;
  reportData = [];
  reportName: any;
  trackLine: any;
  count: number = 10;
  constructor(
    private mapService: AuthMapService,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {
    // if (localStorage.map === 'GoogleMap') {
    //   this.mapService = new GoogleMapService();
    // } else {
    this.mapService = new OpenlayerMapService();
    // }
  }

  toggleMapView = (data) => {
    this.commonService.presentLoader();
    this.mapService.clearLayers(this.map, [1, 2]);
    if (this.report != "StatusSummary") {
      if (data.startTime.split(" ")[0] == data.endTime.split(" ")[0]) {
        var d1 = new Date(data.startTime);
        var d2 = new Date(data.endTime);
        // const url = serverUrl.web + "/vehicles/" + data.vin + "/" + data.startTime.split(" ")[0] + "/" + d1.toLocaleString().split(" ")[1] +
        //   + "/" + d2.toLocaleString().split(" ")[1]
        const url = serverUrl.web + '/device/trackhistory?vehicleNo=' + data.vin + '&fromDate=' + data.startTime.split(" ")[0] +
          '&fromtime=' + d1.toTimeString().split(" ")[0] + '&totime=' + "23:59:59"

        this.ajaxService.ajaxGet(url)
          .subscribe(res => {
            //console.log(res.routeGeometry);
            this.plotBackTrackingPath(res.routeGeometry)
          });
      } else {
        var d1 = new Date(data.startTime);
        var d2 = new Date(data.endTime);
        let mulitLinedraw = [];
        // const url = serverUrl.web + "/vehicles/" + data.vin + "/" + data.startTime.split(" ")[0] + "/" + d1.toLocaleString().split(" ")[1] + ' ' + d1.toLocaleString().split(" ")[2]
        //   + "/" + "11:59:59 PM"
        // const url = serverUrl.web + '/device/trackhistory';

        const url = serverUrl.web + '/device/trackhistory?vehicleNo=' + data.vin + '&fromDate=' + data.startTime.split(" ")[0] +
          '&fromtime=' + d1.toTimeString().split(" ")[0] + '&totime=' + "23:59:59"

        this.ajaxService.ajaxGet(url)
          .subscribe(res => {
            for (let i = 0; i > res.routeGeometry; i++) {
              mulitLinedraw.push(res.routeGeometry[i]);
            }
            //console.log(res.routeGeometry);
            // const url = serverUrl.web + "/vehicles/" + data.vin + "/" + data.endTime.split(" ")[0] + "/" + "12:00:01 AM"
            //   + "/" + d2.toLocaleString().split(" ")[1] + ' ' + d2.toLocaleString().split(" ")[2]
            const url = serverUrl.web + '/device/trackhistory?vehicleNo=' + data.vin + '&fromDate=' + data.startTime.split(" ")[0] +
              '&fromtime=' + "00:00:00" + '&totime=' + d2.toTimeString().split(" ")[0];

            this.ajaxService.ajaxGet(url)
              .subscribe(res => {
                for (let i = 0; i > res.routeGeometry; i++) {
                  mulitLinedraw.push(res.routeGeometry[i]);
                }
                this.plotBackTrackingPath(mulitLinedraw)
              })

          });
      }
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
    } else {

      let location = {
        "lat": parseFloat(data["startLocation"].split(",")[0]),
        "lng": parseFloat(data["startLocation"].split(",")[1])
      }
      this.mapView = true;
      setTimeout(() => {
        this.commonService.dismissLoader(); 
        this.mapService.addMarker(this.map, location, 'status', 'assets/vtstrackhisIcon/Idle.png');
      }, 1000)


    }
    this.mapService.fitBounds(this.map, 1);

  }
  plotBackTrackingPath(finalPath) {
    this.commonService.dismissLoader();
    if (finalPath.length === 0) {
      this.commonService.presentToast('No data available');
      this.mapService.clearLayers(this.map, [1, 2]);
      this.mapView = false;
    } else {
      for (let i = 0; i < finalPath.length; i++) {
        finalPath[i]["lat"] = finalPath[i]["latitude"]
        finalPath[i]["lng"] = finalPath[i]["longitude"]
      }
      this.mapView = true;
      this.mapService.createLine(this.map, finalPath);
      this.mapService.fitBounds(this.map, 2);
    }
  }
  closeMap() {
    this.mapView = false;
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

  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
    }
    else {
      this.displayData = this.commonData;
    }
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
  ionViewWillEnter() {
    //console.log('ionview')
  }
  ngOnInit() {
    this.reportData = this.commonData;
    this.reportName = this.report;
    this.mapView = false;
    this.loadMap();
    this.setDisplayData();
  }
  ngOnChanges() {

    this.setDisplayData();
  }

}
