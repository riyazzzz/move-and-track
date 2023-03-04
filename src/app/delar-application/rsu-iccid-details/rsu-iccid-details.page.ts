import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rsu-iccid-details',
  templateUrl: './rsu-iccid-details.page.html',
  styleUrls: ['./rsu-iccid-details.page.scss'],
})
export class RsuIccidDetailsPage implements OnInit {

  rsuForm:FormGroup;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  tableData: any;
  file;
  dataString: any[];
  output: any[];
  name: boolean;
  excellKeyValid: boolean;
  imeiIssues: any[];
  willDownload: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private ajaxService:AjaxService,
  ) { }

  clear(){
    this.rsuForm.patchValue({
      fileupload:"",
    });
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
            jsonData["Sheet1"][i]["iccidno"] = jsonData["Sheet1"][i]["iccidno"].toString();
            jsonData["Sheet1"][i]["imeino"] = jsonData["Sheet1"][i]["imeino"].toString();
            json.push(jsonData["Sheet1"][i]);
          }
          this.dataString = json;
          this.output = this.dataString.slice(0, 300).concat("...");
        }
        reader.readAsBinaryString(file);
      }else{
        this.commonService.showConfirm("please insert only excel file (.xlsx)")
      }
      
      }

      SearchData() {
        if(this.dataString.length == 0){
            this.commonService.showConfirm("check your excell file,don't enter blank spaces")
        }
        else{
        var excellKeys=Object.keys(this.dataString[0])
        for(var i=0;i<excellKeys.length;i++){
      if ((excellKeys[i] == "iccidno")  || (excellKeys[i] == "imeino")){
          console.log("present")
          this.excellKeyValid = true   
         }     
    }
        if(this.name == true && this.excellKeyValid == true){
           this.imeiIssues=[];
        this.willDownload = true;
        const url = serverUrl.web +'/sensorise/saveSensoriseRSUICCID'
        this.ajaxService.ajaxPostWithBody(url,this.dataString)
        .subscribe(res => {
          if(res.message=='Sensorise RSU ICCID Saved Successfully'){
            this.commonService.presentToast(res.message);
            this.getrsudetails()
            this.clear();
          } 
          else{
            this.commonService.presentToast(res.message)
            this.getrsudetails()
            this.clear();
          } 
    })
        } 
    }
      }

  createForm(){
    this.rsuForm = this.formBuilder.group({
      fileupload:[this.file,Validators.required]
    })
  }

  getrsudetails(){
    var url= serverUrl.web +'/sensorise/getSensoriseRSUICCID';
    this.ajaxService.ajaxGet(url).subscribe(res => {
    this.tableData = res.icciddetail;
  
    this.renderer = (row: number, column: any, value: string,) => {
      if (value == "" || null || undefined || value == ",") {
        return "---"
      }
      else {
        return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
      }
    }

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      { text: 'ICCID No', datafield: 'iccidno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:630},
      { text: 'IMEI No', datafield: 'imeino', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:630},
   ]
  })
 }

  ngOnInit() {
    this.createForm();
    this.getrsudetails();
  }

}
