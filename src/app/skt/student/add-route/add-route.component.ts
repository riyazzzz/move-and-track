import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ModalController, Platform, MenuController, AlertController } from '@ionic/angular';
import { serverUrl } from 'src/environments/environment';
import { toLonLat } from 'ol/proj';
import { Router } from '@angular/router';
import { AuthMapService } from 'src/app/services/auth-map.service';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service'
import { AddAlertsComponent } from '../add-alerts/add-alerts.component'
import { CommonService } from 'src/app/services/common.service';
import { AjaxService } from 'src/app/services/ajax.service';
declare var google;
@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss'],
})
export class AddRouteComponent implements OnInit {
  @Input() mode: string;
  // @Input() vin: string;
  // @Input() vinData: JSON;
  // selectedVinData = JSON.parse(localStorage.getItem('selectedVin'));
  range = 500;
  type: string;
@ViewChild('mapElement', { static: false }) mapElement;
@Input() value;
  studentDetails : FormGroup
  pickuproute:any;
  pickuptrip;
  pickupstop:any;
  update='' 
  droproute:any;
  droptrip:any;
  dropstop:any;
  pstop:any
  dstop:any;
  tripdetails:any;
  map: any;
  editableData;
  subscription: any;
  selectValue ='';
  click = 1;
  myPlatform: any;
  routeinfo: any;
  editselectbox: boolean=false;
  trip: any;
  sel_trip;
  a: any;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private mapService: AuthMapService,
    public nav: NavParams,
    public gMapService: GoogleMapService,
    public olMapService: OpenlayerMapService,
    private menuController: MenuController,
    private platform: Platform,
    private alertController:AlertController,
    public commonService: CommonService,
    public ajaxService: AjaxService,
  ) 
  {
      this.mapService = new OpenlayerMapService(); 
  }
  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribe(async () => {
      if (this.menuController.isOpen()) {
        this.menuController.close()
      }
    });
  }
  closeModel() {
    this.modalController.dismiss();
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  createMap(mode) {
    this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: 11.127123, lng: 78.656891 }, false, false);
    this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    const dashboard = JSON.parse(localStorage.getItem('dashboardData'));
    let latLng;
    if (mode === 'edit') {
      const detailsString =this.routeinfo.routeinfo.studLoc;
      const getLatLng = detailsString.split('|');
      const southwest = getLatLng[0].split(',');
      const northeast = getLatLng[1].split(',');
      const south = parseFloat(southwest[0].split(',')[0]);
      const west = parseFloat(southwest[1].split(',')[0]);
      const north = parseFloat(northeast[0].split(',')[0]);
      const east = parseFloat(northeast[1].split(',')[0]);
      latLng = { lat: south, lng: west };
      this.onClickLocationGetter();
      this.range = this.calculateRadius(north, east, south, west);
    }
    this.mapService.addMarker(this.map, latLng, 'studentroute', 'assets/vtstrackhisIcon/Idle.png');
    this.mapService.createCircle(this.map, latLng, this.range, '');
    this.mapService.fitBounds(this.map, 2);

  }
  setRange(range) {
    this.range = range;
    this.mapService.setCircleRadius(this.range);
  }
  getpickuptrip(){
    const url=serverUrl.web + '/student/route/details?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
      this.tripdetails = JSON.parse(res);
      console.log(this.tripdetails)
   this.pickuptrip=Object.keys(this.tripdetails);

      })
}
getpickuproute(ev){
  this.studentDetails.patchValue({
    pickuproute : ''
  })
this.pickuproute = Object.keys(this.tripdetails[ev.target.value])
this.sel_trip = ev.target.value

}
getpickupstop(ev)
{
  this.studentDetails.patchValue({
    pickupstop : ''
  })
this.pickupstop=this.tripdetails[this.sel_trip][ev.target.value]

}
getdroptrip(){
  const url=serverUrl.web + '/student/route/details?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
      this.tripdetails = JSON.parse(res);
this.droptrip=Object.keys(this.tripdetails);
})
}
getdroproute(ev){
  this.studentDetails.patchValue({
    droproute : ''
  })
this.droproute = Object.keys(this.tripdetails[ev.target.value])
this.sel_trip = ev.target.value

  }
