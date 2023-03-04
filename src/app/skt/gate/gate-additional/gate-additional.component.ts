import { Component, OnInit,Input} from '@angular/core';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import {AjaxService} from 'src/app/services/ajax.service';
import {serverUrl} from 'src/environments/environment';
@Component({
  selector: 'app-gate-additional',
  templateUrl: './gate-additional.component.html',
  styleUrls: ['./gate-additional.component.scss'],
})
export class GateAdditionalComponent implements OnInit {
 @Input() value;
 data:any;
 gateLogin:FormGroup;
 companyDetail: { branchID: string; companyID: string; userId: string; };
 url: string;
 
  customData = false;
  gateData: any;
  update: string;
 constructor(
  private modalController: ModalController,
 private formBuilder: FormBuilder, 
private commonService:CommonService,
private ajaxService:AjaxService,
 ) { }
  async closeModal() {
    this.modalController.dismiss();
  }
   createForm(){
    this.gateLogin = this.formBuilder.group({
      gatename: ['',Validators.required ],
      location: ['',Validators.required],
      description: ['',],
      deviceIMEI: ['', Validators.required ]
     });
   }
   required(){
     this.customData = !this.customData;
  }
   onSubmit(){
    const data={
      "companyId":localStorage.getItem('corpId'),
    "branchId":localStorage.getItem('corpId'),
    "gateName":this.gateLogin.value.gatename,
    "location":this.gateLogin.value.location,
    "description":this.gateLogin.value.description,
    "deviceimei":this.gateLogin.value.deviceIMEI
         }
     if(this.update != 'available'){
      var url = serverUrl.web + '/gate/addGate';
    }else{
       url = serverUrl.web + '/gate/updateGate';
       data["gateid"] = this.value.gateid;
    }
    
    this.ajaxService.ajaxPostMethod(url,data).subscribe(res=>{
     
      if(res.message == "Added Successfully"){
        this.commonService.presentToast('Added Successfully')
        this.modalController.dismiss();
      }else if(res.message == "Updated Successfully"){
       this.modalController.dismiss();
       this.commonService.presentToast('Updated Successfully')
    
      }else{
        this.commonService.presentToast('Contact Support team')
      }
    })
     
   }
   
  ngOnInit(){
   this.createForm();
    this.gateData=this.value;

    if(this.value){
      this.update = "available";
      this.gateLogin.patchValue({
      gatename:this.gateData.gateName,
      location:this.gateData.location ,
      description:this.gateData.description,
      deviceIMEI:this.gateData.deviceimei,
  });
 }
 }

}
