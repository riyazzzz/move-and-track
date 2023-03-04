import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-ca-report',
  templateUrl: './ca-report.page.html',
  styleUrls: ['./ca-report.page.scss'],
})
export class CaReportPage implements OnInit {
  CAReportForm: FormGroup;
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
  carequestNo: any;
  constructor(
  private formBuilder: FormBuilder,
  private modalController: ModalController,
  private ajaxService: AjaxService,
  private commonService: CommonService) { }
  clear(){
   this.CAReportForm.patchValue({
        CaRequestNo:"",
        InvoiceNo:"",
        SerialNo:"",
        iccidNumber:"",
        ImeiNumber:""
        })
        this.hideSerialNo = true;
        this.show = false;
        this.showInvoice = false;
        this.showSerialNo = false;
        this.showInvoiceNumber =false;
  }
  reset(){
    this.CAReportForm.patchValue({
      SerialNo:"",
      })
  }
  resets(){
    this.CAReportForm.patchValue({
      InvoiceNo:"",
      })
  }
  getcalist () {
    var url = serverUrl.web +'/sensorise/getCaRequest?companyid='+localStorage.getItem('corpId')+'&dealer='+localStorage.getItem('userName');
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.carequestNo=res;
       })
    }
    getCalist = (event: {
      component: IonicSelectableComponent,
      value: any
    }) => {
      if(event.value)
       this.CAReportForm.value.CaRequestNo = event.value; 
       var url = serverUrl.web +'/sensorise/getDealerCAInvoice?companyid='+localStorage.getItem('corpId')+'&dealer='+localStorage.getItem('userName')+'&carequestid='+this.CAReportForm.value.CaRequestNo;
       this.ajaxService.ajaxGetPerference(url)
       .subscribe(res => {
         this.Invoice=res;
         if(this.Invoice.length == 0)
         {
          this.showInvoiceNumber = false
         }
         else{
          this.resets()
          this.showInvoiceNumber = true
         }
          })
    }

    getinvoicelist = (event: {
      component: IonicSelectableComponent,
      value: any
    }) => {
      if(event.value)
       this.CAReportForm.value.InvoiceNo = event.value; 
       var url = serverUrl.web +'/sensorise/getInvoiceSerial?companyid='+localStorage.getItem('corpId')+'&invoiceno='+this.CAReportForm.value.InvoiceNo;
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
         this.CAReportForm.value.SerialNo = event.value; 
      }
  createForm(){
    this.CAReportForm = this.formBuilder.group({
      CaRequestNo:['',Validators.required],
      InvoiceNo:[''],
      SerialNo:[''],
      iccidNumber:['',],
      ImeiNumber:['',]
    })
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  this.show =true
  }
  SearchData() {
  var url= serverUrl.web +'/sensorise/getDealerCARequestAll?companyid='+localStorage.getItem('corpId')+'&carequestno='+this.CAReportForm.value.CaRequestNo+'&invoiceno='+this.CAReportForm.value.InvoiceNo.trim()+'&serialno='+this.CAReportForm.value.SerialNo.trim()+'&iccidno='+this.CAReportForm.value.iccidNumber+'&imeino='+this.CAReportForm.value.ImeiNumber;
  this.ajaxService.ajaxGet(url).subscribe(res => {
  this.tableData = res
  if(res.length == 0){
    this.commonService.showConfirm("CA Report not available")
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
  this.getcalist();
     this.createForm();
  }

}
