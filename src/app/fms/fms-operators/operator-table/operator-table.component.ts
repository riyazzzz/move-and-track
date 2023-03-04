import { Component, OnInit, ViewChild } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { serverUrl } from 'src/environments/environment';
import { OperatorFormComponent } from '../operator-form/operator-form.component';

@Component({
  selector: 'app-operator-table',
  templateUrl: './operator-table.component.html',
  styleUrls: ['./operator-table.component.scss'],
})
export class OperatorTableComponent implements OnInit {
  app: any = { logo: 'logo.png' };
  isDeleteShow = false
  myPlatform: any;
  _showPdf='allPlatforms';
  @ViewChild(OperatorFormComponent, { static: false }) operatorformComponent: OperatorFormComponent;
  titles = 'jspdf-autotable-demo';
  title = 'angular-export-to-excel'
  dataForExcel = [];
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  objValues = [];
  odj = [];
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  selectedRow: any;
  editrow: number;
  tableData: any;
  getAdapter: any;
  datas = [];
  selectedRowIdx: any;
  pdfdatas = [];
  companyDetail: { branchID: string; companyID: string; userId: string; };
  detail: any;
  newDetail: any;

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

  head = ['Operator Name', 'Contact', 'Address Line', 'City', 'Plate No', 'Country', 'Email Address', 'Emergency ContactNo', 'Licence', 'Licence Expiry Date'];
  exportTitle = [];
  excelTitle = {};
  newTitle = [];
  column = [];

  //;

  exportToExcel() {
    let reportData = {
      title: 'Operator Report',
      data: this.pdfdatas,
      headers: this.head
    }
    this.ete.exportExcel(reportData);
    console.log("Export Excel")
  }

  async createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, "Operator Report");
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
    const deleteData = { "tagID": this.selectedRow.operatorID, "compnyID": this.companyDetail.companyID, "branchID": this.companyDetail.branchID, "companyNme": this.companyDetail.userId }
    const url = serverUrl.web + '/operator/deleteOperatorInfo?operatorID=' + this.selectedRow.operatorID;
    this.ajaxService.ajaxDeleteWithBody(url, deleteData).subscribe(res => {
      console.log(res);
      if (res.error.text == "Operator is already Associated") {
        this.commonService.presentToast("Associated operator cannot be deleted")
        this.getDatas();
      } else if (res.statusText == "OK") {
        this.commonService.presentToast("Deleted successfully")
        this.myGrid.clearselection();
        this.getDatas();
      }

    })
  }
  async deleteMode() {

    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: 'delete ',
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
            const deleteData = { "tagID": this.selectedRow.operatorID, "compnyID": this.companyDetail.companyID, "branchID": this.companyDetail.branchID, "companyNme": this.companyDetail.userId }
            const url = serverUrl.web + '/operator/deleteOperatorInfo?operatorID=' + this.selectedRow.operatorID;
            this.ajaxService.ajaxDeleteWithString(url).subscribe(res => {
              console.log(res);
              if (res.error.text == "Operator is already Associated") {
                this.commonService.presentToast("Associated operator cannot be deleted")
                this.getDatas();
              } else if (res.statusText == "success") {
                this.commonService.presentToast("Deleted successfully")
                this.myGrid.clearselection();
                this.getDatas();
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
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
    //  event.isTrigger = false
    this.selectedRowIdx = event.args.rowindex;

  }
  async openModel() {
    const modal = await this.modalController.create({
      component: OperatorFormComponent,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then(() => {
      // this.myGrid.clearselection();
      this.selectedRow = "";
      this.getDatas();

    })
    return await modal.present();
  }

  async editMode(selectCard) {
    if (this.myPlatform != "desktop") {
      if (selectCard) {
        selectCard["submit"] = "available";
        const modal = await this.modalController.create({
          component: OperatorFormComponent,
          cssClass: 'custom-modal',
          componentProps: {
            value: selectCard,
          }
        });
        modal.onDidDismiss().then(() => {
          selectCard = "";
          this.getDatas();
        })

        return await modal.present();
      }
    } else {


      if (this.selectedRow) {
        this.selectedRow["submit"] = "available";
        const modal = await this.modalController.create({
          component: OperatorFormComponent,
          cssClass: 'custom-modal',
          componentProps: {
            value: this.selectedRow,
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
  ngAfterViewInit() {
    if (this.myPlatform == 'desktop') {
      this.myGrid.showloadelement();
    }
    this.getDatas();
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this._showPdf = localStorage.getItem('device')
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")

  }

  getDatas() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    if (this.myPlatform == 'desktop') {
      const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }

      var datas = { "companyId": companyDetail.companyID, "branchId": companyDetail.branchID, "companyName": companyDetail.userId + '' }
      var url2 = serverUrl.web + '/operator/operatorinfo?companyId=' + companyDetail.companyID + '&branchId=' + companyDetail.branchID;
      this.ajaxService.ajaxPostMethodWithoutData(url2).subscribe(res => {
        console.log(res);
        var detail = JSON.parse(res)
        this.tableData = JSON.parse(res);
        this.pdfdatas = [];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].name, detail[i].telNo, detail[i].address, detail[i].address2, detail[i].plateNo, detail[i].nationality, detail[i].eMailAddress, detail[i].emergencyContactNo, detail[i].licenseNo, detail[i].licenseExpiry]);
        }
        this.renderer = (row: number, column: any, value: string,) => {
          if (value == "" || null || undefined) {
            return "----"
          }
          else {
            return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
          }
        }
        this.source = { localdata: this.tableData };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          { text: 'Operator Name', datafield: 'name', cellsrenderer: this.renderer },
          // {text :'Operator',datafield:'operatorName',cellsrenderer:this.renderer},
          { text: 'Contact', datafield: 'telNo', cellsrenderer: this.renderer },
          // {text :'Serial No',datafield:'serialNo',cellsrenderer:this.renderer},
          { text: 'Address Line', datafield: 'address', cellsrenderer: this.renderer },
          { text: 'City', datafield: 'address2', cellsrenderer: this.renderer },
          { text: 'Email Address', datafield: 'eMailAddress', cellsrenderer: this.renderer },
          // { text: 'Plate No', datafield: 'plateNo', cellsrenderer: this.renderer },
          { text: 'Country', datafield: 'nationality', cellsrenderer: this.renderer },
          // { text: 'Email Address', datafield: 'emailAddress', cellsrenderer: this.renderer },
          { text: 'Emergency Contact No', datafield: 'emergencyContactNo', cellsrenderer: this.renderer },
          { text: 'Licence', datafield: 'licenseNo', cellsrenderer: this.renderer },
          { text: 'Licence Expiry Date', datafield: 'licenseExpiry', cellsrenderer: this.renderer },
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

      var datas = { "companyId": companyDetail.companyID, "branchId": companyDetail.branchID, "companyName": companyDetail.userId + '' }
      var url2 = serverUrl.web + '/operator/operatorinfo?companyId=' + companyDetail.companyID + '&branchId=' + companyDetail.branchID;
      this.ajaxService.ajaxPostMethodWithoutData(url2).subscribe(res => {
        console.log(res);
        var detail = JSON.parse(res);
        this.detail = JSON.parse(res);
        this.pdfdatas = [];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].name, detail[i].telNo, detail[i].address, detail[i].address2, detail[i].plateNo, detail[i].nationality, detail[i].eMailAddress, detail[i].emergencyContactNo, detail[i].licenseNo, detail[i].licenseExpiry]);
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
    this.app["logo"] = localStorage.companyLogo;

  }

}
