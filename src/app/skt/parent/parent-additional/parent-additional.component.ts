import { Component, OnInit,Input} from '@angular/core';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-parent-additional',
  templateUrl: './parent-additional.component.html',
  styleUrls: ['./parent-additional.component.scss'],
})
export class ParentAdditionalComponent implements OnInit {
@Input() value;
 data:any;
 parentLogin:FormGroup;
  companyDetail: { branchID: string; companyID: string; userId: string; };
  url: string;
  parentData: any;
  update: string;
  addDatas;
  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder, 
    private ajaxService:AjaxService,
    private commonService: CommonService,
  ) { 
      
    }
  async closeModal() {
    this.modalController.dismiss();
  }
   createForm(){
    this.parentLogin = this.formBuilder.group({
      contactno:['', Validators.required ],
      // roll: ['', Validators.required ],
      parentName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      emailaddress: ['',],
      address: ['', Validators.required ],
      city: ['',],
      state: ['',],
      pincode: ['', Validators.required ]
     });
   }
   onSubmit(ev){ 

    if(this.update != 'available'){
  this.addDatas  ={"parentContactNo":this.parentLogin.value.contactno+'',"parentFname":this.parentLogin.value.parentName,
  "parentLname":this.parentLogin.value.lastName,"mode":"New",
    "parentEmail":this.parentLogin.value.emailaddress,
    "parentAddress":this.parentLogin.value.address,
    "parentCity":this.parentLogin.value.city,
    "parentState":this.parentLogin.value.state,"pinCode":this.parentLogin.value.pincode+'',"parentAddressId":"",
    "role":"parent","companyId":localStorage.getItem('corpId'),
    "branchId":localStorage.getItem('corpId'),"userImage":"","oldEmailAddress":""}

   
  var url = serverUrl.web + '/parent/addparent';
}else{
  this.addDatas  = {"emailAddress":this.value.emailAddress,"companyId":localStorage.getItem('corpId'),"firstName":this.parentLogin.value.parentName,
  "lastName":this.parentLogin.value.lastName,"addressLine1":this.parentLogin.value.address,"fax":this.parentLogin.value.emailaddress,"contactNo":this.parentLogin.value.contactno}
   url = serverUrl.web + '/parent/updateparent';
}
this.ajaxService.ajaxPostMethod(url,this.addDatas ).subscribe(res=>{
  if(res.message == "Added Successfully"){
    this.commonService.presentToast('Parent Details Added Successfully')
    this.modalController.dismiss();
}
else if(res.message == "Updated Successfully"){
   this.commonService.presentToast('Parent Details Updated Successfully')
   this.modalController.dismiss();
  }
  else{
    this.commonService.presentToast('Contact Support team')
  }
})

   
    
  }
   
  ngOnInit(){
    
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    this.createForm();
    this.parentData=this.value;
    if(this.value){
      this.update = "available";
    this.parentLogin.patchValue({
      contactno:this.parentData.contactNo,
      // roll:this.parentData.roll ,
      parentName:this.parentData.parentFsName,
      lastName:this.parentData.parentLsName,
      emailaddress:this.parentData.fax,
      address:this.parentData.address,
      city:this.parentData.city,
      state:this.parentData.state,
      pincode:this.parentData.pin
 
  });
 }
 
 
}
}
