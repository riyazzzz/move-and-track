import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl, storageVariable } from '../../../environments/environment';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-maintanence-form',
  templateUrl: './maintanence-form.component.html',
  styleUrls: ['./maintanence-form.component.scss'],
})
export class MaintanenceFormComponent implements OnInit {
  maintanenceForm: FormGroup;
 notification;
 type='text'
 type1 = 'text'
  @Input() myGrid;
  @Input() value;
  data: any;
  email = false;
  nationalPermit = false;
  commonAlerts = true;
  provider = true;
  commonCheckBox = false;
  tyreChange = false;
  odometer = false;
  airFilter = false;
  brakeFluid = false;
  fuelFilter = false;
  generalService = false;
  month = true;
  afterKms = true;
  edit = false;
  vinPlateNo = [];
  vin = [];
  number: any;
  mail = false;
  notificationTypes: any;
  isDeleteShow: any = false;
  alertType: any;
  companyDetail = {
    branchID: localStorage.getItem('corpId'),
    companyID: localStorage.getItem('corpId'),
    userId: localStorage.getItem('userName')
  }
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private alertController: AlertController,
  ) { }
  closeModel() {
    this.modalController.dismiss();
  }
  getAlertType(){
    let url = serverUrl.web +`/login/getPreferences?key=Maintanence&companyId=${this.companyDetail.companyID}`;
    this.ajaxService.ajaxGet(url).subscribe(res =>{
      this.alertType=res;
     
    });
  }
  getNotification(){
    let url = serverUrl.web +`/login/getPreferences?key=Notification1&companyId=${this.companyDetail.companyID}`;
    this.ajaxService.ajaxGet(url).subscribe(res =>{
      this.notification=res;
     console.log(this.notification)
    });
  }
  createForm() {
    this.maintanenceForm = this.formBuilder.group({
      plateNo: ['', Validators.required],
      alertType: ['', Validators.required],
      idNumber: [''],
      provider: [''],
      validFrom: ['',],
      validTill: ['',],
      description: [''],
      email1: [''],
      notifiyBefore: ['',],
      email2: [''],
     });
  }
  cancelBtn() {
    this.modalController.dismiss();
  }
  changeAlertType(ev) {
   
    if (ev.target.value === 'Insurance' || ev.target.value === 'Pollution'|| ev.target.value ===  "RC" || ev.target.value ===  "Permit"
    || ev.target.value ===  "Fitness Certificate" || ev.target.value  ===  "Green Tax/Road Tax" || ev.target.value ===  "Speed governor") {
      this.provider = true;
      this.nationalPermit = false;
      this.commonAlerts = true;
      this.commonCheckBox = false;
      this.odometer = false;
      this.tyreChange = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.generalService = false;
      this.brakeFluid = false;
    }
    else if (ev.target.value === 'FC' || ev.target.value === 'Tax') {
      this.commonAlerts = true;
      this.nationalPermit = false;
      this.provider = false;
      this.commonCheckBox = false;
      this.odometer = false;
      this.tyreChange = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.generalService = false;
      this.brakeFluid = false;
    }
    else if (ev.target.value === 'National Permit') {
      this.nationalPermit = true;
      this.commonCheckBox = true;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = false;
      this.odometer = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.generalService = false;
      this.brakeFluid = false;
    }
    else if (ev.target.value == "Tyre Change") {
      this.tyreChange = true;
      this.commonCheckBox = true;
      this.nationalPermit = false;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = true;
      this.odometer = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.generalService = false;
      this.brakeFluid = false;
    }

    else if (ev.target.value == "Odometer") {
      this.odometer = true;
      this.commonCheckBox = true;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = false;
      this.nationalPermit = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.generalService = false;
      this.brakeFluid = false;
    }
    else if (ev.target.value == "Brake Fluid") {
      this.brakeFluid = true;
      this.commonCheckBox = true;
      this.nationalPermit = false;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = false;
      this.odometer = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.generalService = false;

    }
    else if (ev.target.value == "Air Filter") {
      this.airFilter = true;
      this.commonCheckBox = true;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = false;
      this.odometer = false;
      this.nationalPermit = false;
      this.fuelFilter = false;
      this.generalService = false;
      this.brakeFluid = false;
    }
    else if (ev.target.value == "Fuel Filter") {
      this.fuelFilter = true;
      this.commonCheckBox = true;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = false;
      this.odometer = false;
      this.airFilter = false;
      this.nationalPermit = false;
      this.generalService = false;
      this.brakeFluid = false;
    }
    else if (ev.target.value == "General Service") {
      this.generalService = true;
      this.commonCheckBox = true;
      this.nationalPermit = false;
      this.provider = false;
      this.commonAlerts = false;
      this.tyreChange = false;
      this.odometer = false;
      this.airFilter = false;
      this.fuelFilter = false;
      this.brakeFluid = false;
    }

  }
  getEmail(ev) {
    if (ev.target.checked) {
      this.email = false;
      console.log(ev.target.checked);
    } else {
      this.email = true;
    }
  }
  alertKms(ev) {
    if (ev.target.checked) {
      this.afterKms = false;
    } else {
      this.afterKms = true;

    }
  }
  alertMonth(ev) {
    if (ev.target.checked) {
      this.month = false;
    } else {
      this.month = true;
    }
  }
  submit() {
    var mailId;
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    if (this.email == true) {
      this.notificationTypes = "push" + "#email"
    } else {
      this.notificationTypes = "push"
    }
    // if (this.maintanenceForm.value.email2 != "") {
    //   mailId = this.maintanenceForm.value.email1 + ',' + this.maintanenceForm.value.email2
    // } else {
    //   mailId = this.maintanenceForm.value.email1;
    // }
    if (this.maintanenceForm.value.email1 != "" && this.maintanenceForm.value.email2 != "" ) {
            if(this.maintanenceForm.value.email1 != "" && this.maintanenceForm.value.email2 == "undefined" ||this.maintanenceForm.value.email1 != "" && this.maintanenceForm.value.email2 == undefined){
              this.maintanenceForm.value.email2 ="";
              mailId = this.maintanenceForm.value.email1
            }
            else{
              mailId = this.maintanenceForm.value.email1 + ',' + this.maintanenceForm.value.email2
            }
          }
          else{
             if(this.maintanenceForm.value.email1 == "" && this.maintanenceForm.value.email2 == undefined){
              this.maintanenceForm.value.email2 = ""
              mailId = this.maintanenceForm.value.email1 + ',' + this.maintanenceForm.value.email2
            }
            else if(this.maintanenceForm.value.email1 != "" && this.maintanenceForm.value.email2 == ""){
              this.maintanenceForm.value.email2 ="";
              mailId = this.maintanenceForm.value.email1
            }
            else if(this.maintanenceForm.value.email1 == "" && this.maintanenceForm.value.email2 != ""){
              this.maintanenceForm.value.email1 = "--"
              mailId = this.maintanenceForm.value.email1 + ',' + this.maintanenceForm.value.email2
            }
            else{
               mailId = this.maintanenceForm.value.email1 + ',' + this.maintanenceForm.value.email2
            }
          }
      
      
    var vin;
    var formData = this.maintanenceForm.value.plateNo;
    for (var i = 0; i < this.vinPlateNo.length; i++) {
      if (formData.toString() == (Object.keys(this.vinPlateNo[i])[0]).toString()) {
        vin = this.vinPlateNo[i][this.maintanenceForm.value.plateNo]
        break;
      }
    }
    var method;
    var eventID;
    if (this.edit == true) {
      eventID = this.value.eventId + '';
      method = "edit";
    } else {
      eventID = "";
      method = "new";
    }
    var datas = {
      "eventId": eventID, "methodOf": method, "companyID": companyDetail.companyID,
      "branchID": companyDetail.userId, "vin": vin, "type": this.maintanenceForm.value.alertType, "subject": this.maintanenceForm.value.idNumber,
      "content": this.maintanenceForm.value.provider, "fromDate": this.maintanenceForm.value.validFrom, "toDate": this.maintanenceForm.value.validTill,
      "description": this.maintanenceForm.value.description, "alertBy": "7", "emailId": mailId,
      "noficationBy": this.notificationTypes
    }
    const url1 =  serverUrl.web + '/device/maintenance?type=renewal';
    const url2 =  serverUrl.web + '/device/maintenance?type=service';
    var urlName;

    if (this.maintanenceForm.value.alertType == "Insurance" || this.maintanenceForm.value.alertType == "Pollution" || this.maintanenceForm.value.alertType == "FC"
    || this.maintanenceForm.value.alertType == "Tax" || this.maintanenceForm.value.alertType ==  "RC" || this.maintanenceForm.value.alertType ==  "Permit"
    || this.maintanenceForm.value.alertType ==  "Fitness Certificate" || this.maintanenceForm.value.alertType ==  "Green Tax/Road Tax" || this.maintanenceForm.value.alertType ==  "Speed governor"
    ) {
      urlName = url1;
    } else {
      urlName = url2;
    }


    this.ajaxService.ajaxPostWithString(urlName, datas).subscribe(res => {
      console.log(res);
      if (res == "success") {
        this.modalController.dismiss();
        this.commonService.presentToast("Added successfully")
      } else if (res == "update" || res == "updated") {
        this.modalController.dismiss();
        this.commonService.presentToast("Updated successfully")
      } else {
        this.commonService.presentToast("Check the values")
      }
    })
   
  }
  async delete() {
    this.value.eventId
    const url = '';
    this.ajaxService.ajaxDeleteWithBody(url, this.value.eventId)

  }
  ngOnInit() {
    this.createForm();
    this.getAlertType();
    this.getNotification();
    this.data = this.value;
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
    if (this.value) {
      if (this.value.emailId != "") {
        this.mail = true;
        this.email = true;
      }
      var emailOne = this.value.emailId.split(',')
      var notifiy = this.value.notificationType.split('#')
      if (notifiy[1] == "email") {
        this.mail = true;
      } else {
        this.mail = false;
      }
      this.edit = true
      this.alertType=[this.value.type]
      this.notification=[] 

      this.maintanenceForm.patchValue({
        plateNo: this.value.plateNo,
        alertType: this.value.type,
        idNumber: this.value.subject,
        provider: this.value.content,
        validFrom: this.value.fromDate,
        validTill: this.value.toDate,
        description: this.value.description,
        email1: emailOne[0],
        email2: emailOne[1],
      })
      
    } else {
      this.mail = false;
      this.email = false;
    }
    var datas = '';
    var data = storageVariable.dashboardData;
    for (var i = 0; i < Object.keys(data.liveDatas).length; i++) {
      const vin = Object.keys(data.liveDatas)[i];
      var obj = {};
      obj[data.liveDatas[vin]["plateNo"]] = data.liveDatas[vin]["vin"]
      this.vinPlateNo.push(obj);

      this.vin.push(data.liveDatas[vin]["plateNo"],);


    }
  }



}
