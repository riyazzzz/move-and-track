import { Component, OnInit, ViewChild } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { SktService } from 'src/app/services/skt.service';
import { serverUrl } from 'src/environments/environment';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { BroadcastAdditionalComponent } from '../broadcast-additional/broadcast-additional.component';


SktService
@Component({
  selector: 'app-broadcast-sms',
  templateUrl: './broadcast-sms.page.html',
  styleUrls: ['./broadcast-sms.page.scss'],
})
export class BroadcastSmsPage implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  renderer: (row: number, column: any, value: string) => string;
  dataAdapter: any;
  source: any;
  broadcastLogin: FormGroup;
  selectedRow: any;
  columns: { text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string; }[];
  companyDetail: { branchID: string; companyID: string; userId: string; };
  broadOdj;
  pdfdata: any = [];
  head: any = ['Category','From Mobile','To Mobile','Message','Event Time','Server Time'];
  myPlatform: any;
  
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private ajaxService:AjaxService,
    private ete:ExportExcelService,
    private commonService:CommonService,
    private platform:Platform
    ) { }
  
 
  btnOnClick() {
    let gridContent = this.myGrid.exportdata('html');
    let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
            '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '<meta charset="utf-8" />\n' +
            '<title>Broad cast sms report</title>\n' +
            '</head>\n' +
            '<body>\n' + gridContent + '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
};

createPdf() {
  this.commonService.createPdf(this.head, this.pdfdata, "Broadcast Sms Report", this.myPlatform, "Broadcast Sms Report")
  
}
  
exportToExcel() {
  let reportData = {
    title: 'Broadcast Sms Report',
    data: this.pdfdata,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
}
 
  async broadCast(){
  const modal = await this.modalController.create({
      component: BroadcastAdditionalComponent,
      cssClass:'broadcast-css'
    });
    modal.onDidDismiss().then(()=> {
      this.myGrid.clearselection();
      this.getDatas();

    })
    return await modal.present();
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
   
  }
  ngAfterViewInit() {
   
    this.getDatas();
  }
  getDatas() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    var url = serverUrl.web + `/report/getbrodcastSms?companyId=${this.companyDetail.companyID}&branchId=${this.companyDetail.branchID}`;
    this.ajaxService.ajaxGet(url).subscribe(res => {
       this.broadOdj = res;
       for (var i = 0; i < this.broadOdj.length; i++) {
        this.pdfdata.push([this.broadOdj[i].category, this.broadOdj[i].fromMobile,this.broadOdj[i].toMobile, this.broadOdj[i].msg,this.broadOdj[i].eventTimeStamp,this.broadOdj[i].serverTimeStamp])
      }
    this.renderer = (row: number, column: any, value: string,) => {
       if (value == "" || null || undefined || value == ",") {
          return "---"
          }
        else {
           return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
          }
      }
     
        this.source = { localdata: this.broadOdj };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
        { text: 'Category', datafield: 'category', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        { text: 'From Mobile', datafield: 'fromMobile', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        { text: 'To Mobile', datafield: 'toMobile', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        { text: 'Message', datafield: 'msg', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        { text: 'Event Time', datafield: 'eventTimeStamp', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center'},
        { text: 'Server Time', datafield: 'serverTimeStamp', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
        ]
        
        this.myGrid.updatebounddata();
        this.myGrid.unselectrow;
      })
    }
    refresh(){
      this.getDatas();
      this.commonService.presentToast("Data refreshed successfully.")
    }
  ngOnInit() {
    
     this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    
    this.getDatas();
    
   }
  }

