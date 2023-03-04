import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { adminLocalStorage } from 'src/environments/environment';

@Component({
  selector: 'app-assert-status-list',
  templateUrl: './assert-status-list.page.html',
  styleUrls: ['./assert-status-list.page.scss'],
})
export class AssertStatusListPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  catagories = ["All", "Online", "Offline", "Expiry"]
  selectedTab: any;
  showList: any;
  displayData: any;
  count: any = 15;
  currentPage: any = 1;
  dasboardDetail: any;
  countRowData: { All: any; Expiry: any; Stocks: any; Online: any; Offline: any };
  isValue=false;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  changeFilter(data) {
    this.selectedTab = data.detail.value
    // if(this.selectedTab == "All")
    // this.selectedTab = "Total"
    this.dasboardDetail = JSON.parse(adminLocalStorage.dealerLoginData);
    this.showList = this.dasboardDetail.assets[this.selectedTab]
    // this.showList = [{"imeiNo": "876756454565768", "status":"Online", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm", "companySuffix":"76876"}, {"imeiNo": "876756454565768", "status":"Offiline", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm"}, {"imeiNo": "876756454565768", "status":"Online", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm"},{"imeiNo": "876756454565768", "status":"Online", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm"}]
    this.getAssertList()

  }

  closePage() {
    this.location.back()
  }

  setDisplayData() {
    if (this.showList.length > this.count) {
      this.displayData = this.showList.slice(0, this.count);
    }
    else {
      this.displayData = this.showList;
    }
  }

  getAssertList() {
    this.setDisplayData();
  }

  doInfinite(event) {
    if(this.isValue){
      console.log("event trigger>>>>>>>")
      setTimeout(() => {
        console.log(this.showList)
        this.displayData.push(...this.displayData.slice(this.currentPage * this.count, (this.currentPage + 1) * this.count));
        this.currentPage++;
        event.target.complete();
        if (this.displayData.length == this.displayData.length) {
          event.target.disabled = true;
          setTimeout(() => {
            event.target.disabled = false;
          }, 3000);
        }
      }, 500);
    }else{
      console.log("event trigger")
      setTimeout(() => {
        console.log(this.showList)
        this.displayData.push(...this.showList.slice(this.currentPage * this.count, (this.currentPage + 1) * this.count));
        this.currentPage++;
        event.target.complete();
        if (this.displayData.length == this.showList.length) {
          event.target.disabled = true;
          setTimeout(() => {
            event.target.disabled = false;
          }, 3000);
        }
      }, 500);
    }
  }

  setFilteredLocations(ev){
    if(ev.target.value.length > 0){
    this.isValue=true;
      this.displayData = this.showList.filter((imei) => {
        if (imei.imei != null)
          return imei.imei.replace(/ /g,'').toLowerCase().includes(ev.target.value.replace(/ /g,''));
        else
          return false;
        });
        this.displayData = this.displayData.slice(0, this.count);
    }else{
      if (this.showList.length > this.count) {
        this.isValue=false;
        this.displayData = this.showList.slice(0, this.count);
      }
    }
 
}

  ngOnInit() {
    this.selectedTab = this.activatedRoute.snapshot.paramMap.get("type")
    // if(this.selectedTab == "All")
    // this.selectedTab = "Total"
    this.dasboardDetail = JSON.parse(adminLocalStorage.dealerLoginData);
    this.showList = this.dasboardDetail.assets[this.selectedTab]
    // this.showList = [{"imeiNo": "876756454565768", "status":"Online", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm", "companySuffix":"76876"}, {"imeiNo": "876756454565768", "status":"Offiline", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm"}, {"imeiNo": "876756454565768", "status":"Online", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm"},{"imeiNo": "876756454565768", "status":"Online", "warrantyExp":"27/02/45", "vin":"apm765", "timestamp":"27-09-2020 07:10:00 pm" ,"simNo": "9087657583787 / 4567655677655", "companyId": "apm"}]
    this.getAssertList()

    this.countRowData = {
      All: this.dasboardDetail.assets["All"].length,
      Expiry: this.dasboardDetail.assets["Expiry"].length,
      Stocks: this.dasboardDetail.assets["Stocks"].length,
      Online: this.dasboardDetail.assets["Online"].length,
      Offline: this.dasboardDetail.assets["Offline"].length,
    }
  }


}
