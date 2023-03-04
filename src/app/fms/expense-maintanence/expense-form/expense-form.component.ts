import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl, storageVariable } from '../../../../environments/environment';
import { AddExpenseComponent } from '../../../fms/expense-maintanence/add-expense/add-expense.component';
@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit {
  @Input() value;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  expensemaintenanceForm: FormGroup;
  expense:any;
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
  serial
  today = new Date();
  maxDate;
  currencyvalue: any;
  
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
      this.expensemaintenanceForm.patchValue({
        plateNo:this.value.vin,
        tripName:"",
        incomeExpense:"",
        Description:"",
        Cost:"",
        fromDate:"",
        fromtime:""
        })
    }
    else{
      this.expensemaintenanceForm.patchValue({
        plateNo:"",
        tripName:"",
        incomeExpense:"",
        Description:"",
        Cost:"",
        fromDate:"",
        fromtime:""
        })
    }
  }

  async openModel()
  {
    // if(this.mode == 'add'){
      const modal = await this.modalController.create({
        component:AddExpenseComponent,
        cssClass: 'addexpenseform'
      });
      modal.onDidDismiss().then(() => {
      this.getExpenseType();
      })
      return await modal.present();
    // }
  //  else{
  //   const modal = await this.modalController.create({
  //     component:AddExpenseComponent,
  //     cssClass: 'addexpenseform',
  //     componentProps: {
  //       value: this.expensemaintenanceForm.value.incomeExpense,
  //     }
  //   });
  //   modal.onDidDismiss().then(() => {
  //   this.getExpenseType();
  //   })
  //   return await modal.present();
  //  }
  }
  getExpenseType() {
    var url = serverUrl.fmsUrl +'/incomeexpensegroup/getFmsExpenseGroup?companyid='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.expense =res;
      })
  }
  gettriplist = (event: {
    component: IonicSelectableComponent,
    value: any
  }) => {
    if(event.value)
     this.expensemaintenanceForm.value.plateNo = event.value; 
     var url = serverUrl.fmsUrl +'/trip/getFmsTrip?companyid='+localStorage.getItem('corpId')+'&vin='+this.expensemaintenanceForm.value.plateNo;
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
    var datetime=this.expensemaintenanceForm.value.fromDate.split('T')
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
        "vin":this.expensemaintenanceForm.value.plateNo,
        "tripname":this.expensemaintenanceForm.value.tripName,
        "incomeandexpense":this.expensemaintenanceForm.value.incomeExpense,
        "cost":this.expensemaintenanceForm.value.Cost,
        "transactiondt":this.expensemaintenanceForm.value.fromDate +' '+this.expensemaintenanceForm.value.fromtime+':00',
        "description": this.expensemaintenanceForm.value.Description,  
        "createddate": new Date(),
        "createdby":localStorage.getItem('userName'),
        "updateddate": null,
        "updatedby": null
      }
    const url = serverUrl.fmsUrl +'/incomeexpense/FmsSaveIncomeAndExpense';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "Income & Expense Saved Successfully"){
        this.commonService.presentToast('Expense Details Added Succesfully');
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
      data['vin'] = this.expensemaintenanceForm.value.plateNo,
      data['tripname'] = this.expensemaintenanceForm.value.tripName,
      data['incomeandexpense'] = this.expensemaintenanceForm.value.incomeExpense,
      data['cost'] = this.expensemaintenanceForm.value.Cost,
      data['transactiondt']= this.expensemaintenanceForm.value.fromDate +' '+this.expensemaintenanceForm.value.fromtime+':00',
      data['description'] = this.expensemaintenanceForm.value.Description,
      data['createddate'] =null
      data['createdby'] = null
      data['updateddate'] = new Date()
      data['updatedby'] = localStorage.getItem('userName')
        const url = serverUrl.fmsUrl +'/incomeexpense/FmsSaveIncomeAndExpense';
        this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
          if(res.message == "Income & Expense Update Successfully"){
           this.commonService.presentToast('Expense Details Updated Succesfully');
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
     this.expensemaintenanceForm = this.formBuilder.group({
      plateNo:['', Validators.required],
      tripName: ['', Validators.required],
      incomeExpense:['', Validators.required],
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
      this.hideSerialNo = true;
      var fromsplitdate=this.value.transactiondt.split(' ')[0];
      var fromsplittime=this.value.transactiondt.split(' ')[1];
      this.vin = [this.value.vin]
      this.expense = [this.value.incomeandexpense]
      this.tripname = [this.value.tripname]
    this.expensemaintenanceForm.patchValue({
    plateNo:this.value.vin,
    tripName:this.value.tripname,
    incomeExpense:this.value.incomeandexpense,
    Description:this.value.description,
    Cost:this.value.cost,
    fromDate:fromsplitdate,
    fromtime:fromsplittime
    });
}

  }
  ngOnInit() {
    
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();

    this.getExpenseType();
    this.getVehicleList();
    this.getcurrencydetails();
    this.createForm();
    this.editForm();

}
}

