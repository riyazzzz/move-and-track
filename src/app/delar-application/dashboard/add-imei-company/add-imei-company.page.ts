import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-imei-company',
  templateUrl: './add-imei-company.page.html',
  styleUrls: ['./add-imei-company.page.scss'],
})
export class AddImeiCompanyPage implements OnInit {
  @Input() imeiDetails: any;
  showList;
  searchInput;
  imeiAssignCompany: { imeiNo: any; companyDetail: any; };
  searchEnable: boolean = false;
  constructor(
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private modalController: ModalController,
    private router: Router
    ) { }
    async assignImeiToCompany(company){
      this.imeiAssignCompany = {
        imeiNo : this.imeiDetails.imei,
        companyDetail : company.companyId
      };
      console.table(company);
      console.table(this.imeiDetails);
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        message: 'You want to assign ' + this.imeiAssignCompany.imeiNo +' to this company '+ this.imeiAssignCompany.companyDetail,
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
            const arrayData = [];
            const date = new Date();
            let currentDate = date.getFullYear()+ '-';
            currentDate += (date.getMonth() < 10 ? '0'+ (date.getMonth() +1):date.getMonth() +1) +'-';
            currentDate += date.getDate() < 10 ? '0' + date.getDate(): date.getDate();
            let expDate = date.getFullYear() + 1 + '-';
            expDate += (date.getMonth() < 10 ? '0'+ (date.getMonth() +1):date.getMonth() +1) +'-';
            expDate += date.getDate() < 10 ? '0' + (date.getDate() - 1) : date.getDate() - 1;
            const assignImeiTocom = {
              "manufacture": this.imeiDetails.manufacture,
              "provider": this.imeiDetails.provider,
              "imei": this.imeiDetails.imei,
              "checked": this.imeiDetails.checked,
              "simno": this.imeiDetails.simno,
              "modal": this.imeiDetails.modal,
              //"$$hashKey": "object:8022",
              "companyId": company.companyId,
              "userId": localStorage.getItem('userId'),
              "DefaultWarnty": expDate,
              "convertedDate": currentDate
            }
            arrayData.push(assignImeiTocom);
            const url = serverUrl.web + '/api/vts/superadmin/device'
            this.ajaxService.ajaxPutMethod(url, arrayData)
            .subscribe(res=>{
              console.log(res);
              res = JSON.parse(res);
              if(res.devicestatus === "persisted"){
                this.commonService.presentToast('Your Imei assign successfully');
                localStorage.setItem('selectedCompanyData', JSON.stringify(company));
                this.router.navigateByUrl('/company-vehicle');
                this.modalController.dismiss();
              }
              else{
                this.commonService.presentToast('There was a problem to assign this Imei');
              }
              
            });
          }
        }]
      });
      await alert.present(); 
      
    }
    getBack(){
      this.modalController.dismiss();
    }
    searchStatus(){
      this.searchEnable = !this.searchEnable;
    }
    ionViewWillEnter(){
      this.commonService.dismissLoader();
    }
    ngOnInit() {
      this.showList = JSON.parse(localStorage.getItem('dashboardData'));
    }
    
  }
  