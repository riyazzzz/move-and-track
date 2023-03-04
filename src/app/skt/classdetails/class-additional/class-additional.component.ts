import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {AjaxService} from 'src/app/services/ajax.service';
import {serverUrl} from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-class-additional',
  templateUrl: './class-additional.component.html',
  styleUrls: ['./class-additional.component.scss'],
})
export class ClassAdditionalComponent implements OnInit {
  classDetails :FormGroup;
  @Input() value;
  data;
  update: string;
  editTextbox: boolean=false;
   constructor(
    private modalController: ModalController,
    private formBuilder : FormBuilder,
    private commonService:CommonService,
private ajaxService:AjaxService,
    ) { }
   async closeModal() {
     this.modalController.dismiss();
   }

createForm(){
  this.classDetails = this.formBuilder.group({
    classId:['', Validators.required ],
    sectionId: ['', Validators.required ],
    Tutor: ['', Validators.required ],
    classDescription: ['', Validators.required ],
  });
 }


 onSubmit(ev){
 
  const data={
"companyId":localStorage.getItem('corpId'),
"branchId":localStorage.getItem('corpId'),
"userName":localStorage.getItem('userName'),
"classId":this.classDetails.value.classId,
"sectionId":this.classDetails.value.sectionId,
"tutor":this.classDetails.value.Tutor,
"classDescription":this.classDetails.value.classDescription
  }
  if(this.update != 'available'){
    var url = serverUrl.web + '/class/addClass';
  }else{
     url = serverUrl.web + '/class/updateClass';
  
  }
  this.ajaxService.ajaxPostMethod(url,data).subscribe(res=>{
   
    if(res.message == "Added Successfully"){
     
      this.commonService.presentToast('Class Details Added Successfully')
      this.modalController.dismiss();
    }else if(res.message == "Updated Successfully"){
     this.modalController.dismiss();
     this.commonService.presentToast('Class Details Updated Successfully')
  
    }else{
      this.commonService.presentToast('Please Contact Support team')
    }
  })
}


   ngOnInit(){
     this.data = this.value;
     this.createForm();
     if(this.value){
      this.update = "available";
      this.editTextbox =true;
      this.classDetails.patchValue({
        classId :this.data.classId,
        sectionId :this.data.sectionId,
        Tutor:this.data.tutor,
        classDescription:this.data.classDescription
      })
     }
     
  }

}
