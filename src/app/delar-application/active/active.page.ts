import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active',
  templateUrl: './active.page.html',
  styleUrls: ['./active.page.scss'],
})
export class ActivePage implements OnInit {
  segment:string;
  moreOption:boolean=true;
  more:boolean=true;
  company = true;
  companyName:string;
  vehicleCount:any;
  showList = [{companyName : '', vehicle_Count: ''}]; 
  selector: string;
  selectedData: any;
  initialHeader: boolean;
  searchEnable: boolean;
  activeData;
  retrievedObject;
  data: any = {};
   online=[];
   offline=[];
   expired=[];
   renewal=[];
  datas= [
    {
    "plateNo":"Tn33ab6474",
    "companyId":"Demo1",
    "imeiNo":"3454567890ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"transmit",
    "deviceStatus":"renewal",
     "serialNo":"1234",
     "model":"APMKT0BD2"
  },
  {
    "plateNo":"Tn33ab6474",
    "companyId":"Demo2",
    "imeiNo":"4532568890ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"notransmit",
    "deviceStatus":"expired",
    "serialNo":"1235",
    "model":"APMKT0BD24"
  },
  {
    "plateNo":"Tn33ab6474",
    "companyId":"Demo3",
    "imeiNo":"890556890ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"transmit",
    "deviceStatus":"renewal",
    "serialNo":"1236",
    "model":"APMKT0BD24"
  },
  {
    "plateNo":"Tn33ab6474",
    "companyId":"Demo4",
    "imeiNo":"345570890ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"notransmit",
    "deviceStatus":"expired",
    "serialNo":"1237",
    "model":"APMKT0BD24"
  },{
    "plateNo":"Tn33ab6474",
    "companyId":"Demo5",
    "imeiNo":"532167890ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"notransmit",
    "deviceStatus":"expired",
    "serialNo":"1238",
    "model":"APMKT0BD24"
  },{
    "plateNo":"Tn33ab6474",
    "companyId":"Demo6",
    "imeiNo":"456789122ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"notransmit",
    "deviceStatus":"expired",
    "serialNo":"1239",
    "model":"APMKT0BD24"
  },{
    "plateNo":"Tn33ab6474",
    "companyId":"Demo7",
    "imeiNo":"224356780ABCD",
    "simNo":"1234567890",
    "purchaseDate":"2018-12-31",
    "lastTransmisionTime":"2020-02-01 14:02:09",
    "lastRenewalDate":"2019-12-31",
    "expriyDate":"2020-12-31",
    "vehicleStatus":"transmit",
    "deviceStatus":"renewal",
    "serialNo":"1240",
    "model":"APMKT0BD24"
  }
  
];
  
storeData = this.datas;  
  automaticClose: false;
  dataIndex: any;
  moreOptions: any;
devicedetails(){
  localStorage.setItem('key',JSON.stringify(this.storeData));
   this.retrievedObject = localStorage.getItem('key');
   this.activeData = JSON.parse(this.retrievedObject);
  console.log('activeData: ',this.activeData);
 
    for( let i = 0 ; i < this.activeData.length; i++ ){
    if(this.activeData[i].vehicleStatus == 'transmit'){
       this.online.push(this.activeData[i]);}
    else {
      this.offline.push(this.activeData[i]);}
    if(this.activeData[i].deviceStatus == 'expired'){
      this.expired.push(this.activeData[i]);}
    else{
      this.renewal.push(this.activeData[i]);}
  }
  }
 
constructor() {}

ionViewWillEnter(){
  var segment = localStorage.getItem('currentPage');
  if(segment == "Online"){
    this.segment = "onlineDevice"
    console.log(this.segment);
  }else if(segment == "Offline"){
    this.segment = "offlineDevice"
    console.log(this.segment);
  }else if(segment == "In Renewal"){
    this.segment = "renewalDevice"
  }
  else if(segment =="Expired"){
    this.segment = "expiredDevice"
  }
}
selectMore(){
      this.moreOption = ! this.moreOption;
      this.more = ! this.more;
    }  
 ngOnInit() {
    this.devicedetails();
}
  }