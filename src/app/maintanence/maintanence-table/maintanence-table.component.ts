import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ExportExcelService } from '../../services/export-excel.service';
import { ModalController, AlertController } from '@ionic/angular';

import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from '../../../environments/environment';
import { Platform } from '@ionic/angular';
import { MaintanenceFormComponent } from '../maintanence-form/maintanence-form.component'
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
const { Filesystem, Storage } = Plugins;

export const File_Key = 'files';
@Component({
  selector: 'app-maintanence-table',
  templateUrl: './maintanence-table.component.html',
  styleUrls: ['./maintanence-table.component.scss'],
})
export class MaintanenceTableComponent implements OnInit {

  titles = 'jspdf-autotable-demo';
  title = 'angular-export-to-excel';
  dataForExcel = [];
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  objValues = [];
  odj = [];
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  selectedRow: any;
  editrow: number;
  // tableData: any;
  getAdapter: any;
  datas = [];
  selectedRowIdx: any;
  pdfdatas = [];
  myPlatform: any;
  _showPdf='allPlatforms';
  detail: any;
  newDetail: any;
  isDeleteShow: any = false;
  constructor(
    private modalController: ModalController,
    private ete: ExportExcelService,
    private fileOpener: FileOpener,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    public platform: Platform,
    private alertController: AlertController,
  ) { }

  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  head = ['Plate No', 'AlertType', 'E-Mail ID', 'Valid Till', 'Status'];
  exportTitle = [];
  excelTitle = {};
  newTitle = [];
  column = [];
  tableData = [];
  exportToExcel() {
    let reportData = {
      title: 'Maintanence',
      data: this.pdfdatas,
      headers: this.head
    }
    this.ete.exportExcel(reportData);
    console.log("Export Excel")
  }

  async createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, "Maintanence", this.myPlatform, "Maintanence")
    // const doc = new jsPDF('landscape', "px", 'a4');
    // doc.setFontSize(25);
    // //let today = new Date().toTimeString;
    // doc.text('Vehicle Details', 400, 42);
    // doc.setFontSize(10);
    // doc.addImage(imgdata, 'png', 30, 10, 150, 50);
    // doc.setTextColor(100);
    // //download Table------------->>>>>>>>>>
    // (doc as any).autoTable({
    //   head: [this.head],
    //   body: this.pdfdatas,
    //   margin: { top: 70 },
    //   tableWidth: 'auto',
    //   theme: 'grid',
    //   didDrawCell: data => {
    //     console.log(this.exportTitle, "New Title")
    //   }

    // })

    // // Open PDF document in new tab
    // // doc.output('dataurlnewwindow')

    // //Download PDF document  
    // if (this.myPlatform == 'desktop')
    //   doc.save('Operator.pdf');
    // else {
    //   let base64: any = doc.output('datauri')
    //   var date = new Date()
    //   let name = "Operator " + date.toDateString() + ".pdf"
    //   const savedFile = await Filesystem.writeFile({
    //     path: name,
    //     data: base64,
    //     directory: FilesystemDirectory.Documents,
    //     recursive: true
    //   })
    //   console.log('Saved:' + savedFile.uri)
    //   const path = savedFile.uri;
    //   const mimeType = this.getMimetype(name)

    //   this.fileOpener.open(path, mimeType)
    //     .then(() => console.log('file open'))
    //     .catch(err => console.log('Error', err))
    //   // this.commonService.downloadpdfMobile()

    //   // this.myFiles.unshift(path);

    //   // Storage.set({
    //   //   key: File_Key,
    //   //   value: JSON.stringify(this.myFiles)
    //   // })
    // }
  }

  private getMimetype(name) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf'
    } else if (name.indexOf('png') >= 0) {
      return 'image/png'
    } else if (name.indexOf('mp4') >= 0) {
      return 'video/png'
    }
  }


  deletebtn() {
    let selectedrowindex = this.myGrid.getselectedrowindex();
    let rowscount = this.myGrid.getdatainformation().rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < parseFloat(rowscount)) {
      let id = this.myGrid.getrowid(selectedrowindex);
      this.myGrid.deleterow(id);
      console.log(id)
    }
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
    //  event.isTrigger = false
    this.selectedRowIdx = event.args.rowindex;

  }
  async openModel() {
    const modal = await this.modalController.create({
      component: MaintanenceFormComponent,
    });
    modal.onDidDismiss().then(() => {
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }

      this.getDatas();
    })
    return await modal.present();
  }

  async editMode(selectedCard) {
    if (this.myPlatform != "desktop") {
      if (selectedCard) {

        const modal = await this.modalController.create({
          component: MaintanenceFormComponent,
          componentProps: {
            value: selectedCard
          }
        });
        return await modal.present();
      }

    } else {
      if (this.selectedRow) {
        //   this.selectedRow["submit"] ="available";
        const modal = await this.modalController.create({
          component: MaintanenceFormComponent,
          componentProps: {
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

  }
  async deleteMode() {
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: 'Delete',
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
            // console.log(this.selectedRow.eventId)
            const url = serverUrl.web + '/device/deletemaintenance?eventId=' + this.selectedRow.eventId;
            this.ajaxService.ajaxDeleteWithBody(url, this.selectedRow.eventId).subscribe(res => {
              //  console.log(res);

              if (res.statusText == "OK") {
                this.commonService.presentToast("Deleted successfully")
                this.myGrid.clearselection();
                this.getDatas();
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
  ngAfterViewInit() {
    if (this.myPlatform == 'desktop') {
      this.myGrid.showloadelement();
    }
    this.getDatas();
  }
  getDatas() {
    if (this.myPlatform == 'desktop') {
      const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }

      var datas = { "companyId": companyDetail.companyID, "branchId": companyDetail.userId, "eventId": "all" }
      var url2 = serverUrl.web + '/device/maintenancedata';

      this.ajaxService.ajaxPostWithBody(url2, datas).subscribe(res => {
        console.log(res);
        var detail = res;
        this.tableData = res
        this.pdfdatas = [];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].plateNo, detail[i].type, detail[i].emailId, detail[i].toDate, detail[i].state,]);
        }
        this.renderer = (row: number, column: any, value: string,) => {
          if (value == "" || null || undefined || value == ",") {
            return "---"
          }
          else {
            return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
          }
        }
        this.source = { localdata: this.tableData };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          { text: 'Plate No', datafield: 'plateNo', cellsrenderer: this.renderer },
          { text: 'Alert Type', datafield: 'type', cellsrenderer: this.renderer },
          { text: 'E-Mail ID', datafield: 'emailId', cellsrenderer: this.renderer },
          { text: 'Valid Till', datafield: 'toDate', cellsrenderer: this.renderer },
          { text: 'Status', datafield: 'state', cellsrenderer: this.renderer },
        ]
        this.myGrid.updatebounddata();
        this.myGrid.unselectrow;
      })
    } else {
      const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }

      var datas = { "companyId": companyDetail.companyID, "branchId": companyDetail.userId, "eventId": "all" }
      var url2 = serverUrl.web + '/device/maintenancedata';
      this.ajaxService.ajaxPostWithBody(url2, datas).subscribe(res => {
        console.log(res);
        var detail = res;
        this.detail = res;
        this.pdfdatas = [];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].plateNo, detail[i].type, detail[i].emailId, detail[i].toDate, detail[i].state,]);
        }
        this.newDetail = this.detail.map(item => {
          return Object.keys(item).map(key => {
            if (!item[key]) {
              item[key] = "-NA-"
              // console.log(item)
              return item
            }
          })
        })
      })
    }

  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this._showPdf = localStorage.getItem('device')
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
  }

}


