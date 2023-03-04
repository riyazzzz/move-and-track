import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { ViewSerialDetailsComponent } from '../view-serial-details/view-serial-details.component';

@Component({
  selector: 'app-view-serialdetail',
  templateUrl: './view-serialdetail.component.html',
  styleUrls: ['./view-serialdetail.component.scss'],
})
export class ViewSerialdetailComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @Input() value;
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  columns:any;
  myPlatform: any;
  selectedRow: any;
  tableData:any;
  constructor( private ajaxService: AjaxService,private modalController: ModalController,) { }
  cancelBtn() {
    this.modalController.dismiss();
   }

   ngOnInit() {
    const url = serverUrl.web +'/sensorise/getSensoriseSerialNoInvoiceNo?companyid='+localStorage.getItem('corpId')+'&invoiceno='+this.value;
        this.ajaxService.ajaxGet(url).subscribe(res => {
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
      { text: 'Invoice Number', datafield: 'invoiceno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
      { text: 'Serial Number', datafield: 'serialno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
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
      component:ViewSerialDetailsComponent,
       cssClass: 'saleform',
       componentProps: {
        value: this.selectedRow.serialno
      }
      });
      modal.onDidDismiss().then(() => {
      })
      return await modal.present();
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
}
}
