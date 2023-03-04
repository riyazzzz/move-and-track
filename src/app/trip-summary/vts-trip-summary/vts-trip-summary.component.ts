import { Component, Input, OnInit } from '@angular/core';
import {  app, serverUrl } from "../../../environments/environment";
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';

@Component({
  selector: 'app-vts-trip-summary',
  templateUrl: './vts-trip-summary.component.html',
  styleUrls: ['./vts-trip-summary.component.scss'],
})
export class VtsTripSummaryComponent implements OnInit {
  @Input() vinGrid;
  @Input() gridLiveChange;
  appName: string;
  app: any = {logo:'logo.png'};
  myPlatform: string;
  tripType: string = "inactive";
  filterValue: string;
  tripSummary=[{
  odometer:'',
  status:'',
  tripStartTime:'',
  tripEndTime:'',
  Idle:'',
  running:''
}]
  showModal(data){
console.log(data)
  }
  constructor(
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
  ) { }


  vehicleFunctionClick(){
    this.getTripData('inactive')
  }

  getTripData(data) {
    this.gridLiveChange=JSON.parse(localStorage.getItem('selectedVin'))
    this.tripType = data;
    let url = ''
    if(this.tripType == 'active'){
      url = serverUrl.web + '/report/get/tripStart?vin='+this.gridLiveChange.vin+'&companyId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId')+'&userId='+localStorage.getItem('userName')
      this.commonService.presentLoader();
      const datas = {"vin":this.gridLiveChange.vin,
      "companyId":localStorage.getItem('corpId'),
      "userId":localStorage.getItem('userName'),
      "branchId":localStorage.getItem('corpId')}
  this.ajaxService.ajaxGetWithBody(url)
          .subscribe(res =>{
           this.commonService.dismissLoader();
         this.tripSummary = JSON.parse(res)
          });
  }else{
     url = serverUrl.web + '/report/get/tripEnd?vin='+this.gridLiveChange.vin;
     this.commonService.presentLoader();
  this.ajaxService.ajaxGetWithBody(url)
          .subscribe(res =>{
           this.commonService.dismissLoader();
         this.tripSummary = JSON.parse(res)
          });
  }
  }


  async custom(){
  const toast = await this.alertController.create({
    header: 'Do you want',
    animated: true,
    cssClass: 'toast-button',    buttons: [
      {
       text: 'Custom',
       role: 'ok',
      
        handler: () => {
        
          this.startTrip('custom')
        }
      }, {
        text: 'Manual',
        role: 'Manual',
        handler: () => {
         
          this.startTrip('manual')
        }
        
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        toast.onDidDismiss().then(()=>{
             })
        }
        
      }
    ]
  });
  // toast.onDidDismiss().then(()=>{
  //     this.startTrip()
  // })
  return await toast.present();

}



  async startTrip(data){
    if(data == 'custom'){
      const toast = await this.alertController.create({
        header: 'Are you sure?',
        message: 'It will start a new trip',
        animated: true,
        cssClass: 'toast-button',    buttons: [
          {
            text: 'Ok',
           role: 'ok',
          
            handler: data => {
            
              this.sendDatas('custom',data)
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
               toast.onDidDismiss().then(()=>{
  //     this.startTrip()
   })
            }
          }
        ]
      });
      await toast.present(); 
    }else{
      const alert = await this.alertController.create({
    
        header: 'Are you sure?',
        animated: true,
        inputs: [
          {
             placeholder: 'From Date and Time',
             disabled: true
           },{
             name:'fromdate',
             type: 'date',
     },{
      name:'fromtime',
      type: 'time',
},
     {
       placeholder: 'To Date and Time',
       disabled: true
     },{
       name:'todate',
       type:'date'
    },{
      name:'totime',
      type: 'time',
},
       ],
        message: 'It will start a new trip' ,
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
       this.sendDatas('manual',data)
        }
        }]
      });
      await alert.present(); 
    }
 
  

}

sendDatas(type,data){
  console.log(data)
  var url = serverUrl.web + '/report/add/tripsummary';
  var currentdate = new Date(); 
  var datetime = currentdate.getFullYear() + "-" 
            + (currentdate.getMonth()+1)  + "-" 
            +  currentdate.getDate() +' '
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
  
if(type == 'custom'){
   var sendData = {
    "vin":this.gridLiveChange.vin,
    "tripStarttime":datetime,
    "tripEndtime":null,
    "idle":null,
    "running":null,
    "status": 'active',
    "odometer":null
    }
  }else{
    sendData = {
      "vin":this.gridLiveChange.vin,
      "tripStarttime":data.fromdate +' '+ data.fromtime+':00',
      "tripEndtime":data.todate +' '+ data.totime+':00',
      "idle":null,
      "running":null,
      "status": 'active',
      "odometer":null
      }
}
this.commonService.presentLoader();
this.ajaxService.ajaxPostWithBody(url, sendData)
.subscribe(res =>{
 
  if(res.message === "Added Successfully"){
    this.commonService.dismissLoader();
    this.commonService.presentToast("Trip started successfully..!");
    this.getTripData('active')
  }else{
    this.commonService.dismissLoader();
    this.commonService.presentToast("Contact support team");
  }
});
}

// ngOnChanges() {
//   this.gridLiveChange=JSON.parse(localStorage.getItem('selectedVin'))
//   this.getTripData('inactive')
//   console.log('test')
// }


  ngOnInit() {
    this.app["logo"] = localStorage.companyLogo;
    this.myPlatform = this.platform.platforms()[0];
    this.appName = app.appName;
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    if(this.vinGrid){
      this.filterValue = "vin"
    }else{
      this.filterValue = this.activatedRoute.snapshot.paramMap.get("type");
    }
    this.gridLiveChange=JSON.parse(localStorage.getItem('selectedVin'))
     this.getTripData('inactive')
  }
}
