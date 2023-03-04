import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

@Component({
  selector: 'app-addrenewal',
  templateUrl: './addrenewal.component.html',
  styleUrls: ['./addrenewal.component.scss'],
})
export class AddrenewalComponent implements OnInit {
  // source: { localdata: any; };
  // dataAdapter: any;
  // renderer: (row: number, column: any, value: string) => string;
  // @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  // head = ['Plate No', 'AlertType', 'E-Mail ID', 'Valid Till', 'Status'];
  // columns=[]
  // selectedRowIdx: any;
  // selectedRow;
  proofName=['pan card']
  constructor() { }

  submit(){
    
  }

  ngOnInit() {}

}
