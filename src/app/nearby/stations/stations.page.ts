import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Network } from '@capacitor/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { app, serverUrl } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
})
export class StationsPage implements OnInit {
  proxyCROS = "https://cors-anywhere.herokuapp.com/";
  //proxyCROS = "https://github.com/Rob--W/cors-anywhere/";
  searchType;
  headerText;
  searchUrl;
  resultantNearByPlaceDetails;
  isOnline = true;
  lat;
  lng;
  nearbyType;
  paramVin;
  key;
  appName: string;
  constructor(
    public commonService: CommonService,
    public ajaxService: AjaxService,
    public activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }
  calcDist = function (destLat, destLng) {
    const radlat1 = Math.PI * this.lat / 180;
    const radlat2 = Math.PI * destLat / 180;
    const theta = this.lng - destLng;
    const radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344;
    return dist
  };
  getPlaceDetails = (type) => {
    // const url = serverUrl.web + '/login/getPreferences?key=armoronNearByKey&companyId=""'
   // this.ajaxService.ajaxGetPerference(url)
     // .subscribe(res => {
    //     let headerType;
    //     if (type === "Fuel") {
    //       this.searchType = "gas_station";
    //       this.searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.lat + ',' + this.lng + '&radius=7000&type=' + this.searchType + '&key=' + res[0] + '&sensor=true';
    //       //   { Old Key : AIzaSyA7SR8EayaN2qjiaUZbH9hUBz1G1VZy3sk}
    //     } else if (type === "Vehicle Repair") {
    //       this.searchType = "car_repair";
    //       this.searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.lat + ',' + this.lng + '&radius=7000&type=' + this.searchType + '&keyword=Automobiles|Bikes|Mechanic&key=' + res[0] + '&sensor=true';
    //     } else if (type === "Police Station") {
    //       this.searchType = "police";
    //       this.searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.lat + ',' + this.lng + '&radius=7000&type=' + this.searchType + '&key=' + res[0] + '&sensor=true';
    //     }


    //     this.commonService.presentLoader();
    //  //  let senderData = this.proxyCROS + this.searchUrl;
    //     let senderData = this.searchUrl;
    //     this.ajaxService.ajaxGet(senderData)
    //       .subscribe(res => {
          
    //         this.commonService.dismissLoader();
    //         // this.commonService.presentToast(res)
    //         this.setResultantPlaceDetails(res);
            
    //       }, err => {
    //         console.log(err);
    //         this.commonService.dismissLoader();
    //         // this.commonService.presentToast(err)
    //       });
    //   });

      if (type === "Fuel") {
        this.searchType = "gas_station";
      } else if (type === "Vehicle Repair") {
        this.searchType = "car_repair";
      } else if (type === "Police Station") {
        this.searchType = "police";
      }
      var googleUrl = serverUrl.web + '/login/nearby/'+this.lat+'/'+this.lng+'/'+this.searchType; 
      this.commonService.presentLoader();
      this.ajaxService.ajaxGet(googleUrl).subscribe(res=>{
        // console.log(res)
        this.commonService.dismissLoader();
        this.setResultantPlaceDetails(res);
      })

  }

  locationBack() {
    this.location.back()
  
  }

