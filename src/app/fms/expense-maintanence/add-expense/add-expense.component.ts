import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  @Input() value;
  addexpenseForm: FormGroup;
  incomeandexpenses:any;
  expense: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,) { }
  cancelBtn() {
    this.modalController.dismiss();
  }

  clear(){
    this.addexpenseForm.patchValue({
      Description:"",
      });
  }
  submit(){
    var data;
      data={
        "companyid":localStorage.getItem('corpId'),
        "branchid": localStorage.getItem('corpId'),
        "userid": "",
        "id": "",
        "description": this.addexpenseForm.value.Description,
        "transaction": "Expense",
        "status": true,  
        "createddate": new Date(),
        "createdby": localStorage.getItem('userName'),
        "updateddate": null,
        "updatedby": null
      }
 const url = serverUrl.fmsUrl +'/incomeexpensegroup/fmsSaveIncomeAndExpenseGroup';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "Income & Expense Group Saved Successfully"){
        this.commonService.presentToast('Expense Group Saved Successfully');
        this.modalController.dismiss();
      }
      else if(res.message == "Income & Expense Description Already Exists"){
        this.commonService.presentToast('Expense Description Already Exists');
      }
    else{
      this.commonService.presentToast('Please Contact Support Team');
    }
    });
  }
  createForm()
  {
     this.addexpenseForm = this.formBuilder.group({
      Description:['', Validators.required],
    })
  }
  ngOnInit() {
    this.createForm();
  }

}
