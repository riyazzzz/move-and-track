import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-iccid-details',
  templateUrl: './iccid-details.page.html',
  styleUrls: ['./iccid-details.page.scss'],
})
export class IccidDetailsPage implements OnInit {
  currency: any;
  isLoading: boolean;
  icciddetails: FormGroup;
  value: any;
  hideSerialNo: boolean;
  show:boolean=false;
  reportData:any
  MessageAlert: string;
  constructor(private location : Location, 
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public ajaxService: AjaxService,
    public loadingController: LoadingController,
    private commonService: CommonService,) { }
  closePage() {
    this.location.back()
  }
  submitBtn(){
    this.show =false;
    if(this.icciddetails.value.iccidnumber.length != 20){
      this.MessageAlert ="Please Check the Iccid Number"
    this.showConfirm();
    this.show =false;
    }
    else{
      this.show =false;
      var url = 'https://testing.apmkingstrack.com/fleettracking/sensorise/getSensoriseICCIDStatus?companyid='+localStorage.getItem('corpId')+'&iccidno='+this.icciddetails.value.iccidnumber;
      this.presentLoader();
  this.ajaxService.ajaxGet(url)
  .subscribe(res => 
    {
    if(JSON.stringify(res) == '{}' || res == undefined)
    {
      this.show =false;
      this.MessageAlert ="Invalid Iccid Number"
      this.showConfirm();
      // this.commonService.presentToast('Invalid Iccid Number')
    }
    else if(res.message == 'success'){
      this.reportData=res;
      this.show =true;
    }
    else
    {
      this.show =false;
      this.MessageAlert=res.message
      this.showConfirm()
    }
    this.commonService.dismissLoader()
  })
    }
    }
    createForm(){
      this.icciddetails = this.formBuilder.group({
        iccidnumber:['',Validators.required],
      })
    } 
    async showConfirm() {  
      const confirm = await this.alertCtrl.create({  
        header: 'Alert!', 
        message: this.MessageAlert,  
        buttons: [   
          {
            text: 'Ok',
            handler: data => {
          }
          }  
        ]  
      });  
      await confirm.present();  
    }       
    ionViewWillEnter() {
      this.reportData = '';
    }
    async presentLoader() {
      this.isLoading = true;
  
      setTimeout(() => {
        this.dismissLoader();
      }, 8000);
  
      return await this.loadingController.create({
        spinner: "circles",
        message: "Please Wait!",
        translucent: false,
        cssClass: 'custom-loader-class'
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  
  
    }
    async dismissLoader() {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
    ngOnInit() {
      this.createForm();
    }

}
