import { Component, OnInit,ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { ModalController , AlertController} from '@ionic/angular';
import { ClassAdditionalComponent } from '../class-additional/class-additional.component';
//import { StudentClassAdditionalComponent } from '../../student/student-class-additional/student-class-additional.component';
import { Platform } from '@ionic/angular';
import {serverUrl} from 'src/environments/environment';
import {AjaxService} from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.page.html',
  styleUrls: ['./class-table.page.scss'],
})
export class ClassTablePage implements OnInit {
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
selectedRow: any;
  dataAdapter: any;
  columns: { text: string; datafield: string; cellsrenderer: any; cellsalign: string; align: string; }[];
  renderer: (row: number, column: any, value: string) => string;
  source: any;
  head = ['Class Id', 'Section Id', 'Tutor', 'Class Description'];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="Class-details report";

  constructor(private modalController: ModalController,
    private ajaxService:AjaxService,
    private commonService:CommonService,
    public platform: Platform,
    private alertController: AlertController,
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
       const url=serverUrl.web +'/class/deleteClass?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId')+'&sectionId='+this.selectedRow.sectionId+'&classId='+this.selectedRow.classId
      
        this.ajaxService.ajaxDeleteWithString(url).subscribe(res=>{
        
          if(res.message == "Deleted Successfully"){
            this.commonService.presentToast('Class Details Deleted Sucessfully');
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
      component:ClassAdditionalComponent,
       cssClass: 'my-class-css'
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
    component:ClassAdditionalComponent,
     cssClass: 'my-class-css',
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
  return"";
}
}

myGridOnRowSelect(event: any): void {
  this.selectedRow = event.args.row;
}
  
createPdf() {
  this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'Class-details report');
}

exportToExcel() {
  let reportData = {
    title: 'Class-details report',
    data: this.pdfdatas,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
}

getDatas() {
  const url=serverUrl.web + '/class/getClass?schoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res=>{
  var detail = res;
  this.pdfdatas=[];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].classId, detail[i].sectionId, detail[i].tutor, detail[i].classDescription]);
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
  { text: 'Class Id',  datafield: 'classId',cellsrenderer:this.renderer , cellsalign: 'center', align: 'center'},
  { text: 'Section Id',datafield:'sectionId',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
  { text: 'Tutor', datafield: 'tutor',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},
  { text: 'Class Description', datafield: 'classDescription',cellsrenderer:this.renderer,cellsalign: 'center', align: 'center'},

];
})
 
this.myGrid.updatebounddata();
this.myGrid.unselectrow;
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
