import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.html',
  styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {
  addImei:FormGroup;
  country = ["India", "Saudi Arabia"];
  countryCode = {'India': 'IN', "Saudi Arabia": "SA"}; 
  region = ["Asia/Kolkata", "Asia/Riyadh"];
  selectedData ="stock";
  //selectManufacture = 'Concox';
  thisData: any;
  modelTypes = {"APMKT01 Basic":"KT-Mini","APMKT01 Advance":"KT-Mini","APMKT02 Basic":"TK003","APMKT02 Advance":"TK003","APMKT03 Basic":"KT-Mini","APMKT03 Advance":"KT-Mini","APMKT04":"wetrack","APMKT05":"GT06N","APMKT06":"GT300","APMKT07":"JV200","APMKT08":"KT-Mini","APMKT09":"KT-Mini","APMKT10":"GT800","APMKT11":"GT06D", "AIS1401A":"AIS1401A"}
  model:any = [];
  provider = [
    {sim:'Idea'},
    {sim:'Airtel'},
    {sim:'Vodafone'},
    {sim:'Bsnl'}
  ];
  manufacture = [{name: 'APMKT', type: 'Concox'}, {name: 'APMKT-AIS140', type:'APMKT'}];
  header: any;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    public ajaxService: AjaxService,
    private commonService: CommonService
    ) { }
    
    getBack(){
      this.router.navigateByUrl('/tabs/stock');
    }
    onSubmit(){
      if(this.addImei.valid){
          this.addTheImei();
        
      }else{
        this.commonService.presentToast("Fill required field..")
      }
    }
    
    addTheImei(){
      if(this.addImei.value.imeiNo.length === 15){
        const addImei={
          imei: this.addImei.value.imeiNo,
          imeiNo: this.addImei.value.imeiNo,
          manufactureName: this.addImei.value.manufacture,
          modelName: this.modelTypes[this.addImei.value.model],
          providerName: this.addImei.value.provider,
          simNo: this.addImei.value.simNo,
          dealerId:localStorage.getItem('companySuffix')
        }
        const url = serverUrl.web + '/api/vts/company/branch/inventory';
        this.ajaxService.ajaxPutAsText(url, JSON.stringify(addImei))
        .subscribe( res=>{
          this.checkValidImei(res);
        })
      }else{
        this.commonService.presentToast('Imei number does not have 15 character');
      }
    }
    checkValidImei(res){
      res = JSON.parse(res);
      if(res.imeiNo === 'exists' && res.simCardNo == "exists"){
        this.commonService.presentToast('Imei No and Sim Card  already exit!');
      }
      else if(res.imeiNo == 'exists'){
        this.commonService.presentToast('Imei No already exit!');
      }else if(res.simCardNo == "exists"){
        this.commonService.presentToast('Sim Card  already exit!');
      }else if(res.simCardNo == 'NotAvailable'){
        this.commonService.presentToast('Sim Card  Not Available!');
      }
      else{
        if(res.result == 'persisted successfully'){
          this.commonService.presentToast('Your device added successfully!');
          this.router.navigateByUrl('/dashboard');
        }
      }
    }
    
  
    newCompanyCreation(data){
      const fleetData =JSON.parse(localStorage.getItem('fleetData'));
      const userDetail ={
        "companyname" : fleetData['firstName'],
        "companyid" : fleetData['userName'],
        "userid": fleetData['userName'] +'-ca',
        "fmid": fleetData['userName'],
        "email": fleetData['emailId'],
        "contact": fleetData['contactNo'],
        "password": fleetData['password'],
        "suffix": localStorage.getItem('companySuffix')
      }
      const url = serverUrl.web + '/api/vts/superadmin/company';
      this.ajaxService.ajaxPutAsText(url, JSON.stringify(userDetail))
      .subscribe(res =>{
        this.alterNewCompanySuccess(res);
      })
    }
    alterNewCompanySuccess(res){
      res = JSON.parse(res);
      if(res.result == "updated successfully"){
        const loginData = {
          userId: localStorage.getItem('userId'),
          password: localStorage.getItem('password')
        };
        const url = serverUrl.web + '/api/vts/superadmin/auth/' + JSON.stringify(loginData);
        this.ajaxService.ajaxGet(url)
        .subscribe(res => {
          localStorage.removeItem("dashboardData");
          localStorage.setItem('dashboardData', JSON.stringify(res.CompanyDetials));
          this.router.navigateByUrl('dashboard');
          this.commonService.presentToast('Successfully Presisted');
        });
      }else {
        this.commonService.presentToast('Presisted Failed...!');
      }
    }
    getModelData(){
      console.log(this.addImei.value.manufacture);
      if(this.addImei.value.manufacture === "Concox"){
        this.model = ["APMKT01 Basic","APMKT01 Advance","APMKT02 Basic","APMKT02 Advance","APMKT03 Basic","APMKT03 Advance","APMKT04","APMKT05","APMKT06","APMKT07","APMKT08","APMKT09","APMKT10","APMKT11"];
      }else{
        this.model = ['AIS1401A'];
      }      
    }
    ngOnInit() {
      this.selectedData = "stock"
      this.header = 'Stock';
      
      
      this.addImei = this.formBuilder.group({
        imeiNo: ['', Validators.required],
        simNo: ['', Validators.required],
        manufacture: ['', Validators.required],
        model: ['', Validators.required],
        provider: ['', Validators.required]
      })      
    }
  }
  