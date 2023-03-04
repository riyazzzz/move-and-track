

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-renewal-details',
  templateUrl: './renewal-details.component.html',
  styleUrls: ['./renewal-details.component.scss'],
})
export class RenewalDetailsComponent implements OnInit {
  @Input() value;
  detailsForm: FormGroup;
  proofName:any;
  editinfo: any;
  Addressproof:any;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public commonService: CommonService,
    public ajaxService: AjaxService,
    
  ) { }

  cancelBtn() {
    this.modalController.dismiss();
  }

  submit(){
    var data;
    if(this.value){
      data={
        "companyid": localStorage.getItem('corpId'),
        "branchid": localStorage.getItem('corpId'),
        "userid": "",
        "iccid": this.detailsForm.value.iccidNo,
        "imeino": this.detailsForm.value.imeiNo,
        "srno": this.detailsForm.value.SRNO,
        "engineno": this.detailsForm.value.engineNo,
        "chassisno":this.detailsForm.value.chassisNo,
        "registerno": this.detailsForm.value.RegNo,
        "customername": this.detailsForm.value.CustomerName,
        "customerphoneno":this.detailsForm.value.CustomerMobileNo,
        "customeraddress": this.detailsForm.value.CustomerAddress,
        "proofofaddress": this.detailsForm.value.NameOnAddressProof,
        "addressdocumentno": this.detailsForm.value.AddressDocumentNo,
        "proofofidentity": this.detailsForm.value.NameOnIdentityProof,
        "identitydocumentno": this.detailsForm.value.IdentityDocumentNo,
        "createdby": localStorage.getItem('userName'),
        "createddate": null,
        "updatedby": localStorage.getItem('userName'),
        "updateddate": null
      }
      const url = serverUrl.web +'/sensorise/SensoriseICCIDDetailSave';
    this.ajaxService.ajaxPostWithBody(url,data).subscribe(res=>{
      if(res.message == "ICCID Detail Saved Successfully"){
        this.commonService.showConfirm('ICCID Detail Saved Successfully');
        this.modalController.dismiss();
      }
    else{
      this.commonService.showConfirm(res.message);
    }
    });
    }
else{
  this.commonService.showConfirm('Please Fill the correct Details')
}

  }
  getProofDetails () {
    var url = serverUrl.web +'/sensorise/getDocument';
    this.ajaxService.ajaxGetPerference(url)
    .subscribe(res => {
      this.proofName=res
      this.Addressproof=res;
       })
    }
  createForm()
  {
     this.detailsForm = this.formBuilder.group({
      iccidNo:['', Validators.required],
      imeiNo: ['', Validators.required],
      SRNO:['', Validators.required],
      engineNo:['', Validators.required],
      chassisNo:[''],
      RegNo:['', Validators.required],
      CustomerName: ['', Validators.required],
      CustomerMobileNo:['', Validators.required],
      CustomerAddress:[''],
      NameOnIdentityProof:['', Validators.required],
      IdentityDocumentNo:[''],
      NameOnAddressProof:['',],
      AddressDocumentNo:['',]
    })
  }
  editmethod(){
    const url=serverUrl.web + '/sensorise/getSensoriseICCIDDetail?companyid=apm&iccid='+this.value;
    this.ajaxService.ajaxGetObject(url).subscribe(res=>{
      this.editinfo= JSON.parse(res); 
      // this.proofName=[this.editinfo.proofofidentity]
      // this.Addressproof=[this.editinfo.proofofaddress]
      this.detailsForm.patchValue({
        iccidNo:this.editinfo.iccidno,
        imeiNo:this.editinfo.imeino,
        SRNO:this.editinfo.srno,
        engineNo:this.editinfo.engineno,
        chassisNo:this.editinfo.chassisno,
        RegNo:this.editinfo.registerno,
        CustomerName:this.editinfo.customername,
        CustomerMobileNo:this.editinfo.customerphoneno,
        CustomerAddress:this.editinfo.customeraddress,
        NameOnIdentityProof:this.editinfo.proofofidentity,
        IdentityDocumentNo:this.editinfo.identitydocumentno,
        NameOnAddressProof:this.editinfo.proofofaddress,
        AddressDocumentNo:this.editinfo.addressdocumentno
         })
      })

    }
  ngOnInit() {
    this.getProofDetails();
    this.createForm();
    this.editmethod();
  }

}