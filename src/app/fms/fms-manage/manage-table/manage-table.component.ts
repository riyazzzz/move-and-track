import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ExportExcelService } from '../../../services/export-excel.service';
import { ModalController } from '@ionic/angular';
import { AddManageFormComponent } from '../add-manage-form/add-manage-form.component';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { app, serverUrl } from '../../../../environments/environment';
import { Platform, AlertController } from '@ionic/angular';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.scss'],
})
export class ManageTableComponent implements OnInit {

  titles = 'jspdf-autotable-demo';
  title = 'angular-export-to-excel'
  dataForExcel = [];
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  objValues = [];
  odj = [];
  columns:any;
  selectedRow: any;
  editrow: number;
  tableData: any;
  getAdapter: any;
  datas = [];
  selectedRowIdx: any;
  pdfdatas = [];
  myPlatform: any;
  _showPdf='allPlatforms';
  isDeleteShow: any = false;
  count: any = 15;
  constructor(
    private modalController: ModalController,
    private fileOpener: FileOpener,
    private ete: ExportExcelService,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    public platform: Platform,
    private alertController: AlertController,
  ) { }

  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  head = ['Vehicle Number', 'Vehicle Odometer', 'Vehicle Type'];
  exportTitle = [];
  excelTitle = {};
  newTitle = [];
  column = [];
  details: any;
  detail: any;
  newDetail: any;
  //;

  exportToExcel() {
    let reportData = {
      title: 'Manage Report',
      data: this.pdfdatas,
      headers: this.head
    }
    this.ete.exportExcel(reportData);
    //console.log("Export Excel")
  }

