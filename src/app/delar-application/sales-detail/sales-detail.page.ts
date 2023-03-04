import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { ViewSerialdetailComponent } from './view-serialdetail/view-serialdetail.component';
@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.page.html',
  styleUrls: ['./sales-detail.page.scss'],
})
export class SalesDetailPage implements OnInit {

  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
columns:any
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  isDeleteShow: any = true;
  selectedRow: any;
  tableData:any;

  constructor(
    public platform: Platform,
    private modalController: ModalController,
    private alertController:AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService

  ) { }
  getDatas() {
if (this.myPlatform == 'desktop') {
 const companyDetail = {
 branchID: localStorage.getItem('corpId'),
 companyID: localStorage.getItem('corpId'),
 userId: localStorage.getItem('userName')
}
}
const url = serverUrl.web +'/sensorise/getSensoriseSalesAll?companyid='+localStorage.getItem('corpId');
    this.ajaxService.ajaxGet(url).subscribe(res => {
     var detail = res;
     this.tableData = res;
    
this.renderer = (row: number, column: any, value: string,) => {
if (value == "" || null || undefined || value == ",") {
 return "---"
 }
 else {
 return '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
 }
}
    
this.source = { localdata: this.tableData };
this.dataAdapter = new jqx.dataAdapter(this.source);
this.columns = [
  { text: 'Invoice Number', datafield: 'invoiceno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
  { text: 'Sales Distributor', datafield: 'saledistributor', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
  { text: 'Sales Date', datafield: 'saledate', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
  { text: 'Sales Quantity', datafield: 'totalquantity', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
  { text: 'View Detail', datafield: 'View Detail', columntype: 'button',cellsalign: 'center', align: 'center',
  cellsrenderer: (): string => {
    return 'View Detail';
  },
  buttonclick: (row): void => {
   this.viewModel()
  }
}
]
     })
     }
     async viewModel() {
      const modal = await this.modalController.create({
        component:ViewSerialdetailComponent,
         cssClass: 'saleform',
         componentProps: {
          value: this.selectedRow.invoiceno
        }
        });
        modal.onDidDismiss().then(() => {
        })
        return await modal.present();
    }
     
     async openModel()
     {
const modal = await this.modalController.create({
component:AddSaleComponent,
 cssClass: 'saleform',
});
modal.onDidDismiss().then(() => {
 if (this.myPlatform == "desktop") {
 this.myGrid.clearselection();
 }
    this.getDatas();
})
return await modal.present();
     }
     myGridOnRowSelect(event: any): void {
      this.selectedRow = event.args.row;
  }
    ngOnInit() {
     this.getDatas();
     }
    
}
