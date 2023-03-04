import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { serverUrl } from '../../../../environments/environment';
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit {
  @Input() myGrid;
  @Input() value;
  userForm: FormGroup;
  countries: any;

  editCountry = 'Select country';
  companyDetail: { branchID: string; companyID: string; userId: string; };
  serviceName: string;
  selectedRow: any;
  selectedRowIdx: any;
  countryCode: any;
  hideSerialNo = false;
  isDeleteShow: any = false;
  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,

    private ajaxService: AjaxService,
    private commonService: CommonService,
    private alertController: AlertController,
    private router: Router
  ) { }

  createForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      city: ['', Validators.required],
      //  email: ['',],
      country: ['', Validators.required],

    });
  }
  submit() {
    //  this.userForm.value.userName
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = (today.getFullYear() + 1)

    var date = yyyy + '-' + mm + '-' + dd;
    const userCountry = this.countryCode[this.userForm.value.country];
    if (this.serviceName != 'available') {
      const data = {
        "userName": this.userForm.value.userName, "password": this.userForm.value.password,
        "firstName": this.userForm.value.firstName,
        "categoryrole": "fleetmanager", "useraddress1": this.userForm.value.Address1, "useraddress2": this.userForm.value.Address2,
        "userExpiryDate": date, "userCity": this.userForm.value.city, "contactNo": this.userForm.value.contact,
        "userCountry": userCountry, "emailId": this.userForm.value.email, "userPrivileges": "Level1",
        "companyId": this.companyDetail.companyID, "branchId": this.companyDetail.branchID, "applicationType": "false"
      };
      const url = serverUrl.web + '/global/newFleetCreation'
      this.ajaxService.ajaxPostWithString(url, data).subscribe(res => {
        console.log(res);
        if (res == "persisted") {
          this.commonService.presentToast('User added succesfully');
          this.userForm.reset();
          this.modalController.dismiss();
        } else if (res == "User Already Available") {
          this.commonService.presentToast('User already added ');
          this.userForm.reset();
          this.modalController.dismiss();
        }

      })
    } else {
      var details = {
        "userName": this.userForm.value.userName,
        "pwd": this.userForm.value.password,
        "firstName": this.userForm.value.firstName,
        "categoryrole": "fleetmanager",
        "addressLine1": this.userForm.value.Address1,
        "addressLine2": this.userForm.value.Address2,
        "userExpiryDate": date,
        "addressCity": this.userForm.value.city,
        "contact": this.userForm.value.contact,
        "countryCode": userCountry,
        "fax": this.userForm.value.email,
        "userPrivileges":
        "Level1", "companyId": this.companyDetail.companyID,
        "branchId": this.companyDetail.branchID,
        "applicationType": "false",
        "oldCategoryRole": "fleetmanager"
      }

      const url = serverUrl.web + '/user/update/user'
      this.ajaxService.ajaxPostWithString(url, details).subscribe(res => {
        console.log(res);
        var count = 0;
        if (count === 0) {
          count = 1;
          if (res === "successfully updated") {
            this.commonService.presentToast('successfully updated');
            this.userForm.reset();
            this.modalController.dismiss();
          } else {
            this.commonService.presentToast('Contact support team');
          }
          // else if (res === "o") {
          //   this.commonService.presentToast('User is already associated');
          //   this.userForm.reset();
          //   this.modalController.dismiss();
          // }
        }
        // if(res == ''){
        //   this.commonService.presentToast('Updated Succesfully');
        //   this.userForm.reset();
        //   this.modalController.dismiss();
        // }else {
        //   this.commonService.presentToast('User is already Associated');
        //   this.userForm.reset();
        //   this.modalController.dismiss();

        // }
      })
    }
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
      })

  }
  async closeModal() {
    this.modalController.dismiss();
  }
  async deleteSelectedOperator() {
    console.log(this.value)
    if (this.value) {
      const alert = await this.alertController.create({
        header: ' delete',
        backdropDismiss: false,
        message: "Are you sure you want to delete?",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            var details = { 
              "companyId": this.value.companyId,
              "branchId": this.value.branchId,
              "userName": this.value.userName,
              "roleName": "fleetmanager" };
            console.log(details)
            const url = serverUrl.web + '/user/delete/user';

            this.ajaxService.ajaxDeleteWithBody(url, details).subscribe(res => {
              console.log(res);

              if (res.statusText == "OK") {
                this.modalController.dismiss();
                this.commonService.presentToast("Deleted successfully")
              } else {
                this.commonService.presentToast("Try again")
              }
            })
          }
        }]
      });
      await alert.present();

    }

  }


  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }

    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")

    this.getCountries();
    this.getCountryCode();
    this.createForm();
    if (this.value) {
      if (this.value.submit == "available") {
        this.hideSerialNo = true;
        this.serviceName = "available";
        // this.vin =this.value.vin;
        this.editCountry = this.value.countryName;
        this.userForm.patchValue({
          userName: this.value.emailAddress,
          password: this.value.pwd,
          contact: this.value.contact,
          firstName: this.value.userName,
          lastName: this.value.userName,
          email: this.value.fax,
          country: this.value.countryName,
          Address1: this.value.addressLine1,
          Address2: this.value.addressLine2,
          city: this.value.addressCity,
        });
      }
    }

  }
}
