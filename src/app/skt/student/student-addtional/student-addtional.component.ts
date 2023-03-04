import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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


@Component({
  selector: 'app-student-addtional',
  templateUrl: './student-addtional.component.html',
  styleUrls: ['./student-addtional.component.scss'],
})
export class StudentAddtionalComponent implements OnInit {
  popUp;
  
@ViewChild('mapElement', { static: false }) mapElement;
@Input()data:any;
@Input()value:any
update='' 
studentDetails : FormGroup
parentDetails:boolean=false;
tagdetails:boolean=false;
classDetails:boolean=false;  
controlEnabled:boolean = false;

  studentData: any;
  map: any;
  gender: boolean;
constructor(
    private modalController: ModalController,
   
    private formBuilder: FormBuilder,
    private mapService: AuthMapService,
    private ajaxService:AjaxService,
    private commonService:CommonService,
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
    parentDetailsList ;
    mapoptionList    ;
    selectedArray = []
public field: Object = {};
alertchecks: any;
  
    async openDetailsModel(data) {
    if(data == "classDetails"){
    const modal = await this.modalController.create({
      component: ClassAdditionalComponent,
      cssClass: 'my-class-css'
    });
    return await modal.present();
  }
  else if(data == "parentDetails"){
    const modal = await this.modalController.create({
      component: ParentAdditionalComponent,
      cssClass: 'my-parent-css'
    });
    return await modal.present();
  }
  else if(data == "tagDetails"){
    const modal = await this.modalController.create({
      component: TagAdditionalComponent,
      cssClass: 'my-custome-css'
    });
    return await modal.present();
  }
  else if(data == "routeandTrip"){
    const modal = await this.modalController.create({
      component: RouteCommonComponent,
      cssClass: 'student-routeandTrip'
    });
    return await modal.present();
  }
}

  async closeModal() {
    this.modalController.dismiss();
  }
  selectDetails(data,value){  
  if(data == "parentDetails"){
    this.parentDetails=value;
  }
  else if(data == "tagdetails"){
    this.tagdetails=value;
  }
  else if(data == "classDetails"){
    this.classDetails =value;
  }
  else{
   this.parentDetails = false;
   this.tagdetails= false;
   this.classDetails=false;
  }
}
  closeCircle(data,value){
    if(data == "parentDetails"){
      this.parentDetails=value;
    }
    else if(data == "tagdetails"){
      this.tagdetails=value;
    }
    else if (data == "classDetails"){
      this.classDetails=value;
    }
    else{
      this.parentDetails = true;
      this.tagdetails= true;
      this.classDetails=true;
    }
  }

submit(){



  
  var datas=  {
    "rollNo":this.studentDetails.value.rollno+'',
    "mode":"NEW",
    "studentName":this.studentDetails.value.firstname,
    "sex":this.studentDetails.value.gender,
    "classId":this.studentDetails.value.classId,
    "sectionId":this.studentDetails.value.sectionId,
    "tagId":this.studentDetails.value.tagId,
    "latlng":"",
    "shape":"",
    "contactNo":this.studentDetails.value.contactno+'',
    "schoolId":localStorage.getItem('corpId'),
    "companyId":localStorage.getItem('corpId'),
    "branchId":localStorage.getItem('corpId'),
    "userImage":"",
    "alerttype":"",
    "messageAlert":parseInt(this.studentDetails.value.alertoption),
"parentName":this.studentDetails.value.parentName,
"pickupRoute":this.studentDetails.value.pickuproute,
"pickupTrip":this.studentDetails.value.pickuptrip,
"pickupStop":this.studentDetails.value.pickupstop,
"dropRoute":this.studentDetails.value.droproute,
"dropTrip":this.studentDetails.value.droptrip,
"dropStop":this.studentDetails.value.dropstop,

    }
  if(this.update != 'available'){

    var url = serverUrl.web + '/student/addStudent';
  }else{
 
     url = serverUrl.web + '/student/updateStudent';
  datas["stin"]=this.value.stin;
  datas["mode"]="";

  }

   
  this.ajaxService.ajaxPostMethod(url,datas).subscribe(res=>{
    console.log(res)
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




  genderSelection(ev){

    console.log(ev,ev.target.value,"My event");
 if(ev.target.value === "Male" ){
      this.gender = true;
     }
 
    else if(ev.target.value === "Female" ) {
     this.gender = false;
   }
 }  
  createForm(){
    this.studentDetails= this.formBuilder.group({
      rollno: ['', ],
      firstname: ['',],
      contactno: ['',],
        gender :  ['Male',],
        parentName :  ['',],
        sectionId :  ['',Validators.required],
        classId :  ['',Validators.required],
        tagId :  ['',Validators.required],
        pickuproute :  ['',],
        pickuptrip :  ['',],
        pickupstop :  ['',],
        droproute :  ['',],
        droptrip :  ['',],
        dropstop :  ['',],
        alertoption :  ['',],
         
  })
}
  ionViewWillEnter() {
    setTimeout(() => {
      if (this.map.setTarget)
        this.map.setTarget(this.mapElement.nativeElement);
        // this.loadMarkers();
       
    }, 2000);
  }
    loadMap = () => {
      setTimeout(() => {
        if (localStorage.map === "GoogleMap") {
          this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: 17.786351, lng: 78.090820 }, true, this.popUp);
        } else {
          this.map = this.mapService.loadMap(this.mapElement.nativeElement, { lat: 17.786351, lng: 78.090820 }, true, this.popUp);
          this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
        }
        this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
  
      })
  }



getdetails(){
  const companyDatas={
    schoolId:localStorage.getItem('corpId'),
    branchId:localStorage.getItem('corpId')
  }
  const data=[{"classId":'/student/classIds?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"sectionIds":'/student/SectionIds?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"pickupStop":'/student/stop?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"pickupRoute":'/student/route?schoolId='+companyDatas.schoolId+'&branchId='+companyDatas.branchId},
  {"tagId":'/tag/tagId'}, {"pickuptrip":'/student/getPreferences?key=trip&companyId='+companyDatas.branchId},
  {"alertOption":'/student/getPreferences?key=Sktalert&companyId=demo'+companyDatas.branchId},
]
  // const classId = serverUrl.web + '/student/classIds';
  // const sectionId = serverUrl.web + '/student/SectionIds';
  data.forEach(element => {
    if(Object.keys(element)[0] !== "tagId"){
      const url=serverUrl.web + Object.values(element)
      this.ajaxService.ajaxGet(url).subscribe(res=>{
        if(Object.keys(element)[0] == "classId"){
      this.classid = res
    }else if(Object.keys(element)[0] == "sectionIds"){
      this.sectionIds = res;
        }else if(Object.keys(element)[0] == "pickupRoute"){
          this.pickuproute = this.droproute = res;
   
            }else if(Object.keys(element)[0] == "pickuptrip"){
              this.pickuptrip = this.droptrip = res;
       
              //  }else if(Object.keys(element)[0] == "alertOption"){
              //    this.alertOption = res;
               //  this.alertOption =[{name:"sms",type:0},{name:"mail",type:1}]
                    }else if(Object.keys(element)[0] == "pickupStop"){
              this.pickupstop = this.dropstop = res;
       
                }else if(Object.keys(element)[0] == "tagId"){
              // this.pickuproute , this.droproute=res;
              // this.selecttagid = res;
              // console.log(res)
       
                }
           
    })
  }else{

    // const url=serverUrl.web + '/tag/tagId';
    // this.ajaxService.ajaxPostWithBody(url, companyDatas).subscribe(res=>{
    //   console.log(res)
    //   this.selecttagid = res;
    // })

    const url=serverUrl.web + '/tag/tagId?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId')
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
    
      this.selecttagid = JSON.parse(res);
    })
  }

      // console.log(res)
      // this.tagIds = res;
    })
  // })
}

getAlerts(){
  const url=serverUrl.web + '/student/getPreferences?key=Sktalert&companyId=demo';
  this.ajaxService.ajaxGetPerference(url).subscribe(res=>{
    this.alertOption = res;
  })
}


parentNames(){
  const url=serverUrl.web + '/student/getParentname?companyId='+localStorage.getItem('corpId')
  this.ajaxService.ajaxGet(url).subscribe(res=>{
    this.parentDetailsList = res;
  })

}



// yasir code for alerts

selectData(alertchecks) {
  if (alertchecks.isChecked == false) {
    this.selectedArray.push(alertchecks);
  } else {
    let newArray = this.selectedArray.filter(function (el) {
      return el.id !== alertchecks.id;
    });
    this.selectedArray = newArray;
  }
  console.log(this.selectedArray);
}
submitData() {
  var postDatas = [];
  for (var i = 0; i < this.selectedArray.length; i++) {
    // postDatas += this.sampleData[i].name+','
    postDatas.push(this.selectedArray[i].alertname)
  }
  }
//
  ngOnInit() {
    this.parentNames()
    this.getAlerts();
    this.getdetails();
    this.loadMap();
    this.studentData = this.value;
    this.createForm();
//yasir
this.alertchecks= [
  {alertname: "Dear parentname, Greetings! studentname was absent today.", id: 1, isChecked: false},
  {alertname: "Dear Parent, Your ward studentname school bus is about to arrive at your bus stop in few minutes.", id: 2, isChecked: true},
  {alertname: "Dear Parent, Your ward studentname school bus has reached busstopname at eventtime.", id: 3, isChecked: false},
  {alertname: "Dear parent, Your ward studentname school bus has started from busstopname at eventtime.", id: 4, isChecked: false},
  {alertname: "Dear Parent, Your ward studentname school bus is started from school.",id: 5, isChecked:false},
  {alertname: "Dear parentname, Greetings! studentname has crossed busstopname on eventtime.", id: 6, isChecked:false},
  {alertname: "Dear parentname! Greetings studentname has been dropped at busstopname bus stop on eventtime.",id: 7, isChecked: false},
  {alertname: "Dear parentname! Greetings studentname has reached the busstopname on eventtime.", id: 8, isChecked: false},
  {alertname: "Dear parentname, Greetings! studentname has boarded the bus from busstopname on eventtime.",id: 9, isChecked: false},
  {alertname: "Dear parentname, Greetings! studentname has left the bus from busstopname  on eventtime.", id: 10, isChecked: false},
  {alertname: "Dear parentname! Greetings studentname has boarded the bus from busstopname bus stop on eventtime.",id: 11, isChecked: false},
  {alertname: "Dear parentname! Greetings studentname has started from busstopname on eventtime.", id: 12, isChecked: false}]
this.field = { dataSource: this.alertchecks, id: 'id', text: 'alertname' };
for (var i = 0; i < this.alertchecks.length; i++) {
  if (this.alertchecks[i].isChecked == true) {
    this.selectedArray.push(this.alertchecks[i])
    console.log(this.alertchecks[i])
  }
}
    if(this.value){
      this.update = "available";
      this.controlEnabled = true;
    this.studentDetails.patchValue({
      rollno: this.studentData.rollNo,
      firstname:  this.studentData.studentName,
      contactno:  this.studentData.contactNo,
      gender:this.studentData.sex,
      parentName : this.studentData.parentName,
      sectionId : this.studentData.sectionId,
      classId : this.studentData.classId,
      tagId : this.studentData.tagId,
      pickuproute : this.studentData.pickupRoute,
      pickuptrip : this.studentData.pickupTrip,
      pickupstop : this.studentData.pickupStop,
      droproute : this.studentData.dropRoute,
      droptrip : this.studentData.dropTrip,
      dropstop : this.studentData.dropStop,
      alertoption : this.studentData.messageAlert,
    })
  }
  // branchId: "demo"
  // classId: "I"
  // contactNo: "12313213"
  // dropRoute: ""
  // dropStop: ""
  // dropTrip: ""
  // latlng: "-"
  // messageAlert: 1
  // parentName: ""
  // pickupRoute: ""
  // pickupStop: ""
  // pickupTrip: ""
  // rollNo: 1232
  // schoolId: "demo"
  // sectionId: "B"
  // sex: "Male"
  // studentName: "asda"
  // tagId: "0002164852"
  }

}
