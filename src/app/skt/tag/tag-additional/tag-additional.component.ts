import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControlName, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import {AjaxService} from 'src/app/services/ajax.service';
import {serverUrl} from 'src/environments/environment';


FormBuilder
@Component({
  selector: 'app-tag-additional',
  templateUrl: './tag-additional.component.html',
  styleUrls: ['./tag-additional.component.scss'],
})
export class TagAdditionalComponent implements OnInit {
 @Input() value;
  data;
  tagTypes; 
  update: string;
  tagLogin:FormGroup;
  editTagId="Enter the TagId"
  editTextbox: boolean=false;
  companyDetail: { branchID: string; companyID: string; userId: string; };
   constructor(
     private modalController: ModalController,
     private formBuilder: FormBuilder,
     private ajaxService: AjaxService,
     private commonService:CommonService,) { }
   async closeModal() {
     this.modalController.dismiss();
   }
   createForm(){
     this.tagLogin = this.formBuilder.group({
      tagId :['',Validators.required],
      tagType :['',Validators.required],
     })
   }

   getTagTypes(){
    const url=serverUrl.web +`/login/getPreferences?key=Tagtype&companyId=${this.companyDetail.companyID}`;
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.tagTypes= res;
    })
   }
ngOnInit(){
  this.companyDetail = {
    branchID: localStorage.getItem('corpId'),
    companyID: localStorage.getItem('corpId'),
    userId: localStorage.getItem('userName')
  }
     this.createForm();
     this.getTagTypes();
     this.data = this.value;
    
     if(this.value){
      this.update = "available";
       this.editTextbox=true;
       this.tagLogin.patchValue({
         tagId:this.data.tagId,
         tagType:this.data.tagType
       })

     }
  }
  
  submitBtn(){
  const data={
    "tagId":this.tagLogin.value.tagId,
    "schoolId":localStorage.getItem('corpId'),
    "branchId":localStorage.getItem('corpId'),
    "tagType":this.tagLogin.value.tagType,
    "lastupdatedBy":localStorage.getItem('userName'),
    "lastUpdatedDate":""
}
   if(this.update != 'available'){
    var url = serverUrl.web + '/tag/addtag';
  }else
  {
     url = serverUrl.web + '/tag/updateTag';

 }
  
  this.ajaxService.ajaxPostMethod(url,data).subscribe(res=>{
   
    if(res.message == "Added Successfully"){
      this.commonService.presentToast('Tag Details Added Successfully')
      this.modalController.dismiss();
    }else if(res.message == "Updated Successfully"){
     this.modalController.dismiss();
     this.commonService.presentToast('Tag Details Updated Successfully')
  
    }else{
      this.commonService.presentToast('Contact Support team')
    }
  })
  }
}
