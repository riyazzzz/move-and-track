import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ClassAdditionalComponent } from '../../classdetails/class-additional/class-additional.component';
import { ParentAdditionalComponent } from '../../parent/parent-additional/parent-additional.component';
import { RouteCommonComponent } from '../../route/route-common/route-common.component';
import { TagAdditionalComponent } from '../../tag/tag-additional/tag-additional.component';
import { AuthMapService } from 'src/app/services/auth-map.service';
import { GoogleMapService } from 'src/app/services/google-map.service';
import { OpenlayerMapService } from 'src/app/services/openlayer-map.service';
import { serverUrl } from 'src/environments/environment';
import {AjaxService} from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { AddRouteComponent } from '../add-route/add-route.component';
import { AddAlertsComponent } from '../add-alerts/add-alerts.component'
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
popUp;
type = "text";
val;
@ViewChild('mapElement', { static: false }) mapElement;
@Input()data:any;
@Input()value:any;
update='' 
studentDetails : FormGroup
parentDetails:boolean=false;
tagdetails:boolean=false;
classDetails:boolean=false;  
controlEnabled:boolean = false;
selectedVin;
editTagId="select tagId"
  editTextbox: boolean=false;
  editselectbox: boolean=false;
  studentData: any;
  map: any;
  gender: boolean;
  studentinfo: any;
 constructor(
    private modalController: ModalController,
   
    private formBuilder: FormBuilder,
    private mapService: AuthMapService,
    private ajaxService:AjaxService,
    private commonService:CommonService,
    private alertController:AlertController
    ) {
      if (localStorage.map == "GoogleMap") {
      this.mapService = new GoogleMapService();
    }
    else {
      this.mapService = new OpenlayerMapService();
  } 
  }
    droproute;
    pickuproute;
    classid;
    sectionIds;
    selecttagid;
    droptrip;
    pickupstop;
    pickuptrip;
    alertOption;
    dropstop;
    classsectionid
    parentDetailsList ;
    mapoptionList    ;
    selectedArray = []
public field: Object = {};
alertchecks: any;
  
    
editmethod(){
  const url=serverUrl.web + '/student/get/studentdetails?stin='+this.value;
  this.ajaxService.ajaxGetObject(url).subscribe(res=>{
    this.studentinfo= JSON.parse(res);
    this.update = "available";
    this.editTextbox=true
    this.sectionIds = this.classsectionid[this.studentinfo.studentinfo.classId]
    this.studentDetails.patchValue({
     rollno: this.studentinfo.studentinfo.rollNo,
      firstname:this.studentinfo.studentinfo.studentName1,
      gender:this.studentinfo.studentinfo.sex,
      parentName :this.studentinfo.studentinfo.parentId,
      sectionId :this.studentinfo.studentinfo.sectionId,
      classId :this.studentinfo.studentinfo.classId,
      tagId : this.studentinfo.studentinfo.tagId,
      // lastname:this.studentinfo.studentinfo.studentName2,
      dob:this.studentinfo.studentinfo.dob,
      address:this.studentinfo.studentinfo.address,
      state:this.studentinfo.studentinfo.state,
      district:this.studentinfo.studentinfo.district,
      pincode:this.studentinfo.studentinfo.pincode,
     
    })
   
  })
}

  
  async closeModal() {
    this.modalController.dismiss();
  }
