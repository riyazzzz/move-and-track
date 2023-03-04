import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from '../../services/ajax.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  tripEnable = true;
  @Input()tripSummary
  @Output() getDatas = new EventEmitter();
  constructor(private toastController:ToastController,
    private ajaxService: AjaxService,
    private alertController: AlertController,
    private commonService: CommonService
    ) { }
  tripStart(){
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
   this.tripEnable = false;
   const startUrl = serverUrl.web +"";
   const endUrl = serverUrl.web +"";
  }

  async submit(type){
    var typeName=''
    let url = serverUrl.web + '/api/vts/superadmin/inventory';
if(type == 'edit'){
typeName = 'Inactive the trip'
url = serverUrl.web + '/report/update/tripsummary';
}else{
  typeName = 'Delete the trip'
  url = serverUrl.web + '/report/delete/tripsummary?id='+this.tripSummary.id;
}
const alert = await this.alertController.create({
  header: 'Are you sure?',
  // inputs: [{
  //   name: 'Password',
  //   type: 'password',
  //   placeholder: 'Enter the password'
  // }],
  message: 'want'+' '+typeName,
  backdropDismiss: false,
  buttons: [{
    text: 'Cancel',
    role: 'cancel',
    handler: data => {
      console.log('Cancel clicked');
      this.commonService.dismissLoader();
    }
  },
  {
    text: 'Ok',
    handler: data => {
      var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/" 
              + currentdate.getFullYear()
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes() + ":" 
              + currentdate.getSeconds();
        this.commonService.presentLoader();
        if(type == 'edit'){
         let sendData = {
            "vin":this.tripSummary.vin,
            "tripStarttime":this.tripSummary.odometer,
            "tripEndtime":datetime,
            "idle":this.tripSummary.odometer,
            "running":this.tripSummary.odometer,
            "status":this.tripSummary.odometer,
            "odometer":this.tripSummary.odometer,
            "id":this.tripSummary.id
            }
            const url = serverUrl.web + '/report/update/tripsummary';
            this.ajaxService.ajaxPostWithBody(url, sendData)
            .subscribe(res =>{
             if(res.message === "Updated Successfully"){
              this.getDatas.emit('data');
                this.commonService.dismissLoader();
                this.commonService.presentToast("Trip Inactived successfully..!");
              
              }else{
                this.commonService.presentToast("Contact support team");
              }
            });
        }else{
          this.ajaxService.ajaxDeleteWithString(url)
          .subscribe(res =>{
            if(res.message === "Deleted Successfully"){
              this.commonService.dismissLoader();
              this.getDatas.emit('data');
              this.commonService.presentToast("Trip has deleted successfully..!");
            
            }
          });
        }
        
      
    }
  }]
});

await alert.present(); 
  }
  ngOnInit() {
    console.log(this.tripSummary)

  }
 

}
