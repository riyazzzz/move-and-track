import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import { ExportExcelService } from '../../services/export-excel.service';

import { AjaxService } from '../../services/ajax.service';
import { CommonService } from '../../services/common.service';
import { CountriesService } from '../../services/countries.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  today = new Date();
  subscription = {
    fromDate: "",
    toDate: ""
  }
  subscriptionDays = [{ days: 45 }, { days: 30 }, { days: 15 }];
  subscriptionDates: any;
  subscriptionValue;
  exportTitle = [];
  pdfdatas = [];
  myPlatform;
  reportData: any;
  suffix: any;
  constructor(
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private countries: CountriesService,
    private router: Router,
    public modalController: ModalController,
    private ete: ExportExcelService,
    private platform: Platform,
  ) { }
  getExpriyDates() {
    const url = serverUrl.web + '/login/getPreferences?key=subcriptionDropdown&companyId=""';
    this.ajaxService.ajaxGet(url).subscribe(res => {
      console.log(res);
      this.subscriptionDates = res;
    })
  }

  async closeModal() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/dashboard');
  }
  submit() {
    const url = serverUrl.web + '/global/getExpiryList';
    let jsonData = {
      "fromExpiryDate": this.subscription.fromDate.split("T")[0],
      "toExpiryDate": this.subscription.toDate.split("T")[0],
      "suffix":localStorage.getItem('companySuffix')
    }
    this.ajaxService.ajaxPostWithBody(url, jsonData).subscribe(res => {
      localStorage.setItem('SubscriptionDatas', JSON.stringify(res));
      // if (res.length != 0)
      //   this.commonService.presentToast("Nodata found!")
      // else
      //   this.reportData = res
      if (res.length != 0)
      this.reportData = res;
 else
 this.commonService.presentToast("Nodata found!")
      if (this.commonService.isLoading)
        this.commonService.dismissLoader();

    })

  }
  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    console.log(dateObj);
    var month = (dateObj.getMonth() + 1) + ''
    const date = dateObj.getDate() + ''
    const year = dateObj.getFullYear() + ''
    var expiryDate = year + '-' + month + '-' + date
    return expiryDate;

  }
  subscriptionData(ev) {
    let data = Number(ev.detail.value);
    var t = new Date();
    let currentmonth = t.getMonth()+1;
    let todayDate = t.getFullYear()+'-'+ currentmonth+'-'+t.getDate();
    t.setDate(t.getDate() + data);
    var month = "0" + (t.getMonth() + 1);
    var date = "0" + t.getDate();
    month = month.slice(-2);
    date = date.slice(-2);
    var date = t.getFullYear() + '-' + month + '-' + date;
    //console.log(date);
   
    if (ev.detail.value) {
      this.subscription.fromDate = todayDate,
        this.subscription.toDate = date
        if(this.reportData.length > 0){
          this.submit();
        }
    }
  }

  ngOnInit() {
    // this.getExpriyDates();
    var today = new Date();
    var first_date = today.getFullYear() + "-";
    first_date += (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()) + "-";
    first_date += "01";

    console.log(first_date);
    var last_date = today.getFullYear() + "-";
    last_date += (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()) + "-";
    last_date += new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    console.log("<br>" + last_date);

    this.subscription.fromDate = first_date;
    this.subscription.toDate = last_date;
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
  }
}
