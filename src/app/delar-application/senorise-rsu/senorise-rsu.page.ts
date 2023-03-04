import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { AddSensoriseComponent} from './add-sensorise/add-sensorise.component'
@Component({
 selector: 'app-senorise-rsu',
 templateUrl: './senorise-rsu.page.html',
 styleUrls: ['./senorise-rsu.page.scss'],
})
export class SenoriseRSUPage implements OnInit {
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
source: { localdata: any; };
dataAdapter: any;
renderer: (row: number, column: any, value: string) => string;
myPlatform: any;
isDeleteShow: any = true;
selectedRow: any;
tableData:any;

constructor(
public platform: Platform,
private modalController: ModalController,
private alertController:AlertController,
private commonService: CommonService,
private ajaxService: AjaxService,
) { }


getDatas() {
if (this.myPlatform == 'desktop') {
const companyDetail = {
branchID: localStorage.getItem('corpId'),
companyID: localStorage.getItem('corpId'),
userId: localStorage.getItem('userName')
}
}
var url = serverUrl.web +'/sensorise/getRenewalAll?companyid='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res => {
this.tableData=res;
this.renderer = (row: number, column: any, value: string,) => {
if (value == "" || null || undefined || value == ",") {
return "---"
}
else {
 return '<span style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
}
}

this.source = { localdata: this.tableData };
this.dataAdapter = new jqx.dataAdapter(this.source);
this.columns = [
// { text: 'UTR No', datafield: 'utrno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
// { text: 'Customer ID', datafield: 'customerid', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
// { text: 'Crypotologic', datafield: 'cryptologic', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:230 },
// { text: 'Action', datafield: 'action', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
// { text: 'Token Validity', datafield: 'tokenvalidity', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
// { text: 'Token Transaction', datafield: 'tokentransactions', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:230},
{ text: 'Iccid No', datafield: 'iccidno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:420},
{ text: 'Requested Date', datafield: 'requestdate', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:420},
{ text: 'SR No', datafield: 'srno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:320},
{ text: 'SR Status', datafield: 'srstatus', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:127},
]
})
}
myGridOnRowSelect(event: any): void {
this.selectedRow = event.args.row;
}
async openModel()
{
const modal = await this.modalController.create({
component:AddSensoriseComponent,
cssClass: 'sensoriseform'
});
modal.onDidDismiss().then(() => {
if (this.myPlatform == "desktop") {
this.myGrid.clearselection();
}
this.getDatas();
})
return await modal.present();
}

ngOnInit() {
this.getDatas();
}

}