  async createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, "Manage Report", this.myPlatform, "Manage Report")
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
      //console.log(id)
    }
  }
  async deleteMode() {

    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        backdropDismiss: false,
        message: "You want to delete!",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {



          }
        },
        {
          text: 'Ok',
          handler: data => {

            const deleteData = {
              "companyID": localStorage.getItem('corpId'),
              "branchID": localStorage.getItem('corpId'),
              "emailId": localStorage.getItem('userName'),
              "vin": this.selectedRow.vin,
              "plateNo": this.selectedRow.plateNo,
              "imeiNo": this.selectedRow.imeiNo,
              "operatorId": this.selectedRow.operator,
              "effFrom": "AM"
            }

            const url = serverUrl.web + '/site/delete/vehicle';
            this.ajaxService.ajaxDeleteWithBody(url, deleteData).subscribe(res => {
              //console.log(res);
              if (res.error.text == "Operator is already Associated") {
                this.commonService.presentToast("Associated operator cannot be deleted")
                this.getDatas();
              } else if (res.error.text == "persisted" || res.statusText == "OK") {
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
      this.commonService.presentToast('Please select a row to Delete');
      return "";

    }

  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;

    this.selectedRowIdx = event.args.rowindex;

  }
  async openModel() {
    const modal = await this.modalController.create({
      component: AddManageFormComponent,
      cssClass: 'custome_fleet'
    });
    modal.onDidDismiss().then(() => {
      if (this.myGrid)
        this.myGrid.clearselection();
      this.selectedRow = "";
      this.getDatas();
    })
    return await modal.present();


  }

  async editMode(selectedCard) {
    if (this.myPlatform != 'desktop') {
      //console.log(selectedCard);
      if (selectedCard) {
        selectedCard["submit"] = "available";
        const modal = await this.modalController.create({
          component: AddManageFormComponent,
          cssClass: 'custome_fleet',
          componentProps: {
            value: selectedCard
          }
        });
        modal.onDidDismiss().then(() => {
          this.getDatas();
        })
        return await modal.present();
      }
    } else {
      if (this.selectedRow) {
        this.selectedRow["submit"] = "available";
        const modal = await this.modalController.create({
          component: AddManageFormComponent,
          cssClass: 'custome_fleet',
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
  loadMoreData = (event) => {
    setTimeout(() => {
      console.log("hit successfull!");
      this.count += 10;
      event.target.complete();
      
      if (this.count > this.detail.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
  ngAfterViewInit() {
    if (this.myPlatform == 'desktop') {
      this.myGrid.showloadelement();
    }
    this.getDatas();
  }
  ionViewWillEnter() {
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
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
    // this.getDatas();
    this.tableData = JSON.parse(localStorage.getItem('gridDataa'))
    // this.tableData.updatebounddata();
    this.renderer = (row: number, column: any, value: string,) => {
      if (value == "" || null || undefined) {
        return "----No Data----"
      }
      else {
        return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
      }
    }
    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      { text: 'Plate No', datafield: 'plateNo', cellsrenderer: this.renderer },
      // {text :'Operator',datafield:'operatorName',cellsrenderer:this.renderer},
      { text: 'Imei Number', datafield: 'imeiNo', cellsrenderer: this.renderer },
      // {text :'Serial No',datafield:'serialNo',cellsrenderer:this.renderer},
      { text: 'Icon', datafield: 'iconUrl', cellsrenderer: this.renderer },
      { text: 'Odometer', datafield: 'odometer', cellsrenderer: this.renderer },
      { text: 'Model', datafield: 'model', cellsrenderer: this.renderer },
      { text: 'Make', datafield: 'make', cellsrenderer: this.renderer },
    ]

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
      // var data = JSON.stringify(
      //   { "Data": [{ "Name": "vehicleDisplay", "Where": "v.companyId='" + companyDetail.companyID + "' AND v.branchId='" + companyDetail.branchID + "' AND vhu.userId='" + companyDetail.userId + "' AND v.status IS NULL AND ( v.iconUrl NOT IN ('Supervisor','Workshop') OR v.iconUrl IS NULL ) GROUP BY v.vin", "SubQuery": "y", "Header": { "Action": "gridViewChart", "Entity": "FixMe!" } }] });
      //  var url=serverUrl.web + '/api/dcgrid/javascript';
      //   this.ajaxService.ajaxPostWithBody(url, data).subscribe(res =>{
      //   var details=JSON.parse(res.datavalues);
      //   for(var i=0 ;i<details.length;i++){
      //   this.datas.push([details[i]["Plate Number"],details[i]["IMEI Number"],details[i].Type,details[i].Odometer,details[i].Make]);
      // }

      //  //console.log( this.datas);
      // //console.log(res);
      //   })

      var url2 = serverUrl.web + '/global/assetsinfo?companyId=' + companyDetail.companyID + '&userId=' + companyDetail.userId;

      this.ajaxService.ajaxGet(url2).subscribe(res => {
        //console.log(res);
        var detail = res;
        this.tableData = res
        this.pdfdatas=[];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].plateNo,detail[i].odometer,detail[i].iconUrl]);
        }
        this.renderer = (row: number, column: any, value: string,) => {
          if (value == "" || null || undefined) {
            return "----No Data----"
          }
          else {
            return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
          }
        }
        this.source = { localdata: this.tableData };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          { text: 'Vehicle Number', datafield: 'plateNo', cellsrenderer: this.renderer ,cellsalign: 'center', align: 'center'},
          { text: 'Vehicle Odometer', datafield: 'odometer', cellsrenderer: this.renderer,cellsalign: 'center', align: 'center'},
          { text: 'Vehicle Type', datafield: 'iconUrl', cellsrenderer: this.renderer ,cellsalign: 'center', align: 'center'},
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
      var data = JSON.stringify(
        { "Data": [{ "Name": "vehicleDisplay", "Where": "v.companyId='" + companyDetail.companyID + "' AND v.branchId='" + companyDetail.branchID + "' AND vhu.userId='" + companyDetail.userId + "' AND v.status IS NULL AND ( v.iconUrl NOT IN ('Supervisor','Workshop') OR v.iconUrl IS NULL ) GROUP BY v.vin", "SubQuery": "y", "Header": { "Action": "gridViewChart", "Entity": "FixMe!" } }] });
      // var url = serverUrl.web + '/api/dcgrid/javascript';
      // this.ajaxService.ajaxPostWithBody(url, data).subscribe(res => {
      //   this.details = JSON.parse(res.datavalues);
      //   //console.log(this.details);
      // })
      var url2 = serverUrl.web + '/global/assetsinfo?companyId=' + companyDetail.companyID + '&userId=' + companyDetail.userId;
      this.ajaxService.ajaxGet(url2).subscribe(res => {
        //console.log(res);
        var detail = res;
        this.detail = res;
        this.pdfdatas = [];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].plateNo, detail[i].iconUrl, detail[i].odometer, detail[i].model, detail[i].make]);
        }
        this.newDetail = this.detail.map(item => {
          return Object.keys(item).map(key => {
            if (!item[key]) {
              item[key] = "-NA-"
              return item
            }
          })
        })
      })
    }

  }
}
