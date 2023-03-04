import { Component, OnInit, ViewChild, Input, resolveForwardRef } from '@angular/core';
import { AuthMapService } from '../../services/auth-map.service';
import { GoogleMapService } from '../../services/google-map.service';
import { OpenlayerMapService } from '../../services/openlayer-map.service';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';
import Overlay from 'ol/Overlay';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';


@Component({
  selector: 'app-vts-trackhistory',
  templateUrl: './vts-trackhistory.component.html',
  styleUrls: ['./vts-trackhistory.component.scss'],
  providers: [DatePipe]
})
export class VtsTrackhistoryComponent implements OnInit {

  @ViewChild('mapElement', { static: false }) mapElement;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  header: HTMLElement;
  btns: HTMLCollectionOf<Element>;
  header1: HTMLElement;
  btns1: HTMLCollectionOf<Element>;
  traveVinData;
  show = true;
  myPlatform: string;
  showdataMarker = {
    stop: true,
    idle: true,
    running: false,
    overSpeed: false
  }
  popupView = false;
  popUp: any;
  trackHistoryCurrentRes: any;
  source: { localdata: any; };
  renderer: (row: number, column: any, value: string) => string;
  tableData: any;
  dataAdapter: any;
  columns: (void | { text: string; datafield: string; cellsrenderer: any; })[];
  xmlDocument: XMLDocument;
  userSelected: any ={"vin":""
  ,"fromDate":"",
  "toDate":"",
  "fromTime":"",
  "toTime":""
  };
  constructor(
    public mapService: AuthMapService,
    private datePipe: DatePipe,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private platform: Platform
  ) {
    if (localStorage.map == "GoogleMap") {
      this.mapService = new GoogleMapService();
    }
    else {
      this.mapService = new OpenlayerMapService();
    }
  }

  kml(){
   let _url = serverUrl.web + "/trackHistory/generateKMLServlet?name=BackTracking&selectedVehicle="+this.selectedVin.vin+"&fromDate="+this.datePipe.transform(this.user.fromDate, 'yyyy-MM-dd '+ this.datePipe.transform(this.user.fromDate, 'h:mm:ss'))+"&toDate="+ this.datePipe.transform(this.user.toDate, 'yyyy-MM-dd '+ this.datePipe.transform(this.user.toDate, 'h:mm:ss'))+"&compName="+ localStorage.corpId+"&brnchName="+ localStorage.corpId+"&userName="+ localStorage.userName+"&selectedVehiPlateNo="+this.selectedVin.plateNo 
   this.ajaxService.ajaxGetWithString(_url).subscribe(res=>{
     console.log(res)
    //  const doc = new jsPDF('landscape', "px", 'a4');
    //  doc.save(res);
this.createAndDownloadKML(res)
   })
  
  }
  createAndDownloadKML(res){
    // const textXML = this.createKMLFileFromCoordinates(res);
    this.download('points.kml', res);
}

download(filename, xmlDocument): void {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xmlDocument));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

  ionViewWillEnter() {
    this.popUp = (res) => {
      //console.log(res);
    }
    setTimeout(() => {
      this.map.setTarget(this.mapElement.nativeElement);

    }, 2000);
  }

  map: any;
  selectedVin;
  @Input() gridLiveChange;
  user;
  selectedValue = 'today';
  displayPlay: boolean;
  displayPause: boolean;
  displayStop: boolean;
  liveCount;
  showSwipeModal: boolean = true;
  trackHistoryJson;
  playback;
  playbackIcon;
  interval;
  markerAddress;
  display = "play";
  playbackUpdater = {
    status: false,
    "timeStamp": "",
    "speed": "",
    "odometer": ""
  }
  markerInfo = {
    "show": false,
    "status": "",
    "speed": '',
    "duration": '',
    "timeStamp": ''
  };
  range = '62';
  playBackSpeed = 1000;
  playBackOdometer: number = 0;
  createMap() {
    setTimeout(() => {
      if (this.gridLiveChange == undefined || this.map == undefined) {
        this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: this.traveVinData.latitude, lng: this.traveVinData.longitude }, false, false);
        this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
      }
      if(this.myPlatform == "desktop"){
        this.getInBetweenDate()
      }else {
       
      this.getHistory();
      }
    }, 500);

  }

  getAddress(lat, lng) {
    const url = serverUrl.web + "/login/company/latlngtoaddress/" + lat + "/" + lng + "/" + localStorage.corpId;
    this.ajaxService.ajaxGetObject(url)
      .subscribe(res => {
        if (res.length > 5) {
          this.markerAddress = res;
          //console.log(res);
        }
        else {
          this.markerAddress = "---";
        }
      });
  }
  toggleView() {
    this.showSwipeModal = !this.showSwipeModal;
  }

  trackModal(selectedData) {
    let date = new Date();
    let toTime = date.toJSON();
    let url;
    this.selectedValue = selectedData;
    if (typeof (selectedData) == "number") {
      date.setHours(date.getHours() - selectedData);
      this.user = {
        "fromDate": date.toJSON(),
        "toDate": toTime
      }
    } else {
      let fromTime = '00:00:00'
      if (selectedData === 'today') {
        this.user = {
          "fromDate": (date.toJSON()).split('T')[0] + 'T' + fromTime,
          "toDate": toTime
        }
      } else if (selectedData === 'yesterday') {
        let yesterday = new Date(date.setDate(date.getDate() - 1));
        this.user = {
          "fromDate": (yesterday.toJSON()).split('T')[0] + 'T' + fromTime,
          "toDate": (yesterday.toJSON()).split('T')[0] + 'T23:59:59'
        }
      }
    }
  }

  track(mode) {
    if (mode == 'stop') {
      this.showdataMarker.stop = !this.showdataMarker.stop
    } else if (mode == 'idle') {
      this.showdataMarker.idle = !this.showdataMarker.idle
    } else if (mode == 'overspeed') {
      this.showdataMarker.overSpeed = !this.showdataMarker.overSpeed
    } else if (mode == 'running') {
      this.showdataMarker.running = !this.showdataMarker.running
    }
    this.mapService.clearLayers(this.map, [1])
    this.plotMarkers("")
    this.plotChangeMarker();
  }

