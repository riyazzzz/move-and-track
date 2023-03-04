import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

@Component({
  selector: 'app-renewal-table',
  templateUrl: './renewal-table.component.html',
  styleUrls: ['./renewal-table.component.scss'],
})
export class RenewalTableComponent implements OnInit {
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  head = ['Plate No', 'AlertType', 'E-Mail ID', 'Valid Till', 'Status'];
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  selectedRowIdx: any;
  selectedRow;
  tableData = [{plateNo:'testing'}];
  constructor() { }


getDatas(){
  this.source = { localdata: this.tableData };
  this.dataAdapter = new jqx.dataAdapter(this.source);
  this.columns = [
    { text: 'CR No', datafield: 'plateNo', cellsrenderer: this.renderer },
    { text: 'ICCID No', datafield: 'type', cellsrenderer: this.renderer },
    { text: 'Request date/time', datafield: 'emailId', cellsrenderer: this.renderer },
    { text: 'Sensorize SR No', datafield: 'toDate', cellsrenderer: this.renderer },
    { text: 'RSU Process', datafield: 'states', cellsrenderer: this.renderer },
    { text: 'RSU SR No', datafield: 'statess', cellsrenderer: this.renderer },
    { text: 'SR Action', datafield: 'statesss', cellsrenderer: this.renderer },
        { text: 'Sensorise SR Status', datafield: 'stsate', cellsrenderer: this.renderer },
        { text: 'RSU SR Status', datafield: 'state', cellsrenderer: this.renderer },
        { text: 'Whitelisting Ticket No', datafield: 'sstate', cellsrenderer: this.renderer },
        { text: 'Validity Date', datafield: 'sstates', cellsrenderer: this.renderer },
        { text: 'Sim 1', datafield: 'stasste', cellsrenderer: this.renderer },
        { text: 'sim 2', datafield: 'stassste', cellsrenderer: this.renderer },
        { text: 'Final Status', datafield: 'stsssate', cellsrenderer: this.renderer },
        { text: 'Download', datafield: 'statsse', cellsrenderer: this.renderer },
  ]
  // this.myGrid.updatebounddata();
  // this.myGrid.unselectrow;
// })
}



  ngOnInit() {
     this.getDatas()
  }

}
