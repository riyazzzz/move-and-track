import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-skt-excell',
  templateUrl: './skt-excell.page.html',
  styleUrls: ['./skt-excell.page.scss'],
})
export class SktExcellPage implements OnInit {
  name: boolean = false;
  dataString: any;
  output='';
  constructor( private commonService: CommonService,public ajaxService: AjaxService) { }
  
  onFileChange(ev) {
    var fileName = ev.srcElement.files[0];
    this.name = fileName.name.includes(".xlsx");
    if (this.name == true) {
      this.dataString = [];
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
        this.dataString = jsonData['Sheet1'];

      }
      reader.readAsBinaryString(file);
    } else {
      this.commonService.presentToast("please insert only excel file (.xlsx)")
    }

  }
   sendToServer() {
   let branchId = localStorage.getItem('corpId');
   this.dataString.forEach(res=>{
    res.parentName = res.parentName.toString(), res.mobileNumber = res.mobileNumber.toString()
   })
     let data = {
      "entry":"",
      "companyId":branchId,
      "branchId":branchId,
      "userImage":"",
       "value": 
        this.dataString
       
  }
  const url = serverUrl.web +'/student/upload/excel'
  this.ajaxService.ajaxPostMethod(url, data).subscribe(res=>{
    console.log(res)
    this.commonService.presentToast(res[res.length - 1])
  })
   }
  ngOnInit() {
  }

}
