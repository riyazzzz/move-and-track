import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { RenewalDetailsComponent } from './renewal-details/renewal-details.component';
@Component({
  selector: 'app-rsu-details',
  templateUrl: './rsu-details.page.html',
  styleUrls: ['./rsu-details.page.scss'],
})
export class RSUDetailsPage implements OnInit {

  RsurequestForm: FormGroup;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns:any;
  tableData:any;
  show:boolean=false;
  showButton:boolean=false;
    selectedRow: any;
    SalesDistributors: any;
    Showdata:boolean=true;
    showdata:boolean=false;
  constructor(
  private formBuilder: FormBuilder,
  private modalController: ModalController,
  private ajaxService: AjaxService,
  private commonService: CommonService) { }
  clear(){
   this.RsurequestForm.patchValue({
        SalesDistributor:"",
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

  createForm(){
    this.RsurequestForm = this.formBuilder.group({
      SalesDistributor:[''],
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
    "rsurequestid":"",
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
  const url = serverUrl.web +'/sensorise/saveSensoriseRSURequest?companyid=apm&branchid=apm&dealer='+localStorage.getItem('userName')+'&rsustatus=';
  this.ajaxService.ajaxPostWithString(url,arr).subscribe(response=>{
let res =  JSON.parse(response);
  if(res.message == "RSU Request Saved Successfully"){
  this.commonService.showConfirm('RSU Request Saved Successfully');
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
if(this.RsurequestForm.value.SalesDistributor == ''&& this.RsurequestForm.value.iccidNumber=='' && this.RsurequestForm.value.ImeiNumber == ''){
  var url=  serverUrl.web +'/sensorise/getSensoriseRenewalICCID?companyid=apm&dealer='+localStorage.getItem('userName')
}else{
  var url= serverUrl.web +'/sensorise/getSensoriseSearchRenewalICCID?companyid=apm'+'&dealer='+this.RsurequestForm.value.SalesDistributor+'&iccid='+this.RsurequestForm.value.iccidNumber+'&imei='+this.RsurequestForm.value.ImeiNumber;
}
  this.ajaxService.ajaxGet(url).subscribe(res => {
  this.tableData = res
  if(res.length == 0){
    this.commonService.showConfirm("Rsu Detail not available")
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
      // {text :'RSU Request ID',datafield:'carequestdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Distributor',datafield:'srno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'RSU Request Date',datafield:'srdate',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Iccid Number',datafield:'iccidno',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Imei Number',datafield:'imei',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Sim 1',datafield:'sim1',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      {text :'Sim 2',datafield:'sim2',cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:210},
      { text: 'Detail', datafield: 'Detail', columntype: 'button',cellsalign: 'center', align: 'center',width:210,
      cellsrenderer: (): string => {
        return 'Detail';
      },
      buttonclick: (row): void => {
       this.openModel();
      }
    }
    ]
    }
  })

}

async openModel() {
  if(!this.selectedRow){
    const modal = await this.modalController.create({
      component: RenewalDetailsComponent,
      cssClass: "custom-renewal",
      componentProps: {
        value: this.selectedRow
      }
      });
      modal.onDidDismiss().then(() => {
      })
      this.commonService.showConfirm('Please Select Row')
  }
  else{
    const modal = await this.modalController.create({
      component: RenewalDetailsComponent,
      cssClass: "custom-renewal",
      componentProps: {
        value: this.selectedRow.iccidno
      }
      });
      modal.onDidDismiss().then(() => {
        this.myGrid.clearselection();
        this.selectedRow = "";
      })
      return await modal.present();
  }
}

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
    this.getsalesDistributors()
     this.createForm();
     this.SearchData();
    this.clear();
  }

}