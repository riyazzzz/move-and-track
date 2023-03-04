import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-add-production',
  templateUrl: './add-production.component.html',
  styleUrls: ['./add-production.component.scss'],
})
export class AddProductionComponent implements OnInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('selectComponent', { static: false }) selectComponent: IonicSelectableComponent;
  columns: any;
  companyName: any;
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  isshow = false;
  Qty: number;
  productionForm: FormGroup;
  tableData = [];
  imeidetail: any;
  serial: any;
  devicemodellist: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService) { }

  cancelBtn() {
    this.modalController.dismiss();
  }
  getdevicemodellist = (event: {
    component: IonicSelectableComponent,
    value: any
  }) => {
    if(event.value)
     this.productionForm.value.devicemodel = event.value; 
  }
  submitBtn() {
    var data;
    data = {
      "companyid": localStorage.getItem('corpId'),
      "branchid": localStorage.getItem('corpId'),
      "serialno": this.productionForm.value.SerialNo,
      "quantity": this.Qty,
      "createdby": localStorage.getItem('userName'),
      "createddate": null,
      "updatedby": localStorage.getItem('userName'),
      "salesdetail": this.tableData,
      "devicemodel":this.productionForm.value.devicemodel
    }
    const url = serverUrl.web + '/sensorise/saveSensoriseProduction?companyid=' + localStorage.getItem('corpId') + '&branchid=' + localStorage.getItem('corpId');
    this.ajaxService.ajaxPostWithBody(url, data).subscribe(res => {
      if (res.message == "Production Saved Successfully") {
        this.commonService.showConfirm('Production Added Succesfully');
        this.modalController.dismiss();
      }
      else {
        this.commonService.showConfirm('Please Contact Support Team');
      }
    });

  }
  click() {

    if (this.productionForm.value.imeiNo == '') {
      this.commonService.showConfirm('Enter the Imei Number')
    }
    else {
      let show = true
      if (this.myGrid)
        this.myGrid['attrSource']['originaldata'].map(res => {
          if (res.imei == this.productionForm.value.imeiNo)
            show = false
        })
      if (show) {
        {
          const url = serverUrl.web + '/sensorise/getSingleSensoriseManufactureByImei?companyid=' + localStorage.getItem('corpId') + '&imei=' + this.productionForm.value.imeiNo;
          this.ajaxService.ajaxGetPerference(url)
            .subscribe(res => {
              this.imeidetail = res;
              if(res.message == "Invalid IMEI")
              {
                this.commonService.showConfirm(res.message)
              }
             else if (res.message == "IMEI Already Exists") {
                this.commonService.showConfirm(res.message)
              }
              else {
                var detailValue = {
                  imei: this.imeidetail.imei,
                  iccidno: this.imeidetail.iccidno,
                  vltdsno: this.imeidetail.vltdsno,
                }
                this.tableData.push(detailValue)
               this.reset()
                this.Qty = this.tableData.length
                this.isshow = true;
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
                  { text: 'Imei Number', datafield: 'imei', cellsrenderer: this.renderer, cellsalign: 'center', align: 'center' },
                  { text: 'Delete', datafield: 'Delete', columntype: 'button',cellsalign: 'center', align: 'center',width:200,
        cellsrenderer: (): string => {
          return 'Delete';
        },
        buttonclick: (row): void => {
         this.deleteAnalogRow(row)
        }
      }
                ]
              }
            })
        }
      } else{
        this.commonService.showConfirm("Imei No Already Assigned")
      }
    }

  }
  deleteAnalogRow(row: any) {
    this.tableData.splice(row, 1)
    this.source = { localdata: this.tableData };
    this.Qty = this.tableData.length
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }
  createForm() {
    this.productionForm = this.formBuilder.group({
      devicemodel:['',Validators.required],
      SerialNo: [''],
      imeiNo: ['']
    })
  }
  reset()
  {
    this.productionForm.patchValue({
      SerialNo:this.serial,
      imeiNo:"",
      })
  }
  getModellist(){
    var url = serverUrl.web +'/sensorise/getModel';
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
    this.devicemodellist=res;
    })
    }
  ngOnInit() {
    const url = serverUrl.web + '/sensorise/generateSerialno?companyid=' + localStorage.getItem('corpId');
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.serial = res
    })
    this.getModellist()
    this.createForm();
  }
}