getInBetweenDate(){
  this.commonService.presentLoader();
const url = serverUrl.web + '/trackHistory/trackhistoryVTS';
const body = {"vin":this.selectedVin.vin
,"fromDate":this.datePipe.transform(this.user.fromDate, 'yyyy-MM-dd'),
"toDate":this.datePipe.transform(this.user.toDate, 'yyyy-MM-dd'),
"fromTime":this.datePipe.transform(this.user.fromDate, 'h:mm:ss a'),
"toTime":this.datePipe.transform(this.user.toDate, 'h:mm:ss a')
}
this.ajaxService.ajaxPostMethod(url, body)
.subscribe(res =>{
  if(res.length > 0){
  let data = []
  
  for(let i =0 ; i < res.length; i++){
    data.push({"From" : res[i].split('#')[0], "To" : res[i].split('#')[1]})
  }
  this.renderer = (row: number, column: any, value: string,) => {
    if (value == "" || null || undefined) {
      return "----"
    }
    else {
      return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
    }
  }
  // this.userSelected.fromDate = this.datePipe.transform(res[0].split('#')[0], 'yyyy-MM-dd') + " " + this.datePipe.transform(res[0].split('#')[0], 'HH:mm:ss')
  // this.userSelected.toDate = this.datePipe.transform(res[0].split('#')[0], 'yyyy-MM-dd') + " " + this.datePipe.transform(res[0].split('#')[1], 'HH:mm:ss')
  this.source = { localdata: data};
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          { text: "From Date", datafield: 'From', cellsrenderer: this.renderer },
          { text: "To Date", datafield: 'To', cellsrenderer: this.renderer }
        ]
        this.myGrid.updatebounddata();
        setTimeout(() => {
          this.myGrid.selectrow(0)
        }, 1000);
        
  //console.log(res)
  // this.getHistory()
      }else{
        this.commonService.dismissLoader()
        this.commonService.presentAlert("Record not found", "There is no record found in this vehicle")
      }
})

}
myGridOnRowSelect($event){
  //console.log($event)
  if(!this.commonService.isLoading)
  this.commonService.presentLoader();
  if($event.args.row == undefined){
this.userSelected.fromDate = this.datePipe.transform(this.user.fromDate, 'yyyy-MM-dd') + " " + this.datePipe.transform(this.user.fromDate, 'HH:mm:ss')
  this.userSelected.toDate = this.datePipe.transform(this.user.toDate, 'yyyy-MM-dd') + " " + this.datePipe.transform(this.user.toDate, 'HH:mm:ss')
  
  }else{
  this.userSelected.fromDate = this.datePipe.transform($event.args.row.From, 'yyyy-MM-dd') + " " + this.datePipe.transform($event.args.row.From, 'HH:mm:ss')
  this.userSelected.toDate = this.datePipe.transform($event.args.row.To, 'yyyy-MM-dd') + " " + this.datePipe.transform($event.args.row.To, 'HH:mm:ss')
  }
  this.getHistory()
  
}

  getHistory() {
    if(!this.commonService.isLoading)
      this.commonService.presentLoader();
    this.playbackUpdater.status = false;
    this.mapService.clearLayers(this.map, [1, 2]);
    var url;
    if(this.myPlatform == "desktop"){
      url = serverUrl.web + '/device/trackhistory?vehicleNo=' + this.selectedVin.vin + '&fromDate=' + this.datePipe.transform(this.userSelected.fromDate, 'yyyy-MM-dd') +
      '&fromtime=' + this.datePipe.transform(this.userSelected.fromDate, 'HH:mm:ss') + '&totime=' + this.datePipe.transform(this.userSelected.toDate, 'HH:mm:ss');
   
   } else{
    url = serverUrl.web + '/device/trackhistory?vehicleNo=' + this.selectedVin.vin + '&fromDate=' + this.datePipe.transform(this.user.fromDate, 'yyyy-MM-dd') +
    '&fromtime=' + this.datePipe.transform(this.user.fromDate, 'HH:mm:ss') + '&totime=' + this.datePipe.transform(this.user.toDate, 'HH:mm:ss');
 
    }
      // let body = {
    //   "vin": this.selectedVin.vin,
    //   "fromDate": this.datePipe.transform(this.user.fromDate, 'yyyy-MM-dd') + " " + this.datePipe.transform(this.user.fromDate, 'hh:mm:ss a'),
    //   "toDate": this.datePipe.transform(this.user.fromDate, 'yyyy-MM-dd') + " " + this.datePipe.transform(this.user.toDate, 'hh:mm:ss a'),
    // }
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.trackHistoryCurrentRes = res;
        this.commonService.dismissLoader();
        if (localStorage.map != "GoogleMap") {
          this.map.on('singleclick', async (evt) => {
            this.popupView = true;
            let feature: any;
            var pixel = this.map.getEventPixel(evt);
            feature = await this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
              if (feature.values_.title == "lineString") {
                return feature;
              }
            });
            if (feature.values_.title == "lineString" && feature.values_.title !== "") {

              const url = serverUrl.web + "/login/company/latlngtoaddress/" + feature.values_.name.latitude + "/" + feature.values_.name.longitude + "/" + localStorage.corpId;
              this.ajaxService.ajaxGetObject(url)
                .subscribe(res => {
                  if (this.myPlatform == "desktop") {
                    if (res.length > 5) {
                      var location = res;
                      //console.log(res);
                      const container = document.getElementById('popup');
                      const content = document.getElementById('popup-content');
                      const closer = document.getElementById('popup-closer');
                      const overlay = new Overlay({
                        element: container,
                        autoPan: true,
                        autoPanAnimation: {
                          duration: 250
                        }
                      });
                      this.map.addOverlay(overlay);
                      const coordinate = evt.coordinate;
                      content.innerHTML = '<h2 style="margin-bottom: -26px;border: 1px solid black;margin-top: -1px;background-color: lightgrey;text-transform: uppercase;text-align: center;">' +
                        feature.values_.name.vehicleStatus + '</h2><br><p>TIME:' + feature.values_.name.timeStamp + '</p><p style="margin-top: -11px;">SPEED:' +
                        feature.values_.name.speed + '</p><p style="margin-top: -11px;">LATLNG:' + feature.values_.name.latitude + ',' + feature.values_.name.longitude +
                        '</p>' + '</p><p style="margin-top: -11px;">LOCATION:' + location +
                        '</p>';
                      overlay.setPosition(coordinate);
                      closer.onclick = function () {
                        overlay.setPosition(undefined);
                        closer.blur();
                        return false;
                      };
                    }
                    else {
                      this.markerAddress = "---";
                    }
                  } else {
                    //console.log(this.traveVinData)
                    this.traveVinData['status'] = feature.values_.name.vehicleStatus;
                    this.traveVinData['latitude'] = parseFloat(feature.values_.name.latitude);
                    this.traveVinData['longitude'] = parseFloat(feature.values_.name.longitude);
                    this.traveVinData['timeStamp'] = feature.values_.name.timeStamp;
                    this.traveVinData['speed'] = feature.values_.name.speed;
                    this.traveVinData['odometer'] = feature.values_.name.odometer;
                    this.traveVinData['location'] = location
                  }
                });

            }
            if (!feature) {
              this.markerInfo["show"] = false;
            }

          })
        }
        this.trackHistoryData(res);
      })

  }

  showLocation(data) {
    // dt.location = "bhdsh"
    const url = serverUrl.web + "/login/company/latlngtoaddress/" + data.latitude + "/" + data.longitude + "/" + localStorage.corpId;
    this.ajaxService.ajaxGetObject(url)
      .subscribe(res => {
        if (JSON.stringify(res) == "{}") {
          data.location = data.latitude + ',' + data.longitude;
        } else {
          data.location = res;
        }

      });
  }
  trackHistoryData(data) {
    this.displayPlay = false;
    this.displayPause = true;
    this.displayStop = true;
    // this.playback.unsubscribe();
    this.liveCount = 0;
    this.trackHistoryJson = data.routeGeometry;
    //console.log(data);
    // tslint:disable-next-line:prefer-const
    let trackHistoryArray = [];
    this.trackHistoryJson.forEach(function (
      value) {
      if (value.latitude !== 0 && value.longitude !== 0) {
        trackHistoryArray.push({
          lat: value.latitude,
          lng: value.longitude
        });
      }
    });
    this.plotBackTrackingPath(trackHistoryArray, true);
  }

  plotBackTrackingPath(finalpath, check) {
    if (finalpath.length === 0) {
      this.commonService.presentAlert('Alert', 'No data available');
      this.mapService.clearLayers(this.map, [1, 2]);
      this.commonService.dismissLoader();
    } else {
      this.mapService.createLine(this.map, finalpath);
      this.commonService.dismissLoader();
      this.checkingPlotMarkers(['stop', 'idle', 'Speed']);

    }
  }

  checkingPlotMarkers(data) {
    for (let cnt = 0; cnt < data.length; cnt++) {
      this.plotMarkers(data[cnt]);
    }
    return;
  }

  plotMarkers(mode) {
    for (let cnt = 0; cnt < 2; cnt++) {
      this.populateMarker(this.trackHistoryJson, cnt, mode);
      this.plotChangeMarker();
    }
  }
  plotChangeMarker() {
    let json = this.trackHistoryJson
    for (let cnt = 1; cnt < this.trackHistoryJson.length - 1; cnt++) {
      let source = {
        lat: parseFloat(json[cnt]['latitude']),
        lng: parseFloat(json[cnt]['longitude'])
      };
      const currSpeed = parseInt(json[cnt]['speed']);
      const currEng = json[cnt]['engine'];
      // tslint:disable-next-line:radix
      const speedLimitForMarker = parseInt(json[cnt]['overSpeed']);
      // tslint:disable-next-line:radix
      const PreviousspeedLimitForMarker = parseInt(json[cnt - 1]['overSpeed']);
      let icon = 'assets/trackHistoryIcons/oldblue.png';
      const diffMin = this.commonService.secondstoHHMMSSCal(
        new Date(json[cnt + 1]['timeStamp']), new Date(json[cnt]['timeStamp']));
      if (json[cnt]['vehicleStatus'] == "Stop" && this.showdataMarker.stop == true) {
        icon = 'assets/trackHistoryIcons/oldred.png';
        // this.createMarkerforStopIdle(source, icon, diffMin, 'Stop', json[cnt]['timeStamp'], currSpeed);
        json[cnt]["duration"] = diffMin;
        this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      } else if (json[cnt]['vehicleStatus'] == "Idle" && this.showdataMarker.idle == true) {
        icon = 'assets/trackHistoryIcons/oldblue.png';
        json[cnt]["duration"] = diffMin;
        this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      } else if (json[cnt]['vehicleStatus'] == "Overspeed" && this.showdataMarker.overSpeed == true) {
        icon = 'assets/trackHistoryIcons/oldorange.png';
        // this.createMarkerforStopIdle(source,
        //   icon, diffMin, 'Overspeed',
        //   json[cnt]['timeStamp'],
        //   currSpeed);
        this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      } else if (json[cnt]['vehicleStatus'] == "Running" && this.showdataMarker.running == true) {
        icon = 'assets/trackHistoryIcons/oldgreen.png';
        const statusForHistory = this.commonService
          .liveTrackingStatus(this.selectedVin.vin, "Running");
        // this.createMarkerforStopIdle(source,
        //   icon, diffMin,
        //   statusForHistory,
        json[cnt]['vehicleStatus'] = statusForHistory;
        //   currSpeed);
        this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      }
      // if ((currEng === 'false' && currSpeed === 0) || json[cnt]['vehicleStatus'] == "Stop") {
      //   if (this.showdataMarker.stop == true) {
      //     icon = 'assets/trackHistoryIcons/oldred.png';
      //     // this.createMarkerforStopIdle(source, icon, diffMin, 'Stop', json[cnt]['timeStamp'], currSpeed);
      //     json[cnt]["duration"] = diffMin;
      //     this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      //   }
      // } else if (json[cnt]['vehicleStatus'] === 'Idle') {
      //   if (this.showdataMarker.idle == true) {
      //     icon = 'assets/trackHistoryIcons/oldblue.png';
      //     // this.createMarkerforStopIdle(source,
      //     //   icon, diffMin, 'Idle',
      //     //   json[cnt]['timeStamp'], currSpeed);
      //     json[cnt]["duration"] = diffMin;
      //     this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      //   }
      // } else if ((currEng === 'true' || currEng === 'false') && currSpeed > 0) {
      //   if (PreviousspeedLimitForMarker !== speedLimitForMarker) {
      //     if (this.showdataMarker.overSpeed == true) {
      //       icon = 'assets/trackHistoryIcons/oldorange.png';
      //       // this.createMarkerforStopIdle(source,
      //       //   icon, diffMin, 'Overspeed',
      //       //   json[cnt]['timeStamp'],
      //       //   currSpeed);
      //       this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      //     }
      //   }
      // else {
      //   if (this.showdataMarker.running == true) {
      //     icon = 'assets/trackHistoryIcons/oldgreen.png';
      //     const statusForHistory = this.commonService
      //       .liveTrackingStatus(this.selectedVin.vin, "Running");
      //     // this.createMarkerforStopIdle(source,
      //     //   icon, diffMin,
      //     //   statusForHistory,
      //       json[cnt]['vehicleStatus'] =statusForHistory;
      //     //   currSpeed);
      //     this.mapService.addMarkerWithInfoWindow(this.map, source, json[cnt], icon);
      //   }
      // }
      // }
    }
    this.mapService.fitBounds(this.map, 2);
  }
  populateMarker(json, cnt, mode) {
    let source = {
      lat: parseFloat(json[cnt]['latitude']),
      lng: parseFloat(json[cnt]['longitude'])
    };
    // tslint:disable-next-line:radix
    const currSpeed = parseInt(json[cnt]['speed']);
    if (cnt === 0) {
      const starticon = 'assets/vtstrackhisIcon/startFlag.png';
      this.createMarkerforStopIdle(source, starticon, '', 'Beginning of Trip',
        json[cnt]['timeStamp'], currSpeed);
    }
    if (cnt == 1) {
      cnt = this.trackHistoryJson.length - 1;
      source = {
        lat: parseFloat(json[cnt]['latitude']),
        lng: parseFloat(json[cnt]['longitude'])
      };
      const endicon = 'assets/vtstrackhisIcon/endFlag.png';
      this.createMarkerforStopIdle(source, endicon, '',
        'End of Trip', json[cnt]['timeStamp'],
        currSpeed);
      this.mapService.fitBounds(this.map, 1);
    }
  }

  createMarkerforStopIdle(source, icon, diffrenceinMin, status, time, speed) {
    let min = '', speedCheck = '';
    let contentString: object = {};
    contentString["status"] = status;
    if (status === 'Stop') {
      contentString["duration"] = diffrenceinMin;
    } else if (status === 'Idle') {
      contentString["duration"] = diffrenceinMin;
    } else {
      contentString["speed"] = speed;
    }
    contentString["latlng"] = source;
    contentString["timeStamp"] = time;
    const dateTime = time.split(' ')[0] + ' ' + time.split(' ')[1];
    const amPm = time.split(' ')[2];
    this.mapService.addMarkerWithInfoWindow(this.map, source, contentString, icon);
  }

  stopMapToDefaultView() {
    this.playbackUpdater.status = false;
    this.trackHistoryData(this.trackHistoryCurrentRes);
  }

  async moveVehicleInMap(action, type) {
    this.showSwipeModal = false;

    if (type == "default") {
      (this.display == "play") ? this.display = 'pause' : this.display = 'play';
      (this.display == "play") ? this.show = true : this.show = false;
    }
    if (type == "trigger") {
      clearInterval(this.interval);
    }
    if (action == "play") {
      this.playbackUpdater.status = true;
    }
    this.playbackIcon = 'assets/vtsicon/CAR/Running.svg';
    //	 document.getElementById("svgIcon").fill = "red";
    //	var playbackIcon = document.getElementById("svgIcon");
    if (this.trackHistoryJson.length) {
      if (this.liveCount == 0) {
        this.mapService.clearLayers(this.map, [1, 2])
        var latitude = parseFloat(this.trackHistoryJson[0]['latitude']);
        var longitude = parseFloat(this.trackHistoryJson[0]['longitude']);
        var len = this.trackHistoryJson.length - 1;
        this.mapService.addMarker(this.map, { lat: latitude, lng: longitude }, 'playback', this.playbackIcon);
      }

      if (action == 'play') {
        this.displayPlay = true;
        this.displayStop = false;
        this.displayPause = false;
        // asyncScheduler.schedule(async ()=>{
        //   await this.intervalLoop();
        // }, 3000);                    
        this.playback = this.startInterval(this.playBackSpeed);
        // this.playback = this.startInterval(3000);  
        await this.intervalLoop();
      } else if (action == 'pause') {
        this.displayPlay = false;
        this.displayPause = true;
        this.displayStop = false;
        //  this.playback.unsubscribe();
        clearInterval(this.interval);
      } else {
        this.displayPlay = false;
        this.displayPause = true;
        this.displayStop = true;
        this.liveCount = 0;
        this.mapService.removeMarkersById(this.map, 'playback');
        // this.playback.unsubscribe();
        this.show = true
        clearInterval(this.interval);
        this.display = 'play'
        this.playbackUpdater.status = false;
        this.trackHistoryData(this.trackHistoryCurrentRes);
      }
    }
    this.mapService.fitBounds(this.map, 2);
  }

  async intervalLoop() {
    while (this.liveCount < this.trackHistoryJson.length) {
      var latitude = parseFloat(this.trackHistoryJson[this.liveCount]['latitude']);
      var longitude = parseFloat(this.trackHistoryJson[this.liveCount]['longitude']);
      if (this.trackHistoryJson[this.liveCount]['vehicleStatus'] != "") {
        this.traveVinData['status'] = this.trackHistoryJson[this.liveCount]['vehicleStatus'];
      } else if (this.trackHistoryJson[this.liveCount]['vehicleStatus'] == "") {
        this.traveVinData['status'] = "Running";
      }
      // const url = serverUrl.web + "/api/vts/company/latlngtoaddress/" + latitude + "/" + longitude + "/" + localStorage.corpId;
      // this.ajaxService.ajaxGetObject(url)
      //   .subscribe(res => {
      //     this.traveVinData['location'] = res;
      //   });
      this.traveVinData['latitude'] = parseFloat(this.trackHistoryJson[this.liveCount]['latitude']);
      this.traveVinData['longitude'] = parseFloat(this.trackHistoryJson[this.liveCount]['longitude']);
      this.traveVinData['timeStamp'] = this.trackHistoryJson[this.liveCount].timeStamp.split(" ")[0] + " " + this.trackHistoryJson[this.liveCount].timeStamp.split(" ")[1];
      this.traveVinData['speed'] = this.trackHistoryJson[this.liveCount]['speed'];
      // this.traveVinData['odometer'] = this.trackHistoryJson[this.liveCount]['odometer'];
      this.traveVinData['odometer'] = "";

      this.playbackUpdater["timeStamp"] = this.trackHistoryJson[this.liveCount].timeStamp.split(" ")[0] + " " + this.trackHistoryJson[this.liveCount].timeStamp.split(" ")[1];
      this.playbackUpdater["speed"] = this.trackHistoryJson[this.liveCount]['speed'];
      if (this.playBackOdometer == 0) {
        this.playBackOdometer = this.trackHistoryJson[this.liveCount]["odometer"] / 1000;
      } else {
        this.playBackOdometer = this.playBackOdometer + (this.trackHistoryJson[this.liveCount]["odometer"] / 1000);
      }

      this.playbackUpdater["odometer"] = this.playBackOdometer.toFixed(3);
      let lineArray = new Array(2);
      if (this.liveCount > 0) {
        let prevLatLng = {
          "lat": parseFloat(this.trackHistoryJson[this.liveCount - 1]['latitude']),
          "lng": parseFloat(this.trackHistoryJson[this.liveCount - 1]['longitude'])
        }
        let currLatLng = {
          "lat": latitude,
          "lng": longitude
        }
        lineArray = [prevLatLng, currLatLng];
        if (this.trackHistoryJson[this.liveCount]['speed'] != "0") {
          this.mapService.moveMarker(this.map, 'playback', longitude, latitude, this.playbackIcon, '', lineArray);
          this.liveCount++;
          break;
        } else if (this.liveCount == this.trackHistoryJson.length - 1) {
          this.mapService.moveMarker(this.map, 'playback', longitude, latitude, this.playbackIcon, '', lineArray);
        } else {
          this.mapService.moveMarker(this.map, 'playback', longitude, latitude, this.playbackIcon, '', lineArray);

        }
        this.liveCount++;
      } else {
        this.liveCount++;
      }

      // var amPm = commonAjaxService.custumTranslate($scope.trackHistoryJson[this.liveCount].timeStamp.split(" ")[2]);
      // var content = commonAjaxService.custumTranslate('speed')+ " : "
      // + $scope.trackHistoryJson[this.liveCount]['speed']+' '
      // + commonAjaxService.custumTranslate('km')+ '\n'
      // + commonAjaxService.custumTranslate('Date')+ " : "
      // + time+" "+amPm;

    }
    if (this.liveCount == this.trackHistoryJson.length) {
      this.moveVehicleInMap('pause', 'default')
      this.liveCount = 0;
      this.show = true;
      clearInterval(this.interval);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }



  async delay(milliseconds: number) {
    return new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

  async startInterval(milliseconds: number) {
    return new Promise<void>(resolve => {
      this.interval = setInterval(async () => {
        await this.intervalLoop();
      }, milliseconds);
    });
  }
  playbackSpeedTrigger(speed) {
    if (speed >= 0 && speed <= 125) {
      this.playBackSpeed = 1000;
    } else if (speed >= 125 && speed <= 250) {
      this.playBackSpeed = 500;
    } else if (speed >= 250 && speed <= 500) {
      this.playBackSpeed = 125;
    } else if (speed >= 500 && speed <= 1000) {
      this.playBackSpeed = 65;
    }

    if (this.display == "pause")
      this.moveVehicleInMap("play", "trigger");
  }


  ngOnChanges() {
    if (this.gridLiveChange) {
      this.selectedVin = JSON.parse(localStorage.selectedVin);
      this.traveVinData = this.selectedVin;
      //console.log('sdfd' + this.traveVinData.plateNo)
      this.ngOnInit();
    }
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }

    this.selectedVin = JSON.parse(localStorage.selectedVin);
    this.traveVinData = this.selectedVin;
    // this.user = {
    //   "fromDate": this.datePipe.transform(new Date().toISOString().split("T")[0] + " 00:00:00", 'yyyy-MM-dd HH:mm:ss'),
    //   "toDate": this.datePipe.transform(new Date().toISOString().split("T")[0] + " 23:59:00", 'yyyy-MM-dd HH:mm:ss')
    // }
    this.trackModal('today');
    this.popUp = (res) => {
      //console.log(res);
    }
    this.createMap();
    this.traveVinData['type'] = "trackhistory";

  }

}
