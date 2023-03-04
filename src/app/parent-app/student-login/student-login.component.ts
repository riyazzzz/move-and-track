import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, ModalController, MenuController, AlertController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from '../../../app/services/common.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { FormGroup,  } from '@angular/forms';
  import {serverUrl,app} from '../../../environments/environment';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Device } from '@ionic-native/device/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss'],
})
export class StudentLoginComponent implements OnInit {
  @Input()data
  login: FormGroup;
  button = "Send OTP";
  loginOtp: any = "";
  generatedOTP
  logo: string;
  appName: any = "";
  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private platform: Platform,
    public router: Router,
    private device: Device,  
     private udid: UniqueDeviceID,
    public modalController: ModalController,
    private commonService: CommonService,
    private menuController: MenuController,
    private alertController: AlertController,
    private authService: AuthenticationService,
    private firebaseX: FirebaseX,
    private network: Network,
  ) { }

  generateOtp() {
    this.loginOtp = Math.floor(Math.random() * 9000) + 1000;
  }

  getLoginData() {
    this.router.navigateByUrl('student-dashboard')
  }

verifyPhoneNo(){
 const url=serverUrl.web + '/parentapp/checkUser?parentId='+this.login.value.mobileNo
  this.ajaxService.ajaxGetWithString(url).subscribe(res=>{
    console.log(res)
    if(res == "Not Available"){
      this.commonService.presentToast("Enter a Valid PhoneNumber");
    }else{
      this.button = "Verify"
      this.sendOtp();
    }
  })
}


  sendOtp(){
     this.generateOtp()
    localStorage.setItem('userName',JSON.stringify(this.login.value.mobileNo))
  const url = serverUrl.web +'/parentapp/otp?message=your otp is '+this.loginOtp+'&contact='+this.login.value.mobileNo
    this.ajaxService.ajaxGet(url).subscribe(res=>{
    if(res.message == "sent"){
      this.button = "Verify"
      this.commonService.presentToast('Enter your otp')
    }else{
      this.commonService.presentToast('Enter a valid phonenumber to login')
    }
    })
  }


checkUser(){
  if(this.login.value.mobileNo != null && (this.login.value.mobileNo).toString().length == 10){
    const url=serverUrl.web + '/parentapp/checkUser?parentId='+this.login.value.mobileNo
    this.ajaxService.ajaxGetWithString(url).subscribe(res=>{
      console.log(res)
      if(JSON.parse(res).message  == "Available"){
      this.sendOtp();
      }else{
        this.commonService.presentToast('Enter a Valid PhoneNumber')
      }
    })
  }else{this.commonService.presentToast('Enter 10 digits PhoneNumber')}}


