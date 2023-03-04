import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-broadcast-additional',
  templateUrl: './broadcast-additional.component.html',
  styleUrls: ['./broadcast-additional.component.scss'],
})
export class BroadcastAdditionalComponent implements OnInit {

  broadcastdetails:FormGroup;
  @Input() value;
  disable=false;
  data;
  trip=["Pickup Trip","Drop Trip","Both"];
  routename=["Vadapalani","CMBT","Arumbaakam","Maduravayol"];
  companyDetail: { branchID: string; companyID: string; userId: string; };
  routetype: any;
  type: any;
  constructor(
    private modalController: ModalController,
    private formBuilder : FormBuilder,
    private commonService: CommonService,
    private ajaxService:AjaxService
  ) { }
  
onChangeHandler(event) {
      
       if(event.detail.value === "Route"){
         this.disable = false ;
       }
       else if(event.detail.value === "All"){
        this.disable = true ;
       }
       
    }
  async closeModel() {
    this.modalController.dismiss();
  }
createform(){
  this.broadcastdetails=this.formBuilder.group({
    routename:['',Validators.required],
    message:['',Validators.required],
    triptype:['']
  })
}
getTriptype() {
  var url = serverUrl.web + `/student/getPreferences?key=Triptype&companyId=${this.companyDetail.companyID}`;
  this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.type = res;
     
    })
}
​
getRoutename() {
  var url = serverUrl.web + `/routetrip/getRoutename?compId=${this.companyDetail.companyID}&branchId=${this.companyDetail.branchID}`;
  this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.routetype = res;
      
    })
}
refresh(){
  
}
onSubmit(event) {
var details={
  "companyId":this.companyDetail.companyID,
  "branchId":this.companyDetail.branchID,
  "SKTSMSGadget":"",
  "Route Alert":"",
  "SKT Alert":"",
  "routeName":this.broadcastdetails.value.routename,
  "message":this.broadcastdetails.value.message,
  "tripType":this.broadcastdetails.value.triptype,
  "toMobile":"9688712724"
  }
const url = serverUrl.web+"/report/broadcastsms";
this.ajaxService.ajaxPostWithString(url,details).subscribe(res=>{
  if (res === "Success") {
    this.commonService.presentToast('Data added succesfully');
    this.broadcastdetails.reset();
    this.modalController.dismiss();
  }
  else{
    this.commonService.presentToast('Contact support team.')
  }
})

}
  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
this.createform();
this.getTriptype();
this.getRoutename();
this.data=this.value;
if(this.value){
  this.broadcastdetails.patchValue({
    routetype:this.data.routetype,
    routename :this.data.routename,
    triptype:this.data.triptype,
    message:this.data.message
  })
 }
  }


}
