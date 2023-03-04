import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  IonInfiniteScroll,
  MenuController,
  ModalController,
  AlertController,
  Platform,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { serverUrl } from "src/environments/environment";
import { AjaxService } from "../../services/ajax.service";
import { AddImeiCompanyPage } from "./add-imei-company/add-imei-company.page";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  // company = true;
  // companyName: string;
  // vehicleCount: any;
  // showList = [{ companyName: '', vehicle_Count: '' }];
  // selector: string;
  // selectedData: any;
  // initialHeader: boolean;
  // searchEnable: boolean;
  // @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  // count: number = 30;
  // displayData: any = [];
  // currentPage: number = 1;
  // constructor(
  //   private menuController: MenuController,
  //   private router: Router,
  //   private commonService: CommonService,
  //   private ajaxService: AjaxService,
  //   private modalController: ModalController,
  //   private alertController: AlertController
  // ) { }

  // openAddModule() {
  //   this.router.navigateByUrl('dashboard/add-company');
  // }

  // async selectedCompany(selectedData) {
  //   localStorage.setItem('selectedCompanyData', JSON.stringify(selectedData));
  //   this.router.navigateByUrl('company-vehicle');
  // }
  // ionViewWillEnter() {
  //   this.currentPage= 1;
  //   this.getCompanyList(this.selectedData);
  // }

  // getBack(){
  //   this.router.navigateByUrl('/tabs-login/new-dashboard');
  // }
  // getCompanyList(selectedData) {

  //   this.showList = [];
  //   if (selectedData === 'company') {
  //     const loginData = {
  //       userId: localStorage.getItem('userId'),
  //       password: localStorage.getItem('password'),
  //       version: "v2"

  //     };
  //     const url = serverUrl.web + '/global/getcompanylist?suffix=' + localStorage.companySuffix;
  //     this.ajaxService.ajaxGet(url)
  //       .subscribe(res => {
  //         this.selectedData = selectedData;
  //         localStorage.setItem('selectedData', selectedData);
  //         this.showList = res;
  //         this.setDisplayData();
  //         if (this.commonService.isLoading)
  //           this.commonService.dismissLoader();
  //         localStorage.removeItem("dashboardData");
  //         localStorage.setItem('dashboardData', JSON.stringify(this.showList));
  //       });

  //   } else {
  //     this.selectedData = selectedData;
  //     localStorage.setItem('selectedData', selectedData);
  //     const companySuffix = { suffix: '' };
  //     companySuffix.suffix = localStorage.getItem('companySuffix');
  //     const url = serverUrl.web + '/api/vts/superadmin/device/' + JSON.stringify(companySuffix);
  //     this.ajaxService.ajaxGet(url)
  //       .subscribe(res => {
  //         this.showList = res;
  //         this.setDisplayData();
  //         if (this.commonService.isLoading)
  //           this.commonService.dismissLoader();
  //       });
  //   }
  // }
  // async selectedImei(imeiDetails) {
  //   this.commonService.presentLoader();
  //   const modal = await this.modalController.create({
  //     component: AddImeiCompanyPage,
  //     componentProps: {
  //       'imeiDetails': imeiDetails,
  //     }
  //   });
  //   return await modal.present();

  // }
  // async deleteSelectedImei(imeiToDelete) {
  //   console.log(imeiToDelete)
  //   const alert = await this.alertController.create({
  //     header: 'Are you sure?',
  //     inputs: [{
  //       name: 'Password',
  //       type: 'password',
  //       placeholder: 'Enter the password'
  //     }],
  //     message: 'You want to Delete ' + imeiToDelete.imei,
  //     backdropDismiss: false,
  //     buttons: [{
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: data => {
  //         console.log('Cancel clicked');
  //         if (this.commonService.isLoading)
  //           this.commonService.dismissLoader();
  //       }
  //     },
  //     {
  //       text: 'Ok',
  //       handler: data => {
  //         if (data.Password === localStorage.getItem('password')) {
  //           this.commonService.presentLoader();
  //           const deleteImei = {
  //             "imei": imeiToDelete.imei
  //           };
  //           const url = serverUrl.web + '/api/vts/superadmin/inventory';
  //           this.ajaxService.ajaxDeleteWithBody(url, deleteImei)
  //             .subscribe(res => {
  //               if (res.error.text === "deleted successfully") {
  //                 if (this.commonService.isLoading)
  //                   this.commonService.dismissLoader();
  //                 this.commonService.presentToast("This " + imeiToDelete.imei + " Imei No deleted successfully..!");
  //                 this.getCompanyList(this.selectedData);
  //               }
  //             });
  //         } else {
  //           this.commonService.presentToast('Password does not match');
  //         }

  //       }
  //     }]
  //   });

  //   await alert.present();
  // }

  // async deleteSelectedCompany(companyDetails) {
  //   const alert = await this.alertController.create({
  //     header: 'Are you sure?',
  //     inputs: [{
  //       name: 'Password',
  //       type: 'password',
  //       placeholder: 'Enter the password'
  //     }],
  //     message: 'You want to Delete this ' + companyDetails.companyName,
  //     backdropDismiss: false,
  //     buttons: [{
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: data => {
  //         console.log('Cancel clicked');
  //         if (this.commonService.isLoading)
  //           this.commonService.dismissLoader();
  //       }
  //     },
  //     {
  //       text: 'Ok',
  //       handler: data => {
  //         if (data.Password === localStorage.getItem('password')) {
  //           this.commonService.presentLoader();
  //           const deleteCompany = {
  //             "userId": companyDetails.userId,
  //             "companyId": companyDetails.companyId
  //           };
  //           const url = serverUrl.web + '/api/vts/superadmin/company/' + deleteCompany.companyId;
  //           this.ajaxService.ajaxDeleteWithBody(url, companyDetails.companyId)
  //             .subscribe(res => {
  //               if (res.error.text === "success") {
  //                 this.commonService.presentToast("This " + companyDetails.companyName + " Company deleted successfully..!");
  //                 this.getCompanyList(this.selectedData);
  //               } else {
  //                 this.commonService.presentToast("Something bad happened");
  //               }
  //               if (this.commonService.isLoading)
  //                 this.commonService.dismissLoader();
  //             });
  //         } else {
  //           this.commonService.presentToast('Password does not match');
  //         }
  //       }
  //     }]
  //   });

  //   await alert.present();
  // }

  // searchStatus() {
  //   this.searchEnable = !this.searchEnable;
  // }

  // loadMoreData = (event) => {
  //   setTimeout(() => {
  //     console.log("hit successfull!");
  //     this.count += 10;
  //     //Hide Infinite List Loader on Complete
  //     event.target.complete();
  //     //Rerender Virtual Scroll List After Adding New Data
  //     //this.virtualScroll.checkEnd();
  //     let len = JSON.parse(localStorage.maxLength);
  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     let data: any = JSON.parse(localStorage.upDatedJsonData);
  //     if (len <= this.count && localStorage.statusChanger == "All") {
  //       event.target.disabled = true;
  //     }
  //     if (localStorage.statusChanger != "All" && JSON.parse(localStorage.gridData).length <= localStorage.maxLength) {
  //       event.target.disabled = true;
  //       setTimeout(() => {
  //         event.target.disabled = false;
  //       }, 2000);
  //     }
  //   }, 500);
  // }

  // doInfinite(event) {
  //   console.log("event trigger")
  //   setTimeout(() => {
  //     console.log(this.showList)
  //     this.displayData.push(...this.showList.slice(this.currentPage * this.count, (this.currentPage + 1) * this.count));
  //     this.currentPage++;
  //     event.target.complete();
  //     if (this.displayData.length == this.showList.length) {
  //       event.target.disabled = true;
  //       setTimeout(() => {
  //         event.target.disabled = false;
  //       }, 3000);
  //     }
  //     console.log("DISPLAY DATA----------------------\n", this.displayData)
  //   }, 500);
  // }

  // setDisplayData() {
  //   if (this.showList.length > this.count) {
  //     this.displayData = this.showList.slice(0, this.count);
  //   }
  //   else {
  //     this.displayData = this.showList;
  //   }
  // }

  // pipeFilter(search) {
  //   var loc;
  //   if (!this.showList)
  //     loc = [];
  //   if (!search)
  //     loc = this.showList;
  //   search = search.toLowerCase();
  //   loc = this.showList
  //   var newloc=[]
  //   loc.filter(it => {
  //     if (it.companyName != null)
  //       if(it.companyName.replace(/ /g, '').toLowerCase().includes(search.replace(/ /g, ''))){
  //         newloc.push(it)
  //       }
  //   });
  //   this.displayData = newloc;
  // }
  // ngOnInit() {
  //   this.selectedData = 'company';

  //   this.menuController.enable(true);
  // }

  @ViewChild("myGrid", { static: false }) myGrid: any;
  @Input() value;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  columns: any;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  page = [];

  constructor(
    private ajaxService: AjaxService,
    public platform: Platform,
    private modalController: ModalController,
    private commonService: CommonService
  ) {}

  getdata() {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/global/getcompanylist?suffix=" +
      localStorage.companySuffix;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.tableData = res;
      this.commonService.dismissLoader();
      this.page = ["100", "200", "500", "1000"];
      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            "0" +
            "</span>"
          );
        } else {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            value +
            "</span>"
          );
        }
      };
      this.source = { localdata: this.tableData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [
        {
          text: "Company Id",
          datafield: "companyId",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 210,
        },
        {
          text: "Company Name",
          datafield: "companyName",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 210,
        },
        {
          text: "Contact No",
          datafield: "contact",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 210,
        },
        {
          text: "Email Id",
          datafield: "emailId",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 210,
        },
        {
          text: "Vehicle Count",
          datafield: "vehicle_Count",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 210,
        },
        {
          text: "Details",
          columntype: "button",
          cellsalign: "center",
          align: "center",
          width: 150,
          cellsrenderer: (): string => {
            return this.myPlatform == "desktop"
              ? "View"
              : "<button>View</button>";
          },
          buttonclick: (row): void => {
            this.viewModel(row);
          },
        },
      ];
    });
  }

  async viewModel(row) {
    const modal = await this.modalController.create({
      component: CompanyDetailsComponent,
      cssClass: "companyform",
      componentProps: {
        value: this.selectedRow.companyId,
      },
    });
    modal.onDidDismiss().then(() => {
      this.selectedRow = undefined;
    });

    return await modal.present();
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.getdata();
  }
}
