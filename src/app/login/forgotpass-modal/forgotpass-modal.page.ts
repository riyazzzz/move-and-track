import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { serverUrl,app } from '../../../environments/environment';
import { AjaxService } from '../../services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-forgotpass-modal',
  templateUrl: './forgotpass-modal.page.html',
  styleUrls: ['./forgotpass-modal.page.scss'],
})
export class ForgotpassModalPage implements OnInit {
  forgetPass: any;
  appName: string;
  color ={
    "Tracalogic": 'rgb(255, 174, 0)',
    "Moveandtrack": 'rgb(237, 27, 36)'
  }
  showorhideInput: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public ajaxService: AjaxService,
    public commonService: CommonService) { }
  getBack() {
    this.modalController.dismiss();
  }
  submitPass() {
    let body = {
      "username": this.forgetPass.value.compName,
      "corpid": this.forgetPass.value.compId,
      "emailId": this.forgetPass.value.emailId,
      "mobileNo": this.forgetPass.value.mobileNo
    };
    let url = serverUrl.web + "/login/company/branch/user/forgetpassword";
    this.ajaxService.ajaxPostWithString(url, body)
      .subscribe(res => {
        console.log(res);
        if (res) {
            this.commonService.presentToast(res)
            this.modalController.dismiss();
        }else{
          this.commonService.presentToast("contact support team")
        }
      });
  }
  ngOnInit() {
    this.appName = app.appName.replace(/ /g, "");
    this.forgetPass = this.formBuilder.group({
      emailId: [''],
      mobileNo: ['', Validators.required],
      compName: ['', Validators.required],
      compId: ['', Validators.required]
    });
  }

}
