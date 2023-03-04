import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { SktService } from 'src/app/services/skt.service';
import { StudentAddtionalComponent } from '../student-addtional/student-addtional.component';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import {serverUrl} from 'src/environments/environment';
import {AjaxService} from 'src/app/services/ajax.service';
import { AlertController } from '@ionic/angular';
import {AddStudentComponent} from '../add-student/add-student.component'
import { AddRouteComponent } from '../add-route/add-route.component';
import { AddAlertsComponent } from '../add-alerts/add-alerts.component'
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  @Input()value:any
  selectedRow: any;
  head = ['Roll No', 'Student Name', 'Tag Id', 'Gender', 'Parent Phone Number', 'Class', 'Section',];
  pdfdatas=[];
  myPlatform: any;
  exportTitle="Student-details report";
  columns: { text: string; filtertype: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string; }[];
  renderer: (row: number, column: any, value: string) => string;
  studentinfo: any;
  constructor(private modalController: ModalController,
    private sktService: SktService,
    private ajaxService:AjaxService,
    private commonService: CommonService,
    private alertController: AlertController,
    private platform: Platform,
    private ete: ExportExcelService,) { }
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  obj = this.sktService.objeSkt;
  editrow: number = -1;

  generaterow(): any {
    let row = {};
    return row;
  }
  source: any =
    {
      localdata: this.obj,
      datatype: 'array',
    }


  dataAdapter: any = new jqx.dataAdapter(this.source);
  

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


  async DeleteModel(){

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
  const url = serverUrl.web + '/student/deletestudent?companyId='+localStorage.getItem('corpId')+
  '&branchId='+localStorage.getItem('corpId')+'&stin='+this.selectedRow.stin
   
     this.ajaxService.ajaxDeleteWithString(url).subscribe(res=>{
     
       if(res.error.text == "Success"){
            this.commonService.presentToast("Student Details Deleted successfully");
        this.modalController.dismiss();
        this.getDatas();
        this.myGrid.clearselection();
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
 createPdf() {
  this.commonService.createPdf(this.head, this.pdfdatas, this.exportTitle, this.myPlatform, 'Student-details report');
}

exportToExcel() {
  let reportData = {
    title: 'Student-details report',
    data: this.pdfdatas,
    headers: this.head
  }
  this.ete.exportExcel(reportData);
}
getDatas() {
  const url=serverUrl.web + '/student/getStudent?SchoolId='+localStorage.getItem('corpId')+'&branchId='+localStorage.getItem('corpId'); 
this.ajaxService.ajaxGet(url).subscribe(res=>{
  var detail = res;
  this.pdfdatas=[];
        for (var i = 0; i < detail.length; i++) {
          this.pdfdatas.push([detail[i].rollNo, detail[i].studentName,detail[i].tagId,detail[i].sex,detail[i].contactNo,detail[i].classId,detail[i].sectionId]);
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
  { text: 'Roll No', filtertype: 'textbox', datafield: 'rollNo', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
  { text: 'Student Name', filtertype: 'textbox', datafield: 'studentName', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
  { text: 'Tag Id', filtertype: 'textbox', datafield: 'tagId', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
  { text: 'Gender', filtertype: 'textbox', datafield: 'sex', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
  { text: 'Parent Phone Number', filtertype: 'textbox', datafield: 'contactNo', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
  { text: 'Class', filtertype: 'textbox', datafield: 'classId', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' }, 
  { text: 'Section', filtertype: 'textbox', datafield: 'sectionId', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
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

  async editsettings(){
    const alert = await this.alertController.create({
      header: 'Edit Mode',
      animated: true,
      cssClass: 'toast-button',    buttons: [
        {
          text: 'Student info',
          role: 'ok',
          cssClass: 'alertButton',
          handler: async () => {
            const modal = await this.modalController.create({
              component: AddStudentComponent,
              cssClass: 'my-StudentDetailsPage',
              componentProps: {
                value:this.selectedRow.stin
              }
            });
            modal.onDidDismiss().then(() => {
              this.myGrid.clearselection();
              this.selectedRow = "";
              this.getDatas();
            })
            return await modal.present();
          }
        },{
         text: 'Route info',
         role: 'ok',
         cssClass: 'alertButton',
          handler: async () => {
            const modal = await this.modalController.create({
              component: AddRouteComponent,
              cssClass: 'my-StudentDetailsPage',
              componentProps: {
                mode: 'edit',
                value:this.selectedRow.stin
              }
            });
            modal.onDidDismiss().then(() => {
              this.myGrid.clearselection();
              this.selectedRow = "";
              this.getDatas();
            })
            return await modal.present();;
          }
        }, {
          text: 'alert info',
          role: 'ok',
          cssClass: 'alertButton',
          handler: async () => {
            const modal = await this.modalController.create({
              component: AddAlertsComponent,
              cssClass: '',
              componentProps: {
                value:this.selectedRow.stin
              }
            });
            modal.onDidDismiss().then(() => {
              this.myGrid.clearselection();
              this.selectedRow = "";
              this.getDatas();
            })
            return await modal.present();
          }
        }
      ]
      
    });
       await alert.present();
  }
  async OpenModel() {
    const modal = await this.modalController.create({
      component: AddStudentComponent,
      cssClass: 'my-StudentDetailsPage',
      componentProps: {
        mode: 'add',
      }
});
    modal.onDidDismiss().then(() => {
      if (this.myPlatform == "desktop") {
        this.myGrid.clearselection();
      }

      this.getDatas();
    })
    return await modal.present();
  }
  async EditModel() {
 if(this.selectedRow){
   this.editsettings();
  }
  else{
    this.commonService.presentToast('Please select a row to edit');
    return "";
  }
}

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
}
