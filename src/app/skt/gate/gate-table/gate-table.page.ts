import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { SktService } from 'src/app/services/skt.service';
import { GateAdditionalComponent } from '../gate-additional/gate-additional.component';
  import {serverUrl} from 'src/environments/environment';
  import {AjaxService} from 'src/app/services/ajax.service';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';

@Component({
  selector: 'app-gate-table',
  templateUrl: './gate-table.page.html',
  styleUrls: ['./gate-table.page.scss'],
})
export class GateTablePage implements OnInit {
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  selectedRow: any;
  dataAdapter: any;
  columns: { text: string; datafield: string; cellsrenderer: any; cellsalign: string; align: string; }[];
  renderer: (row: number, column: any, value: string) => string;
  source: any;
  head = ['Gate Name', 'Location', 'Description','Device IMEI'];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="Gate-details report";
  constructor(
    private alertController: AlertController,
    private commonService:CommonService,
    private modalController: ModalController,
    private ajaxService:AjaxService,
    public platform: Platform,
    private ete: ExportExcelService
   
    ) { }

    
  

  async deletebtn(){
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
    let selectedrowindex = this.myGrid.getselectedrowindex();
     let gateId = this.myGrid.getrows()[selectedrowindex]["gateid"]
     const url=serverUrl.web + '/gate/deleteGate?gateid='+ gateId;
    
      this.ajaxService.ajaxDeleteWithString(url).subscribe(res=>{
      
        if(res.statusText == "OK"){
          this.commonService.presentToast('Deleted Successfully')
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



async openparentDetailModel() {
    const modal = await this.modalController.create({
      component:GateAdditionalComponent,
       cssClass: 'gate_Details'
    });
    modal.onDidDismiss().then(() => {
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }

      this.getDatas();
    })
    return await modal.present();
}

async parentEditModel() {
  if(this.selectedRow){
  const modal = await this.modalController.create({
    component:GateAdditionalComponent,
     cssClass: 'gate_Details',
     componentProps: {
      value: this.selectedRow
    }
  
  });
  modal.onDidDismiss().then(() => {
    if (this.myPlatform == "desktop") {
      this.myGrid.clearselection();
      this.selectedRow ="";
    }
    this.getDatas();
  })
  return await modal.present();
}
else{
  this.commonService.presentToast('Please select a row to edit');
}
}

myGridOnRowSelect(event: any): void {
  this.selectedRow = event.args.row;
 
}

ngAfterViewInit() {
  if (this.myPlatform == 'desktop') {
    this.myGrid.showloadelement();
  }
  this.getDatas();
}


createPdf() {
  this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'Gate-details report');
}

exportToExcel() {
  let reportData = {
    title: 'Gate-details report',
    data: this.pdfdatas,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
}

getDatas() {
  const url=serverUrl.web + '/gate/getGate'; 
this.ajaxService.ajaxGet(url).subscribe(res=>{
  var detail = res;
  this.pdfdatas=[];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].gateName,detail[i].location,detail[i].description,detail[i].deviceimei]);
        }


  this.renderer = (row:number,column: any, value:string,)=>{
   
     if(value == "" || null || undefined ){
       return "----" ;
     }
     else{
       return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto"  >' + value + '</span>';
        
       }
   }

   this.source=
   {
       localdata: res,
      
   }
this.dataAdapter = new jqx.dataAdapter(this.source);
this.columns =  
[  
// { text: 'Gate Id',  datafield: 'gateid',cellsrenderer:this.renderer , cellsalign: 'center', align: 'center'},
{ text: 'Gate Name',datafield:'gateName',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
{ text: 'Location', datafield: 'location',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
{ text: 'Description', datafield: 'description',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
{ text: 'Device IMEI', datafield: 'deviceimei',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
];
})
 
this.myGrid.updatebounddata();
this.myGrid.unselectrow;
}

  ngOnInit() {
  this.myPlatform = this.platform.platforms()[0];
  if (this.myPlatform == 'tablet') {
    this.myPlatform = 'desktop';
  }
  }


}