  setResultantPlaceDetails = (res) => {
    //console.log(res);
    this.resultantNearByPlaceDetails = res;
    let resultedArray = [];
    if (res.status == 'OVER_QUERY_LIMIT' || res.status == "REQUEST_DENIED") {
      this.commonService.presentAlert('Alert', 'Something went wrong');
      this.headerText = this.nearbyType;
      this.key[this.nearbyType][0]['results'] = null;
      this.key[this.nearbyType][0]['status'] = null;
      this.key[this.nearbyType][0]['updater'] = false;
      localStorage.setItem(this.paramVin, JSON.stringify(this.key));
    } else {
      for (var x = 0; x < res.results.length; x++) {
        res.results[x] = {
          "geometry": res.results[x].geometry,
          "name": res.results[x].name,
          "place_id": res.results[x].place_id,
          "vicinity": res.results[x].vicinity,
          "opening_hours": res.results[x].opening_hours
        };
        // if(!res.results[x].hasOwnProperty('opening_hours')){
        //   res.results[x].status = "assets/notava.png";
        // }else{
        //   switch(res.results[x].opening_hours.open_now){
        //     case true:
        //     res.results[x].status = "assets/open.png";
        //     case false:
        //     res.results[x].status = "assets/close.png";
        //     default : 
        //     res.results[x].status = "assets/notava.png";
        //   }
        if (res.results[x].hasOwnProperty("opening_hours") && res.results[x].opening_hours) {
          if (Object.keys(res.results[x].opening_hours).length == 0) {
            res.results[x].status = "assets/notava.png";
          } else if (res.results[x]['opening_hours']['open_now'] == true) {
            res.results[x].status = "assets/open.png"
          } else {
            res.results[x].status = "assets/close.png";
          }
        } else {
          res.results[x].status = "assets/notava.png";
        }
        //    } 
      }
      let response = {
        "status": res.status,
        "results": res.results
      };
      Object.assign(this.key[this.nearbyType][0], response);
      this.headerText = this.nearbyType;
      this.key[this.nearbyType][0]['updater'] = true;
      localStorage.setItem(this.paramVin, JSON.stringify(this.key))
    }
    this.resultantNearByPlaceDetails = res.results;
    this.commonService.dismissLoader();
  }

  checkStatus = function (obj) {
    let img;
    if (!obj.hasOwnProperty('opening_hours') || Object.keys(obj).length == 0) {
      img = "assets/notava.png";
    } else {
      if (obj.hasOwnProperty('opening_hours').open_now == true) {
        img = "assets/open.png"
      } else {
        img = "assets/close.png";
      }
    }

  }
  locationSelected = function (placeName, placeAddress) {
    const latlong = this.lat + ',' + this.lng;
    window.location.href = 'https://www.google.com/maps/dir/?api=1&origin=' + latlong + '&destination=' + placeName + ',' + placeAddress + '&travelmode=driving';
  }
  contactSelected = function (placeId) {
    this.commonService.presentLoader();
    
       // const url = "https://maps.googleapis.com/maps/api/place/details/json?key='" + "AIzaSyA1Imewe0nOi5KoTk9thUxblLdQ-JeB6VQ"+ "'&placeid='" + placeId;
       const url = serverUrl.web +'/login/placeid/'+placeId
       this.ajaxService.ajaxGet(url) 
          .subscribe(res => {
            this.commonService.dismissLoader();
            let phoneNumber = res.result.formatted_phone_number;
            if (res.status == 'OVER_QUERY_LIMIT' || phoneNumber == 'OVER_QUERY_LIMIT') {
              this.commonService.presentAlert('Alert', 'Something went wrong');
            }
            if (phoneNumber === undefined) {
              this.commonService.presentAlert('Alert', 'Sorry,Contact is Not Available');
            }
            else {
              window.location.href = "tel:" + phoneNumber;
            }
          }, err => {
            console.log(err);
            this.commonService.dismissLoader();
          });
      
   
  }






  ngOnInit() {

  
      let selectedVin = JSON.parse(localStorage.getItem('selectedVin'));
      this.paramVin = selectedVin.vin
      this.appName = app.appName
      this.lat = selectedVin.latitude
      this.lng = selectedVin.longitude
      this.nearbyType = this.activatedRoute.snapshot.paramMap.get('type');
      if (this.key == null) {
        this.key = {};
        this.key[this.nearbyType] = [{ "prevLatlng": this.lat + ',' + this.lng }];
        this.getPlaceDetails(this.nearbyType);
      } else if (this.key[this.nearbyType] == undefined || this.key[this.nearbyType][0]['results'] == null) {
        this.key[this.nearbyType] = [{ "prevLatlng": this.lat + ',' + this.lng }];
        this.getPlaceDetails(this.nearbyType);
      }
      else if (this.key !== null && this.key[this.nearbyType][0]['prevLatlng'] == this.lat + ',' + this.lng && this.key[this.nearbyType][0]['updater'] == true) {
        this.setResultantPlaceDetails(this.key[this.nearbyType][0]);
      } else {
        this.key[this.nearbyType][0].prevLatlng = this.lat + ',' + this.lng;
        this.getPlaceDetails(this.nearbyType);
      }
    
   
    
  }
}
