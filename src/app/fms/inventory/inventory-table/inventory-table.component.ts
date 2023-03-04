import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
 tableData:any;
  constructor(
    public platform: Platform,
    private modalController: ModalController,private alertController:AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
  ) { }
  ngAfterViewInit() {
    if (this.myPlatform == 'desktop') {
      this.myGrid.showloadelement();
    }
    this.getDatas();
  }
  getDatas() {
var url= serverUrl.fmsUrl +'/inventorymaster/getFmsInventoryMasterAll?companyid='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res => {
  var detail = res;
  this.tableData = res
    this.renderer = (row: number, column: any, value: string,) => {
      if (value == "" || null || undefined || value == ",") {
        return "---"
      }
      else {
        return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
      }
    }

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      { text: 'Item No', datafield: 'itemno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Description', datafield: 'description', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Part  No', datafield: 'partno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Type', datafield: 'type', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Document No', datafield: 'documentno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Location', datafield: 'locationcode', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Actual Amount', datafield: 'actualamount', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Expected Amount', datafield: 'expectedamount', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Quantity', datafield: 'quantity', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Facode', datafield: 'facode', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Entry Type', datafield: 'entrytype', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Company Structure', datafield: 'companystructure', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Assettype', datafield: 'assettype', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Asset Descrption', datafield: 'assetdescrption', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Remarks', datafield: 'remarks', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:250},
      { text: 'Fgtype', datafield: 'fgtype', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Entry No', datafield: 'entryno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Month', datafield: 'month', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    ]
  })
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.getDatas();
  } 
  

}