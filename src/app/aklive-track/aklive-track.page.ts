import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-aklive-track',
  templateUrl: './aklive-track.page.html',
  styleUrls: ['./aklive-track.page.scss'],
})
export class AkliveTrackPage implements OnInit {
  akLiveForm: FormGroup;

akData:any;

  constructor(  private formBuilder: FormBuilder,    private ajaxService: AjaxService,private router: Router,public commonService:CommonService ) { }

  ngOnInit() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    this.akLiveForm = this.formBuilder.group({
      tripId:['', Validators.required],
      plateno:['',Validators.required],
      tripstartdate:[today,Validators.required]
    })
   

  }

  onSubmit(){
    let url="https://mvt.apmkingstrack.com/fleettracking/tracknow/akverify"
 let data = JSON.stringify( {"tripid": this.akLiveForm.value.tripId,"plateno":this.akLiveForm.value.plateno,"tripstartdate":this.akLiveForm.value.tripstartdate})

  this.ajaxService.ajaxPostWithString(url,data)
  .subscribe(response => {
    this.akData = JSON.parse(response);
    if(this.akData.message == "Link Not Available"){ 
      this.commonService.presentToast("No vehicle found")
    }else{
      localStorage.setItem('appSettings',JSON.stringify("SelectedVin"));
      localStorage.setItem("inItPage",'livetrackAkVerify');
      localStorage.setItem('selectedVin',JSON.stringify(this.akData))  
      localStorage.setItem('userName',this.akData.userName)
      localStorage.setItem('corpId',this.akData.userName)
      localStorage.setItem('staticIOData',JSON.stringify(this.akData.staticIODatas))
  
     setTimeout(()=>{
       this.router.navigateByUrl('/livetrack/'+ JSON.parse(localStorage.selectedVin).plateNo)
     },1000)
    }
 
   

  })
  }


}
