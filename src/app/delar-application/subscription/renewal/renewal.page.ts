import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { AjaxService } from '../../../services/ajax.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.page.html',
  styleUrls: ['./renewal.page.scss'],
})
export class RenewalPage implements OnInit {
  @Input()value;
  field;
  date;
  typeSetter = "text";
  subscription;
  data: any;
  
  
  constructor(
    
    public modalController:ModalController,
    public alertController:AlertController,
    private formBuilder: FormBuilder,
    private commonService:CommonService,
    private ajaxService: AjaxService,
    ) { }
    getBack(){
      this.modalController.dismiss();
  }
  focusType(){
    this.typeSetter="Date";
  }
  sendBtn(){
    console.log(this.subscription); 
    if(this.subscription.status == "VALID" ){
      const url = serverUrl.web + '/global/updateExpirydate';
      var data={ 
        imeiNo:this.subscription.value.imeiNo,
        warrantyExpiryDate:this.subscription.value.todayDate
      }
      this.ajaxService.ajaxPostMethod(url,data).subscribe(res=>{
        console.log(res);
        var respData=JSON.parse(res);
        if(respData.message == "Success"){
          this.modalController.dismiss();
          this.commonService.presentToast('Successfully Updated');
        }else{
          this.commonService.presentToast('Please tryagain');
        }
        
      })  
    
    }
    else {
      this.commonService.presentToast('Please complete the form');
      console.log('Please complete the form');
    }
   
  }
  async subscriptionAlert(){
    this.modalController.dismiss();
        const alert = await this.alertController.create({
          header: 'Are you sure?',
          backdropDismiss: false,
          message:"You want to renew your subscription!",
          buttons: [{
            text: 'No',
            role: 'cancel',
            handler: data => {
              localStorage.setItem("exitPopup", "false")

            },
          },
          {
            text: 'Yes',
            // handler: data => {
            //   navigator['app'].exitApp(); 
            // }
          }]
        });
        await alert.present();
     // }
     
   // }); 
  }
 
  
  ngOnInit() {
  this.field = document.querySelector('#today');
  this.date = new Date();
// Set the date
    this.field.value = (this.date.getFullYear()+1).toString() + '-' + (this.date.getMonth() + 1).toString().padStart(2, 0) + 
    '-' + this.date.getDate().toString().padStart(2, 0);
    this.subscription = this.formBuilder.group({
      imeiNo:[this.value,Validators.required],
      todayDate:[this.field.value,Validators.required]
    })
    
  }

}
