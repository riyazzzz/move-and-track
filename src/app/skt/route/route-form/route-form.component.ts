import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SktService } from 'src/app/services/skt.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent implements OnInit {
  @Input() value;
  data: any;
  routeTripLogin: FormGroup;
  companyDetail: { branchID: string; companyID: string; userId: string; };
  url: string;
  routeData: any;
  serviceName: any;
  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder,
    private http: HttpClientModule,
    private sktService: SktService,
    private ajaxService: AjaxService,
    private commonService: CommonService,
  ) { }
  routetype: any;
  vehicletype: any;
  type :any;

  async closeModal() {
    this.modalController.dismiss();
  }
 
  createForm() {
    this.routeTripLogin = this.formBuilder.group({
      // routeName: ['', Validators.required],
      plateNo: ['', Validators.required],
      // type: ['', Validators.required],
      tripName: ['', Validators.required],
      tripStarttime: ['', Validators.required],
      tripEndtime: ['', Validators.required],
    });
  }
  editForm() {
    if (this.value) {
      if (this.value.submit == "available") {
        this.serviceName = "available";
        this.routeTripLogin.patchValue({
          // routeName: this.value.routetype,
          plateNo: this.value.plateNo,
          // type: this.value.type,
          tripName: this.value.tripName,
          tripStarttime: this.value.tripStarttime,
          tripEndtime: this.value.tripEndtime,

        });
      }

    }
  }
  // getRoutename() {

  //   var url = serverUrl.web + `/routetrip/getRoutename?compId=${this.companyDetail.companyID}&branchId=${this.companyDetail.branchID}`;
  //   this.ajaxService.ajaxGetPerference(url)
  //     .subscribe(res => {
  //       this.routetype = res;
  //     })
  // }
  getVehiclename() {
    var url = serverUrl.web + `/routetrip/getVehiclename?compId=${this.companyDetail.companyID}&branchId=${this.companyDetail.branchID}`;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.vehicletype = res;
      })
  }
  // getTriptype() {
  //   var url = serverUrl.web + `/student/getPreferences?key=Triptype1&companyId=${this.companyDetail.companyID}`;
  //   this.ajaxService.ajaxGetPerference(url)
  //     .subscribe(res => {
  //       this.type = res;
  //     })
  // }
  onSubmit() {
    if (this.serviceName != "available") {
      var data:
      any = {
        "schoolId": this.companyDetail.companyID,
        "branchId": this.companyDetail.branchID,
        "emailId":this.companyDetail.userId,
        "routetype": this.routeTripLogin.value.routeName,
        "plateNo": this.routeTripLogin.value.plateNo,
        // "type": this.routeTripLogin.value.type,
        "tripName": this.routeTripLogin.value.tripName,
        "tripStarttime": this.routeTripLogin.value.tripStarttime,
        "tripEndtime": this.routeTripLogin.value.tripEndtime,
        "lastUpdBy": this.companyDetail.companyID

      }
      Object.keys(data).forEach((key) => (data[key] == null || data[key] == "") && delete data[key])
      const url = serverUrl.web + '/routetrip/addroute';
      this.ajaxService.ajaxPostWithString(url, data).subscribe(res => {
        if (res == '{"message":"Added Successfully"}') {
          this.commonService.presentToast("Added successfully");
          this.routeTripLogin.reset();
          this.modalController.dismiss();
        }
        else {
          this.commonService.presentToast('Please check the values');

        }
      })
    } else if (this.serviceName == "available") {
      var details =
       {
        "tripId": this.value.tripId,
        "schoolId": this.companyDetail.companyID,
        "branchId": this.companyDetail.branchID,
        "routetype": this.routeTripLogin.value.routeName,
        "plateNo": this.routeTripLogin.value.plateNo,
        // "type": this.routeTripLogin.value.type,
        "tripName": this.routeTripLogin.value.tripName,
        "tripStarttime": this.routeTripLogin.value.tripStarttime,
        "tripEndtime": this.routeTripLogin.value.tripEndtime,
            "lastUpdBy":this.companyDetail.userId,
}
      Object.keys(details).forEach((key) => (details[key] == null || details[key] == "") && delete details[key])
      const url = serverUrl.web + '/routetrip/updateroute';
      this.ajaxService.ajaxPostWithString(url, details).subscribe(res => {
        if (res == '{"message":"Updated Successfully"}') {
          this.commonService.presentToast('Updated succesfully');
          this.routeTripLogin.reset();
          this.modalController.dismiss();
        } else {
          this.commonService.presentToast('Try again later');

        }
      })
    }
 }

  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    // this.getRoutename();
    this.getVehiclename();
    // this.getTriptype();
    this.createForm();
    this.editForm();
  }

}
