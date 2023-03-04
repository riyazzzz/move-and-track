import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxTreeGridComponent } from 'jqwidgets-ng/jqxtreegrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-dealer-hierarchy',
  templateUrl: './dealer-hierarchy.page.html',
  styleUrls: ['./dealer-hierarchy.page.scss'],
})
export class DealerHierarchyPage implements OnInit {

  constructor(private ajaxService: AjaxService, private commonService: CommonService) { }
  @ViewChild('treeGridReference', { static: false }) treeGrid: jqxTreeGridComponent;

  columns;
  source;
  ready;
  page = [];
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;


  getData() {
    this.commonService.presentLoader();
    this.page = [];
    let url = serverUrl.web + '/global/getAllDealerSubDealer'
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.commonService.dismissLoader();
      this.page = ["1000"];
      this.source =
      {
        dataFields: [
          {
            name: 'sno',
            type: 'number'
          },
          {
            name: 'dealername',
            type: 'string'
          }, {
            name: 'companyId',
            type: 'string'
          }, {
            name: 'contactNo',
            type: 'string'

          },
          {
            name: 'dateCreated',
            type: 'string'
          },
          {
            name: 'maindealer',
            type: 'string'
          }, {
            name: 'emailAddress',
            type: 'string'
          },
          {
            name: 'subdealer',
            type: 'array'
          }, {
            name: 'expanded'
          }],
        hierarchy: {
          root: 'subdealer'
        },
        id: 'dealername',
        localData: res
      };

      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.renderer = (row: number, column: any, value: string,) => {


        console.log(row, '>>>', column, '>>>>>', value)
        if (value == "" || null || undefined) {
          return "--"
        }
        else {
          return '<span  style="font-family:VERDANA;line-height:32px;font-size:15px;color:darkblue;margin:auto;padding:0px 5px;text-align:center">' + value + '</span>';
        }
      }
      this.columns =
        [
          {
            text: 'S NO',
            align: 'center',
            dataField: 'sno',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 100
          },
          {
            text: 'DEALER NAME',
            align: 'center',
            dataField: 'dealername',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 200
          },
          {
            text: 'COMPANY ID',
            align: 'center',
            dataField: 'companyId',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 200
          },
          {
            text: 'USER ID',
            align: 'center',
            dataField: 'emailAddress',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 200
          },
          {
            text: 'CONTACT NO',
            align: 'center',
            dataField: 'contactNo',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 200
          }, {
            text: 'CREATED DATE',
            align: 'center',
            dataField: 'dateCreated',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 200
          },
          {
            text: 'MAIN DEALER',
            align: 'center',
            dataField: 'maindealer',
            cellsrenderer: this.renderer,
            cellsalign: 'center',
            width: 200
          }

        ]


      this.ready = () => {
        this.treeGrid.expandRow(32);
      };
    })
    // var A = [{
    //                 "ID": 1,
    //                 "Employee_Name": "Amit",
    //                 "Company": "GeeksforGeeks",
    //                 "Designation": "Content Writer",
    //                 "expanded": true,
    //                 A1: [{
    //                     "ID": 2,
    //                     "Employee_Name": "Sumit",
    //                     "Company": "Amazon",
    //                     "Designation": "Software Engineer",
    //                 }, {
    //                     "ID": 3,
    //                     "Employee_Name": "Vivek",
    //                     "Company": "Apple",
    //                     "Designation": "Product Manager",
    //                     "expanded": true,
    //                     A1: [{
    //                         "ID": 4,
    //                         "Employee_Name": "Soni",
    //                         "Company": "Flipkart",
    //                         "Designation": "HR",
    //                     }]
    //                 }]
    //             }];


  }
  ngOnInit() {
    this.getData()
  }

}




