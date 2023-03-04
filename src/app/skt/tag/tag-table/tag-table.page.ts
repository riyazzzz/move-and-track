import { Component, OnInit,ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'
import { ModalController, AlertController } from '@ionic/angular';
import { TagAdditionalComponent } from '../tag-additional/tag-additional.component';
import {serverUrl} from 'src/environments/environment';
import {AjaxService} from 'src/app/services/ajax.service';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';



@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.page.html',
  styleUrls: ['./tag-table.page.scss'],
})
export class TagTablePage implements OnInit {
  head = ['Tag Id', 'tagType'];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="Tag-details report";
  selectedRow: any;
  dataAdapter: any;
  columns: { text: string; datafield: string; cellsrenderer: any; cellsalign: string; align: string; }[];
  renderer: (row: number, column: any, value: string) => string;
  source: any;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  refreshData: string;
  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private ajaxService:AjaxService,
    public platform: Platform,
    private commonService:CommonService,
    private ete: ExportExcelService
    ) { }

    refresher(){
      this.commonService.presentToast("please wait")
      this.refreshData="refresh";
      this.getDatas();
     
    }
 
  


  
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
       const url=serverUrl.web + '/tag/deletetag?tagId='+this.selectedRow.tagId;
      
        this.ajaxService.ajaxDeleteWithString(url).subscribe(res=>{
         if(res.message == "Deleted Successfully"){
            this.commonService.presentToast("Tag Details Deleted successfully")
            this.modalController.dismiss();
            this.myGrid.clearselection();
            this.getDatas();
            this.selectedRow="";  
             }
             else
             {
               this.commonService.presentToast('Please Contact Support Team');
             }
        })
      }
    }]
  });
  await alert.present();

}
else {
  this.commonService.presentToast('Please select a row to delete');

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
      component:TagAdditionalComponent,
       cssClass: 'my-custome-css'
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
    component:TagAdditionalComponent ,
     cssClass: 'my-custome-css',
     componentProps: {
      value: this.selectedRow
    }
  
  });
  modal.onDidDismiss().then(() => {
    if (this.myPlatform == "desktop") {
      this.myGrid.clearselection();
      this.selectedRow = "";
    }

    this.getDatas();
  })
  return await modal.present();
}
else{
  this.commonService.presentToast('Please select a row to edit');
  return "";
}
}

myGridOnRowSelect(event: any): void {
  this.selectedRow = event.args.row;
}
createPdf() {
  this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'Tag-details report');
}

exportToExcel() {
  let reportData = {
    title: 'Tag-details report',
    data: this.pdfdatas,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
}

getDatas() {
  const url=serverUrl.web + '/tag/getTag?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res=>{
  var detail = res;
  this.pdfdatas=[];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].tagId, detail[i].tagType]);
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
this.columns =  [
{ text: 'Tag Id',  datafield: 'tagId',cellsrenderer:this.renderer , cellsalign: 'center', align: 'center'},
{ text: 'Tag Type',datafield:'tagType',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},]
})
 
this.myGrid.updatebounddata();
this.myGrid.unselectrow;
// if(this.refreshData == "refresh"){
//   this.commonService.presentToast("refreshed Successfully");
//   this.refreshData=''
// }

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
  }

 
}
