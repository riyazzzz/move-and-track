import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; cellsalign: string; align: string;width:number } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
 tableData:any;
  name:boolean=false;
  willDownload = false;
  dataString: any;
  output='';
  file;
  show:boolean=false;
  imeiIssues=[];
  excellKeyValid:boolean=false;
  platform: any;
  constructor(private commonService: CommonService,private ajaxService:AjaxService,) { }
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
        if(jsonData["Sheet1"][i]["facode"] == undefined){
          jsonData["Sheet1"][i]["facode"]=""+'';
        }
        if(jsonData["Sheet1"][i]["fgtype"] == undefined){
          jsonData["Sheet1"][i]["fgtype"]=""+'';
        }
         jsonData["Sheet1"][i]["companyid"] = localStorage.getItem('corpId').toString();
         jsonData["Sheet1"][i]["branchid"] = localStorage.getItem('corpId').toString();
         jsonData["Sheet1"][i]["userid"] = ""+'';
         jsonData["Sheet1"][i]["itemno"] = jsonData["Sheet1"][i]["itemno"]+'';
         jsonData["Sheet1"][i]["description"] = jsonData["Sheet1"][i]["description"]+'';
         jsonData["Sheet1"][i]["partno"] = jsonData["Sheet1"][i]["partno"]+'';
         jsonData["Sheet1"][i]["type"] = jsonData["Sheet1"][i]["type"]+'';
         jsonData["Sheet1"][i]["documentno"] = jsonData["Sheet1"][i]["documentno"]+'';
         jsonData["Sheet1"][i]["locationcode"] = jsonData["Sheet1"][i]["locationcode"]+'';
         jsonData["Sheet1"][i]["quantity"] = jsonData["Sheet1"][i]["quantity"]+'';
         jsonData["Sheet1"][i]["actualamount"] = jsonData["Sheet1"][i]["actualamount"]+'';
         jsonData["Sheet1"][i]["expectedamount"] = jsonData["Sheet1"][i]["expectedamount"]+'';
         jsonData["Sheet1"][i]["facode"] = jsonData["Sheet1"][i]["facode"]+'';
         jsonData["Sheet1"][i]["entrytype"] = jsonData["Sheet1"][i]["entrytype"]+'';
         jsonData["Sheet1"][i]["companystructure"] = jsonData["Sheet1"][i]["companystructure"]+'';
         jsonData["Sheet1"][i]["assettype"] = jsonData["Sheet1"][i]["assettype"]+'';
         jsonData["Sheet1"][i]["assetdescrption"] = jsonData["Sheet1"][i]["assetdescrption"]+'';
         jsonData["Sheet1"][i]["remarks"] = jsonData["Sheet1"][i]["remarks"]+'';
         jsonData["Sheet1"][i]["fgtype"] = jsonData["Sheet1"][i]["fgtype"]+'';
         jsonData["Sheet1"][i]["entryno"] = jsonData["Sheet1"][i]["entryno"]+'';
         jsonData["Sheet1"][i]["month"] = jsonData["Sheet1"][i]["month"]+'';
         jsonData["Sheet1"][i]["status"] = true;
         jsonData["Sheet1"][i]["createdby"] = localStorage.getItem('userName').toString()+'';
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
    else{
    var excellKeys=Object.keys(this.dataString[0])
    for(var i=0;i<excellKeys.length;i++){

     if (
      (excellKeys[i] == "itemno") || 
      (excellKeys[i] == "description")  || 
      (excellKeys[i] == "partno") || 
      (excellKeys[i] == "type") || 
      (excellKeys[i] == "documentno") ||
      (excellKeys[i] == "locationcode") || 
      (excellKeys[i] == "quantity")  || 
      (excellKeys[i] == "actualamount") || 
      (excellKeys[i] == "expectedamount") || 
      (excellKeys[i] == "facode") ||
      (excellKeys[i] == "entrytype") || 
      (excellKeys[i] == "companystructure")  || 
      (excellKeys[i] == "assettype") || 
      (excellKeys[i] == "assetdescrption") || 
      (excellKeys[i] == "remarks") ||
      (excellKeys[i] == "fgtype") || 
      (excellKeys[i] == "entryno")  || 
      (excellKeys[i] == "month")){
      console.log("present")
      this.excellKeyValid = true
     
     }
      
      
      
      }
    if(this.name == true && this.excellKeyValid == true){
       this.imeiIssues=[];
    this.willDownload = true;
  const url = serverUrl.web +'/inventorymaster/fmsSaveInventoryMaster';
    this.ajaxService.ajaxPostWithBody(url,this.dataString)
    .subscribe(res => {
      console.log(res);
      if(res.message=='Inventory Updated Successfully'){
        this.commonService.presentToast('Inventory Upload Sucessfully');
        this.getDatas();
      } 
      else{
        this.commonService.presentToast("please insert valid excel file (.xlsx)")
      } 
})
    } 
}
  }
  ngAfterViewInit() {
      this.myGrid.showloadelement();
       this.getDatas();
  }
  getDatas() {
var url= serverUrl.fmsUrl +'/inventorymaster/getFmsInventoryMasterAll?companyid='+localStorage.getItem('corpId');
this.ajaxService.ajaxGet(url).subscribe(res => {
  var detail = res;
  this.tableData = res
    this.renderer = (row: number, column: any, value: string,) => {
      if (value == "" || null || undefined || value == "," || value == "undefined") {
        return "---"
      }
      else {
        return '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' + value + '</span>';
      }
    }

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      { text: 'Item No', datafield: 'itemno', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Description', datafield: 'description', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Part  No', datafield: 'partno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Type', datafield: 'type', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Document No', datafield: 'documentno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Location', datafield: 'locationcode', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Actual Amount', datafield: 'actualamount', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Expected Amount', datafield: 'expectedamount', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Quantity', datafield: 'quantity', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Facode', datafield: 'facode', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Entry Type', datafield: 'entrytype', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Company Structure', datafield: 'companystructure', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
      { text: 'Assettype', datafield: 'assettype', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Asset Description', datafield: 'assetdescrption', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Remarks', datafield: 'remarks', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:250},
      { text: 'Fgtype', datafield: 'fgtype', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Entry No', datafield: 'entryno', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center',width:150 },
      { text: 'Month', datafield: 'month', cellsrenderer: this.renderer , cellsalign: 'center', align: 'center',width:150},
    ]
  })
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
  }
  ngOnInit() {
    this.getDatas();
  } 
  }


