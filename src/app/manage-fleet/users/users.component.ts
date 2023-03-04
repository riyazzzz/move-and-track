import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ExportExcelService } from '../../services/export-excel.service';
import { Platform } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from '../../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { UserformComponent } from './userform/userform.component';
import { AddFeatureComponent } from '../add-feature/add-feature.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  companyDetail: { branchID: string; companyID: string; userId: string; };
  renderer;
  columns;

  // columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  app: any = { logo: 'logo.png' };
  myPlatform: any;
  source: { localdata: any; };
  dataAdapter: any;
  selectedRowIdx: any;
  selectedRow: any;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  detail: any;
  newDetail: any;
  isDeleteShow: any = false;
  // renderer: (row: number, column: any, value: string) => string;
  constructor(
    private modalController: ModalController,
    private ete: ExportExcelService,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    public platform: Platform,
    private alertController: AlertController,
  ) { }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
    //  event.isTrigger = false
    this.selectedRowIdx = event.args.rowindex;

  }


  async openFeatureModel() {
    const modal = await this.modalController.create({
      component: AddFeatureComponent,
      cssClass: 'user_feature',
      componentProps: {
        value: this.selectedRow,
      }
    });
    modal.onDidDismiss().then(() => {
      this.myGrid.clearselection();
      this.getDatas();
    })
    return await modal.present();
  }




  async openModel() {
    const modal = await this.modalController.create({
      component: UserformComponent,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then(() => {
      this.myGrid.clearselection();

      this.getDatas();
    })
    return await modal.present();
  }
  async deleteMode() {
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
            var details = { 
              "companyId": this.selectedRow.companyId, 
              "branchId": this.selectedRow.branchId,
               "userName": this.selectedRow.emailAddress,
                "roleName": "FleetManager" };
            console.log(details)
            const url = serverUrl.web + '/user/delete/user';

            this.ajaxService.ajaxDeleteWithBody(url, details).subscribe(res => {
              console.log(res);

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





  ngOnInit() {
    this.companyDetail = {
      branchID: localStorage.getItem('corpId'),
      companyID: localStorage.getItem('corpId'),
      userId: localStorage.getItem('userName')
    }
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
  }
  async editMode(data) {
    if (this.myPlatform != 'desktop') {
      if (data) {
        data["submit"] = "available";
        const modal = await this.modalController.create({
          component: UserformComponent,
          cssClass: 'custom-modal',
          componentProps: {
            value: data,
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
    } else {
      if (this.selectedRow) {
        this.selectedRow["submit"] = "available";
        const modal = await this.modalController.create({
          component: UserformComponent,
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

      var datas = { "companyId": companyDetail.companyID, "branchId": companyDetail.branchID, "userId": companyDetail.userId + '' }
      var url2 = serverUrl.web +'/user/branch/user';						
      this.ajaxService.ajaxPostWithBody(url2, datas).subscribe(res => {
        console.log(res);
        var detail = res;

        // for(var i=0 ;i<detail.length;i++){
        //   this.pdfdatas.push([detail[i].name,detail[i].telNo,detail[i].address,detail[i].city,detail[i].plateNo,detail[i].nationality,detail[i].eMailAddress,detail[i].emergencyContactNo,detail[i].licenseNo,detail[i].licenseExpiry]);
        // }
        this.renderer = (row: number, column: any, value: string,) => {
          if (value == "" || null || undefined) {
            return "----"
          }
          else {
            return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' + value + '</span>';
          }
        }
        this.source = { localdata: detail };
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          { text: 'User Name', datafield: 'emailAddress', cellsrenderer: this.renderer },
          // {text :'Operator',datafield:'operatorName',cellsrenderer:this.renderer},
          { text: 'Password', datafield: 'pwd', cellsrenderer: this.renderer },
          // {text :'Serial No',datafield:'serialNo',cellsrenderer:this.renderer},
          { text: 'First Name', datafield: 'userName', cellsrenderer: this.renderer },
          // {text :'Last Name',datafield:'',cellsrenderer:this.renderer},
          { text: 'Address Line 1', datafield: 'addressLine1', cellsrenderer: this.renderer },
          //{text :'Address Line 2',datafield:'addressLine2',cellsrenderer:this.renderer},
          { text: 'Email Address', datafield: 'fax', cellsrenderer: this.renderer },
          { text: 'User City', datafield: 'addressCity', cellsrenderer: this.renderer },
          { text: 'Country', datafield: 'countryName', cellsrenderer: this.renderer },
          { text: 'Contact Number', datafield: 'contact', cellsrenderer: this.renderer },
          {
            text: 'Feature', datafield: 'Feature', columntype: 'button',
            cellsrenderer: (): string => {
              console.log('iam button');
              // this.openModel() ;
              return 'Feature';
            },
            buttonclick: (row: number): void => {
              this.openFeatureModel();
            }
          }
        ]
        // this.source.localdata = res;
        this.myGrid.updatebounddata();
        this.myGrid.unselectrow;
      })
    } else {
      const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }

      var datas = { "companyId": companyDetail.companyID, "branchId": companyDetail.branchID, "userId": companyDetail.userId + '' }
      var url2 = serverUrl.web +'/user/branch/user';						
      this.ajaxService.ajaxPostWithBody(url2, datas).subscribe(res => {
        console.log(res);
        this.detail = res;
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
    this.app["logo"] = localStorage.companyLogo;

  }


}
