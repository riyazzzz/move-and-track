import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { serverUrl } from '../../environments/environment';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.page.html',
  styleUrls: ['./change-number.page.scss'],
})
export class ChangeNumberPage implements OnInit {
  w: string;

  constructor(
    private commonService: CommonService,
    private alertController: AlertController,
    public ajaxService: AjaxService,
    public router: Router,
  ) { }



  changeNumber(oldCompanyNo, newCompanyNo) {
    const companyId = localStorage.getItem('userName');
    const changedNumber = localStorage.getItem('changedNumber');
    const oldPhoneNo = oldCompanyNo.value;
    const newPhoneNo = newCompanyNo.value;
    if (oldPhoneNo === '' || oldPhoneNo === undefined) {
      this.commonService.presentAlert('Phone_Number', 'Please enter old phone number');
    } else if (newPhoneNo === '') {
      this.commonService.presentAlert('Phone_Number', 'Please enter new phone number');
    } else if (changedNumber !== null && changedNumber !== oldPhoneNo) {
      this.commonService.presentAlert('Phone_Number', 'Please enter valid old phone number');
    }  else if (changedNumber == null && companyId !== oldPhoneNo) {
      this.commonService.presentAlert('Phone_Number', 'Please enter valid old phone number');
    } else if (newPhoneNo === oldPhoneNo) {
      this.commonService.presentAlert('Phone_Number', 'Old phone number should not be same as new phone number');
    } else {
      this.presentAlertConfirm({
        companyId : companyId,
        changedNo : newPhoneNo,
      });
    }
  }
  async presentAlertConfirm(data) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure? you want to change your number?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.commonService.presentLoader();
            const url = serverUrl.web + '/login/changeNo?corpId='+data.companyId+'&contactNo='+data.changedNo
            this.ajaxService.ajaxGetWithString(url)
            .subscribe( res => {
              this.commonService.dismissLoader();
              if (res === 'Updated Successfully') {
                localStorage.clear();
              //  this.authenticationService.logout();
                this.router.navigateByUrl('tabs-login')
                this.commonService.presentAlert('Success', 'Your Number is updated successfully and you can login with your new number.');
              } else if (res === 'Already Exist') {
                this.commonService.presentAlert('Failure', 'It seems you have already used this number as a new number.');
              } else {
                this.commonService.presentAlert('Error', 'Try again after sometime');
              }
            }, err => {
              this.commonService.presentAlert('Error', 'Try again after sometime');
              this.commonService.dismissLoader();
            });
          }
        }
      ]
    });

    await alert.present();
  }



  ngOnInit() {

  }

}
