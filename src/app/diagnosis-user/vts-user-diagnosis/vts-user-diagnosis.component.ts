import { Component, OnInit } from '@angular/core';

import { serverUrl, app, storageVariable } from "../../../environments/environment";
import { AjaxService } from "../../services/ajax.service";
import { CommonService } from 'src/app/services/common.service';
import { Platform } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { url } from 'inspector';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';


declare var SMSReceive: any;

@Component({
  selector: 'app-vts-user-diagnosis',
  templateUrl: './vts-user-diagnosis.component.html',
  styleUrls: ['./vts-user-diagnosis.component.scss'],
})
export class VtsUserDiagnosisComponent implements OnInit {
  liveData: any;
  myPlatform: any;
  appName:any;
  dashboarData: Array<object>;
  details=[];
  intervalId = 0;
message = '';
seconds = 10;
  selectedVin;
  alarmRes="";
  selectedDiagnosis = "Asset Diagnosis";
  companyDetail: { branchID: string; companyID: string; userId: string; };
  resData: any;
  responceContent: any;
  responceContent1: string;
  mobileNum: any;
  IncomingSMS: any;
  diagnosisNames:any;
  alarmNotifi: boolean;
  watchStatus: boolean;
  watchMode = {
    powerCut: false,
    enginStatus: false,
    sos: false
  };
  watchModeMes = {
    powerCut: `Power Cut is Off`,
    enginStatus: `Engine Status is Off`,
    sos: `SOS Mode is Off`
  };
  watchmodeCheck: any;
  watchModeStatus:any;
  watchShow: boolean;
  iconName: string;
  alarm: boolean=false;
  vinPlateNo: any;
  plateNo: any;
  wIconName: string;
  eIconName: string;
  sIconName: string;
  pIconName:string;
  constructor(
    private ajaxService: AjaxService,
    private commonService:CommonService,
    public platform: Platform,
    private androidPermissions: AndroidPermissions,
    private sms : SMS,
    private smsRetriever: SmsRetriever

  ) { 

  }
  date = new Date("October 13, 2014 11:13:00");
  clearTimer() { clearInterval(this.intervalId); }
  triggerFunction(){
    console.log('Timer Ended');
  }
  
  // ngOnInit()    { this.start(); }
  // ngOnDestroy() { this.clearTimer(); }

 
  stopCount()  {
    this.clearTimer();
    this.message ='';
    this.commonService.presentToast("Please try agian")
  }

