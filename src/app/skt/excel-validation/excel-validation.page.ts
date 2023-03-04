import { Component, OnInit,ViewChild } from '@angular/core';
import {AjaxService} from '../../services/ajax.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { serverUrl } from 'src/environments/environment';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-excel-validation',
  templateUrl: './excel-validation.page.html',
  styleUrls: ['./excel-validation.page.scss'],
})
export class ExcelValidationPage implements OnInit {

  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
 
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  name:boolean=false;
  willDownload = false;
  dataString: any;
  output='';
  file;
  tableData: any;
  show:boolean=false;
  imeiIssues=[];
  excellKeyValid:boolean=false;
  constructor(
    private ajaxService:AjaxService,
    private router:Router,
   private commonService: CommonService,
 
    ) { }
    onFileChange(ev) {
      this.show=false;
      var fileName=ev.srcElement.files[0];
      this.name= fileName.name.includes(".xlsx");
     if(this.name== true){
       this.show = false;
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
           jsonData["Sheet1"][i]["StudentName"] = jsonData["Sheet1"][i]["StudentName"].toString();
           jsonData["Sheet1"][i]["RollNo"] = jsonData["Sheet1"][i]["RollNo"].toString();
           jsonData["Sheet1"][i]["ParentName"] = jsonData["Sheet1"][i]["ParentName"]+'';
           jsonData["Sheet1"][i]["ParentMobileNumber"] = jsonData["Sheet1"][i]["ParentMobileNumber"].toString();
           jsonData["Sheet1"][i]["parentEmail"] = jsonData["Sheet1"][i]["parentEmail"]+'';
           jsonData["Sheet1"][i]["Address"] = jsonData["Sheet1"][i]["Address"].toString();
           jsonData["Sheet1"][i]["City"] = jsonData["Sheet1"][i]["City"]+'';
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
   


  sendToServer() {
    if(this.dataString.length == 0){
                this.commonService.presentToast("check your excell file,don't enter blank spaces")
    }
}

  ngOnInit() {
  }

}
