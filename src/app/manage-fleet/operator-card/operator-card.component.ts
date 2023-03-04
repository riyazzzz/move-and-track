import { Component, OnInit,ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from '../../../environments/environment';
import { ModalController } from '@ionic/angular';
import { OperatorformComponent } from '../operator/operatorform/operatorform.component';


@Component({
  selector: 'app-operator-card',
  templateUrl: './operator-card.component.html',
  styleUrls: ['./operator-card.component.scss'],
})
export class OperatorCardComponent implements OnInit {

    app: any={logo:'logo.png'};
    myPlatform: any;
    @ViewChild(OperatorformComponent,{ static: false })operatorformComponent:OperatorformComponent;
    titles = 'jspdf-autotable-demo';
    title = 'angular-export-to-excel'
    dataForExcel = [];
    
    objValues = [];
    odj = [];
    columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
    selectedRow: any;
    editrow: number;
    tableData: any;
    getAdapter: any;
    datas=[];
    selectedRowIdx: any;
    pdfdatas=[];
    companyDetail: { branchID: string; companyID: string; userId: string; };
    detail: any;
    newDetail: any;
   
    constructor(
      private modalController: ModalController,
      private ajaxService:AjaxService,
      private commonService:CommonService,
      public platform: Platform
      ) { }
   
    async openModel() {
      const modal = await this.modalController.create({
        component:OperatorformComponent,
        cssClass: 'custom-modal'
        });
        modal.onDidDismiss().then(()=>{
            this.selectedRow="";
            this.getDatas();
       
          } )
      return await modal.present(); 
    }
  
  async editMode(selectCard){
    if(selectCard){
      selectCard["submit"] ="available";
      const modal = await this.modalController.create({
      component:OperatorformComponent,
      cssClass: 'custom-modal',
        componentProps: {
          value: selectCard,
         }
      });
    modal.onDidDismiss().then(()=>{
       selectCard="";
      this.getDatas();
    } )
    
      return await modal.present();
    }
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
  
    getDatas(){
    const companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
   
   var datas={"compnyID":companyDetail.companyID,"branchID":companyDetail.branchID,"companyNme":companyDetail.userId+''}
  var url2= serverUrl.web +'/api/vts/company/operator/'+JSON.stringify(datas); 
  this.ajaxService.ajaxGet(url2).subscribe(res =>{
      console.log(res);   
      this.detail=res;
    
    this.newDetail = this.detail.map(item => {
        return Object.keys(item).map(key => {
            if (!item[key]) {
                item[key] = "-NA-"
                // console.log(item)
                return item
            }
        })
    })
   })
}


}
