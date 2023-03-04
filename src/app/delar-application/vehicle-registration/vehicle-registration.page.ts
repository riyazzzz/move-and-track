import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../../services/ajax.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { serverUrl } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { PdfLogoService } from 'src/app/services/pdf-logo.service';
@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.page.html',
  styleUrls: ['./vehicle-registration.page.scss'],
})
export class VehicleRegistrationPage implements OnInit {
  vehicleCreation: FormGroup;
  companyId: string[];
  imeiNo: string[];
  editfleet = "Fleet Manager"
  suffix: string;
  country: any;
  companyDetail: { companyID: string; userId: string; };
  countryCode: any;
  addCompany: boolean = false;
  fleet: any[];
  region = { "India": "Asia/Kolkata", "Saudi Arabia": "Asia/Riyadh" };
  // manufacture = [{name: 'APMKT', type: 'Concox'}, {name: 'APMKT-AIS140', type:'APMKT'}];
  // modelTypes = {"APMKT01 Basic":"KT-Mini","APMKT01 Advance":"KT-Mini","APMKT02 Basic":"TK003","APMKT02 Advance":"TK003","APMKT03 Basic":"KT-Mini","APMKT03 Advance":"KT-Mini","APMKT04":"wetrack","APMKT05":"GT06N","APMKT06":"GT300","APMKT07":"JV200","APMKT08":"KT-Mini","APMKT09":"KT-Mini","APMKT10":"GT800","APMKT11":"GT06D",
  //  "AIS1401A":"AIS1401A","AIS1402A":"AIS1402A","Basic":"Basic"}
  // country={}
  manufacture = [];
  modelTypes = [];
  model: any = [];
  companyCheck = false;
  provider = [
    { sim: 'Idea' },
    { sim: 'Airtel' },
    { sim: 'Vodafone' },
    { sim: 'Bsnl' }
  ];
  show: boolean = false;
  showFleet: boolean = false;
  imeiTrue: boolean = false;
  vehicleTypes: any;
  assertCategories = ['FORKLIFTS', 'LIGHT TOWERS', 'WELDING MACHINES', 'DEEPSEA GENERATOR', 'COMPRESSORS',
    '32kw CEM7 GENERATORS', 'BUS', 'CAR', 'TRUCK', 'BIKE', 'AUTO', 'BATTERY', 'BOBCAT', 'TANKER', 'LOADER', 'DABBAB',
    'DUMPER', 'STREET SWEEPER', 'TOWED STREET SWEEPER', 'COMPACTOR', 'DOUBLE CABIN', 'HOOK LIFT', 'CRANE',
    'SMALL TRUCK'];
  selectedCompany: string;
  vin: any;
  showImei: boolean = false;
  imeiDatas: any;
  detailShow: boolean = false
  CompanyValid: boolean = false;
  contactList: any;
  file: any;
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private pdfLogoService:PdfLogoService
  ) { }
  public uploader: FileUploader = new FileUploader({});
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  checkCompany() {



    for (var i = 0; i < this.companyId.length; i++) {
      if (this.companyId[i] == this.vehicleCreation.value.companyName) {
        this.addCompany = true;
        this.showFleet = true;
        // this.createForm2();
      }
    }
    if (this.addCompany == true) {
      this.imeiTrue = true;
    } else if (this.addCompany == false) {
      this.imeiTrue = false;
      this.showFleet = false;
    }
    this.addCompany = false;
    this.getFleetManager();
  }
  checkImei() {
    for (var i = 0; i < this.imeiNo.length; i++) {
      if (this.imeiNo[i] == this.vehicleCreation.value.imeiNo) {
        // this.addCompany=true;
        //  this.showImei=true;
        this.detailShow = true;
        this.show = true;
        this.companyCheck = true
        //  this.getImeiDetails();
      }
    }

    if (this.detailShow == true) {
      this.show = false;
    } else if (this.detailShow == false) {
      this.show = true;
    }
    this.detailShow = false;
  }
  getModelData() {
    this.model = this.modelTypes[this.vehicleCreation.value.manufacture];
  }
  getManufactures() {
    const url = serverUrl.web + '/login/getPreferences?key=manufactures&companyId=' + this.companyDetail.companyID
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.manufacture = res;
      })
  }
  getModels() {
    // const url = serverUrl.web + '/api/vts/company/preference/'+JSON.stringify({"key":"newmodel","companyID":this.companyDetail.companyID});
    const url = serverUrl.web + '/login/getPreferences?key=dealerModel&companyId=' + this.companyDetail.companyID
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.modelTypes = res;
      })
  }
  getModelType() {
    const url = serverUrl.web + '/device/assettype?companyId=' + localStorage.getItem('corpId') + '&userId=' + localStorage.getItem('userName');
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.vehicleTypes = res;
      })

  }
  // createForm2(){
  //   this.vehicleCreation=this.formBuilder.group({
  //     // loginId: ['', ],
  //     password: ['',Validators.required],
  //     contact:['',Validators.required],
  //     email:['',],
  //     address1:['',],
  //     address2:['',],
  //     city:['',],
  //     country:['',],
  //     imeiNo:['',[Validators.required,Validators.minLength(15),Validators.maxLength(15)]],
  //     simNo:[''],
  //     plateNo:['',Validators.required],
  //     assetCategory:['',Validators.required],
  //     odometer:['',Validators.required],
  //     companyName:['',Validators.required],
  //     manufacture:['',],
  //     model:['',],
  //     provider:['',],
  //     // fleetManager:['',],
  //     simNo2:[''],
  //     provider2:[''],
  //   });
  //   this.vehicleCreation.reset();
  // }
  createForm() {
    this.vehicleCreation = this.formBuilder.group({
      // loginId: ['', ],
      password: ['',],
      pancard:[''],
      contact: ['',],
      email: ['',],
      address1: ['',],
      address2: ['',],
      city: ['',],
      country: ['',Validators.required],
      imeiNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{15}$"),]],
      simNo: [''],
      plateNo: ['', Validators.required],
      assetCategory: ['', Validators.required],
      // ^[\w\s]+$
      // [Validators.required, Validators.pattern(/[!^\w\s]$/)]
      companyName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/), Validators.maxLength(15)]],
      manufacture: ['',],
      model: ['',],
      provider: ['',],
      // fleetManager:['',],
      simNo2: [''],
      provider2: [''],
      EngineNumber:[''],
      ChassisNumber:[''],
      VehicleCapacity:[''],
      DriverName:[''],
      VehicleImage:[this.file, Validators.required],
      VehicleRCImage:[this.file, Validators.required]
    });
    this.vehicleCreation.reset();
  }
  getFleetManager() {
    const companyName = this.vehicleCreation.value.companyName;
    const companyDetail = {
      branchID: companyName,
      companyID: companyName,
      userId: companyName
    }
    const url = serverUrl.web + '/user/fleetmanager?companyId=' + localStorage.getItem('corpId') + '&branchId=' + localStorage.getItem('corpId');
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.fleet = ["NoFleet"];
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            this.fleet.push(res[i].fleetManager);
          }
        } else {
          this.fleet.push("NoFleet")
        }

      })
  }
  getCompanyID() {
    const url = serverUrl.web + '/global/getdealercompanylist?suffix=' + this.suffix;
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.companyId = res;

    })
  }



