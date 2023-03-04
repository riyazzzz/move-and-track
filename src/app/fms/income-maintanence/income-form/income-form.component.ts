import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl, storageVariable } from '../../../../environments/environment';
import { AddIncomeComponent } from '../../../fms/income-maintanence/add-income/add-income.component';
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss'],
})
export class IncomeFormComponent implements OnInit {
  @Input() value;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  // @Input() mode: string;
  incomemaintenanceForm: FormGroup;
  // expense:any;
  income:any;
  tripname:any;
  isDeleteShow = false;
  hideSerialNo = false;
  Addbutton = true;
  Editbutton = false;
  vin:any;
  vinPlateNo = [];
  others=false;
  update: string;
  myPlatform: any;
  selectedRow: any;
  today = new Date();
  minDate;
  serial;
  currencyvalue: string;
  maxDate: string;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public platform: Platform,
    private ajaxService: AjaxService,
    private commonService: CommonService,
  ) { }
  
  cancelBtn() {
    this.modalController.dismiss();
  }

  clear(){
    if(this.value){
      this.incomemaintenanceForm.patchValue({
        plateNo:this.value.vin,
        tripName:"",
        Income:"",
        Description:"",
        Cost:"",
        fromDate:"",
        fromtime:""
        })
    }
    else{
      this.incomemaintenanceForm.patchValue({
        plateNo:"",
        tripName:"",
        Income:"",
        Description:"",
        Cost:"",
        fromDate:"",
        fromtime:""
        })
    }
  }

  async openModel()
  {
      const modal = await this.modalController.create({
        component:AddIncomeComponent,
        cssClass: 'addexpenseform'
      });
      modal.onDidDismiss().then(() => {
      this.getIncomeType();
      })
      return await modal.present();
  }
  gettriplist = (event: {
    component: IonicSelectableComponent,
    value: any
  }) => {
    if(event.value)
     this.incomemaintenanceForm.value.plateNo = event.value; 
     var url = serverUrl.fmsUrl +'/trip/getFmsTrip?companyid='+localStorage.getItem('corpId')+'&vin='+this.incomemaintenanceForm.value.plateNo;
     this.ajaxService.ajaxGetPerference(url)
       .subscribe(res => {
         this.tripname =res;
       })
     }
     triplist(){
       if(this.tripname == 0){
         this.commonService.presentToast('No Trip Found')
       }
       else{
         this.tripname
       }
     }
  getIncomeType() {
    var url = serverUrl.fmsUrl +'/incomeexpensegroup/getFmsIncomeGroup?companyid='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.income =res;
      })
      this.serial =localStorage.getItem('fmscurrency')
  }
  getVehicleList(){
    var url = serverUrl.fmsUrl +'/dashboard/getVehicleList?companyid='+localStorage.getItem('corpId')+'&userid='+localStorage.getItem('userName');
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.vin =res;
      })
  }
  getcurrencydetails(){
    var url = serverUrl.fmsUrl +'/currency/getFmsCurrencySettings?companyid='+localStorage.getItem('corpId')
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      if(res.message == "Invalid Data")
      {
        this.currencyvalue ="";
      }
      else{
        this.currencyvalue =res.currencycode;
      }
  })
}
  submit(){
    var data;
    var datetime=this.incomemaintenanceForm.value.fromDate.split('T')
    if(this.currencyvalue == "" || this.currencyvalue == undefined)
    {
      this.commonService.presentToast("Please Enter the Currency Setting")
    }
   else if(!this.value){
      data={
        "companyid":localStorage.getItem('corpId'),
        "branchid": localStorage.getItem('corpId'),
        "userid": "",
        "id": "",
        "vin":this.incomemaintenanceForm.value.plateNo,
        "tripname":this.incomemaintenanceForm.value.tripName,
        "incomeandexpense":this.incomemaintenanceForm.value.Income,
        "cost":this.incomemaintenanceForm.value.Cost,
        "transactiondt":this.incomemaintenanceForm.value.fromDate +' '+this.incomemaintenanceForm.value.fromtime+':00',
        "description": this.incomemaintenanceForm.value.Description,  
        "createddate": new Date(),
        "createdby": localStorage.getItem('userName'),
        "updateddate": null,
        "updatedby": null
      }
    const url = serverUrl.fmsUrl +'/incomeexpense/FmsSaveIncomeAndExpense';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "Income & Expense Saved Successfully"){
        this.commonService.presentToast('Income Details Added Succesfully');
        this.modalController.dismiss();
      }
    else{
      this.commonService.presentToast('Please Contact Support Team');
    }
    });
    }
    else{
      data = this.value;
      data['companyid'] = localStorage.getItem('corpId'),
      data['branchid'] = localStorage.getItem('corpId'),
      data['userid'] ="",
      data['id'] = this.value.id
      data['vin'] = this.incomemaintenanceForm.value.plateNo,
      data['tripname'] = this.incomemaintenanceForm.value.tripName,
      data['incomeandexpense'] = this.incomemaintenanceForm.value.Income,
      data['cost'] = this.incomemaintenanceForm.value.Cost,
      data['transactiondt']= this.incomemaintenanceForm.value.fromDate +' '+this.incomemaintenanceForm.value.fromtime+':00',
      data['description'] = this.incomemaintenanceForm.value.Description,
      data['createddate'] =null
      data['createdby'] = null
      data['updateddate'] = new Date()
      data['updatedby'] = localStorage.getItem('userName')
        const url =serverUrl.fmsUrl +'/incomeexpense/FmsSaveIncomeAndExpense';
        this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
          if(res.message == "Income & Expense Update Successfully"){
           this.commonService.presentToast('Income Details Updated Succesfully');
           this.modalController.dismiss();
          }
          else{
            this.commonService.presentToast('Please Contact Support Team');
          }
        })

   }
  }


  createForm()
  {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    var todaytime=now.getHours() + ":"+ now.getMinutes();
     this.incomemaintenanceForm = this.formBuilder.group({
      plateNo:['', Validators.required],
      tripName: ['', Validators.required],
      Income:['', Validators.required],
      Description:['', Validators.required],
      Cost:['', Validators.required],
      fromDate:[today, Validators.required],
      fromtime:[todaytime, Validators.required],
    })
  }
  editForm()
  {
    if(this.value){
      this.Addbutton = false;
      this.Editbutton = true;
      var fromsplitdate=this.value.transactiondt.split(' ')[0];
      var fromsplittime=this.value.transactiondt.split(' ')[1];
      this.vin = [this.value.vin]
      this.income = [this.value.incomeandexpense]
      this.tripname = [this.value.tripname]
    this.incomemaintenanceForm.patchValue({
    plateNo:this.value.vin,
    tripName:this.value.tripname,
    Income:this.value.incomeandexpense,
    Description:this.value.description,
    Cost:this.value.cost,
    fromDate:fromsplitdate,
    fromtime:fromsplittime
    });
    this.hideSerialNo = true;
}

  }
  ngOnInit() {
    
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();
       
    this.getIncomeType();
    this.getcurrencydetails();
    this.getVehicleList();
    this.createForm();
    this.editForm();

}

}
