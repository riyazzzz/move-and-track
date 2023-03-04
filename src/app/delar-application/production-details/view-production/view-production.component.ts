import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-view-production',
  templateUrl: './view-production.component.html',
  styleUrls: ['./view-production.component.scss'],
})
export class ViewProductionComponent implements OnInit {
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
      const url = serverUrl.web +'/sensorise/getSensoriseProductionDetail?companyid='+localStorage.getItem('corpId')+'&serialno='+this.value;
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
        { text: 'Iccid Number', datafield: 'iccidno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
        { text: 'Imei Number', datafield: 'imei', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
        { text: 'Vltd SNo', datafield: 'vltdsno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
      ]
           })
  }

}
