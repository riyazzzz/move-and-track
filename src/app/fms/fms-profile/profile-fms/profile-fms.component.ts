import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { app, serverUrl } from '../../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile-fms',
  templateUrl: './profile-fms.component.html',
  styleUrls: ['./profile-fms.component.scss'],
})
export class ProfileFmsComponent implements OnInit {

  app: any = { logo: 'logo.png' };
  myPlatform: any;
  public uploader: FileUploader = new FileUploader({});
  profileForm: FormGroup;
  hide = true;
  detail: any;
  companyDetail: { branchID: string; companyID: string; userId: string; };
  countries: any;
  countryCode: any;
  country: any;
  codeToCountry = { "IN": "India", "MY": "Malaysia", "SG": "Singapore", "SA": "Saudi Arabia", "EG": "Egypt" }
  editCountry = 'select country';
  showImageRow: boolean = false;
  appName: any;
  constructor(
    public platform: Platform,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
  ) { }
  createForm() {
    this.profileForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      compId: [''],
      firstName: ['', Validators.required],
      lastName: [''],
      addressLine1: ['',],
      contactNo: ['', Validators.required],
      // inPage: ['', Validators.required ],
      email: ['', Validators.required],
      addressLine2: ['', Validators.required],
      country: [''],
      city: ['', Validators.required],
    });
  }

  getCountries() {
    const url = serverUrl.web + '/login/getPreferences?key=Countries&companyId=' + this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.countries = res;
        console.log(res);
      })
  }
  getCountryCode() {
    const url = serverUrl.web + '/login/getPreferences?key=CountryCode&companyId=' + this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.countryCode = res;
        console.log(res);
        // this.detail.countryCode
        for (var prop in res) {
          if (res.hasOwnProperty(prop)) {
            if (res[prop] === "IN") {
              console.log(prop)
              this.country = prop;
              this.editCountry = prop;
            }
          }
        }
      })

    const url1 = serverUrl.web + '/login/getPreferences?key=codeToCountry&companyId=""';
    this.ajaxService.ajaxGetPerference(url1)
      .subscribe(res => {
        this.codeToCountry = res;
        console.log(res);
      })
  }
  submit() {
    const userCountry = this.countryCode[this.profileForm.value.country];
    var datas = {
      "firstName": this.profileForm.value.firstName, "lastName": this.profileForm.value.lastName, "userName": this.profileForm.value.userName,
      "companyId": this.companyDetail.companyID, "userPassword": this.profileForm.value.password, "countryCode": userCountry,
      "addressLine1": this.profileForm.value.addressLine1, "addressLine2": this.profileForm.value.addressLine2,
      "fax": this.profileForm.value.email, "contact": this.profileForm.value.contactNo.toString(), "addressId": (this.detail.addressId).toString(), "addressCity": this.profileForm.value.city
    }
    const url1 = serverUrl.web + '/user/set/userdetail'
    if (datas.contact.length == 10) {
      this.ajaxService.ajaxPostWithString(url1, datas).subscribe(res => {
        if (res = "successfully Updated") {
          this.profileForm.reset();

          if (this.showImageRow) {
            let url = serverUrl.web + '/site/insert/s3'

            const file: any = this.uploader;
            if (file.queue != 0) {
              const testData: FormData = new FormData();
              testData.append('file', file.queue[0]._file);
              testData.append('data', 'Company');
              this.ajaxService.ajaxPutMethod2(url, testData)
                .subscribe(res => {
                  console.log(res);
                  if (res.message == "Success") {
                    this.commonService.presentToast("Logo Uploaded successfully!")
                    url = serverUrl.web + '/global/updatesuperAdminlogo';
                    let name: any = this.uploader.queue[this.uploader.queue.length - 1]._file.name
                    let body = { "suffix": localStorage.companySuffix, "logoUrl": name }
                    this.ajaxService.ajaxPostWithString(url, body)
                      .subscribe(res => {

                      });

                  } else {
                    this.commonService.presentToast("please give an valid details to activate");
                  }
                  // this.commonService.presentToast("please insert one document ");
                })
            }
          }
          this.getProfile();
          this.commonService.presentToast("successfully Updated");
        }

      });
    } else {
      this.commonService.presentToast("Oops!.. Contact Number should be 10 digits");
    }

  }

  getProfile() {
    const url = serverUrl.web + '/user/getUserDetails'
    let jsonData = {
      "companyId": this.companyDetail.companyID,
      "userName": this.companyDetail.userId
    }

    this.ajaxService.ajaxPostMethod(url, jsonData).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty("logo")) {
        this.showImageRow = true;
      }
      this.detail = res;
      this.countries
      this.profileForm.patchValue({
        userName: this.detail.emailAddress,
        password: this.detail.userPasswd,
        compId: this.detail.company_companyId,
        firstName: this.detail.firstName,
        lastName: this.detail.lastName,
        addressLine1: this.detail.addressLine1,
        contactNo: this.detail.contactNo,
        email: this.detail.fax,
        addressLine2: this.detail.addressLine2,
        country: this.codeToCountry[this.detail.countryCode],
        city: this.detail.addressCity

      });
    })
  }
  ngOnInit() {
    this.appName = app.appName
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    this.getCountries();
    this.getCountryCode();
    this.createForm();
    this.getProfile();
    this.app["logo"] = localStorage.companyLogo;
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }

  }

}
