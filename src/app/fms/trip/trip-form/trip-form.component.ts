import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl, storageVariable } from '../../../../environments/environment';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit {

  @Input() value;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  tripForm: FormGroup;
  vin :any;
  expensedetails:any;
  vinPlateNo = [];
  hideSerialNo: boolean = false;
  Showcard: boolean = false;
  carddetails: any;
  today = new Date();
  maxDate;
  minDate;
  maxtime;
  mintime;
  time: string[];
  ismax=true;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
  ) { }
  getVehicleList(){
    var url = serverUrl.fmsUrl +'/dashboard/getVehicleList?companyid='+localStorage.getItem('corpId')+'&userid='+localStorage.getItem('userName');
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.vin =res;
      })
  }
  gettriplist = (event: {
    component: IonicSelectableComponent,
    value: any
  }) => {
    if(event.value)
     this.tripForm.value.plateNo = event.value; 
     }
     selectdate(event){
      this.minDate = event.target.value
      this.ismax =false
     }
  submit(){
    var data;
   if(!this.value){
      if(this.tripForm.value.endlocation == "" && this.tripForm.value.enddate == "" && this.tripForm.value.endtime == "" && this.tripForm.value.enddisttravel == ""){
        data={
          "companyid":localStorage.getItem('corpId'),
          "branchid":localStorage.getItem('corpId'),
          "userid":"",
          "id":"",
          "vin":this.tripForm.value.plateNo,
          "tripname":this.tripForm.value.tripname,
          "startlocation":this.tripForm.value.startlocation,
          "startdate":this.tripForm.value.startdate +' '+ this.tripForm.value.starttime+':00',
          "startodometer":this.tripForm.value.startdisttravel,
          "endlocation":"",
          "enddate":"",
          "endodometer":"",
          "status":"Close",
          "createddate":null,
          "createdby":localStorage.getItem('corpId'),
          "updateddate":null,
          "updatedby":null,
        }
      }
      else{
        if(this.tripForm.value.enddisttravel < this.tripForm.value.startdisttravel)
        {
          this.commonService.presentToast('Please Enter the Correct Odmometer')
        }
        else{
        data={
          "companyid":localStorage.getItem('corpId'),
          "branchid":localStorage.getItem('corpId'),
          "userid":"",
          "id":"",
          "vin":this.tripForm.value.plateNo,
          "tripname":this.tripForm.value.tripname,
          "startlocation":this.tripForm.value.startlocation,
          "startdate":this.tripForm.value.startdate +' '+ this.tripForm.value.starttime+':00',
          "startodometer":this.tripForm.value.startdisttravel,
          "endlocation":this.tripForm.value.endlocation,
          "enddate":this.tripForm.value.enddate +' '+ this.tripForm.value.endtime+':00',
          "endodometer":this.tripForm.value.enddisttravel,
          "status":"Close",
          "createddate":null,
          "createdby":localStorage.getItem('corpId'),
          "updateddate":null,
          "updatedby":null,
        }
      }
}
    const url = serverUrl.fmsUrl +'/trip/fmsSaveTrip';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "Trip Saved Successfully"){
        this.commonService.presentToast('Trip Added Succesfully');
        this.modalController.dismiss();
      }
    else if(res.message == "Trip Name Already Exists"){
      this.commonService.presentToast('Trip Name Already Added');
    }
    else{
      this.commonService.presentToast('Please Contact Support Team');
    }
    });
    }
    else{
      data = this.value;
      if(this.tripForm.value.endlocation == "" && this.tripForm.value.enddate == "" || this.tripForm.value.enddate == undefined && this.tripForm.value.endtime == "" && this.tripForm.value.enddisttravel == ""){
        data['companyid'] =localStorage.getItem('corpId'),
        data['branchid'] =localStorage.getItem('corpId'),
        data['userid'] ="",
        data['id'] = this.value.id
        data['vin'] = this.tripForm.value.plateNo
        data['tripname'] = this.tripForm.value.tripname
        data['startlocation'] = this.tripForm.value.startlocation
        data['startdate'] = this.tripForm.value.startdate +' '+ this.tripForm.value.starttime+':00',
        data['startodometer']= this.tripForm.value.startdisttravel
        data['endlocation'] =""
        data['enddate'] = "",
        data['endodometer'] = ""
        data['status'] = "Close"
        data['createddate'] =null
        data['createdby'] = localStorage.getItem('corpId')
        data['updateddate'] = null
        data['updatedby'] = null
      }
      else{
         if(this.tripForm.value.endtime.length == 5)
           {
            if(this.tripForm.value.enddisttravel < this.tripForm.value.startdisttravel)
        {
          this.commonService.presentToast('Please Enter the Correct Odmometer')
        }
        else{
            data['companyid'] =localStorage.getItem('corpId'),
            data['branchid'] =localStorage.getItem('corpId'),
            data['userid'] ="",
            data['id'] = this.value.id
            data['vin'] = this.tripForm.value.plateNo
            data['tripname'] = this.tripForm.value.tripname
            data['startlocation'] = this.tripForm.value.startlocation
            data['startdate'] = this.tripForm.value.startdate +' '+ this.tripForm.value.starttime+':00',
            data['startodometer']= this.tripForm.value.startdisttravel
            data['endlocation'] =this.tripForm.value.endlocation
            data['enddate'] = this.tripForm.value.enddate +' '+this.tripForm.value.endtime+':00',
            data['endodometer'] = this.tripForm.value.enddisttravel
            data['status'] = "Close"
            data['createddate'] =null
            data['createdby'] = localStorage.getItem('corpId')
            data['updateddate'] = null
            data['updatedby'] = null
            const url = serverUrl.fmsUrl +'/trip/fmsSaveTrip';
            this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
              if(res.message == "Trip Updated Successfully"){
               this.commonService.presentToast('Trip Updated Succesfully');
               this.modalController.dismiss();
              }
              else{
                this.commonService.presentToast('Please Contact Support Team');
              }
            })
    
        }
}

     else{ 

         if(this.tripForm.value.enddisttravel < this.tripForm.value.startdisttravel)
        {
          this.commonService.presentToast('Please Enter the Correct Odmometer')
        }

    else{    
  var hourtime=this.tripForm.value.endtime.split('T')
  var time=hourtime[1]
  var sec=time.split(':')
  data['companyid'] =localStorage.getItem('corpId'),
  data['branchid'] =localStorage.getItem('corpId'),
  data['userid'] ="",
  data['id'] = this.value.id
  data['vin'] = this.tripForm.value.plateNo
  data['tripname'] = this.tripForm.value.tripname
  data['startlocation'] = this.tripForm.value.startlocation
  data['startdate'] = this.tripForm.value.startdate +' '+ this.tripForm.value.starttime+':00',
  data['startodometer']= this.tripForm.value.startdisttravel
  data['endlocation'] =this.tripForm.value.endlocation
  data['enddate'] = this.tripForm.value.enddate +' '+sec[0]+':'+sec[1]+':00',
  data['endodometer'] = this.tripForm.value.enddisttravel
  data['status'] = "Close"
  data['createddate'] =null
  data['createdby'] = localStorage.getItem('corpId')
  data['updateddate'] = null
  data['updatedby'] = null
  const url = serverUrl.fmsUrl +'/trip/fmsSaveTrip';
  this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
    if(res.message == "Trip Updated Successfully"){
     this.commonService.presentToast('Trip Updated Succesfully');
     this.modalController.dismiss();
    }
    else{
      this.commonService.presentToast('Please Contact Support Team');
    }
  })

    }
      }
    }
   }
  }
  closeModel(){
  this.modalController.dismiss();
  }
  clear(){
    if(this.value){
      this.tripForm.patchValue({
        plateNo:this.value.vin,
        tripname:this.value.tripname,
        startlocation:"",
        startdate:"",
        starttime:"",
        startdisttravel:"",
        endlocation:"",
        enddate:"",
        endtime:"",
        enddisttravel:""
         });
         this.carddetails=[]
         this.expensedetails=[]
    }
    else{
      this.tripForm.patchValue({
        plateNo:"",
        tripname:"",
        startlocation:"",
        startdate:"",
        starttime:"",
        startdisttravel:"",
        endlocation:"",
        enddate:"",
        endtime:"",
        enddisttravel:""
         });
    }
  }
  createForm()
  {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    var todaytime=now.getHours() + ":"+ now.getMinutes();
     this.tripForm = this.formBuilder.group({
      plateNo:['', Validators.required],
      tripname:['', Validators.required],
      startlocation:['', Validators.required],
      startdate:[today, Validators.required],
      starttime:[todaytime, Validators.required],
      startdisttravel:['', Validators.required],
      endlocation:[''],
      enddate:[''],
      endtime:[''],
      enddisttravel:['']
    })
  }
  editForm()
  {
    if(this.value){
      var url = serverUrl.fmsUrl +'/incomeexpense/getIncomeAndExpense?companyid='+localStorage.getItem('corpId')+'&tripname='+this.value.tripname;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.expensedetails =res;
      })
    this.carddetails =[this.value]
      this.hideSerialNo = true;
      var startsplitdate=this.value.startdate.split(' ')[0];
      var startsplittime=this.value.startdate.split(' ')[1];
      var endsplitdate=this.value.enddate.split(' ')[0];
      var endsplittime=this.value.enddate.split(' ')[1];
      this.vin = [this.value.vin]
        this.tripForm.patchValue({
          plateNo:this.value.vin,
          tripname:this.value.tripname,
          startlocation:this.value.startlocation,
          startdate:startsplitdate,
          starttime:startsplittime,
          startdisttravel:this.value.startodometer,
          endlocation:this.value.endlocation,
          enddate:endsplitdate,
          endtime:endsplittime,
          enddisttravel:this.value.endodometer
           });
          
    }

  }
 
  ngOnInit() {

    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();
    
    this.time=new Date().toLocaleTimeString().split(':')
    this.mintime =this.time[0]+':'+this.time[1]
    this.maxtime =(this.time[0].length ==1 ?"0"+ this.time[0] : this.time[0]) +':'+this.time[1]

    this.getVehicleList();
    this.createForm();
    this.editForm();
  
}



}