   countDown() {
    // this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = '';
     
        this.stopCount();
      } else {
        // reset
        
        this.message = `${this.seconds} please wait...`;
      }
    }, 1000);
  }

  radioSelect(event) {
   this.selectedDiagnosis = event.detail.value;
  }


  diagnosis(){
   
    if(this.vinPlateNo != '' && this.vinPlateNo != undefined ){
      this.resData='';
      this.alarmNotifi=false;
      console.log(this.vinPlateNo);
      this.selectedVin=this.vinPlateNo.vin;
      this.plateNo=this.vinPlateNo.plateNo;
  

  if(this.selectedDiagnosis == 'Advanced Asset Diagnosis'  && this.selectedVin != '' && this.selectedVin != undefined){
    this.seconds = 10;
    this.resData ;
    
    var commands,deviceName;
    // var deviceName;diagnosisName
     const url = serverUrl.web + '/login/getPreferences?key=diagnosisNames&companyId=jana'
     this.ajaxService.ajaxGetPerference(url).subscribe(res=>{
       console.log(res);
       commands=res;
       const url1=serverUrl.web +'/site/mobilealerts?vin='+this.selectedVin;
       this.ajaxService.ajaxGet(url1).subscribe(res=>{
       console.log(res)
       deviceName=res.manufacture +'_'+ res.model;
       this.mobileNum = res.simNo;
      this.sendSms(res.simNo,commands[deviceName]);
       })
     })
    
   
  }else if(this.selectedDiagnosis  == 'Asset Diagnosis' && this.selectedVin != '' && this.selectedVin != undefined){
    
    // http://track.apmkingstrack.com:8090/Admin/api/diagnosis/art/art118
    const url=serverUrl.Admin+'/api/diagnosis/'+this.companyDetail.companyID+'/'+this.selectedVin;
    this.ajaxService.ajaxGet(url).subscribe(res=>{
      console.log(res);
      this.resData=res;
    })
}else if(this.selectedDiagnosis == "Alarm Diagnosis" && this.selectedVin != '' && this.selectedVin != undefined){
  let dashboardData = storageVariable.dashboardData.liveDatas
 this.watchmodeCheck = dashboardData[this.selectedVin];
  if (this.watchmodeCheck.hasOwnProperty("watchmode") && this.watchmodeCheck.watchmode == 0){
    this.alarmNotifi =true;
    this.watchStatus = false;
    this.watchShow =true;
    
   
    // checkmark-circle
    this.watchModeStatus=`Your Watch Mode is Off`
    this.pIconName ="close-circle";
    this.wIconName ="close-circle";
    this.sIconName ="close-circle";
    this.eIconName ="close-circle";
  }
  else{
    this.watchStatus = true;
    this.watchShow =true;
   
   
    // checkmark-circle
    this.watchModeStatus=`Your Watch Mode is On`
  
    for (let i = 0; i < this.watchmodeCheck.watchmode.toString().length; i++) {
      console.log(this.watchmodeCheck.watchmode.toString()[i])
      if (this.watchmodeCheck.watchmode.toString()[i] == 1) {
        this.watchMode.powerCut = true;
        this.watchModeMes.powerCut = `Power Cut is On`;
        this.wIconName="checkmark-circle";
      } else if (this.watchmodeCheck.watchmode.toString()[i] == 2) {
        this.watchMode.enginStatus = true;
        this.eIconName="checkmark-circle";
        this.watchModeMes.enginStatus = `Engine Status is On`
     } else if (this.watchmodeCheck.watchmode.toString()[i] == 3) {
        this.watchMode.sos = true;
        this.sIconName="checkmark-circle";
        this.watchModeMes.sos = `sos is On`;
      }
    }
  }  
  const data = {"companyId":this.companyDetail.companyID,
  "userId":this.companyDetail.userId,
  "description":"Alert Type : AntiTheft",
  "vin":this.selectedVin}
  const url1=serverUrl.Admin+'/api/PushNotification/'+JSON.stringify(data)
   this.ajaxService.ajaxGetWithString(url1).subscribe(res=>{
     console.log(res)
  this.alarm = true;
     if(res == "send"){
      this.alarmNotifi = true
      this.resData = ""
      this.alarmRes = "Testing Alarm Sent !"
     }else{
      this.commonService.presentToast(`Please try agian`)
     }
    
   })
  }
  // else {
  //   this.commonService.presentToast("please select Plate No")
  //  }
  }else {
    this.commonService.presentToast("Please select the plate number")
   }
  }

  sendSms(number, message) {
    // this.countDown();
    this.commonService.presentToast('Please wait until the process is completed');
    var options: {
      replaceLineBreaks: true,
      android: {
        intent: 'INTENT'
      }
    }
    
    this.sms.send(number, message, options).then((res) => {
      // alert(JSON.stringify(res))
      this.start();
    }).catch((err) => {
      // alert(JSON.stringify(err))
      this.resData="";
      this.commonService.presentToast("Please try agian");

    });
  //   setTimeout(() => 
  //   { alert("Hello");

  
  // }, 180000);
  }
  start(){
    // this.countDown();
    // SMSReceive.startWatch(
    //   () => {
    //     console.log('watch started');
    //     this.responceContent ='watch started'; 
        document.addEventListener('onSMSArrive', (e: any) => {
          alert("on sms arrive")
          console.log('onSMSArrive')
          this.IncomingSMS = e.data;
          if(this.mobileNum == this.IncomingSMS.address){
            this.responceContent = this.IncomingSMS.body;
            // this.stop();
            // this.stopCount();
          }
      
        });
    
  }

  stop(){
    SMSReceive.stopWatch(
      () => { this.responceContent ='watch stopped'; console.log('watch stopped') },
      () => { this.responceContent ='watch stop failed'; console.log('watch stop failed') }
    )
  }


  ionViewWillEnter(){
    this.selectedVin="";
    console.log(this.selectedVin);
    const url = serverUrl.web + '/login/getPreferences?key=diagnosisNames&companyId=jana';
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.diagnosisNames = res;
      console.log(res);
    })

  }

  async sendSmsTest(){
    this.smsRetriever.getAppHash()
  .then((res: any) => {
    alert(res)
    console.log("res"+res)})
  .catch((error: any) => console.error(error))
this.sms.hasPermission().then(
  await this.sms.send("8525063565", "hello")
  )
  this.start();
  }

  

  ionViewWillLeave(){
    this.selectedVin="";
    console.log(this.selectedVin);
  }
  ngOnInit() {
    this.appName = app.appName
  // this.smsRetriever.startWatching()
  //   .then((res: any) => {
  //     console.log(res)
  //     alert(res);
  //     console.log("recive")
  //   }
  //   )
  //   .catch((error: any) => console.error(error));

    this.liveData = storageVariable.dashboardData.liveDatas;
    console.log(this.liveData)
    for( var i=0;i < Object.keys(this.liveData).length;i++){
    let plateNo = this.liveData[Object.keys(this.liveData)[i]].plateNo;
    let vin = this.liveData[Object.keys(this.liveData)[i]].vin;
    this.details.push({vin:vin,plateNo:plateNo})
 }
 this.companyDetail = {
  branchID: localStorage.getItem('corpId'),
  companyID: localStorage.getItem('corpId'),
  userId: localStorage.getItem('userName')
}
// this.app["logo"] = localStorage.companyLogo;
this.myPlatform = this.platform.platforms()[0];
if(this.myPlatform == 'tablet'){
  this.myPlatform = 'desktop';
} 
// if(this.appName != 'Armoron'){
  const url = serverUrl.web + '/login/getPreferences?key=diagnosisNames&companyId=jana';
  this.ajaxService.ajaxGetPerference(url)
  .subscribe(res => {
    this.diagnosisNames = res;
    console.log(res);
    if(this.myPlatform != 'desktop'){
   
      this.diagnosisNames = this.diagnosisNames["mobile"];
      }else{
      
        this.diagnosisNames = this.diagnosisNames["web"];
      }
  })
// }



  }
  
}