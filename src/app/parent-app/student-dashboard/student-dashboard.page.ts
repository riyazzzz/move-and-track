import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { serverUrl } from 'src/environments/environment';
import {AjaxService} from '../../services/ajax.service';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage implements OnInit {

  constructor(
    private menuController: MenuController,
    private router: Router,
    private ajaxService:AjaxService
  ) { }

//   studentsData={
//     studName:' ',
//     driverNo:'',
//     driverName:'',
//     routeName:'',
//     std:"",
//     sec:"",
//     routes:[{name:"",value:""},{name:"",value:""},
//     { name:" ",value:""}],
// }

studentsData=[]
  studentDetail(data){
    localStorage.setItem('selectedVin',JSON.stringify(data.SelectedVin))
    localStorage.setItem('stin',data.stin)
    this.router.navigateByUrl('/parent-tab/routmap')
  }

  getStudentDetails(){
    this.studentsData = [];
    const url =serverUrl.web+  '/parentapp/dashboard?parentId='+localStorage.getItem('userName')
    this.ajaxService.ajaxGet(url).subscribe(res=>{
      console.log(res)
      this.studentsData = res;

localStorage.setItem('appSettings',JSON.stringify("asas"));
localStorage.setItem('appSettings',JSON.stringify("SelectedVin"));
localStorage.setItem('staticIOData',JSON.stringify({"art291":[],"art294":[{"result":null,"unit":null,"min":"0","max":"1","io":1,"totalKM":0,"fuelStatus":0,"fuelTotal":0,"ioname":"fuel sensor","status":null}],"art372":[],"art133":[],"art131":[],"art175":[],"art132":[],"art176":[],"art330":[],"art693":[],"art896":[],"art413":[],"art611":[],"art897":[],"art774":[],"art219":[],"art813":[],"art414":[],"art898":[],"art938":[],"art935":[],"art581":[],"art584":[],"art464":[],"art340":[],"art461":[],"art582":[],"art269":[],"art423":[],"art786":[],"art424":[],"art146":[],"art306":[],"art504":[],"art900":[],"art626":[],"art824":[],"art945":[],"art304":[],"art228":[],"art547":[],"art745":[],"art508":[],"art706":[],"art429":[],"art902":[],"art908":[],"art591":[],"art199":[],"art551":[],"art475":[],"art550":[],"art599":[],"art314":[],"art435":[],"art996":[],"art355":[],"art399":[],"art630":[],"art751":[],"art119":[],"art834":[],"art999":[],"art634":[],"art678":[],"art118":[],"art514":[],"art954":[],"art718":[],"art280":[],"art281":[],"art122":[],"art760":[],"art484":[],"art126":[],"art489":[],"art566":[],"art841":[],"art369":[],"art600":[],"art840":[],"art845":[],"art725":[],"art967":[],"art645":[],"art404":[],"art723":[],"art407":[],"art924":[],"art529":[],"art606":[],"art929":[]}));
// let dashboardInput = {
//   "companyID": this.login.value.compId,
//   "branchID": this.login.value.compId,
//   "emailId": this.login.value.compName,
//   "Check": false,
//   "entryPoint": app.entryPoint,
//   "pollingDuration": JSON.parse(res[1]["applicationSettings"]).pollingDuration,
//   "mode": "dashboardData",
//   "dashboardVin": "",
//   "defaultInterval": res[1]["applicationSettings"].liveTrackingDelay,
//   "make": "",
//   "model": "",
//   "delay": res[1]["applicationSettings"].liveTrackingDelay,
//   "ImeiNo": "",
// }
    })
  }

  // async pushNotificationConfig() {
  //   let pushDetails: object;
  //   this.platform.ready().then(res => {

  //     if (this.platform.is('ios')) {
  //       this.firebaseX.grantPermission()
  //         .then((success) => {
  //           if (success) {
  //           }
  //         });
  //     }
  //     if (this.network.type !== "none") {
  //       if (/(android)/i.test(navigator.userAgent)) {
  //         this.firebaseX.getToken()
  //           .then(token => {
  //             //alert("token is "+ token);
  //             //   alert("uuid is "+ this.device.uuid);
  //             localStorage.setItem('imeiNo', this.device.uuid)
  //             localStorage.setItem('deviceToken', token)
  //             localStorage.setItem('notificationStatus', 'true')
  //             pushDetails = {
  //               "imeiNo": this.device.uuid,
  //               "appName": app.appName,
  //               "deviceToken": token,
  //               "companyID": localStorage.getItem("corpId"),
  //               "userId": localStorage.getItem("userName"),
  //               "os": "ionic4",
  //               "pushStatus": "true"
  //             };
  //             const url = serverUrl.web + "/alert/pushnotification";
  //             this.ajaxService.ajaxPostWithBody(url, pushDetails)
  //               .subscribe(res => {
  //                 localStorage.setItem('pushStatus', 'persisted');
  //                 //console.log('push presisted');
  //                 // this.restartApp();
  //               })

  //           })
  //           .catch(error => {
  //             //  alert("Token uuid as "+error);
  //             this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
  //           })

  //       } else if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
  //         this.firebaseX.getToken()
  //           .then(token => {
  //             //alert("token is "+ token);
  //             this.udid.get()
  //               .then((uuid: any) => {
  //                 // alert("uuid is "+ uuid);
  //                 localStorage.setItem('imeiNo', this.device.uuid)
  //                 localStorage.setItem('deviceToken', token)
  //                 localStorage.setItem('notificationStatus', 'true')
  //                 pushDetails = {
  //                   "imeiNo": this.device.uuid,
  //                   "appName": app.appName,
  //                   "deviceToken": token,
  //                   "companyID": localStorage.getItem("corpId"),
  //                   "userId": localStorage.getItem("userName"),
  //                   "os": "ionic4ios",
  //                   "pushStatus": "true"
  //                 };
  //                 localStorage.setItem('device','ionic4ios')
  //                 //console.log(uuid);
  //                 //console.log(token);
  //                 const url = serverUrl.web + "/alert/pushnotification";
  //                 this.ajaxService.ajaxPostWithBody(url, pushDetails)
  //                   .subscribe(res => {
  //                     localStorage.setItem('pushStatus', 'persisted');
  //                     //console.log('push presisted');
  //                     // this.restartApp();
  //                   })
  //               })
  //               .catch((error: any) => {
  //                 //alert("Error uuid as "+error);
  //                 this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
  //               });

  //           })
  //           .catch(error => {
  //             //  alert("Token uuid as "+error);
  //             this.commonService.presentToast("Something went wrong!!Push notification won't recieve");
  //           })

  //       }
  //       this.network.onDisconnect().subscribe(() => {
  //         //console.log('network was disconnected :-(');
  //         this.commonService.presentToast('Poor Network Connection');
  //       });
  //     }
  //   })
  // }
 
  ngOnDestroy(){
  
  }

  ngOnInit() {
    this.getStudentDetails();
    this.menuController.enable(true)
  }

}
