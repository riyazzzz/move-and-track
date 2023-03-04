import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {
  companyDetail: { branchID: string; companyID: string; userId: string; };
  detail: any = { firstName: "", lastName: "" };

  constructor(
    private router: Router,
    private location: Location,
    private ajaxService: AjaxService,
  ) { }
  closePage() {
    this.location.back()
  }

  getProfile() {
    let jsonData = {
      "companyId": this.companyDetail.companyID,
      "userName": this.companyDetail.userId
    }
    const url = serverUrl.web + '/user/getUserDetails';
    this.ajaxService.ajaxPostWithBody(url, jsonData).subscribe(res => {
      console.log(res);

      this.detail = res;
    })
  }
  ionViewWillEnter() {
    this.getProfile();
  }
  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }


  }

}
