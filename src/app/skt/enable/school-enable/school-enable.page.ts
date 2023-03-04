import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { SktService } from 'src/app/services/skt.service';
import { ParentAdditionalComponent } from '../../parent/parent-additional/parent-additional.component';
import { EnableAdditionalComponent } from '../enable-additional/enable-additional.component';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';

@Component({
  selector: 'app-school-enable',
  templateUrl: './school-enable.page.html',
  styleUrls: ['./school-enable.page.scss'],
})
export class SchoolEnablePage implements OnInit {
  head = ['From Date','To Date','Type','Reason'];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="School E&D report";
  companyDetail: { branchID: string; companyID: string; userId: string; };
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  selectedRow: any;
  obj: string;
  
  renderer: (row: number, column: any, value: string) => string;
  dataAdapter: any;
  columns: any;
  source: any;
  details: any;
  constructor(
    private modalController: ModalController,
    private ete: ExportExcelService,
    public platform: Platform,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private alertController: AlertController
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
        '<title>Parent Details</title>\n' +
        '</head>\n' +
        '<body>\n' + gridContent + '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
  };

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;

  }
  async add() {
    const modal = await this.modalController.create({
      component: EnableAdditionalComponent,
      cssClass: 'school-enable'
    });
    modal.onDidDismiss().then(() => {
      this.getData();
    })
    return await modal.present();
  }

  
  async editMode(data) {
    if (this.myPlatform != 'desktop') {
      data["submit"] = "available";
      if (data) {
        const modal = await this.modalController.create({
          component: EnableAdditionalComponent,
          cssClass: 'school-enable',
          componentProps: {
            value: data,
          }
        });
        modal.onDidDismiss().then(() => {
          data = "";
          this.getData();
        })
        return await modal.present();
      }
    }
    else {
      if (this.selectedRow) {
        this.selectedRow["submit"] = "available";
        const modal = await this.modalController.create({
          component: EnableAdditionalComponent,
          cssClass: 'school-enable',
          componentProps: {
            value: this.selectedRow
          }
        });
        modal.onDidDismiss().then(() => {
          this.getData();
          this.myGrid.clearselection();
          this.selectedRow = "";
          
        })
        return await modal.present();
      }
      else {
        this.commonService.presentToast('Please select a row to edit');
        return "";
      }
    }
  }
  async deleteMode() {
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
            var details = {
              "companyId":localStorage.getItem('corpId'),
              "branchId":localStorage.getItem('corpId'),
            };
            const url = serverUrl.web + '/schoolEnableDisable/deleteschooldisabledate?id=' + this.selectedRow.id;
            this.ajaxService.ajaxDeleteWithBody(url, details).subscribe(res => {
              if (res.statusText == "OK") {
                this.commonService.presentToast("Deleted successfully")
                this.myGrid.clearselection();
                this.getData();
                this.selectedRow ="";
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
      return "";
    }
  }
 
  createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'School E&D report');
  }

  exportToExcel() {
    let reportData = {
      title: 'School E&D report',
      data: this.pdfdatas,
      headers: this.head
    }
    this.ete.exportExcel(reportData);
  }
  getData() {
    var url = serverUrl.web + '/schoolEnableDisable/getschooldisabledate';
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.details = res;
      var detail = res;
      this.pdfdatas=[];
      for (var i = 0; i < detail.length; i++) {
        this.pdfdatas.push([ detail[i].fromDate, detail[i].toDate, detail[i].type, detail[i].reason]);
      }
      this.source = { localdata: this.details, datatype: 'array' }

      this.renderer = (row: number, column: any, value: string,) => {
        if (value == "" || null || undefined) {
          return "----";
        }
        else {
          return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto"  >' + value + '</span>';
        }
      }


      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns =
        [
          // { text: 'Id', datafield: 'id', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
          { text: 'From Date', datafield: 'fromDate', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
          { text: 'To Date', datafield: 'toDate', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
          { text: 'Type', datafield: 'type', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
          { text: 'Reason', datafield: 'reason', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },

        ];

    })
   
  }
  ngAfterViewInit() {
    this.getData();
    if (this.myPlatform == 'desktop') {
      this.myPlatform = 'desktop';
      this.myGrid.updatebounddata();
    }

  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0]
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    this.getData();
  }
}
