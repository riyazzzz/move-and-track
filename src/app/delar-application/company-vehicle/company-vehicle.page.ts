import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { AddCompanyVehiclePage } from '../company-vehicle/add-company-vehicle/add-company-vehicle.page';
import { ModalController, AlertController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-company-vehicle',
  templateUrl: './company-vehicle.page.html',
  styleUrls: ['./company-vehicle.page.scss'],
})
export class CompanyVehiclePage implements OnInit {
  selectedCompany: any;
  header: any;
  companyVehicle = [];
  companyHeader;
  searchEnable: any;
  displayData: any[];
  
  constructor(
    private router: Router,
    private ajaxService:AjaxService,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService
    ) { }
    
   
    async openFormModule(action, editDetails){
      if(action === 'add'){
        localStorage.setItem('companyVehicle', JSON.stringify(editDetails));
        const modal = await this.modalController.create({
          component: AddCompanyVehiclePage,
          componentProps:{
            'action':action,
            'editDetails': editDetails,
            'selectedCompany': this.selectedCompany
          }
        });
        return await modal.present();
      }else{
        const alert = await this.alertController.create({
          header: 'Are you sure?',
          inputs: [{
            name: 'Password',
            type: 'password',
            placeholder: 'Enter the password'
          }],
          message:'You want to Delete ' + editDetails.plateno,
          backdropDismiss: false,
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: data => {
              if(data.Password === localStorage.getItem('password')){
                const deleteImei = {
                  "vin" : editDetails.vin
                };
                const url = serverUrl.web + '/api/vts/superadmin/company/assets/deleted/'+JSON.stringify(deleteImei);
                this.ajaxService.ajaxGet(url)
                .subscribe(res =>{
                  console.log('Delete Data'+ res);
                  if(res == 'no date'){
                    this.commonService.presentToast('Vehicle data not available');
                  }else if(res == ""|| res == " "){
                    this.commonService.presentToast('Something went wrong');
                  }else{
                    const url = serverUrl.web + '/api/vts/company/assets';
                    
                    const deleteVehicleData = {
                      companyID: this.selectedCompany.companyId,
                      branchID: this.selectedCompany.companyId,
                      emailId: this.selectedCompany.userId,
                      vin: editDetails.vin,
                      imeiNo: editDetails.imei
                    }
                    res.OperatorId == "null" ?deleteVehicleData['operatorId'] = "":deleteVehicleData['operatorId'] = res.OperatorId;
                    res.effFrom == "null" ? deleteVehicleData['effFrom'] = "":deleteVehicleData['effFrom'] = res.effFrom;
                    res.freeformid == "null" ?"":deleteVehicleData['freeformid'] = res.freeformid;
                    res.geozones_id == "null" ?"":deleteVehicleData['geozones_id'] = res.geozones_id;
                    res.landmark == "null" ?"":deleteVehicleData['landmark'] = res.landmark;
                    res.routeid == "null" ?"":deleteVehicleData['routeid'] = res.routeid;
                    this.ajaxService.ajaxDeleteWithBody(url, deleteVehicleData)
                    .subscribe(res => {
                      console.log('deviceDelected'+res);
                      if(res.error.text ==='persisted'){
                        this.commonService.presentToast('Your vehicle deleted successfully');
                        this.ionViewWillEnter();
                      }else{
                        this.commonService.presentToast('Something wrong! Try again later...');
                      }
                    })
                  }
                });
              }else{
                this.commonService.presentToast('Password does not match');
              }
            }
          }]
        });
        
        await alert.present(); 
      }
    }
    pipeFilter(search) {
      var loc;
      if (!this.companyVehicle)
        loc = [];
      if (!search)
        loc = this.companyVehicle;
      search = search.toLowerCase();
      loc = this.companyVehicle
      var newloc=[]
      loc.filter(it => {
        if (it.plateno != null)
          if(it.plateno.replace(/ /g, '').toLowerCase().includes(search.replace(/ /g, ''))){
            newloc.push(it)
          }
      });
      this.displayData = newloc;
    }
    getBack(){
      this.router.navigateByUrl('/dashboard');
    }
    ionViewWillEnter(){
      this.selectedCompany = JSON.parse(localStorage.getItem('selectedCompanyData'));
      this.companyHeader = this.selectedCompany.companyName;
      const userId={companyid: this.selectedCompany.companyId};
      const url = serverUrl.web + '/global/getlistofvehiclesinfo?companyId='+this.selectedCompany.companyId;
      this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        console.log(res);
        this.companyVehicle =(res);
        this.displayData= this.companyVehicle
      });
    }
    searchStatus(){
      this.searchEnable = !this.searchEnable;
      this.displayData = this.companyVehicle
    }
    ngOnInit(){
      this.selectedCompany = JSON.parse(localStorage.getItem('selectedCompanyData'));
      this.companyHeader = this.selectedCompany.companyName;
    }
    
  }
  