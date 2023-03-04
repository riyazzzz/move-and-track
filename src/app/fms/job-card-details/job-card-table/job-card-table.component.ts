import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { Platform } from '@ionic/angular';
import { JobCardFormComponent } from '../job-card-form/job-card-form.component'
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
@Component({
  selector: 'app-job-card-table',
  templateUrl: './job-card-table.component.html',
  styleUrls: ['./job-card-table.component.scss'],
})
export class JobCardTableComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
 tableData:any;
  pdfdatas: any;
  head = ['Vehicle Number', 'Customer Name', 'Customer MailId','Service PersonName', 'Service Person PhoneNo','Labour Cost','Total Cost'];
  exportTitle:'Job Card Details';
  constructor(
    public platform: Platform,
    private modalController: ModalController,private alertController:AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private ete: ExportExcelService,
  ) { }
  createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, "Job Card Details", this.myPlatform, "Job Card Details")
  }
  
  exportToExcel() {
    let reportData = {
      title: 'Job Card Details',
      data: this.pdfdatas,
      headers: this.head
    }
    this.ete.exportExcel(reportData);
  }
  ngAfterViewInit() {
    if (this.myPlatform == 'desktop') {
      this.myGrid.showloadelement();
    }
    this.getDatas();
  }
  getDatas() {
var url= serverUrl.fmsUrl +'/jobcard/getFmsJobCardAll?companyid='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res => {
  var detail = res;
  this.tableData = res
  this.pdfdatas = [];
  for (var i = 0; i < detail.length; i++) {
    this.pdfdatas.push([detail[i].vin,detail[i].clientname, detail[i].clientemail, detail[i].servicepersonname,detail[i].servicepersonphoneno,detail[i].labourcost,detail[i].totalcost]);
  }
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
      { text: 'Plate Number', datafield: 'vin', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Terms Of Service', datafield: 'termsofservice', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Customer Name', datafield: 'clientname', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Customer MailId', datafield: 'clientemail', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Work Location', datafield: 'worklocation', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Service PersonName', datafield: 'servicepersonname', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Service Person PhoneNo', datafield: 'servicepersonphoneno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Remarks', datafield: 'remarks', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Job Receiver', datafield: 'jobreceivedby', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Job Date&Time', datafield: 'jobdatetime', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Expected StartDate', datafield: 'expectedstartdatetime', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Expected EndDate', datafield: 'expectedenddatetime', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Labour Cost', datafield: 'labourcost', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Total Cost', datafield: 'totalcost', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Job Completedby', datafield: 'jobcompletedby', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    ]
  })
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  async openModel()
  {
    const modal = await this.modalController.create({
      component:JobCardFormComponent,
      cssClass: 'jobcardform',
    });
    modal.onDidDismiss().then(() => {
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }
this.getDatas();
    })
    return await modal.present();
  }
  async editModel()
  {
      if (this.selectedRow) {
        const modal = await this.modalController.create({
          component:JobCardFormComponent,
          cssClass: 'jobcardform',
          componentProps: {
            // mode: 'edit',
            value: this.selectedRow
          }
        });
        modal.onDidDismiss().then(() => {
          this.myGrid.clearselection();
          this.selectedRow = "";
          this.getDatas();
        })

        return await modal.present();
      }
      else {
        this.commonService.presentToast('Please select a row to edit');
        return "";
      }
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.getDatas();
  }


}