getdropstop(ev){
  this.studentDetails.patchValue({
    dropstop : ''
  })
this.dropstop=this.tripdetails[this.sel_trip][ev.target.value]
}
  getAddressLatlng(address) {
    if(address != ""){
      let data:any = parseFloat(address.split(",")[0])
    if( data.toString() != "NaN"){
      if(address.split(",")[1]){
        this.mapService.setCenter(this.map, { lat: parseFloat(address.split(",")[0]), lng: parseFloat(address.split(",")[1]) })
      }
    }else if( data.toString() == "NaN"){
      this.ajaxService.ajaxGet('https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=' + address + '&format=json&limit=1')
      .subscribe(res => {
        if (res.length > 0) {
          let latLng = { lat: res[0].lat, lng: res[0].lon }
          this.mapService.setCenter(this.map, { lat: parseFloat(res[0].lat), lng: parseFloat(res[0].lon) })
        }
        else
        {
          this.commonService.presentToast("Can't able to get your location")
        }
         })}
    }
  }
  calculateRadius = function (south, west, north, east) {
    const R = 6378.137; // Radius of earth in KM
    const dLat = (north - south) * Math.PI / 180;
    const dLon = (east - west) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(south * Math.PI / 180)
      * Math.cos(north * Math.PI / 180)
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math
      .sqrt(1 - a));
    const d = R * c;
    return Math.round(d * 1000);
  };

  async closeModal() {
    this.modalController.dismiss();
  }

  submit(){
  // const geoBounds = this.mapService.circleGeoZone();
  // var geoloc=geoBounds
  var data= {
    "stin":this.value,
    "pickupId":this.studentDetails.value.pickupstop,
    "dropIp":this.studentDetails.value.dropstop,
   "geoloc":""
  }
  if(this.update == 'available'){
  var url = serverUrl.web + "/student/config/studentroute";
  }
  this.ajaxService.ajaxPostMethod(url,data).subscribe( async res=>{
  
 if(res.message == "success"){
  this.commonService.presentToast('Student Details Route Info Updated sucessfully');
  this.studentDetails.reset();
  this.modalController.dismiss();
}
else
{
  this.commonService.presentToast('Please contact support team'); 
}
})
  

  }
 editmethod(){
    const url=serverUrl.web + '/student/get/studentdetails?stin='+this.value;
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
      this.routeinfo= JSON.parse(res); 
      this.update = "available";
      this.pickuproute=Object.keys(this.tripdetails[this.routeinfo.routeinfo.pickupTrip])
      this.droproute=Object.keys(this.tripdetails[this.routeinfo.routeinfo.dropTrip])
      this.pickupstop=this.tripdetails[this.routeinfo.routeinfo.pickupTrip][this.routeinfo.routeinfo.pickupRoute]
      this.dropstop=this.tripdetails[this.routeinfo.routeinfo.dropTrip][this.routeinfo.routeinfo.dropRoute]
      this.studentDetails.patchValue({
       pickuptrip:this.routeinfo.routeinfo.pickupTrip,
       pickuproute:this.routeinfo.routeinfo.pickupRoute,
        pickupstop:this.routeinfo.routeinfo.pickupStop,
        droptrip:this.routeinfo.routeinfo.dropTrip,
        droproute:this.routeinfo.routeinfo.dropRoute,
        dropstop:this.routeinfo.routeinfo.dropStop
         })
      })

    }
    createForm(){
    this.studentDetails= this.formBuilder.group({
        pickuproute:['',Validators.required ],
        pickuptrip:['',Validators.required ],
        pickupstop:['',Validators.required ],
        droproute:['',Validators.required ],
        droptrip:['',Validators.required ],
        dropstop:['',Validators.required ],
     })
}





  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
   
    this.createForm();
    this.getpickuptrip();
    this.getdroptrip();
    this.editmethod();
    this.type = this.mode;
    setTimeout(() => {
      this.createMap(this.type);
    }, 2000);
  }
  
  onClickLocationGetter() {
    this.map.on('click', async (evt) => {
      this.mapService.clearLayers(this.map, [1, 2]);
      const coordinates = evt.coordinate;
      let latLng = toLonLat([coordinates[0], coordinates[1]]);
      latLng = { lat: latLng[1], lng: latLng[0] };
      if (this.click > 1) {
        this.mapService.clearLayers(this.map, [1, 2]);
      }
      this.mapService.addMarker(this.map, latLng, '', 'assets/vtstrackhisIcon/Idle.png');
      this.mapService.createCircle(this.map, latLng, this.range,'');
      this.click++;
    });
  }
}