validContact(){
  let contactCheck = false
  for (var i = 0; i < this.contactList.length; i++) {
    if (this.contactList[i].contact == this.vehicleCreation.value.contact) {
      this.vehicleCreation.patchValue({
        companyName: this.contactList[i].companyId,
        password: ''
      });
      contactCheck = true
      this.imeiTrue  = true}
  }
  if(!contactCheck && this.vehicleCreation.value.password == ''){
    this.vehicleCreation.patchValue({
      companyName: '',
    })
    this.imeiTrue  = false
  }
}

  getContactList(){
    const url = serverUrl.web + '/global/getdealercontactlist?suffix=' + this.suffix;
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.contactList = res;
})
  }

  getImeiNO() {
    const url = serverUrl.web + '/global/getdealerimeilist?suffix=' + this.suffix;
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.imeiNo = res;
    })
  }
  getCountries() {
    const url = serverUrl.web + '/login/getPreferences?key=countries&companyId=' + this.companyDetail.companyID
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.country = res;
      })
  }
  getCountryCode() {
    const url = serverUrl.web + '/login/getPreferences?key=countrycode&companyId=' + this.companyDetail.companyID
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.countryCode = res;
      })

  }
  getImeiDetails() {
    const url = serverUrl.web + '/global/getInventorydevice?imeiNo=' + this.vehicleCreation.value.imeiNo;
    this.ajaxService.ajaxGetJson(url).subscribe(res => {
      this.imeiDatas = res;
      this.vehicleCreation.patchValue({
        manufacture: this.imeiDatas["manufacturerName"],
        model: this.imeiDatas["modelName"],
        provider: this.imeiDatas["provider"],
        simNo: this.imeiDatas["simCardNo"],
        simNo2: this.imeiDatas["additionalSimcard1"],
        provider2: this.imeiDatas["additionalProvider1"],
      });
   //   this.assign();
    })
  }

