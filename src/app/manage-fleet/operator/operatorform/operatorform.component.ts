import { Component, OnInit, Input } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { serverUrl } from '../../../../environments/environment';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-operatorform',
  templateUrl: './operatorform.component.html',
  styleUrls: ['./operatorform.component.scss'],
})
export class OperatorformComponent implements OnInit {
  type = 'text'
  @Input() myGrid;
  @Input() value;
  fleetLogin: FormGroup;
  progressText = "Checking inventory";
  formDisplay = false;
  valuePro = "0.25";
  displayBar = false;
  statusBar = false;
  // fleetLogin:any;
  loginStatus;
  data: any;
  editrow: number;
  dataGrid: any = {};
  user: any = {};
  selectedCompany: any;
  fleetManager: any[];
  companyVehicle: FormGroup;
  fleet: any[];
  model: any = [];
  vin: any;
  editVehType = "vehicleType";
  editfleet = "Country";
  serviceName: any;
  hideSerialNo: boolean = false;
  today = new Date();
  minDate;


  companyDetail: { branchID: string; companyID: string; userId: string; };
  isDeleteShow: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private userService: UserDetailService,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private router: Router,
    private alertController: AlertController,
  ) { }
  async closeModal() {
    this.modalController.dismiss();
  }
  vehicleTypes = [];
  //  'FORKLIFTS', 'LIGHT TOWERS', 'WELDING MACHINES', 'DEEPSEA GENERATOR', 'COMPRESSORS',
  //  '32kw CEM7 GENERATORS', 'BUS', 'CAR','TRUCK', 'BIKE', 'AUTO', 'BATTERY','BOBCAT', 'TANKER', 'LOADER', 'DABBAB',
  //  'DUMPER', 'STREET SWEEPER', 'TOWED STREET SWEEPER', 'COMPACTOR','DOUBLE CABIN', 'HOOK LIFT', 'CRANE',
  //  'SMALL TRUCK'
  provider = [
    { sim: 'Idea' },
    { sim: 'Airtel' },
    { sim: 'Vodafone' },
    { sim: 'Bsnl' }
  ];

  createForm() {
    var now = new Date();
     var day = ("0" + now.getDate()).slice(-2);
     var month = ("0" + (now.getMonth() + 1)).slice(-2);
     var today = now.getFullYear() + "-" + (month) + "-" + (day)
    this.fleetLogin = this.formBuilder.group({
      operatorName: ['', Validators.required],
      contact: ['', Validators.required],
      Address1: ['', Validators.required],
      // Address2: ['', ],
      city: ['', Validators.required],
      email: ['',],
      country: ['', Validators.required],
      emergencyContact: ['',],
      licence: ['',Validators.required],
      licenceExpiry: ['',Validators.required]
    });
  }




  editForm() {
    if (this.value.submit == "available") {
      this.fleetLogin = this.formBuilder.group({
        operatorName: [this.value.operatorName, Validators.required],
        contact: [this.value.telNo, Validators.required],
        Address1: [this.value.address, ''],
        // Address2: ['', Validators.required ],
        city: [this.value.address2, Validators.required],
        email: ['', Validators.required],
        country: ['',],
        emergencyContact: ['',],
        licence: ['',],
        licenceExpiry: ['',]
      });
      this.formDisplay = true;

      this.editVehType = this.value.vehicleType;
      this.editfleet = this.value.alerts;

    }
  }

  getOperators() {
    const url = serverUrl.web + '/login/getPreferences?key=countries&companyId=' + this.companyDetail.companyID;
    this.ajaxService.ajaxGetPerference(url)
      .subscribe(res => {
        this.fleet = res;
      })

  }
  submit() {
    if (this.serviceName != "available") {
      var data = {
        "optId": false, "operatorId": "", "operatorStatus": true, "compnyID": this.companyDetail.companyID,
        "branchID": this.companyDetail.branchID, "username": this.companyDetail.userId, "optName": this.fleetLogin.value.operatorName, "cntctNo": JSON.stringify(this.fleetLogin.value.contact),
        "addressLine1": this.fleetLogin.value.Address1, "addressLine2": this.fleetLogin.value.city, "country": this.fleetLogin.value.country, "emailId": this.fleetLogin.value.email,
        "emergencyContactName": "",
        "emergencyContactNumber": this.fleetLogin.value.emergencyContact + "", "licenceNumber": this.fleetLogin.value.licence.toString(), "licenceExpiry":this.fleetLogin.value.licenceExpiry
      }
      Object.keys(data).forEach((key) => (data[key] == null || data[key] == "") && delete data[key])
      data["operatorId"] = "";
      data["optId"] = false;
      const url = serverUrl.web + '/operator/addOperatorInfo';
      this.ajaxService.ajaxPutMethod(url, data).subscribe(res => {
        if (res.length > 2) {
          this.commonService.presentToast('Operator added succesfully');
          this.fleetLogin.reset();
          this.modalController.dismiss();
        }
      })
    } else if (this.serviceName == "available") {
      var details = {
        "optId": true, "operatorId": this.value.operatorID, "operatorStatus": true,
        "compnyID": this.companyDetail.companyID, "branchID": this.companyDetail.branchID,
        "username": this.companyDetail.userId, "optName": this.fleetLogin.value.operatorName, "cntctNo": this.fleetLogin.value.contact.toString(),
        "addressLine1": this.fleetLogin.value.Address1, "addressLine2": this.fleetLogin.value.city, "country": this.fleetLogin.value.country, "emailId": this.fleetLogin.value.email,
        "emergencyContactName": "",
        "emergencyContactNumber": this.fleetLogin.value.emergencyContact + "", "licenceNumber": this.fleetLogin.value.licence.toString(), "licenceExpiry": this.fleetLogin.value.licenceExpiry
      }
      Object.keys(details).forEach((key) => (details[key] == null || details[key] == "") && delete details[key])
      const url = serverUrl.web + '/operator/updateOperatorInfo';
      this.ajaxService.ajaxPostWithString(url, details).subscribe(res => {
        var message=JSON.parse(res);
       if (message.message == "Updated Successfully") {
          this.commonService.presentToast('Updated succesfully');
          this.modalController.dismiss();
        } else {
          this.commonService.presentToast('Operator is already associated');

        }
      })
    }
    // else{
    //   const deleteData={"tagID":"OPjana6719","compnyID":"jana","branchID":"jana","companyNme":"jana-ca"}
    //   const url=serverUrl.web + '/api/vts/company/operator';
    //   this.ajaxService.ajaxDeleteWithBody(url, data).subscribe(res =>{
    //     console.log(res);
    //   })
    // }
  }

  async deleteSelectedOperator() {
    if (this.value) {
      const alert = await this.alertController.create({
        header: 'Delete',
        backdropDismiss: false,
        message: "Are you sure you want to delete!",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            // console.log(this.selectedRow.eventId)
            const deleteData = { "tagID": this.value.operatorID, "compnyID": this.companyDetail.companyID, "branchID": this.companyDetail.branchID, "companyNme": this.companyDetail.userId }
            const url = serverUrl.web + '/operator/deleteOperatorInfo?operatorID='+this.value.operatorID;						
            this.ajaxService.ajaxDeleteWithString(url).subscribe(res => {
              if (res.error.text == "Operator is already Associated") {
                this.commonService.presentToast("Associated operator cannot be deleted")

                this.getDatas();
              } else if (res.error.text == "success") {
                this.commonService.presentToast("Deleted successfully")
                this.getDatas();
                this.modalController.dismiss()
              }

            })
          }
        }]
      });
      await alert.present();
    }
  }
  getDatas() {
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }

    var datas = { "compnyID": companyDetail.companyID, "branchID": companyDetail.branchID, "companyNme": companyDetail.userId + '' }
    var url2 = serverUrl.web +'/operator/operatorinfo?companyId='+companyDetail.companyID+'&branchId='+companyDetail.branchID;						
    this.ajaxService.ajaxPostMethodWithoutData(url2).subscribe(res => {
      var detail = res;

    })

  }

  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }

    this.minDate = this.today.getFullYear() + "-";
    this.minDate += (this.today.getMonth() + 1 < 10 ? "0" + (this.today.getMonth() + 1).toString() : (this.today.getMonth() + 1).toString()) + "-";
    this.minDate += this.today.getDate() < 10 ? "0" + this.today.getDate().toString() : this.today.getDate().toString();

    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
    this.createForm();
    this.getOperators();
    // this.editForm();
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }

    this.selectedCompany = localStorage.getItem('corpId');
    if (this.value) {
      if (this.value.submit == "available") {
        this.hideSerialNo = false;
        this.serviceName = "available";
        this.vin = this.value.vin;
        this.editfleet = this.value.nationality;
        this.fleetLogin.patchValue({
          operatorName: this.value.name,
          contact: this.value.telNo,
          Address1: this.value.address,
          city: this.value.address2,
          email: this.value.eMailAddress,
          country: this.value.nationality,
          emergencyContact: this.value.emergencyContactNo,
          licence: this.value.licenseNo,
          licenceExpiry: this.value.licenseExpiry,

        });


      }
    }
  }

}
