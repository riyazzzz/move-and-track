import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AjaxService } from '../../services/ajax.service';
import { CommonService } from '../../services/common.service';
import { serverUrl } from 'src/environments/environment';


@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.page.html',
  styleUrls: ['./sales-report.page.scss'],
})
export class SalesReportPage implements OnInit {
  today = new Date();
  subscription = {
    fromDate: "",
    toDate: ""
  }
  subscriptionDates: any;
  subscriptionValue;
  exportTitle = [];
  pdfdatas = [];
  myPlatform;
  reportData: any;
  constructor(
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private router: Router,
    public modalController: ModalController

  ) {

  }
  getExpriyDates() {
    const url = serverUrl.web + '/login/getPreferences?key=subcriptionDropdown&companyId=""';
    this.ajaxService.ajaxGet(url).subscribe(res => {
      console.log(res);
    })
  }

  async closeModal() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/dashboard');
  }

  submit() {
    const url = serverUrl.web + '/device/installationreport/';
    const jsonReq = {
      fromDate: this.subscription.fromDate.split("T")[0],
      toDate: this.subscription.toDate.split("T")[0],
      "suffix":localStorage.getItem('companySuffix')
    }
    this.ajaxService.ajaxPostWithBody(url, jsonReq).subscribe(res => {
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


  ngOnInit() {
    var today = new Date();
    var first_date = today.getFullYear() + "-";
    first_date += (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()) + "-";
    first_date += "01";

    console.log(first_date);
    var last_date = today.getFullYear() + "-";
    last_date += (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()) + "-";
    last_date += new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    this.subscription.fromDate = first_date;
    this.subscription.toDate = last_date;
    console.log(this.subscription.fromDate, this.subscription.toDate, 'sample')
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
 }
}





