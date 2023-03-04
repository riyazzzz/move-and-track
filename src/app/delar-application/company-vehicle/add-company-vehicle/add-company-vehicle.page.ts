import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company-vehicle',
  templateUrl: './add-company-vehicle.page.html',
  styleUrls: ['./add-company-vehicle.page.scss'],
})
export class AddCompanyVehiclePage implements OnInit {
  @Input() action: any;
  @Input() editDetails: any;
  @Input() selectedCompany: any;
  
  companyVehicle:FormGroup;
  assertCategories = ['FORKLIFTS', 'LIGHT TOWERS', 'WELDING MACHINES', 'DEEPSEA GENERATOR', 'COMPRESSORS',
  '32kw CEM7 GENERATORS', 'BUS', 'CAR','TRUCK', 'BIKE', 'AUTO', 'BATTERY','BOBCAT', 'TANKER', 'LOADER', 'DABBAB',
  'DUMPER', 'STREET SWEEPER', 'TOWED STREET SWEEPER', 'COMPACTOR','DOUBLE CABIN', 'HOOK LIFT', 'CRANE',
  'SMALL TRUCK'];
  fleetManager = [];
  unAssignImei = [];
  modelAction;
  modelIfEdit;
  company;
  header: any;
  constructor(
    private formBuilder:FormBuilder,
    public modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private router: Router
    ) { }
    getBack(){
      this.modalController.dismiss();
    }
    getFleetManager() {
      const companyDetail = {
        branchID: this.selectedCompany.companyId,
        companyID: this.selectedCompany.companyId,
        userId: this.selectedCompany.userId
      }
      const url = serverUrl.web + '/api/vts/company/fleetmanager/'+ JSON.stringify(companyDetail);
      this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.fleetManager = [];
        console.log(res);
        if(res.length > 0 ){
          for(let i = 0; i < res.length; i++){
            this.fleetManager.push(res[i].fleetManager);
          }
        }else{
          this.fleetManager.push("No Fleet");
          this.companyVehicle = this.formBuilder.group({
            fleetManager: [this.fleetManager[0], Validators.required]
          });
        }
      })
    }
    
    onSubmit(){
      this.generateVin();
    }
    
    generateVin(){
      if(this.companyVehicle.value.imeiNo != "" || this.companyVehicle.value.imeiNo != " "){
      const vehicleVin = this.selectedCompany.companyId + (Math.floor(Math.random() * 900) + 100);
      const url = serverUrl.web + '/api/vts/company/assets/validate/vin/' + vehicleVin;
      this.ajaxService.ajaxGetWithErr(url)
      .subscribe(res => {
        if (res == "available") {
          this.generateVin()
        }else{
          this.selectedCompany["vin"] = vehicleVin;
          this.vehicleDetails();
        }
      });
    }else{
      this.commonService.presentToast('Assign Imei Properlly');
    }
    }
    
    vehicleDetails(){
      const vehicleData = { 
        "vin": this.selectedCompany.vin,
        "companyID": this.selectedCompany.companyId,
        "branchID": this.selectedCompany.companyId,
        "username": this.selectedCompany.companyId,
        "emailId": this.selectedCompany.companyId,
        "userEntry": "kingstrackalerts@gmail.com",
        "imeiNo": this.companyVehicle.value.imeiNo,
        "fleetUser":  this.selectedCompany.userId+','+(this.companyVehicle.value.fleetManager).toString(),
        "group":"true",
        "plateNo":this.companyVehicle.value.plateNo,
        "odometer":"true",
        "type":"type",
        "model":"model",
        "dateofpurchase":"true",
        "insuranceExpiry":"true",
        "expectedvehiclemilage":"0",
        "contactNo":"true",
        "fuelTanklit":"true",
        "additionalWarranty":"true",
        "dateofreg":"true",
        "regexpiry":"true",
        "mileageInit":"true",
        "digitalInput1":"|",
        "digitalInput2":"|",
        "digitalInput3":"|",
        "digitalInput4":"|",
        "DigitalOutput":"|||",
        "analoginput1":"|||",
        "analoginput2":"|||",
        "analoginput3":"|||",
        "analoginput4":"|||",
        "onewiredinput":"|||",
        "actual1":"",
        "mv1":"",
        "actual2":"",
        "mv2":"",
        "actual3":"",
        "mv3":"",
        "actual4":"",
        "mv4":"",
        "assetCategory":this.companyVehicle.value.assert,
        "roadGeo":"true",
        "freeForm":"true",
        "prefRest":"true",
        "landMark":"true",
        "icon": this.companyVehicle.value.assert,
        "shift":"true",
        "showHierarchy":false,
        "PreventiveMaintenanceType":"kilometer"
      }
      const url = serverUrl.web + '/api/vts/company/assets';
      this.ajaxService.ajaxPutMethod(url, JSON.stringify(vehicleData))
      .subscribe( res=> {
        console.log(res);
        if(res === "persisted"){
          this.commonService.presentToast('This Vehicle Presisted Successfully!');
          this.router.navigateByUrl('/dashboard');
          this.modalController.dismiss();
        }
      });
    }
    
    getAssignedImei(){
      const assignedImei = {companyID : this.selectedCompany.companyId}
      const url = serverUrl.web + '/api/vts/superadmin/company/unused/device/' + JSON.stringify(assignedImei);
      this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        console.log(res);
        for(let i = 0; i < res.length; i++){
          this.unAssignImei.push(res[i].imeiNo);
        };
      })
    }
    
    ngOnInit() {
      this.companyVehicle = this.formBuilder.group({
        plateNo : ['', Validators.required],
        imeiNo: ['', Validators.required],
        assert: ['',Validators.required],
        fleetManager: ['', Validators.required]
      });
      this.selectedCompany = JSON.parse(localStorage.getItem('selectedCompanyData'));
      this.getFleetManager();
      this.getAssignedImei();
      this.modelAction = this.action;
      this.modelIfEdit = this.editDetails;
      this.company = this.selectedCompany;
      this.header = this.modelAction==='add'? 'Add' : 'Edit';
       
    }
    
  }
  