newSubmit(){
  this.commonService.presentLoader()
    if (this.imeiNo.includes(this.vehicleCreation.value.imeiNo+'')) {
      this.getImeiDetails()
    }
  var userName = (this.vehicleCreation.value.companyName == null) ? this.vehicleCreation.value.companyName : this.vehicleCreation.value.companyName;
    if (this.vehicleCreation.value.fleetManager == "NoFleet") {
      var fleetManager = localStorage.getItem('userName');
    }
    var fleetManagers;

    if (this.vehicleCreation.value.fleetmanager == '') {
      fleetManagers = userName + '-ca', this.vehicleCreation.value.companyName
    } else {
      // fleetManagers=this.vehicleCreation.value.fleetmanager
      fleetManagers = userName + '-ca' + ',' + this.vehicleCreation.value.companyName
      var checkedValues = [];
      var unCheckedValues = [];
      unCheckedValues = this.fleet.filter(val => !fleetManagers.includes(val));
      for (var i = 0; i < unCheckedValues.length; i++) {
        if (unCheckedValues[i] === "NoFleet") {
          unCheckedValues.splice(i, 1);
          i--;
        }
      }
      if (checkedValues.length == 0) {
        (checkedValues).toString()
      }

    }
    if (this.addCompany != true) {
      unCheckedValues = [];
    }
    const countryCode = this.countryCode[this.vehicleCreation.value.country] == undefined ? "" : this.countryCode[this.vehicleCreation.value.country] 
    const region =     this.region[this.vehicleCreation.value.country] == undefined ? "" : this.region[this.vehicleCreation.value.country] 
setTimeout(() => {
    var dataJson = { "companyId": this.vehicleCreation.value.companyName,
    "branchId":this.vehicleCreation.value.companyName,
    "vin": "",
    "suffix":localStorage.getItem('companySuffix'),
    "imeiNo": this.vehicleCreation.value.imeiNo.toString(),
    "simcardNo":   this.vehicleCreation.value.simNo == null ? "" : (this.vehicleCreation.value.simNo).toString(),
    "emailId": this.vehicleCreation.value.email == null ? "": (this.vehicleCreation.value.email).toString(),
    "providerName": localStorage.getItem('companyId'),
    "password": this.vehicleCreation.value.password == null ? "": (this.vehicleCreation.value.password).toString(),
    "provider": this.vehicleCreation.value.provider == null ? "" : (this.vehicleCreation.value.provider).toString(),
    "firstName": this.vehicleCreation.value.companyName,
    "contactNo":    this.vehicleCreation.value.contact == null ? "" : (this.vehicleCreation.value.contact).toString(),
    "countryCode":countryCode,
    "additionalSimcard1": this.vehicleCreation.value.simNo2 == null ? "" : (this.vehicleCreation.value.simNo2).toString(),
      "additionalProvider1":  this.vehicleCreation.value.provider2 == null ? "" : (this.vehicleCreation.value.provider2).toString(),
    "userCountry":countryCode,
    "manufactureName":  this.vehicleCreation.value.manufacture == null ? "" : this.vehicleCreation.value.manufacture,
    "modelName": this.vehicleCreation.value.model == null ? "" : this.vehicleCreation.value.model,
    "dealerId": "3",
    "companyName": this.vehicleCreation.value.companyName,
    "address": this.vehicleCreation.value.address1 == null ? "" : this.vehicleCreation.value.address1,
    "city":this.vehicleCreation.value.city == null ? "" : this.vehicleCreation.value.city,
    "companyAdminID":"",
    "region":"Asia/Kolkata",
    "categoryrole":"fleetmanager",
    "userCity":this.vehicleCreation.value.city == null ? "" : this.vehicleCreation.value.city,
    "useraddress1":  this.vehicleCreation.value.address1 == null ? "" : this.vehicleCreation.value.address1,
      "useraddress2":  this.vehicleCreation.value.address2 == null ? "" : this.vehicleCreation.value.address2,
    "userId":this.vehicleCreation.value.companyName + '-ca',
    "userName": this.vehicleCreation.value.companyName,
    "userEntry":"",
    "fleetUser": fleetManagers,
    "plateNo": this.vehicleCreation.value.plateNo,
    "assetCode":"",
    "devModel":"",
    "applicationType":"false",
    "convertedDate":"2022-02-13",
    "DefaultWarnty":"2023-02-12",
    "type":"Type",  
    "icon":this.vehicleCreation.value.assetCategory,
    "odometer":"0",
    }
   var datas=
    {
      "id": "",
      "modeoftransport":this.vehicleCreation.value.assetCategory,
      "vehiclenumber":this.vehicleCreation.value.plateNo,
      "enginenumber":this.vehicleCreation.value.EngineNumber,
      "chassisnumber":this.vehicleCreation.value.ChassisNumber,
      "drivername":this.vehicleCreation.value.DriverName,
      "drivermobilenumber":this.vehicleCreation.value.contact,
      "gpsdevicecode":this.vehicleCreation.value.imeiNo.toString(),
      "vehiclecapacity": this.vehicleCreation.value.VehicleCapacity,
      "companycode":this.vehicleCreation.value.pancard,
      "companypath":"http://mvt.apmkingstrack.com",
      "createdby":localStorage.getItem('corpId')
    }
    const url = serverUrl.web + '/AK/saveVehicle'
    const file = this.uploader;
      const testData:FormData = new FormData();
        testData.append('uploadrccopy', file.queue[0]._file);
        testData.append('uploadvehiclephoto', file.queue[1]._file);
        testData.append('vehicle',JSON.stringify(dataJson));
        testData.append('data',JSON.stringify(datas));
        this.ajaxService.ajaxPostWithString(url, testData)
        .subscribe(res=>{
          res = JSON.parse(res);
        if(res.message == "Vehicle Saved Successfully"){
          this.commonService.dismissLoader()
           this.commonService.presentToast(res.message)
          this.router.navigateByUrl('/dashboard');
          this.vehicleCreation.reset();
       }
       else{
          this.commonService.dismissLoader()
          this.commonService.presentToast(res.message)
        }
    })
    }, 2000);
}

  submit() {

    this.getCompanyID();
    this.commonService.presentToast("please wait until the process is finished")
    for (var i = 0; i < this.companyId.length; i++) {
      if (this.companyId[i] == this.vehicleCreation.value.companyName) {
        this.addCompany = true;
        this.showFleet = true;
      }
    }
    for (var i = 0; i < this.imeiNo.length; i++) {
      if (this.imeiNo[i] == this.vehicleCreation.value.imeiNo + '') {
        // this.addCompany=true;
        this.showImei = true;
        //  this.getImeiDetails();
        const url = serverUrl.web + '/global/getInventorydevice?imeiNo=' + this.vehicleCreation.value.imeiNo;
        this.ajaxService.ajaxGet(url).subscribe(res => {
          this.imeiDatas = res;
          this.vehicleCreation.patchValue({
            manufacture: this.imeiDatas["manufacturerName"],
            model: this.imeiDatas["modelName"],
            provider: this.imeiDatas["provider"],
            simNo: this.imeiDatas["simCardNo"],
            simNo2: this.imeiDatas["additionalSimcard1"],
            provider2: this.imeiDatas["additionalProvider1"],
            // fleetManager:'',
            // address1:'',

          });

          var deviceDetails = {
            companyId: this.vehicleCreation.value.companyName,
            imeiNo: this.vehicleCreation.value.imeiNo + '',
            simcardNo: (this.vehicleCreation.value.simNo).toString()
          }
          // this.imeiTrue=true;
          const url = serverUrl.web + '/device/validate/info?companyId=' + this.vehicleCreation.value.companyName + '&imeiNo=' + this.vehicleCreation.value.imeiNo + '&simcardNo=' + (this.vehicleCreation.value.simNo).toString()
          this.ajaxService.ajaxGet(url)
            .subscribe(res => {
              if (res.message == "Ok") {
                if (this.addCompany != true) {
                  this.addTheCompany();

                } else if (this.addCompany == true) {
                  this.addTheImei();
                } else {
                  this.commonService.presentToast('please try again');
                }
              } else if (((res.message[0] == "Company Name Already Available" && res.message[1] == "Ok"))) {
                for (i = 0; i < this.companyId.length; i++) {
                  if (this.companyId[i] == this.vehicleCreation.value.companyName) {
                    this.CompanyValid = true;
                    if (this.addCompany != true) {
                      this.addTheCompany();
                    } else if (this.addCompany == true) {
                      this.addTheImei();
                    } else {
                      this.commonService.presentToast('please try again');
                    }
                  } else if ((this.companyId.length == i + 1) && this.CompanyValid != true) {
                    this.commonService.presentToast('Company Name is used by Another Person');
                  }

                }
              } else if (res.message[0] == "ImeiNo Already Exist") {
                this.commonService.presentToast("ImeiNo Already Exist")
              } else if (res.message[0] == "SimNo Already Exist") {
                this.commonService.presentToast("SimNo Already Exist")
              } else if (res.message[1] == "ImeiNo Already Exist" && res.message[2] == "SimNo Already Exist") {
                this.commonService.presentToast("SimNo Already Exist and ImeiNo Already Exist")
              } else if (res.message[1] == "SimNo Already Exist") {
                this.commonService.presentToast("SimNo Already Exist and ImeiNo Already Exist")
              } else if ((res.message[0] == "ImeiNo Already Exist" && res.message[1] == "Ok")) {
                this.commonService.presentToast("ImeiNo Already Exist")
              } else if ((res.message[0] == "Company Name Already Available" && res.message[1] == "ImeiNo Already Exist" && res.message[2] == "Ok")) {
                this.commonService.presentToast("Company Name Already Available and ImeiNo Already Exist")
              } else if (res.message[0] == "SimNo Not Available" && res.message[1] == "Ok") {
                this.commonService.presentToast("SimNo Not Available/SerialNo Not Available")
              } else if (res.message[0] == "Company Name Already Available" && res.message[1] == "Ok") {
                this.commonService.presentToast("Company Name Already Available")
              } else if (res.message[0] == "Company Name Already Available" && res.message[1] == "SimNo Not Available") {
                this.commonService.presentToast("SimNo Not Available")
              }
              // else if(this.CompanyValid != true){
              //   this.commonService.presentToast('Company Name is used by Another Person');
              // }
              else {
                this.commonService.presentToast("check the given details")
              }
              // else if(res.message  == "Company added successfully."){
              //   this.commonService.presentToast("Company added successfully.")  
              // }

            })

        })
      }
    }
    if (this.addCompany == true) {
      //  this.addTheImei();
      this.show = true;
      // this.showFleet=true;

      this.imeiTrue = true;

    }

    // JSON.stringify(this.vehicleCreation.value.fleetManager).length > 4 && 
    if (this.showImei == !true) {
      const deviceDetail = {
        companyId: this.vehicleCreation.value.companyName,
        imeiNo: this.vehicleCreation.value.imeiNo + '',
        simcardNo: (this.vehicleCreation.value.simNo).toString()
      }
      const url = serverUrl.web + '/device/validate/info?companyId=' + this.vehicleCreation.value.companyName + '&imeiNo=' + this.vehicleCreation.value.imeiNo + '&simcardNo=' + (this.vehicleCreation.value.simNo).toString()
      this.ajaxService.ajaxGet(url)
        .subscribe(res => {
          if (res.message == "Ok") {
            if (this.addCompany != true) {
              this.addTheCompany();
            } else if (this.addCompany == true) {
              this.addTheImei();
            } else {
              this.commonService.presentToast('please try again');
            }
          } else if (((res.message[0] == "Company Name Already Available" && res.message[1] == "Ok"))) {
            for (i = 0; i < this.companyId.length; i++) {
              if (this.companyId[i] == this.vehicleCreation.value.companyName) {
                this.CompanyValid = true;
                if (this.addCompany != true) {
                  this.addTheCompany();
                } else if (this.addCompany == true) {
                  this.addTheImei();
                } else {
                  this.commonService.presentToast('please try again');
                }
              } else if ((this.companyId.length == i + 1) && this.CompanyValid != true) {
                this.commonService.presentToast('Company Name is used by Another Person');
              }

            }
          } else if (res.message[0] == "ImeiNo Already Exist") {
            this.commonService.presentToast("ImeiNo Already Exist")
          } else if (res.message[0] == "SimNo Already Exist") {
            this.commonService.presentToast("SimNo Already Exist")
          } else if (res.message[1] == "ImeiNo Already Exist" && res.message[2] == "SimNo Already Exist") {
            this.commonService.presentToast("SimNo Already Exist and ImeiNo Already Exist")
          } else if (res.message[1] == "SimNo Already Exist") {
            this.commonService.presentToast("SimNo Already Exist and ImeiNo Already Exist")
          } else if ((res.message[0] == "ImeiNo Already Exist" && res.message[1] == "Ok")) {
            this.commonService.presentToast("ImeiNo Already Exist")
          } else if ((res.message[0] == "Company Name Already Available" && res.message[1] == "ImeiNo Already Exist" && res.message[2] == "Ok")) {
            this.commonService.presentToast("Company Name Already Available and ImeiNo Already Exist")
          } else if (res.message[0] == "SimNo Not Available" && res.message[1] == "Ok") {
            this.commonService.presentToast("Sim No / Serial No Invalid or SimNo Not Available")
          } else if (res.message[0] == "Company Name Already Available" && res.message[1] == "Ok") {
            this.commonService.presentToast("Company Name Already Available")
          } else if (res.message[0] == "Company Name Already Available" && res.message[1] == "SimNo Not Available") {
            this.commonService.presentToast("SimNo Not Available")
          } else if (this.CompanyValid != true) {
            this.commonService.presentToast('Company Name is used by Another Person');
          }
          else {
            this.commonService.presentToast("check the given details")
          }
        });

    } else {

    }
    // if(this.addCompany == false){
    //   this.addTheImei();
    // }
    // if(this.addCompany == true && ){
    //   this.addTheCompany();
    // }
  }
  addTheCompany() {
    if (this.vehicleCreation.value.password != null && this.vehicleCreation.value.address1 != null && this.vehicleCreation.value.city != null && this.vehicleCreation.value.email && this.vehicleCreation.value.country && this.vehicleCreation.value.contact != null) {
      var my_string = this.vehicleCreation.value.password;
      var spaceCount = (my_string.split(" ").length - 1);
      //  var atpos = this.vehicleCreation.value.email.indexOf("@");
      //  var dotpos = this.vehicleCreation.value.email.lastIndexOf(".");
      // if (atpos < 1 || ( dotpos - atpos < 2 )) {
      //  document.write("Please enter correct email ID")
      //  document.myForm.EMail.focus() ;
      //  return false;
      // }
      if (this.vehicleCreation.value.contact.toString().length == 10 && this.vehicleCreation.value.address1.length > 1 && this.vehicleCreation.value.city.length > 1 && spaceCount == 0 && (/@./.test(this.vehicleCreation.value.email))) {
        const adminData = {
          loginId: this.vehicleCreation.value.companyName,
          loginCompany: localStorage.getItem('companyId')
        }
        const countryCode = this.countryCode[this.vehicleCreation.value.country];
        const region = this.region[this.vehicleCreation.value.country];
        const addCompany = {
          "password": "12345",
          "companyName": this.vehicleCreation.value.companyName,
          "address": this.vehicleCreation.value.address1,
          "city": this.vehicleCreation.value.city,
          "region": region,
          "countryCode": countryCode,
          "companyAdminID": '',
          "firstName": this.vehicleCreation.value.companyName,
          "contactNo": this.vehicleCreation.value.contact.toString(),
          "branchID": this.vehicleCreation.value.companyName,
          "emailID": this.vehicleCreation.value.email,
          "emailId": this.vehicleCreation.value.email,
          "companyID": this.vehicleCreation.value.companyName,
        }
        const dataJson = JSON.stringify(addCompany);
        const url = serverUrl.web + '/user/provider/company?providerName='+ adminData.loginCompany+'&companyid='+adminData.loginId
        this.ajaxService.ajaxPostWithBody(url, dataJson)
          .subscribe(res => {
            this.newFleetCreation(res)
          });
      } else {
        this.commonService.presentToast('Contact Number should be 10 digits, Check Address or City or Mail, Dont enter blank spaces in Password');
      }
    } else {
      this.commonService.presentToast('Password should not contain spaces,Avoid empty Fields');
    }
  }
  newFleetCreation(res) {
    if (res.Message === 'Company added successfully.') {
      const datetoday = new Date();
      const expDate = datetoday.getFullYear() + 1 + '-' + (datetoday.getMonth() + 1) + '-' + (datetoday.getDate() - 1);
      const countryCode = this.countryCode[this.vehicleCreation.value.country];
      const fleetData = {
        "userName": this.vehicleCreation.value.companyName,
        "password": this.vehicleCreation.value.password,
        "firstName": this.vehicleCreation.value.companyName,
        "categoryrole": "fleetmanager",
        "userCity": "city",
        "contactNo": (this.vehicleCreation.value.contact).toString(),
        "useraddress1": this.vehicleCreation.value.address1 == null ? "" : this.vehicleCreation.value.address1,
        "useraddress2": this.vehicleCreation.value.address2 == null ? "" : this.vehicleCreation.value.address2,
        "userCountry": countryCode,
        "emailId": this.vehicleCreation.value.email,
        // "emailID": this.vehicleCreation.value.email,
        // "userExpiryDate": expDate,
        "companyId": this.vehicleCreation.value.companyName,
        "branchId": this.vehicleCreation.value.companyName,
        "applicationType": "false"
      }
      
      localStorage.setItem('fleetData', JSON.stringify(fleetData));
      const url = serverUrl.web + '/global/newFleetCreation';
      this.ajaxService.ajaxPostWithBody(url, fleetData)
        .subscribe(res => {
          this.newCompanyCreation(res)
        });
    }
    if (res["Error Message"] === 'Company already exist.') {
      this.commonService.presentToast("Company Id Already Exist");
    }

  }
  newCompanyCreation(data) {
    const fleetData = JSON.parse(localStorage.getItem('fleetData'));
    const userDetail = {
      // "companyname": fleetData['firstName'],
      "companyId": fleetData['userName'],
      "userId": fleetData['userName'] + '-ca',
      "fmid": fleetData['userName'],
      "emailId": fleetData['emailId'],
      "contactNo": fleetData['contactNo'],
      "password": fleetData['password'],
      "Suffix": localStorage.getItem('companySuffix')
    }
    const url = serverUrl.web + '/global/companyCreation';
    this.ajaxService.ajaxPostWithBody(url, JSON.stringify(userDetail))
      .subscribe(res => {
        // this.alterNewCompanySuccess(res);
        this.addTheImei();
      })
  }
  alterNewCompanySuccess(res) {
    // res = JSON.parse(res);
    // if (res.result == "updated successfully") {
    //   const loginData = {
    //     userId: localStorage.getItem('userId'),
    //     password: localStorage.getItem('password')
    //   };
    //   const url = serverUrl.web + '/api/vts/superadmin/auth/' + JSON.stringify(loginData);
    //   this.ajaxService.ajaxGet(url)
    //     .subscribe(res => {
    //       // localStorage.removeItem("dashboardData");
    //       // localStorage.setItem('dashboardData', JSON.stringify(res.CompanyDetials));
    //       // this.router.navigateByUrl('dashboard');
    //       // this.commonService.presentToast('Successfully Presisted');
    //       this.addTheImei();
    //     });
    // } else {
    //   this.commonService.presentToast('Presisted Failed...!');
    // }
  }
  // not listed in company name service 
  addTheImei() {
    if (JSON.stringify(this.vehicleCreation.value.imeiNo).length === 15 && this.showImei != true) {
      const addImei = {
        imei: JSON.stringify(this.vehicleCreation.value.imeiNo),
        imeiNo: JSON.stringify(this.vehicleCreation.value.imeiNo),
        manufactureName: this.vehicleCreation.value.manufacture,
        modelName: this.vehicleCreation.value.model,
        providerName: this.vehicleCreation.value.provider,
        simNo: (this.vehicleCreation.value.simNo).toString(),
        additionalSimcard1: this.vehicleCreation.value.simNo2 == null ? "" : (this.vehicleCreation.value.simNo2).toString(),
        Provider2: this.vehicleCreation.value.provider2 + '',
        dealerId: '3'
      }
      const url = serverUrl.web + '/simcard/company/branch/inventory';
      this.ajaxService.ajaxPostWithBody(url, JSON.stringify(addImei))
        .subscribe(res => {
          var data = res;
          if (data.result == 'persisted successfully') {
            this.getImeiDetails();
          } else if (data.simCardNo == "NotAvailable") {
            this.commonService.presentToast('sim card not available');
          } else if (data.imeiNo == "exists") {
            this.commonService.presentToast('imeiNo already available');
          } else if (data.simCardNo == "exists") {
            this.commonService.presentToast('simCardNo already exists');
          }
        })
    } else {
      this.getImeiDetails();

    }
  }
  assign() {
    //  const loginId =(this.vehicleCreation.value.companyName == null) ? this.vehicleCreation.value.companyName : this.vehicleCreation.value.companyName ;

    const arrayData = [];
    const date = new Date();
    let currentDate = date.getFullYear() + '-';
    currentDate += (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    currentDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let expDate = date.getFullYear() + 1 + '-';
    expDate += (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    expDate += date.getDate() < 10 ? '0' + (date.getDate() - 1) : date.getDate() - 1;
    const assignImeiTocom = {
      "manufacture": this.vehicleCreation.value.manufacture,
      "provider": this.vehicleCreation.value.provider,
      "imei": this.vehicleCreation.value.imeiNo.toString(),
      "checked": "false",
      "simno": this.vehicleCreation.value.simNo,
      "modal": this.vehicleCreation.value.model,
      //"$$hashKey": "object:8022",
      "companyId": this.vehicleCreation.value.companyName,
      "userId": this.vehicleCreation.value.companyName,
      "DefaultWarnty": expDate,
      "convertedDate": currentDate,
      "additionalSimcard1": this.vehicleCreation.value.simNo2,
      "Provider2": this.vehicleCreation.value.provider2 + '',
    }
    arrayData.push(assignImeiTocom);
    const url = serverUrl.web + '/simcard/assignimei'
    this.ajaxService.ajaxPostWithBody(url, arrayData)
      .subscribe(res => {
        res = res;
        if (res.devicestatus === "persisted") {
          this.commonService.presentToast('Your Imei assign successfully');
          this.generateVin();
        }
        else {
          this.commonService.presentToast('There was a problem to assign this Imei, Please check the IMEI and SIM NO');
        }
      });
  }


  vehicleDetails() {

    var userName = (this.vehicleCreation.value.companyName == null) ? this.vehicleCreation.value.companyName : this.vehicleCreation.value.companyName;
    if (this.vehicleCreation.value.fleetManager == "NoFleet") {
      var fleetManager = localStorage.getItem('userName');
    }
    var fleetManagers;

    if (this.vehicleCreation.value.fleetmanager == '') {
      fleetManagers = userName + '-ca', this.vehicleCreation.value.companyName
    } else {
      // fleetManagers=this.vehicleCreation.value.fleetmanager
      fleetManagers = userName + '-ca' + ',' + this.vehicleCreation.value.companyName
      var checkedValues = [];
      var unCheckedValues = [];
      unCheckedValues = this.fleet.filter(val => !fleetManagers.includes(val));
      for (var i = 0; i < unCheckedValues.length; i++) {
        if (unCheckedValues[i] === "NoFleet") {
          unCheckedValues.splice(i, 1);
          i--;
        }
      }
      if (checkedValues.length == 0) {
        (checkedValues).toString()
      }

    }
    if (this.addCompany != true) {
      unCheckedValues = [];
    }

    var addDetails = {
      "companyID": userName,
      "branchID": userName, "username": userName,
      "emailId": unCheckedValues.toString(),
      "emailID": unCheckedValues.toString(),
      "imeiNo": JSON.stringify(this.vehicleCreation.value.imeiNo),
      "userEntry": "kingstrackalerts@gmail.com", "groupColor": "",
      "fleetUser": fleetManagers,
      "plateNo": this.vehicleCreation.value.plateNo, "oldCheckRoad": 0,
      "oldcheckFreeForm": 0, "oldcheckGeoZone": 0, "oldchecklandMark": 0,
      "oldcheckshift": 0, "type": "Type",
      "icon": this.vehicleCreation.value.assetCategory, "model": "Model",
      "group": "true", "dateofpurchase": "true", "insuranceExpiry": "true",
      "landMark": "true", "prefRest": "true",
      "expectedvehiclemilage": "0", "contactNo": "true", "fuelTanklit": "true",
      "roadGeo": "true", "freeForm": "true",
      "additionalWarranty": "true", "dateofreg": "true", "regexpiry": "true",
      "mileageInit": "true",
      "odometer": JSON.stringify(this.vehicleCreation.value.odometer), "preventiveselect": 3000,
      "preventivelimitselect": 30, "scheduleselect": 3000,
      "schedulelimitselect": 30,
      "PreventiveMaintenanceType": "hours",
      "reverseSetting": "0|0|0", "digitalInput1": "|",
      "digitalInput2": "|", "digitalInput3": "|", "digitalInput4": "|", "DigitalOutput": "|||",
      "analoginput1": "|||", "analoginput2": "|||", "analoginput3": "|||", "analoginput4": "|||",
      "onewiredinput": "", "actual1": "", "mv1": "", "actual2": "", "mv2": "", "actual3": "", "mv3": "",
      "actual4": "", "mv4": "", "checkDevice": 0, "checkOperator": 0, "checkshift": -1,
      "checkRoadGeo": -1, "checkFreeForm": -1, "checkGeoZone": -1, "checklandMark": -1,
      "showHierarchy": false, "vin": this.vin
    }
    const url = serverUrl.web + '/site/add/vehicle';

    this.ajaxService.ajaxPostWithString(url, addDetails)
      .subscribe(res => {
        if (res === "persisted") {
          this.commonService.presentToast('Vehicle added Successfully!');

          const smsUrl = serverUrl.web + '/device/initial/smsCommands?imeiNo=' + this.vehicleCreation.value.imeiNo
          this.ajaxService.ajaxGet(smsUrl)
            .subscribe(res => {
            });
          this.router.navigateByUrl('/dashboard');
          this.vehicleCreation.reset();
          this.show = false;
          this.showImei = false;
          this.imeiTrue = false;
          this.showFleet = false;

        }
      })
  }


  generateVin() {
    if (this.vehicleCreation.value.imeiNo != "" || this.vehicleCreation.value.imeiNo != " ") {
      const vehicleVin = this.vehicleCreation.value.companyName + (Math.floor(Math.random() * 900) + 100);
      const url = serverUrl.web + '/device/validate/vin?vin=' + vehicleVin;
      this.ajaxService.ajaxGetWithString(url)
        .subscribe(res => {
          if (res == "notavailable") {
            this.vin = vehicleVin;
            this.vehicleDetails();
         } else if (res == "available") {
            this.generateVin();
          } else {
            this.commonService.presentToast('please contact support team')
          }
        });
    } else {
      this.commonService.presentToast('Assign Imei Properlly');
    }
  }
  ionViewWillEnter() {
    this.show = false;
    this.imeiTrue = true;
    this.showFleet = false;
    this.vehicleCreation.reset();
    this.detailShow = false;
    this.CompanyValid = false;
    this.createForm();
    this.getFleetManager();
    this.getCompanyID();
    this.getCountries();
    this.getImeiNO();
    this.getCountryCode();
    this.getModelType();
    this.getManufactures();
    this.getModels();
  }
  ngOnInit() {

    this.selectedCompany = localStorage.getItem('companyId');
    this.companyDetail = {
      companyID: localStorage.getItem('companyId'),
      userId: localStorage.getItem('userId')
    }
    this.suffix = localStorage.getItem('companySuffix');

    this.createForm();
    this.getCompanyID();
    this.getCountries();
    this.getImeiNO();
    this.getCountryCode();
    this.getModelType();
    this.getContactList()

    this.show = false;
    this.imeiTrue = true;
    this.showFleet = false;
  }

}
