import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-rsu-request',
  templateUrl: './rsu-request.page.html',
  styleUrls: ['./rsu-request.page.scss'],
})
export class RSURequestPage implements OnInit {

  RsurequestForm: FormGroup;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  tableData:any;
    selectedRow: any;
    SalesDistributors: any;
  RequestList: any;
  show:boolean=false;
  Showdata:boolean=true;
  showdata:boolean=false;
  showButton:boolean=false;
  constructor(
  private formBuilder: FormBuilder,
  private modalController: ModalController,
  private ajaxService: AjaxService,
  private commonService: CommonService) { }
  clear(){
   this.RsurequestForm.patchValue({
        SalesDistributor:"",
        RequestId:"",
        iccidNumber:"",
        ImeiNumber:""
        })
        this.show = false;
        this.showButton = false;
  }
  getsalesDistributors () {
    var url = serverUrl.web +'/sensorise/getDealer';
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.SalesDistributors=res;
       })
    }
    getrequestList () {
      var url = serverUrl.web +'/sensorise/getRsuRequest?companyid=apm&dealer='+localStorage.getItem('userName');
      this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.RequestList=res;
         })
      }
  createForm(){
    this.RsurequestForm = this.formBuilder.group({
      SalesDistributor:[''],
      RequestId:[''],
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
  this.clear()
  }
  else{
  this.commonService.showConfirm('Please Contact Support Team');
  }
  }); 
  }
  Approvevalue(event){
    let selectdata = this.myGrid.getselectedrowindexes()
    var arr =[]
    for(let i = 0 ; i < selectdata.length; i++){
      if(event.target.innerText == 'RENEWAL'){
        arr.push(
          {
          "iccid":this.myGrid['attrSource']['originaldata'][i].iccidno,
        }
          )
      }
      else{
        arr.push(
          {
          "rsurequestid":this.myGrid['attrSource']['originaldata'][i].rsurequestid,
          "iccidno":this.myGrid['attrSource']['originaldata'][i].iccidno,
          "imei":this.myGrid['attrSource']['originaldata'][i].imei,
          "rsurequestdate":"",
          "createdby": localStorage.userName,
          "createddate":null,
          "updatedby": null,
          "updateddate":null
        }
          )
      }
    }
   if(event.target.innerText == 'REJECTED')
   {
    var url = serverUrl.web +'/sensorise/saveSensoriseRSURequest?companyid=apm&branchid=apm&dealer='+localStorage.getItem('userName')+'&rsustatus='+event.target.innerText;
   }
   else if(event.target.innerText == 'APPROVED'){
    var url = serverUrl.web +'/sensorise/saveSensoriseRSURequest?companyid=apm&branchid=apm&dealer='+localStorage.getItem('userName')+'&rsustatus='+event.target.innerText;
   }
   else{
    var url = serverUrl.web +'/sensorise/getSensoriseRSU?companyid=apm&branchid=apm&updatedby='+localStorage.getItem('userName');
   }
   this.ajaxService.ajaxPostWithString(url,arr).subscribe(response=>{
    let res =  JSON.parse(response);
      if(res.message == "RSU Request Saved Successfully"){
      this.commonService.showConfirm('RSU Request Saved Successfully');
      this.modalController.dismiss();
      this.clear()
      }
      else if(res.Message == "Renewal Saved Successfully"){
        this.commonService.showConfirm('Renewal Saved Successfully');
        this.modalController.dismiss();
        this.clear()
        }
      else{
      this.commonService.showConfirm('Please Contact Support Team');
      }
      }); 
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  if(this.myGrid.getselectedrowindexes().length > 0){
   this.showButton = true;
  }
  else{
    this.showButton = false;
  }
  }
  SearchData() {
    if(this.RsurequestForm.value.SalesDistributor == '' && this.RsurequestForm.value.RequestId == ''&& this.RsurequestForm.value.iccidNumber=='' && this.RsurequestForm.value.ImeiNumber == ''){
      var url=  serverUrl.web +'/sensorise/getSensoriseRSURequest?companyid=apm'
    }else{
      var url= serverUrl.web +'/sensorise/getSensoriseSearchRSURequest?companyid=apm'+'&dealer='+this.RsurequestForm.value.SalesDistributor+'&iccid='+this.RsurequestForm.value.iccidNumber+'&imei='+this.RsurequestForm.value.ImeiNumber+'&rsurequestid='+this.RsurequestForm.value.RequestId;
    }
  this.ajaxService.ajaxGet(url).subscribe(res => {
  this.tableData = res
  if(res.length == 0){
    this.commonService.showConfirm("Rsu Request Detail not available")
    this.show =false
    }
    else{
    this.show =true
    this.renderer = (row:number,column: any, value:string,)=>{
  if(value == "" || null || undefined ){
  return "---"
  }
  else{
  return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
  }
  }
  this.source = { localdata: this.tableData };
  this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      {text :'RSU Request ID',datafield:'rsurequestid',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'RSU Request Date',datafield:'rsurequestdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'RSU Request Status',datafield:'rsustatus',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Iccid Number',datafield:'iccidno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Imei Number',datafield:'imei',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Distributor',datafield:'distributor',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'SR Number',datafield:'srno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'SR Date',datafield:'srdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'SR Status',datafield:'srstatus',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
    ]
    }
  })}
  ngOnInit() {
    if(localStorage.getItem('corpId') == 'apm')
{
  this.Showdata = true
  this.showdata = false
}
else{
  this.Showdata = false
  this.showdata = true
}
  this.getsalesDistributors();
  this.getrequestList();
  this.createForm();
  this.SearchData();
  this.clear();
  }
}