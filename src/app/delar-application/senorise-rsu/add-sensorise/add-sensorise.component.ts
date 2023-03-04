import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { SensoriseListComponent } from '../sensorise-list/sensorise-list.component';
@Component({
 selector: 'app-add-sensorise',
 templateUrl: './add-sensorise.component.html',
 styleUrls: ['./add-sensorise.component.scss'],
})
export class AddSensoriseComponent implements OnInit {
 sensoriseForm: FormGroup;
 value: any;
 sensorise:any;
 name:boolean=false;
 willDownload = false;
 dataString: any;
 output='';
 file;
 show:boolean=false;
 imeiIssues=[];
 excellKeyValid:boolean=false;
  icciddata: any;
 constructor(
private formBuilder: FormBuilder,
private modalController: ModalController,
private ajaxService: AjaxService,
private commonService: CommonService) {}
 
 cancelBtn() {
this.modalController.dismiss();
 }
 onFileChange(ev) {
  var fileName=ev.srcElement.files[0];
  this.name= fileName.name.includes(".xlsx");
  if(this.name== true){
  this.dataString=[];
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = ev.srcElement.files[0];
  reader.onload = (event) => {
  const data = reader.result;
  workBook = XLSX.read(data, { type: 'binary' });
  jsonData = workBook.SheetNames.reduce((initial, name) => {
  const sheet = workBook.Sheets[name];
  initial[name] = XLSX.utils.sheet_to_json(sheet);
   return initial;
        }, {});
        let json=[]
        for(let i=0; i < jsonData["Sheet1"].length; i++){
          jsonData["Sheet1"][i]["iccid"] = jsonData["Sheet1"][i]["iccid"].toString();
          json.push(jsonData["Sheet1"][i]);
        }
        this.dataString = json;
        this.output = this.dataString.slice(0, 300).concat("...");
      }
      reader.readAsBinaryString(file);
    }else{
      this.commonService.presentToast("please insert only excel file (.xlsx)")
    }
    
    }
 getsensorise(){
var url = serverUrl.web +'/sensorise/getSensoriseRSUSettings'
this.ajaxService.ajaxGetPerference(url)
 .subscribe(res => {
this.sensorise = res;
this.sensoriseForm.patchValue({
  Customerid:this.sensorise.customerid,
  Crypotologic:this.sensorise.cryptologic,
  Tokenvalidity:this.sensorise.tokenvalidity,
  Tokentransaction:this.sensorise.tokentransactions,
  Action:this.sensorise.action,
  Utrno:this.sensorise.utrno
    })
 })
 }
 submitBtn(){
  if(this.dataString.length == 0){
    this.commonService.presentToast("check your excell file,don't enter blank spaces")
}
else{
var excellKeys=Object.keys(this.dataString[0])
for(var i=0;i<excellKeys.length;i++){
if ((excellKeys[i] == "iccid")){
console.log("present")
this.excellKeyValid = true

}

}
if(this.name == true && this.excellKeyValid == true){
this.imeiIssues=[];
this.willDownload = true;
const url= serverUrl.web +'/sensorise/SensoriseRSU?companyid='+localStorage.getItem('corpId')+'&branchid='+localStorage.getItem('corpId')+'&createdby='+localStorage.getItem('corpId')+'&customerid='+this.sensoriseForm.value.Customerid+'&cryptologic='+this.sensoriseForm.value.Crypotologic+'&tokenValidity='+this.sensoriseForm.value.Tokenvalidity+'&tokenTransactions='+this.sensoriseForm.value.Tokentransaction+'&action='+this.sensoriseForm.value.Action+'&utrno='+this.sensoriseForm.value.Utrno;
this.ajaxService.ajaxPostWithBody(url,this.dataString).subscribe(res=>{
 if(res.Message == "Sensorise Renewal Saved Successfully"){
this.commonService.presentToast('Sensorise Renewal Saved Successfully');
this.modalController.dismiss();
this.icciddata =res.Completed
this.openSensoriseList()
 }
else{
 this.commonService.presentToast('Please Contact Support Team');
}
});
} 
}
}
  async openSensoriseList() {
    const modal = await this.modalController.create({
      component: SensoriseListComponent,
      cssClass: 'custom-modaladv',
      componentProps: {
        value: this.icciddata,
      },
    });
    modal.onDidDismiss().then(() => {
    
    })
    return await modal.present();
  }
 
createForm()
 {
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day)+'T'
+ now.getHours() + ":" 
+ now.getMinutes();
this.sensoriseForm = this.formBuilder.group({
 Customerid:['', Validators.required],
 Crypotologic: ['', Validators.required],
 Tokenvalidity:['', Validators.required],
 Tokentransaction:['', Validators.required],
 Action:['', Validators.required],
 Utrno:['', Validators.required],
})
 }
 ngOnInit() {
this.createForm();
this.getsensorise();
 }

}