createForm(){
  this.studentDetails= this.formBuilder.group({
    rollno: ['',Validators.required ],
    firstname: ['',Validators.required],
      gender :  ['Male'],
      parentName :  ['',Validators.required],
      sectionId :  ['',Validators.required],
      classId :  ['',Validators.required],
      tagId :  ['',Validators.required],
      // lastname:['',Validators.required],
       dob:['',Validators.required],
      address:['',Validators.required],
      state:['',Validators.required],
      district:['',Validators.required],
      pincode:['',Validators.required]
})
}
async submit() {

 var datas=  {
"rollNo":this.studentDetails.value.rollno,
    "studentName1":this.studentDetails.value.firstname,
    "studentName2":'--',
    "sex":this.studentDetails.value.gender,
    "classId":this.studentDetails.value.classId,
    "sectionId":this.studentDetails.value.sectionId,
    "tagId":this.studentDetails.value.tagId,
    "parentId":this.studentDetails.value.parentName,
    "schoolId":localStorage.getItem('corpId'),
    "updateBy":localStorage.getItem('corpId'),
    "branchId":localStorage.getItem('corpId'),
"dob":this.studentDetails.value.dob,
"address":this.studentDetails.value.address,
"district":this.studentDetails.value.state,
"state":this.studentDetails.value.district,
"pincode":this.studentDetails.value.pincode,
}
  if(this.update != 'available'){
var url = serverUrl.web + '/student/add/studentdetails';
datas["messageAlert"]=1;
  }else{
 
     url = serverUrl.web + '/student/update/studentdetails';
  datas["stin"]=this.value;

  }
this.ajaxService.ajaxPostMethod(url,datas).subscribe( async res=>{
    if(res.message == "success"){
      this.commonService.presentToast('Student Details Added Sucessfully');
      this.studentDetails.reset();
      this.modalController.dismiss();
   
}
else if(res.message == "Updated"){
  this.commonService.presentToast('Student Details Updated sucessfully');
  this.studentDetails.reset();
  this.modalController.dismiss();
}
else
{
  this.commonService.presentToast('Please contact support team'); 
}

  
  })
 
}




  genderSelection(ev){
 if(ev.target.value === "Male" ){
      this.gender = true;
     }
 
    else if(ev.target.value === "Female" ) {
     this.gender = false;
   }
 }  
 
 getdetails(){
  const companyDatas={
    schoolId:localStorage.getItem('corpId'),
    branchId:localStorage.getItem('corpId')
  }
  const data=[
  {"sectionIds":'/student/SectionIds?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"pickupStop":'/student/stop?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"pickupRoute":'/student/route?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"tagId":'/tag/tagId'}, {"pickuptrip":'/student/getPreferences?key=trip&companyId='+companyDatas.branchId},
  {"alertOption":'/student/getPreferences?key=Sktalert&companyId=demo'+companyDatas.branchId},
]
  data.forEach(element => {
    if(Object.keys(element)[0] !== "tagId"){
      const url=serverUrl.web + Object.values(element)
      this.ajaxService.ajaxGet(url).subscribe(res=>{
         if(Object.keys(element)[0] == "pickupRoute"){
          this.pickuproute = this.droproute = res;
   
            }else if(Object.keys(element)[0] == "pickuptrip"){
              this.pickuptrip = this.droptrip = res;
       
                    }else if(Object.keys(element)[0] == "pickupStop"){
              this.pickupstop = this.dropstop = res;
       
                }else if(Object.keys(element)[0] == "tagId"){
        }
           
    })
  }else{

    const url=serverUrl.web + '/tag/tagId?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId')
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
    
      this.selecttagid = JSON.parse(res);
    })
  }
    })
}

getAlerts(){
  const url=serverUrl.web + '/student/getPreferences?key=Sktalert&companyId=demo';
  this.ajaxService.ajaxGetPerference(url).subscribe(res=>{
    this.alertOption = res;
  })
}
getclassIds(){
  const url=serverUrl.web + '/student/classIds?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId');
  this.ajaxService.ajaxGetObject(url).subscribe(res=>{
    this.classsectionid = JSON.parse(res);
    this.classid=Object.keys(this.classsectionid);
    
})
}

parentNames(){
  const url=serverUrl.web + '/student/getParentname?companyId='+localStorage.getItem('corpId')
  this.ajaxService.ajaxGet(url).subscribe(res=>{
    this.parentDetailsList = res;
  })

}
getsectionId(ev){

  this.studentDetails.patchValue({
    sectionId : ''
  })
   this.sectionIds =this.classsectionid[ev.target.value]
  
}



  ngOnInit() {
    this.parentNames()
    this.getAlerts();
    this.getdetails();
    this.getclassIds();
    this.studentData = this.studentinfo;
    this.createForm();
    if(this.value){
     this.editmethod();
       }
    
   }

}



