import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { app, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-currency-settings',
  templateUrl: './currency-settings.page.html',
  styleUrls: ['./currency-settings.page.scss'],
})
export class CurrencySettingsPage implements OnInit {
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  currency: any;
  currencylist: FormGroup;
  value: any;
  hideSerialNo = false;
  currencys = true;
  show: boolean;
  app: any={logo:'logo.png'};
  myPlatform: any;
  appName: any;
  currencyvalue: any;
  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService) { }

  
    getcurrency(){
      var url = serverUrl.fmsUrl +'/currency/getFmsAllCurrency'
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
      this.currency =res;
    })
  }  
  getcurrencydetails(){
    var url = serverUrl.fmsUrl +'/currency/getFmsCurrencySettings?companyid='+localStorage.getItem('corpId')
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      if(res.message == "Invalid Data")
      {
        this.currencys =true
        this.hideSerialNo =false
      }
      else{
        this.currencyvalue =res.currency;
        this.currencys =false
        this.hideSerialNo =true
      }
  })
}
  submitBtn(){
    var data;
    if(!this.value){
      data={
        "companyid":localStorage.getItem('corpId'),
        "branchid": localStorage.getItem('corpId'),
        "code":this.currencylist.value.currency ,
        "createddate": new Date(),
        "createdby": localStorage.getItem('userName'),
        "updateddate": null,
        "updatedby": null
      }
    const url = serverUrl.fmsUrl +'/currency/fmsSaveCurrencySettings';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "Currency Saved Successfully"){
        this.commonService.presentToast('Currency Added Succesfully');
        this.modalController.dismiss();
      }
    else{
      this.commonService.presentToast('Please Contact Support Team');
    }
    this.getcurrencydetails();
    });
    }
  }
  createForm(){
    this.currencylist = this.formBuilder.group({
      currency:['',Validators.required],
    })
  }       

  ngOnInit() {
    this.appName = app.appName;
    // this.app["logo"] = localStorage.companyLogo;
    if(localStorage.getItem('fmslogin') == 'FMS')	
     {	
       this.app["logo"] = localStorage.getItem('fmslogo');	
     }	
     else{	
       this.app["logo"] = localStorage.companyLogo;	
     }
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.getcurrencydetails();
    this.getcurrency();
    this.createForm();
  }

}
