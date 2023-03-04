import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
selector: 'app-dealer-detail',
templateUrl: './dealer-detail.page.html',
styleUrls: ['./dealer-detail.page.scss'],
})
export class DealerDetailPage implements OnInit {
DealerForm: FormGroup;
show:boolean=false;
showbutton:boolean=false;
hideSerialNo = false;
showDealer =false;
showInvoice =false;
showSerialNo =false;
showInvoiceNumber =false;
@ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
source: { localdata: any; };
dataAdapter: any;
renderer: (row: number, column: any, value: string) => string;
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
tableData:any;
  selectedRow: any;
  Invoice: any;
  SerialNo: any;
  Dealer: any;
  dealername: any;
  details: any;
constructor(
private formBuilder: FormBuilder,
private modalController: ModalController,
private ajaxService: AjaxService,
private commonService: CommonService) { }
clear(){
 this.DealerForm.patchValue({
      InvoiceNo:"",
      SerialNo:"",
      iccidNumber:"",
      ImeiNumber:""
      })
      this.hideSerialNo = true;
      this.show = false;
      this.showInvoice = false;
      this.showSerialNo = false;
}
reset(){
  this.DealerForm.patchValue({
    SerialNo:"",
    })
}
  getdealerlist () {
  var url = serverUrl.web +'/sensorise/getDealerInvoice?companyid=apm&dealer='+localStorage.getItem('userName');
  this.ajaxService.ajaxGetPerference(url)
  .subscribe(res => {
    this.Invoice=res;
     })
  }
  getinvoicelist = (event: {
    component: IonicSelectableComponent,
    value: any
  }) => {
    if(event.value)
     this.DealerForm.value.InvoiceNo = event.value; 
     var url = serverUrl.web +'/sensorise/getInvoiceSerial?companyid=apm&invoiceno='+this.DealerForm.value.InvoiceNo;
     this.ajaxService.ajaxGetPerference(url)
       .subscribe(res => {
         this.SerialNo =res;
         if(this.SerialNo.length == 0)
         {
          this.showSerialNo = false
         }
         else{
          this.reset()
          this.showSerialNo = true
         }
       })
     }
     getseriallist = (event: {
      component: IonicSelectableComponent,
      value: any
    }) => {
      if(event.value)
       this.DealerForm.value.SerialNo = event.value; 
    }
createForm(){
  this.DealerForm = this.formBuilder.group({
    InvoiceNo:['',Validators.required],
    SerialNo:[''],
    iccidNumber:['',],
    ImeiNumber:['',]
  })
}
submitBtn(){ 
  let selectdata = this.myGrid.getselectedrowindexes()
var arr =[]
for(let i = 0 ; i < selectdata.length; i++){
arr.push(
  {
  "carequestid":"",
  "iccidno":this.myGrid['attrSource']['originaldata'][i].iccidno,
  "vltdsno":this.myGrid['attrSource']['originaldata'][i].vltdsno,
  "imei":this.myGrid['attrSource']['originaldata'][i].imei,
  "carequestdate":this.myGrid['attrSource']['originaldata'][i].carequestdate,
  "createdby":this.myGrid['attrSource']['originaldata'][i].createdby,
  "createddate":null,
  "updatedby":this.myGrid['attrSource']['originaldata'][i].createdby,
  "updateddate":null,
}
  )
}
const url = serverUrl.web +'/sensorise/saveSensoriseCARequest?companyid=apm&branchid=apm';
this.ajaxService.ajaxPostWithBody(url,arr).subscribe(res=>{
if(res.message == "CA Request Saved Successfully"){
this.commonService.showConfirm('CA Request Saved Successfully');
this.modalController.dismiss();
this.show =false;
this.clear()
}
else{
this.commonService.showConfirm('Please Contact Support Team');
}
}); 
}
myGridOnRowSelect(event: any): void {
  this.selectedRow = event.args.row;
this.show =true
}
SearchData() {
var url= serverUrl.web +'/sensorise/getDealerSensoriseSalesAll?companyid=apm&invoiceno='+this.DealerForm.value.InvoiceNo.trim()+'&serialno='+this.DealerForm.value.SerialNo.trim()+'&iccidno='+this.DealerForm.value.iccidNumber+'&imeino='+this.DealerForm.value.ImeiNumber;
this.ajaxService.ajaxGet(url).subscribe(res => {
this.tableData = res
if(res.length == 0){
  this.commonService.showConfirm("Dealer Details not available")
  this.show =false
  }
  else{
    this.details =res[0]
this.show =true
this.renderer = (row:number,column: any, value:string,)=>{
if(value == "" || null || undefined ){
return "----No Data----"
}
else{
return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
}
}
this.source = { localdata: this.tableData };
this.dataAdapter = new jqx.dataAdapter(this.source);
if(localStorage.getItem('corpId') == 'apm')
{
  this.columns = [
    {text :'Iccid Number',datafield:'iccidno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Imei Number',datafield:'imei',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Vltd SNo',datafield:'vltdsno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Sim 1',datafield:'sim1',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Sim 2',datafield:'sim2',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    { text: 'Commercial Activation Date', datafield: 'commercialactivationdate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
    { text: 'Card End Date', datafield: 'cardenddate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150 },
    { text: 'Card State', datafield: 'cardstate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    { text: 'Card Status', datafield: 'cardstatus', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    {text :'CA Request Date',datafield:'carequestdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'SR Number',datafield:'srno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'SR Date',datafield:'srdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'White Listing Date',datafield:'whitelistingdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Ticket Number',datafield:'ticketno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210}  
  ]
}
else{
  this.columns = [
    {text :'Iccid Number',datafield:'iccidno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Imei Number',datafield:'imei',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Vltd SNo',datafield:'vltdsno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Sim 1',datafield:'sim1',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    {text :'Sim 2',datafield:'sim2',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    { text: 'Commercial Activation Date', datafield: 'commercialactivationdate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
    { text: 'Card End Date', datafield: 'cardenddate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150 },
    { text: 'Card State', datafield: 'cardstate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    { text: 'Card Status', datafield: 'cardstatus', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    {text :'CA Request Date',datafield:'carequestdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
  ]
}
  }
})}
ngOnInit() {
this.getdealerlist()
   this.createForm();
}
}
