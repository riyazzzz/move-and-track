import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

import { ParentAdditionalComponent } from '../parent-additional/parent-additional.component';
import {serverUrl} from 'src/environments/environment';
import {AjaxService} from 'src/app/services/ajax.service';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';

@Component({
  selector: 'app-parent-table',
  templateUrl: './parent-table.page.html',
  styleUrls: ['./parent-table.page.scss'],
})
export class ParentTablePage implements OnInit {

  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  selectedRow: any;
  source: any;
  head = ['Parent Name', 'Address of Student', 'Email Address', 'Contact No'];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="Parent-details report";
  renderer: (row: number, column: any, value: string) => string;
  dataAdapter: any;
  columns: { text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string; }[];

  constructor(
    private modalController: ModalController,
    private ajaxService:AjaxService,
    private alertController: AlertController,
    public platform: Platform,  
    private commonService:CommonService,
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
              const url=serverUrl.web +'/parent/deleteParent?companyId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId')+'&emailAddress='+this.selectedRow.emailAddress;
                 this.ajaxService.ajaxDeleteWithString(url).subscribe(res=>{
                   if(res.message == "success"){
                    this.commonService.presentToast(" Parent Details Deleted successfully")
                    this.modalController.dismiss();
                    this.myGrid.clearselection();
                    this.getData();
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
      component:ParentAdditionalComponent,
       cssClass: 'my-parent-css'
    });
    modal.onDidDismiss().then(() => {
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }

      this.getData();
    })
    return await modal.present();
    
}
async parentEditModel() {
  if(this.selectedRow){
  const modal = await this.modalController.create({
    component:ParentAdditionalComponent,
     cssClass: 'my-parent-css',
     componentProps: {
      value: this.selectedRow
    }
  
  });
  modal.onDidDismiss().then(() => {
    if (this.myPlatform == "desktop") {
      this.myGrid.clearselection();
      this.selectedRow = "";
    }

    this.getData();
  })
  return await modal.present();
}
else{
  this.commonService.presentToast('Please select a row to edit');
  return ""
}
}

myGridOnRowSelect(event: any): void {
  this.selectedRow = event.args.row;
 
}
createPdf() {
  this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'Parent-details report');
}

exportToExcel() {
  let reportData = {
    title: 'Parent-details report',
    data: this.pdfdatas,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
}

getData() {
 
  const data = {"emailId":"","value":"search","companyId":localStorage.getItem('corpId')};
  const url=serverUrl.web + '/parent/parentdetails'; 
this.ajaxService.ajaxPostWithBody(url, data).subscribe(res=>{
  var detail = res;
  this.pdfdatas=[];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].parentFsName, detail[i].address,detail[i].fax,detail[i].contactNo]);
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
//  { text: 'User Id',  datafield: 'emailAddress',cellsrenderer:this.renderer , cellsalign: 'center', align: 'center'},
//  { text: 'Roll',datafield:'role',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Parent Name', datafield: 'parentFsName',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Address of Student', datafield: 'address',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Email Address', datafield: 'fax',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 { text: 'Contact No', datafield: 'contactNo',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
 
];

this.myGrid.updatebounddata();
this.myGrid.unselectrow;


})
}
ngAfterViewInit() {
  this.getData();
  this.myGrid.showloadelement();
}
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
  }
  
}
