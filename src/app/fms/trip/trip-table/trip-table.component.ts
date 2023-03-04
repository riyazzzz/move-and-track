import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { Platform } from '@ionic/angular';
import { TripFormComponent } from '../trip-form/trip-form.component'
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';

@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.scss'],
})
export class TripTableComponent implements OnInit {

  @Input() value;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  selectedRow: any;
  myPlatform: any;
  tableData:any;
  pdfdatas: any;
  head = ['Vehicle No', 'Start Time', 'Start Location', 'Trip Name', 'End Time','End Location','Travel Distance','Time Duration','Cost','Status'];
  exportTitle:'Trip Details';
  constructor(
    public platform: Platform,
    private modalController: ModalController,private alertController:AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private ete: ExportExcelService,
  ) { }
  createPdf() {
    this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle,this.myPlatform, 'Trip Details');
  }
  
  exportToExcel() {
    let reportData = {
      title: 'Trip Details',
      data: this.pdfdatas,
      headers: this.head
    }
    this.ete.exportExcel(reportData);
  }
  getDatas() {
 const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
 }

  var url= serverUrl.fmsUrl +'/trip/getFmsTripAll?companyid='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res => {
  var detail = res;
  this.tableData = res
  this.pdfdatas = [];
  for (var i = 0; i < detail.length; i++) {
    this.pdfdatas.push([detail[i].vin, detail[i].startdate,detail[i].startlocation, detail[i].tripname, detail[i].enddate,detail[i].endlocation,detail[i].distance, detail[i].duration, detail[i].cost,detail[i].status]);
  }
    this.renderer = (row: number, column: any, value: string,) => {
      if (value == "" || null || undefined || value == "," || value == " ") {
        return "---"
      }
      else {
        return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
      }
      
    }

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      { text: 'Vehicle  No', datafield: 'vin', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
      { text: 'Trip Name', datafield: 'tripname', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'Start Time', datafield: 'startdate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'End   Time', datafield: 'enddate', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
      { text: 'Start Location', datafield: 'startlocation', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'End Location', datafield: 'endlocation', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'Travel Distance', datafield: 'distance', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
      { text: 'Time Duration', datafield: 'duration', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
      { text: 'Cost', datafield: 'cost', cellsrenderer: function (row, column, value) {
        if(value.includes("+"))
        return "<span style='line-height:32px;font-size:11px;color:green;margin:auto;'>" + value + "</span>";
        else
        return "<span style='line-height:32px;font-size:11px;color:red;margin:auto;'>" + value + "</span>";
      },cellsalign: 'center', align: 'center'},
      { text: 'Status', datafield: 'status', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center'},
    ]
  })
  }
  
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  async openModel(){
    const modal = await this.modalController.create({
      component:TripFormComponent,
      cssClass: 'tripform'
    });
    modal.onDidDismiss().then(() => {
     this.myGrid.clearselection();
      this.getDatas();
    })
    return await modal.present();
  }
  async editModel()
  {

      if (this.selectedRow) {
        const modal = await this.modalController.create({
          component:TripFormComponent,
          cssClass: 'tripform',
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
            const url = serverUrl.web + '/trip/deleteFmsTrip?companyid='+localStorage.getItem('corpId')+'&id='+this.selectedRow.id+'&deletedby='+localStorage.getItem('userName');
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
