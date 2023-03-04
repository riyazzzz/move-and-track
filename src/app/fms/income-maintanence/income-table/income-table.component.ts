import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { Platform } from '@ionic/angular';
import { IncomeFormComponent } from '../../../fms/income-maintanence/income-form/income-form.component'
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.scss'],
})
export class IncomeTableComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
 
  tableData:any;
  pdfdatas: any;
  head = ['Vehicle No', 'Trip Name', 'Cost','Income', 'Date', 'Description'];
  exportTitle:'Income Report';
  constructor(
    public platform: Platform,
    private modalController: ModalController,private alertController:AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private ete: ExportExcelService,
  ) { }

  createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, "Income Report", this.myPlatform, "Income Report")
  }
  
  exportToExcel() {
    let reportData = {
      title: 'Income Report',
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
    if (this.myPlatform == 'desktop') {
      const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }
    }
var url= serverUrl.fmsUrl +'/incomeexpense/getFmsIncomeAll?companyid='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res => {
  var detail = res;
  this.tableData = res
  this.pdfdatas = [];
  for (var i = 0; i < detail.length; i++) {
    this.pdfdatas.push([detail[i].vin,detail[i].tripname, detail[i].cost, detail[i].incomeandexpense,detail[i].transactiondt, detail[i].description]);
  }
    this.renderer = (row: number, column: any, value: string,) => {
      if (value == "" || null || undefined || value == ",") {
        return "---"
      }
      else {
        return '<span style="padding:0px 0px 0px 3px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
      }
    }

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      { text: 'Vehicle No', datafield: 'vin', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
      { text: 'Trip Name', datafield: 'tripname', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
      { text: 'Income', datafield: 'incomeandexpense', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'Cost', datafield: 'cost', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
      { text: 'Date', datafield: 'transactiondt', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'Description', datafield: 'description', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
    ]
  })
  }
  
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  async openModel()
  {
    const modal = await this.modalController.create({
      component:IncomeFormComponent,
      cssClass: 'expenseform',
      // componentProps: {
      //   mode: 'add',
      // }
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
          component:IncomeFormComponent,
          cssClass: 'expenseform',
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
  async deleteModel()
  {
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: ' delete',
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
          handler: data =>{
            const url = serverUrl.web + '/incomeexpense/deleteIncome?companyid='+localStorage.getItem('corpId')+'&id='+this.selectedRow.id+'&deletedby='+localStorage.getItem('userName');
            this.ajaxService.ajaxDeleteWithBody(url,this.selectedRow.id).subscribe(res => {  
              if (res.statusText == "OK") {
                this.commonService.presentToast("Deleted successfully")
                this.myGrid.clearselection();
                this.getDatas();
                }
                else {
                      this.commonService.presentToast("Please contact support Team")
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

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.getDatas();
  }

}
