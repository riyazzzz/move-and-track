import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AjaxService } from '../../services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { AddImeiCompanyPage } from '../stock/add-imei-company/add-imei-company.page';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  isChecked:boolean;
  company = true;
  companyName:string;
  vehicleCount:any;
  showList = [{companyName : '', vehicle_Count: ''}]; 
  selector: string;
  selectedData: any;
  initialHeader: boolean;
  searchEnable: boolean;

  isIndeterminate:boolean;
  masterCheck:boolean;
  boxSelect;
  checkBoxList:any;
  details;
  checkbox:boolean=true;
  retrievedObject: string;
  activeData: any;
  model=[];
  imeino=[];
  datas;
  data;
  filterValue: string;
  selectItem: boolean;
  selectedZone: any;
  constructor(
    private menuController: MenuController,
    private router:Router,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private modalController: ModalController,
    private alertController: AlertController
    ) { 
      
      this.details = [
      { 
        "id":"card1",
        value:"APMKT245852222",
        "model":"APMKT0BD20",
        "imeiNo":"3454567890ABCD",
      },{
        "id":"card2",
        value:"APMKT 07 2020",
        "model":"APMKT0BD21",
        "imeiNo":"5454567890ABCD",
      },{
        "id":"card3",
        value:"Nicholaus Kulas PhD",
        "model":"APMKT0BD23",
        "imeiNo":"7454567890ABCD",
      },{
        "id":"card4",
        value:"Jennie Feeney",
        "model":"APMKT0BD23",
        "imeiNo":"8454567890ABCD",
      },{
        "id":"card5",
        value:"Shanon Heaney",
        "model":"APMKT0BD24",
        "imeiNo":"7454567890ABCD",
      },
      {
        "id":"card6",
        value:"Nicholaus Kulas PhD",
        "model":"APMKT0BD25",
        "imeiNo":"8654567890ABCD",
      },{
        "id":"card7",
        value:"Jennie Feeney",
         "model":"APMKT0BD26",
        "imeiNo":"8654567890ABCD",
        
       }
    ];
  
   }
  


    checkMaster() {
      setTimeout(()=>{
      this.details.forEach(obj => {
        obj.isChecked = this.masterCheck;
        
      });
    });
   
  }
  
  changeData(data) {
    const totalItems = this.details.length;
    let checked = 0;
    this.details.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems ) {
      this.isIndeterminate = true;
      this.masterCheck = false;
      
    } 
  
   else if (checked == totalItems) {
      this.masterCheck = true;
      this.isIndeterminate = false;
      
    } 
    else {
      this.isIndeterminate = false;
      this.masterCheck = false;
     
    }
    
  }
 onPress(){
    this.checkbox =! this.checkbox;
  }
   openAddModule(){
      this.router.navigateByUrl('tabs/stock/add-company');
    }
    
    async selectedCompany(selectedData){
      localStorage.setItem('selectedCompanyData',JSON.stringify(selectedData));
      this.router.navigateByUrl('company-vehicle');
    }
    ionViewWillEnter(){
      this.getCompanyList('stock');
    }
    getCompanyList(selectedData){
      this.commonService.presentLoader();
      this.showList =[];
      this.selectedData = selectedData;
      localStorage.setItem('selectedData', selectedData);
      const companySuffix = {suffix:''};
      companySuffix.suffix = localStorage.getItem('companySuffix');
      const url = serverUrl.web + '/api/vts/superadmin/device/' + JSON.stringify(companySuffix);
      this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.showList = res;
      });
      this.commonService.dismissLoader();
    }
    async selectedImei(imeiDetails){
      this.commonService.presentLoader();
      const modal = await this.modalController.create({
        component: AddImeiCompanyPage,
        componentProps: {
          'imeiDetails':imeiDetails,
        }
      });
      return await modal.present();
      
    }
    async deleteSelectedImei(imeiToDelete){
      console.log(imeiToDelete)
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        inputs: [{
          name: 'Password',
          type: 'password',
          placeholder: 'Enter the password'
        }],
        message: 'You want to Delete ' + imeiToDelete.imei,
        backdropDismiss: false,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.commonService.dismissLoader();
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if(data.Password === localStorage.getItem('password')){
              this.commonService.presentLoader();
              const deleteImei = {
                "imei" : imeiToDelete.imei
              };
              const url = serverUrl.web + '/api/vts/superadmin/inventory';
              this.ajaxService.ajaxDeleteWithBody(url, deleteImei)
              .subscribe(res =>{
                if(res.error.text === "deleted successfully"){
                  this.commonService.dismissLoader();
                  this.commonService.presentToast("This "+ imeiToDelete.imei +" Imei No deleted successfully..!");
                  this.getCompanyList("stock");
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
    
    searchStatus(){
      this.searchEnable = !this.searchEnable;
    }
    
    ngOnInit() {
        this.selectedData = 'stock' ;
      this.commonService.dismissLoader();
      this.menuController.enable(true);
      
    }
    
  }