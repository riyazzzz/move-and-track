import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assert-list-card',
  templateUrl: './assert-list-card.component.html',
  styleUrls: ['./assert-list-card.component.scss'],
})
export class AssertListCardComponent implements OnInit {
@Input() cardDetail;
  constructor(

    private alertController: AlertController,
    private ajaxService: AjaxService,
    private modalController: ModalController,
    private commonService: CommonService,
    private router: Router,
  ) { }





  async deleteVehicle(){
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      inputs: [{
        name: 'Password',
        type: 'text',
        placeholder: 'Enter dealer password'
      },{
        name: 'userPassword',
        placeholder: 'Enter user pasword',
        type: 'text', //This generate the password
      }],
      message:'You want to Delete ' + this.cardDetail.imei,
      backdropDismiss: false,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
          this.commonService.presentLoader()
          if( data.Password == localStorage.password || (data.Password).toLowerCase() == (localStorage.password).toLowerCase()){
           
          const url1=serverUrl.web + '/global/validate/pass?companyId='+this.cardDetail.companyId+'&pass='+data.userPassword
            this.ajaxService.ajaxGetWithString(url1).subscribe(res=>{
              this.commonService.dismissLoader()
            console.log(res)
        // JSON.parse(res).message
            if(JSON.parse(res).message == "Available"){
            const url=serverUrl.web+'/global/delete/imei?imeiNo='+this.cardDetail.imei;
            this.ajaxService.ajaxDeleteWithString(url).subscribe(res=>{
           console.log(res)
           if(res.message == "success"){
             this.commonService.presentToast("Successfully deleted")
             this.commonService.dismissLoader()
             this.router.navigateByUrl('/dashboard');
           }else{
             this.commonService.presentToast("contact support team")
             this.commonService.dismissLoader()
           }
          
         })
           }else{
            this.commonService.dismissLoader()
                this.commonService.presentToast("Please check user password")
              }
            })



            
          }else{
            this.commonService.dismissLoader()
            this.commonService.presentToast("Please check dealer password")
          }
        //  data.Password
        
          console.log(this.cardDetail)
        }
      }]
    });
    await alert.present();
  }

  ngOnInit() {}

}
