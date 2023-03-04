import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-vts-diagnosis',
  templateUrl: './vts-diagnosis.component.html',
  styleUrls: ['./vts-diagnosis.component.scss'],
})
export class VtsDiagnosisComponent implements OnInit {

dat="$,500,869247046192016,89910473121803851084,1,0,1,*";
// data="";
imeiNo:any;
  showDatas: any;
  show=true;
  constructor(
    private ajaxService: AjaxService,
    private commonService:CommonService,
) { }
colors=['sfas','asefas','sdf','safsafesa','asefaf']
// hide(){
  
// }

data='';
submit(imei){
  this.imeiNo=imei
    this.show=false;
    const body = {
      "imeiNo":this.imeiNo
  }
  const url = serverUrl.web + '/simcard/get/Diagnosis'
  this.ajaxService.ajaxPostWithBody(url, body )
  .subscribe(res => {

   this.data =JSON.parse(res) ;
  //  this.showDatas = res.split(",");
  //  this.showDatas =["$", "500", "869247046192016", "89910473121803851084", "1", "0", "1", "*"]
    console.log(res);
    // if(this.data.ra)
  })

}

 imei=["866551036278671", "866551036278672", "866551036278673", "866551036278674"]
// imei=[];
isItemAvailable = false;
items = [];

initializeItems(){
  this.imei;
}

hide(ev: any) {
 
  if(ev.target.value.length == 15){
    this.show=false;
  }else{
    this.show=true;
   this.data="";

  }
   
   this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.imei = this.imei.filter((item) => {
            return (item.indexOf(val) > -1);
        })

    } else {
        this.isItemAvailable = false;
        this.getImei();
    }
}
getImei(){
const url = serverUrl.web + '/simcard/get/imei/list';
    this.ajaxService.ajaxGetWithString(url)
    .subscribe(res => {
  
      this.imei =JSON.parse(res);
    //  this.showDatas = res.split(",");
    //  this.showDatas =["$", "500", "869247046192016", "89910473121803851084", "1", "0", "1", "*"]
    console.log(res);
      
    })
  }
  ngOnInit() {
    this.getImei();
  }


}
