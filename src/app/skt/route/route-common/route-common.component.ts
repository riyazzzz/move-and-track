import { Component, OnInit,ViewChild,ElementRef,Input} from '@angular/core';
import { ModalController,Platform,AlertController} from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

import { BusStopComponent } from '../bus-stop/bus-stop.component';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { RouteFormComponent } from '../route-form/route-form.component';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { RouteAddtionalComponent } from '../route-addtional/route-addtional.component';
import { ExportExcelService } from 'src/app/services/export-excel.service';


@Component({
  selector: 'app-route-common',
  templateUrl: './route-common.component.html',
  styleUrls: ['./route-common.component.scss'],
})
export class RouteCommonComponent implements OnInit {

  @ViewChild('myGrid', { static: false }) myGrid : jqxGridComponent;
  selectedRow: any;
  source: any;
  renderer: (row: number, column: any, value: string) => string;
  dataAdapter: any;
  columns:any;
  btn: any;
  myForm:FormGroup;
  head = ['Plate No','Trip Name','Route Type','Trip Start Time','Trip End Time','Type'];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="Route & Trip report";
  page: any;
 constructor(
    private modalController: ModalController,
    
    private formBuilder: FormBuilder,
    private platform: Platform,
    private commonService:CommonService,
    private ajaxService:AjaxService,
    private alertController:AlertController,
    private ete:ExportExcelService
    ) { }
   
 
  obj=[];
  trip;
  
  async deletebtn(){
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: 'Delete ',
        backdropDismiss: false,
        message: "Are you sure you want to delete?",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
           const url = serverUrl.web + '/routetrip/deleteRoute?tripid='+this.selectedRow.tripId;
            this.ajaxService.ajaxDeleteWithString(url).subscribe(res => {
                if (res.statusText == "OK") {
                this.commonService.presentToast("Deleted successfully")
               this.myGrid.clearselection();
               this.getData();
               this.selectedRow = "";
              } else {
                this.commonService.presentToast("Try again")
              }
            })
          }
        }]
      });
      await alert.present();

    }
    else {
      this.commonService.presentToast('Please select a row to delete');
}

    
  }
 
//   btnOnClick() {
//     let gridContent = this.myGrid.exportdata('html');
//     let newWindow = window.open('', '', 'width=800, height=500'),
//         document = newWindow.document.open(),
//         pageContent =
//             '<!DOCTYPE html>\n' +
//             '<html>\n' +
//             '<head>\n' +
//             '<meta charset="utf-8" />\n' +
//             '<title>Parent Details</title>\n' +
//             '</head>\n' +
//             '<body>\n' + gridContent + '\n</body>\n</html>';
//     document.write(pageContent);
//     document.close();
//     newWindow.print();
// };


async openBusStopModel() {
  const modal = await this.modalController.create({
    component:BusStopComponent,
    cssClass: 'bus-route-css',
    componentProps: {
      value: this.selectedRow
    }
    
  });
  return await modal.present();
  
}
  
async routeAdditionalModel() {
  
  const modal = await this.modalController.create({
    component:RouteAddtionalComponent,
     cssClass: 'route-css',
     componentProps: {
      value: this.selectedRow
    }
  
  });
  return await modal.present();
}
myGridOnRowSelect(event: any): void {
  this.selectedRow = event.args.row;
 
}
async editRouteModel(){

  if (this.selectedRow) {
    this.selectedRow["submit"] = "available";
    const modal = await this.modalController.create({
      component:  RouteFormComponent,
      cssClass: 'custom-modal',
      componentProps: {
        value: this.selectedRow,
      }
    });
    modal.onDidDismiss().then(() => {
      this.myGrid.clearselection();
      this.selectedRow = "";
      this.getData();
    })

    return await modal.present();

  }
  else {
    this.commonService.presentToast('Please select a row to edit');
    return "";

  }
}

async openRouteModel(){
  const modal = await this.modalController.create({
   component : RouteFormComponent,
   cssClass :'route-form',
  });
  modal.onDidDismiss().then(() => {
    this.myGrid.clearselection();
    this.selectedRow = "";
    this.getData();

  })
  return await modal.present();
}

createPdf() {
  this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'Route & Trip report');
}

exportToExcel() {
  let reportData = {
    title: "Route & Trip report",
    data: this.pdfdatas,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
} 

getData() {
  const companyDetail = {
    branchID: localStorage.getItem('corpId'),
    companyID: localStorage.getItem('corpId'),
    userId: localStorage.getItem('userName')
  }

  var url = serverUrl.web + `/routetrip/getRoute?companyId=${companyDetail.companyID}&branchId=${companyDetail.branchID}`; 
    this.ajaxService.ajaxGet(url).subscribe(res =>{
     this.obj=res;
     var detail=res;
     this.pdfdatas=[];
     for (var i = 0; i < detail.length; i++) {
      this.pdfdatas.push([detail[i].plateNo, detail[i].tripName,detail[i].routetype,detail[i].tripStarttime,detail[i].tripEndtime,detail[i].type]);
    }
  this.renderer = (row:number,column: any, value:string,)=>{
        if(value == "" || null || undefined ){
          return "---" ;
        }
        else{
          return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto"  >' + value + '</span>';
           
          }
      }
      this.source={ localdata: this.obj}
     this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns =  
[ 
 { text: 'Plate No', datafield: 'plateNo',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Trip Name',  datafield: 'tripName',cellsrenderer:this.renderer , cellsalign: 'center', align: 'center'},
//  { text: 'Route Type',datafield:'routetype',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Trip Start Time', datafield: 'tripStarttime',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Trip End Time', datafield: 'tripEndtime',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
//  { text: 'Type', datafield: 'type',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 
{
  text: 'Action', datafield: 'action', columntype: 'button',
  cellsrenderer: (): string => {
    return 'Show Bus Stop';
  },
  buttonclick: (row: number): void => {
   this.openBusStopModel();
  }
}

];
 })

}
ngAfterViewInit() {
 
  this.getData();
  this.myGrid.showloadelement();
}
  ngOnInit() {
    
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.page = localStorage.getItem('pageSelector');
  this.getData();
 }
 getBack(){
   this.modalController.dismiss();
 }

}
