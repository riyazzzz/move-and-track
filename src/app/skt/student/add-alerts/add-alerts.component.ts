import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-add-alerts',
  templateUrl: './add-alerts.component.html',
  styleUrls: ['./add-alerts.component.scss'],
})
export class AddAlertsComponent implements OnInit {
  @Input() value;
   update='' 
 studentDetails : FormGroup
  alertchecks;
  selectedArray=[];
  alertOption: any;
  alerts: any;
  alertinfo: any;
studentname:any;
  constructor(
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private formBuilder: FormBuilder,
    private commonService:CommonService) { }
    createForm(){
      this.studentDetails= this.formBuilder.group({
          alertoption :['']
    })
  }
  submit() {
    var values = [];
  for (var i = 0; i < this.selectedArray.length; i++) {
    if(this.selectedArray[i].ischecked == true){
      values.push(this.selectedArray[i].key)
    }
    else{

    }
  };
    const data = {
      "schoolId": localStorage.getItem('corpId'),
      "branchId": localStorage.getItem('corpId'),
      "stin": this.value,
      "alertMode":this.studentDetails.value.alertoption,
      "alertList":values,
    }
    const url = serverUrl.web + "/student/config/studentalert";
    this.ajaxService.ajaxPostMethod(url, data).subscribe(res => {
      if(res.message == "success"){
        this.commonService.presentToast('Student Details Alert Info Updated Sucessfully');
        this.modalController.dismiss();
      
  }
  else
{
  this.commonService.presentToast('Please contact support team'); 
}

    })
  }
  getBack() {
    this.modalController.dismiss();
  }
  getAlert(){
    const url=serverUrl.web + '/student/getPreferences?key=Sktalert&companyId=demo';
    this.ajaxService.ajaxGetPerference(url).subscribe(res=>{
      this.alertOption = res;
    })
  }
  getAlerttype(){
    const urls = serverUrl.web + '/report/getAlerttype';
    this.ajaxService.ajaxGet(urls).subscribe(res=>{
      this.alerts = res;
   })
   this.alerts
}

  selectData(a_alerts,s_alert) {
    if (s_alert.ischecked == false) {
      this.selectedArray.push(s_alert);
    } else {
      let newArray = this.selectedArray.filter(function (el) {
        return el.id !== s_alert.key;
      });
      this.selectedArray = newArray;
    }
}
 editmethod(){
    const url=serverUrl.web + '/student/get/studentdetails?stin='+this.value;
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
      this.alertinfo= JSON.parse(res); 
      this.studentDetails.patchValue({
        alertoption: this.alertinfo.alertinfo.alertmode.toString(),
       })
       this.alertinfo.alertinfo.alerts;
       this.alerts
    for(var i=0;i <this.alerts.length;i++){
      for (var j=0;j <this.alertinfo.alertinfo.alerts.length;j++){
        if(this.alerts[i].key == this.alertinfo.alertinfo.alerts[j]){
          this.alerts[i].ischecked = true
          this.selectedArray.push(this.alerts[i])
    }
    else{

    }
      }
    
}
     })
    
     
    
}
 
  ngOnInit() {;
 this.createForm();
   if(this.value){
    this.getAlert();
    this.getAlerttype();
    this.alerts
    this.editmethod();
};
    
 
  }
}
