import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from '../../services/ajax.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-device-commands',
  templateUrl: './device-commands.page.html',
  styleUrls: ['./device-commands.page.scss'],
})
export class DeviceCommandsPage implements OnInit {
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  companyList: any;
  deviceCommand: FormGroup;
  getCompany:boolean = false;
  commandValid:boolean = false;
  companyVehicle: any;
  vehicleShow: string;
  showList: any;
  companyDetail: { companyID: string; userId: string; };
  commands: { Concox: { name: string; type: string; }[]; };
  showTextbox: boolean = false;
  commandsData: any;
  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    public router: Router,
    ) { }
    
    getBack(){
      this.router.navigateByUrl('/tabs-login/new-dashboard');
    }

    
    onCompanyTrigger($event, companyList){
      this.getCompany = true;
   const selectedCompany = this.deviceCommand.value.companyId
      const userId={
        companyid: selectedCompany.companyId
      };
      const url = serverUrl.web + '/api/vts/superadmin/company/assets/'+JSON.stringify(userId);
      this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        
        this.companyVehicle = res;
      });
    }
    clearMsgBox(){
      if(this.deviceCommand.value.commandBox.length > 0){
      this.deviceCommand = this.formBuilder.group({
        commandBox: ['', Validators.required]
      });
      this.commonService.presentToast('Your command box is clear');
    }else{
      this.commonService.presentToast('Nothing to clear in command box');
    }
    }


    sendCommand(){
    var commandValue = ''
   if(this.deviceCommand.value.commandsType == "other"){
    commandValue = this.deviceCommand.value.commandBox
   }else{
    commandValue = this.deviceCommand.value.commandsType
   }
   if(commandValue != ''){
    const deviceConfig = {
      "imeiNo": this.deviceCommand.value.vehicle.imei,
      "manufacturer": this.deviceCommand.value.vehicle.devicetype,
      "command": commandValue,
      "pass":"1234",
      "model": this.deviceCommand.value.vehicle.model,
    }
   // const url = serverUrl.Admin + '/device/initial/smsCommands';
   const url = serverUrl.Admin + '/api/device/command';
   this.commonService.presentLoader();
    this.ajaxService.ajaxPostMethod(url, JSON.stringify(deviceConfig))
    .subscribe(res=>{
      if(res.error.text == "pending" || "Sended"){
        this.commonService.presentToast('Command sent');
        this.deviceCommand.reset();
        this.commonService.dismissLoader();
      }else{
        this.commonService.presentToast('Command not worked!');
        this.commonService.dismissLoader();
 }
      
    })
   } else{
    this.commonService.presentToast('Enter the Commands');
   }
      
    }


getCompanyList(){
  const url = serverUrl.web + '/global/getcompanylist?suffix=' + localStorage.companySuffix;
      this.ajaxService.ajaxGet(url)
        .subscribe(res => {
          this.companyList = res;
        })
}

getVehiclelist(){ 
    const url = serverUrl.web + '/global/getlistofvehiclesinfo?companyId=' + this.deviceCommand.value.companyId.companyName;
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.companyVehicle = res;
        if(res.length > 0){
          this.getCompany = true;
         
        }else{
          this.commonService.presentToast('No vehicle in this company');
        }
      
      })
  }


getCommands(commands){ 
  //this.commands ={"Concox":[{"name":"SWITCHING Emergency","type":"SET EO"},{"name": "SWITCHING Emergency","type": "SET EO"}]}
  this.commands = this.commandsData[commands.detail.value.model]
  this.commandValid = true;
}


validateCommand(){
  if(this.deviceCommand.value.commandsType == "other"){
    this.showTextbox = true
}else{
  this.showTextbox = false
}
}

getDefaultcommands(){
  const url = serverUrl.web + '/login/getPreferences?key=commands&companyId='+this.companyDetail.companyID
  this.ajaxService.ajaxGetPerference(url)
  .subscribe(res => {
    this.commandsData = res;
  })
}

    ngOnInit() {
      this.companyDetail = {
        companyID: localStorage.getItem('companyId'),
        userId: localStorage.getItem('userId')
      }
      this.getDefaultcommands();
      this.getCompanyList();
      this.companyList = JSON.parse(localStorage.getItem('dashboardData'))
      this.deviceCommand = this.formBuilder.group({
        companyId: ['', Validators.required],
        vehicle: ['', Validators.required],
        commandsType: ['', Validators.required],
        commandBox: ['']
      });
    }
    
  }
  