import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit {
  @Input() value;
  addincomeForm: FormGroup;
  hideSerialNo = false;
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
    this.addincomeForm.patchValue({
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
        "description": this.addincomeForm.value.Description,
        "transaction": "Income",
        "status": true,  
        "createddate": new Date(),
        "createdby":localStorage.getItem('userName'),
        "updateddate": null,
        "updatedby": null
      }
 const url = serverUrl.fmsUrl +'/incomeexpensegroup/fmsSaveIncomeAndExpenseGroup';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "Income & Expense Group Saved Successfully"){
        this.commonService.presentToast('Income Group Saved Successfully');
        this.modalController.dismiss();
      }
      else if(res.message == "Income & Expense Description Already Exists"){
        this.commonService.presentToast('Income Description Already Exists');
      }
    else{
      this.commonService.presentToast('Please Contact Support Team');
    }
    });
  }
  createForm()
  {
     this.addincomeForm = this.formBuilder.group({
      Description:['', Validators.required],
    })
  }
  ngOnInit() {
    this.createForm();
  }

}