generateOTP = (cntrl) => {
  this.generatedOTP = Math
    .floor(Math.random() * 9000) + 1000;
  if (/(android|iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
    if (this.login.value.mobileNo === '9600696008' || this.login.value.mobileNo === '9962139968') {
      this.button = "Verify"
    } else {
    this.sendOtp();
    //this.verifyOTPMethod(this.generatedOTP, this.login.value.compName);
    }
  } else {
    this.commonService.presentToast('Contact support team')
  }
}

sideMenus(){
  // this.authService.login();

  const url=serverUrl.web + '/parentapp/login?parentId='+this.login.value.mobileNo
  this.ajaxService.ajaxGet(url).subscribe(res=>{
    console.log(res)
    this.commonService.updateLogo(res);
  localStorage.setItem('mainMenu', res[0].mainmenu);
  localStorage.setItem('companyLogo', res[0].logo);
  localStorage.setItem('corpId', res[0].companyId);
  this.pushNotificationConfig()
// localStorage.setItem('dashboardWebSocketData', JSON.stringify(dashboardInput));
  const messagingServiceData = {
    "companyId": res[0].companyId,
    "logo": res[0].logo,
    "entryPoint": res[0].entryPoint
  }
 
  this.commonService.updateLogo(messagingServiceData);
  })
 
}
  // localStorage.setItem('companyLogo', res[1]["logo"])
  // localStorage.setItem("mapAllowed", res[1]["mapAllowed"])
  // localStorage.setItem('mainMenu', res[1]["mainmenu"]);
  loginSubmit() {
    // this.generateOtp();
    if (this.button == "Send OTP") {
        // this.verifyPhoneNo();
        // this.button = "Verify"
     
// this.sendOtp()
         this.checkUser();

    } else if(this.button == "Verify"){
      // this.loginOtp =  this.login.value.otp
       if(this.loginOtp == this.login.value.otp){
        // localStorage.setItem('corpId', this.login.value.mobileNo)
        this.sideMenus();
        this.login.reset()
        this.loginOtp =''
        this.button = "Send OTP"
        this.router.navigateByUrl('student-dashboard')
       
       }else{
        this.commonService.presentToast('Otp is wrong, try again')
       }
    }
  }

   async pushNotificationConfig() {
    let pushDetails: object;
    this.platform.ready().then(res => {

      if (this.platform.is('ios')) {
        this.firebaseX.grantPermission()
          .then((success) => {
            if (success) {
            }
          });
      }
      if (this.network.type !== "none") {
        if (/(android)/i.test(navigator.userAgent)) {
          this.firebaseX.getToken()
            .then(token => {
              //alert("token is "+ token);
              //   alert("uuid is "+ this.device.uuid);
              localStorage.setItem('imeiNo', this.device.uuid)
              localStorage.setItem('deviceToken', token)
              localStorage.setItem('notificationStatus', 'true')
              pushDetails = {
                "imeiNo": this.device.uuid,
                "appName": app.appName,
                "deviceToken": token,
                "companyID": localStorage.getItem("corpId"),
                "userId": localStorage.getItem("userName"),
                "os": "ionic4",
                "pushStatus": "true"
              };
              const url = serverUrl.web + "/alert/pushnotification";
              this.ajaxService.ajaxPostWithBody(url, pushDetails)
                .subscribe(res => {
                  localStorage.setItem('pushStatus', 'persisted');
                  //console.log('push presisted');
                  // this.restartApp();
                })

            })
            .catch(error => {
              //  alert("Token uuid as "+error);
              this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
            })

        } else if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
          this.firebaseX.getToken()
            .then(token => {
              //alert("token is "+ token);
              this.udid.get()
                .then((uuid: any) => {
                  // alert("uuid is "+ uuid);
                  localStorage.setItem('imeiNo', this.device.uuid)
                  localStorage.setItem('deviceToken', token)
                  localStorage.setItem('notificationStatus', 'true')
                  pushDetails = {
                    "imeiNo": this.device.uuid,
                    "appName": app.appName,
                    "deviceToken": token,
                    "companyID": localStorage.getItem("corpId"),
                    "userId": localStorage.getItem("userName"),
                    "os": "ionic4ios",
                    "pushStatus": "true"
                  };
                  localStorage.setItem('device','ionic4ios')
                  //console.log(uuid);
                  //console.log(token);
                  const url = serverUrl.web + "/alert/pushnotification";
                  this.ajaxService.ajaxPostWithBody(url, pushDetails)
                    .subscribe(res => {
                      localStorage.setItem('pushStatus', 'persisted');
                      //console.log('push presisted');
                      // this.restartApp();
                    })
                })
                .catch((error: any) => {
                  //alert("Error uuid as "+error);
                  this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
                });

            })
            .catch(error => {
              //  alert("Token uuid as "+error);
              this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
            })

        }
        this.network.onDisconnect().subscribe(() => {
          //console.log('network was disconnected :-(');
          this.commonService.presentToast('Poor Network Connection');
        });
      }
    })
  }

  ngOnInit() {
    ;
    this.appName = app.appName;
    this.logo = app.loginImgUrl;
    this.loginOtp =''
    this.login = this.formBuilder.group({
      mobileNo: [''],
      otp: ['']
    });
  this.login.reset()
  
  }

}
