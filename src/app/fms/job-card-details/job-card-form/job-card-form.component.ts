import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-job-card-form',
  templateUrl: './job-card-form.component.html',
  styleUrls: ['./job-card-form.component.scss'],
})
export class JobCardFormComponent implements OnInit {
  JobcardFrom: FormGroup;
  @Input() value;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  columns:any;
  companyName:any;
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  isshow=false;
  Rate:number;
  Quantity:number;
  Total:number;
  tableData=[];
  myPlatform: string;
  VehicleList: any;
  Inventory: any;
  TotalCost: number;
  constructor( private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private ajaxService: AjaxService,
    private commonService: CommonService, ) { }
     
  cancelBtn() {
    this.modalController.dismiss();
  }
    total(ev){
      this.Total=this.Rate * this.Quantity;
    }
    Add(){
      if(!this.value)
      {
        if(this.JobcardFrom.value.SpareParts == "" && this.Rate == undefined && this.Quantity == undefined && this.Total == undefined)
        {
          this.commonService.presentToast('Please Enter the Fields')
        }
        else{
          let detailValue = {
            companyid:localStorage.getItem('corpId'),
            id:"",
            jobno:"",
            vin:this.JobcardFrom.value.VehicleNo,
            branch_id:localStorage.getItem('corpId'),
            userid:"",
            spareparts: this.JobcardFrom.value.SpareParts,
            rate: this.Rate,
            quantity: this.Quantity,
            totalamount: this.Total,
            createddate:new Date(),
           createdby:localStorage.getItem('userName'),
           updateddate:null,
           updatedby:null
          }
          this.tableData.push(detailValue)
          this.isshow =true;
        }
      }
      else{
        if(this.JobcardFrom.value.SpareParts == undefined && this.Rate == undefined && this.Quantity == undefined && this.Total == undefined)
        {
          this.commonService.presentToast('Please Enter the Fields')
        }
        else{

          let detailValue = {
            companyid:localStorage.getItem('corpId'),
            id:"",
            jobno:this.value.jobno.toString(),
            vin:this.JobcardFrom.value.VehicleNo,
            branch_id:localStorage.getItem('corpId'),
            userid:"",
            spareparts: this.JobcardFrom.value.SpareParts,
            rate: this.Rate.toString(),
            quantity: this.Quantity.toString(),
            totalamount: this.Total.toString(),
            createddate:null,
           createdby:null,
           updateddate:new Date(),
           updatedby:localStorage.getItem('userName')
          }
          this.tableData.push(detailValue)
          this.isshow =true;
        }
      }
      this.renderer = (row: number, column: any, value: string,) => {
        if (value == "" || null || undefined || value == ",") {
          return "---"
        }
        else {
          return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
        }
      }
      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        { text: 'Spare parts', datafield: 'spareparts', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
        { text: 'Rate', datafield: 'rate', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        { text: 'Quantity', datafield: 'quantity', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
        {
          text: 'Total cost', datafield: 'totalamount',cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',
          aggregates: [{
              '<b>Total</b>': (aggregatedValue: number, currentValue: number, column: any, record: any): number => {
                let total = parseInt(record['rate']) * parseInt(record['quantity']);
                this.TotalCost= aggregatedValue + total;
                return aggregatedValue + total;
              }
          }]
      },
       {
          text: 'Delete', datafield: 'Delete', columntype: 'button',
          cellsrenderer: (): string => {
            console.log('iam button');
            return 'Delete';
          },
          buttonclick: (row): void => {
            this.deleteAnalogRow(row);
          }
        }
      ]
    }
    
 
  deleteAnalogRow(row: any) {
    this.tableData.splice(row, 1)
    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }
  submit(){
var data;
if(!this.value){
  var joborderdate=this.JobcardFrom.value.JobOrder.split('T')
var jobordertime=joborderdate[1].split('.')
var expectedstartdate=this.JobcardFrom.value.ExpectedStartDate.split('T')
var expectedstarttime=expectedstartdate[1].split('.')
var expectedenddate=this.JobcardFrom.value.ExpectedEndDate.split('T')
var expectedendtime=expectedenddate[1].split('.')
var jobcompleteddate=this.JobcardFrom.value.JobCompletedate.split('T')
var jobcompletedtime=jobcompleteddate[1].split('.')
data={
    "companyid":localStorage.getItem('corpId'),
    "jobno":"",
    "vin":this.JobcardFrom.value.VehicleNo,
    "branchid":localStorage.getItem('corpId'),
    "userid":"",
    "fmsJobInventory":this.tableData,
    "clientname":this.JobcardFrom.value.CustomerName,
    "clientphoneno":this.JobcardFrom.value.CustomerPhoneNo,
    "clientemail":this.JobcardFrom.value.CustomereMail,
    "jobreceivedby":this.JobcardFrom.value.JobReceiver,
    "worklocation":this.JobcardFrom.value.Worklocation,
    "jobdatetime":joborderdate[0] +' '+jobordertime[0],
    "expectedstartdatetime":expectedstartdate[0] +' '+expectedstarttime[0],
    "expectedenddatetime":expectedenddate[0] +' '+expectedendtime[0],
    "termsofservice":this.JobcardFrom.value.TermofService,
    "workdescription":this.JobcardFrom.value.WorkDescription,
    "remarks":this.JobcardFrom.value.Remarks,
    "servicepersonname":this.JobcardFrom.value.ServicePersonName,
    "servicepersonphoneno":this.JobcardFrom.value.ServicePersonPhoneNo,
    "jobcompletedby":this.JobcardFrom.value.JobCompleter,
    "jobcompleteddatetime":jobcompleteddate[0] +' '+jobcompletedtime[0],
    "labourcost":this.JobcardFrom.value.LabourCost,
    "totalcost":this.TotalCost,
    "createddate":new Date(),
    "createdby":localStorage.getItem('userName'),
    "updateddate":null,
    "updatedby":null
  }
  const url = serverUrl.fmsUrl +'/jobcard/fmsSaveJobCard';
  this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
    if(res.message == "Job Card Saved Successfully"){
      this.commonService.presentToast('Job Card Saved Successfully');
      this.modalController.dismiss();
    }
  else{
    this.commonService.presentToast('Please Contact Support Team');
  }
  });
}
else{
  var joborderdate=this.JobcardFrom.value.JobOrder.split('.')
  var expectedstartdate=this.JobcardFrom.value.ExpectedStartDate.split('.')
  var expectedenddate=this.JobcardFrom.value.ExpectedEndDate.split('.')
  var jobcompleteddate=this.JobcardFrom.value.JobCompletedate.split('.')
  data={
    "companyid":localStorage.getItem('corpId'),
    "jobno":this.value.jobno.toString(),
    "vin":this.JobcardFrom.value.VehicleNo,
    "branchid":localStorage.getItem('corpId'),
    "userid":"",
    "fmsJobInventory":this.tableData,
    "clientname":this.JobcardFrom.value.CustomerName,
    "clientphoneno":this.JobcardFrom.value.CustomerPhoneNo.toString(),
    "clientemail":this.JobcardFrom.value.CustomereMail,
    "jobreceivedby":this.JobcardFrom.value.JobReceiver,
    "worklocation":this.JobcardFrom.value.Worklocation,
    "jobdatetime":joborderdate[0],
    "expectedstartdatetime":expectedstartdate[0],
    "expectedenddatetime":expectedenddate[0],
    "termsofservice":this.JobcardFrom.value.TermofService,
    "workdescription":this.JobcardFrom.value.WorkDescription,
    "remarks":this.JobcardFrom.value.Remarks,
    "servicepersonname":this.JobcardFrom.value.ServicePersonName,
    "servicepersonphoneno":this.JobcardFrom.value.ServicePersonPhoneNo.toString(),
    "jobcompletedby":this.JobcardFrom.value.JobCompleter,
    "jobcompleteddatetime":jobcompleteddate[0],
    "labourcost":this.JobcardFrom.value.LabourCost.toString(),
    "totalcost":this.TotalCost,
    "createddate":null,
    "createdby":null,
    "updateddate":new Date(),
    "updatedby":localStorage.getItem('userName')
  }
  const url = serverUrl.fmsUrl +'/jobcard/fmsSaveJobCard';
  this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
    if(res.message == "Job Card Updated Successfully"){
      this.commonService.presentToast('Job Card Updated Successfully');
      this.modalController.dismiss();
    }
  else{
    this.commonService.presentToast('Please Contact Support Team');
  }
  });
}
  }
  createForm()
  {
    var now = new Date();
     var day = ("0" + now.getDate()).slice(-2);
     var month = ("0" + (now.getMonth() + 1)).slice(-2);
     var today = now.getFullYear() + "-" + (month) + "-" + (day)+'T'
     + now.getHours() + ":"  
     + now.getMinutes();
     this.JobcardFrom = this.formBuilder.group({
      CompanyName:['', Validators.required],
      VehicleNo: ['', Validators.required],
      CustomerName:['', Validators.required],
      CustomerPhoneNo:['', Validators.required],
      CustomereMail:['', Validators.required],
      JobOrder:['', Validators.required],
      Worklocation: ['', Validators.required],
      JobReceiver:['', Validators.required],
      ExpectedStartDate:['', Validators.required],
      ExpectedEndDate:['', Validators.required],
      TermofService:['', Validators.required],
      WorkDescription: ['', Validators.required],
      ServicePersonName:['', Validators.required],
      ServicePersonPhoneNo:['', Validators.required],
      JobCompleter:['', Validators.required],
      JobCompletedate: ['', Validators.required],
      LabourCost:['', Validators.required],
      SpareParts: [""],
      Remarks:[''],
    })
  }
  EditForm()
  {
    if(this.value){
      this.companyName=[this.value.companyid]
      this.VehicleList=[this.value.vin]
      for(var i=0;i<this.value.fmsJobInventory.length;i++)
      {
        var detailValue = {
          companyid:this.value.fmsJobInventory[i].companyid,
          id:this.value.fmsJobInventory[i].id.toString(),
          jobno:this.value.fmsJobInventory[i].jobno.toString(),
          vin:this.value.fmsJobInventory[i].vin,
          branch_id:this.value.fmsJobInventory[i].branchid,
          userid:this.value.fmsJobInventory[i].userid,
          spareparts:this.value.fmsJobInventory[i].spareparts,
          rate:this.value.fmsJobInventory[i].rate.toString(),
          quantity:this.value.fmsJobInventory[i].quantity.toString(),
          totalamount: this.value.fmsJobInventory[i].totalamount.toString(),
          createddate:null,
         createdby:null,
         updateddate:new Date(),
         updatedby:this.value.fmsJobInventory[i].createdby
        }
        this.tableData.push(detailValue)
        this.isshow=true
      }
      this.renderer = (row: number, column: any, value: string,) => {
        if (value == "" || null || undefined || value == ",") {
          return "---"
        }
        else {
          return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
        }
      }
      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        { text: 'Spare Parts', datafield: 'spareparts', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
        { text: 'Rate', datafield: 'rate', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        { text: 'Quantity', datafield: 'quantity', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
        {
          text: 'Total cost', datafield: 'totalamount',cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',
          aggregates: [{
              '<b>Total</b>': (aggregatedValue: number, currentValue: number, column: any, record: any): number => {
                let total = parseInt(record['rate']) * parseInt(record['quantity']);
                this.TotalCost= aggregatedValue + total;
                return aggregatedValue + total;
              }
          }]
      },
       {
          text: 'Delete', datafield: 'Delete', columntype: 'button',
          cellsrenderer: (): string => {
            console.log('iam button');
            return 'Delete';
          },
          buttonclick: (row): void => {
            this.deleteAnalogRow(row);
          }
        }
      ]
    this.JobcardFrom.patchValue({
      CompanyName:this.value.companyid,
      VehicleNo: this.value.vin,
      CustomerName:this.value.clientname,
      CustomerPhoneNo:this.value.clientphoneno,
      CustomereMail:this.value.clientemail,
      JobOrder:this.value.jobdatetime,
      Worklocation: this.value.worklocation,
      JobReceiver:this.value.jobreceivedby,
      ExpectedStartDate:this.value.expectedstartdatetime,
      ExpectedEndDate:this.value.expectedenddatetime,
      TermofService:this.value.termsofservice,
      WorkDescription: this.value.workdescription,
      ServicePersonName:this.value.servicepersonname,
      ServicePersonPhoneNo:this.value.servicepersonphoneno,
      JobCompleter:this.value.jobcompletedby,
      JobCompletedate: this.value.jobcompleteddatetime,
      LabourCost:this.value.labourcost,
      SpareParts: this.value.spareparts,
      Remarks:this.value.remarks,
    });
}
  }
  getcompanyList() {
    var url = serverUrl.fmsUrl +'/dashboard/getCompanyList';
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.companyName =res;
      })
  }
    getVehicleList = (event: {
      component: IonicSelectableComponent,
      value: any
    }) => {
      if(event.value)
       this.JobcardFrom.value.CompanyName = event.value; 
         var url = serverUrl.fmsUrl +'/dashboard/getCompanyVehicleList?companyname='+this.JobcardFrom.value.CompanyName;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
          this.VehicleList =res;
      })
       }
  getInventoryList() {
    var url = serverUrl.fmsUrl +'/inventorymaster/getFmsInventory?companyid='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.Inventory =res;
      })
  }
  ngOnInit() {
    this.getcompanyList();
    this.getInventoryList();
    this.createForm();
    this.EditForm();
  }

}
