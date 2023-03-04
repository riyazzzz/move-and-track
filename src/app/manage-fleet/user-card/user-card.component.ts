import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { UserformComponent } from '../users/userform/userform.component';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
    
    companyDetail: { branchID: string; companyID: string; userId: string; };
    columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
    app: any={logo:'logo.png'};
    myPlatform: any;
    source: { localdata: any; };
    dataAdapter: any;
    selectedRowIdx: any;
    selectedRow: any;
 
    renderer: (row: number, column: any, value: string) => string;
    detail: any;
    newDetail: any;
    constructor(
  private modalController: ModalController,
     
      private ajaxService:AjaxService,
      private commonService:CommonService,
      public platform: Platform
    ) { }
    myGridOnRowSelect(event: any): void {
      this.selectedRow = event.args.row;
    this.selectedRowIdx = event.args.rowindex;
    
    }
    async openModel() {
      const modal = await this.modalController.create({
        component:UserformComponent,
        cssClass: 'custom-modal'
        });
        modal.onDidDismiss().then(()=>{
             this.getDatas();
       } )
      return await modal.present(); 
    }
  
  
  ngAfterViewInit() {
       this.getDatas();
     }
  
    ngOnInit() {
      this.companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }
      
    }
    async editMode(data){
      if(data){
        data["submit"] ="available";
        const modal = await this.modalController.create({
        component:UserformComponent,
        cssClass: 'custom-modal',
          componentProps: {
            value: data,
           }
        });
      modal.onDidDismiss().then(()=>{
      this.getDatas();
      } )
      
        return await modal.present();
      
      }
    
    }
   
  getDatas(){
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
   
   var datas={"companyID":companyDetail.companyID,"branchID":companyDetail.branchID,"userID":companyDetail.userId+''}
  var url2= serverUrl.web +'/api/vts/company/branch/user/'+JSON.stringify(datas); 
  this.ajaxService.ajaxGet(url2).subscribe(res =>{
      console.log(res);   
      this.detail=res;
      this.newDetail = this.detail.map(item => {
        return Object.keys(item).map(key => {
            if (!item[key]) {
                item[key] = "-NA-"
                return item
            }
        })
    })
      // for(var i=0 ;i<detail.length;i++){
      //   this.pdfdatas.push([detail[i].name,detail[i].telNo,detail[i].address,detail[i].city,detail[i].plateNo,detail[i].nationality,detail[i].eMailAddress,detail[i].emergencyContactNo,detail[i].licenseNo,detail[i].licenseExpiry]);
      // }

  
    })
   
  this.app["logo"] = localStorage.companyLogo;
      this.myPlatform = this.platform.platforms()[0];
      if(this.myPlatform == 'tablet'){
        this.myPlatform = 'desktop';
      }
    }
}
