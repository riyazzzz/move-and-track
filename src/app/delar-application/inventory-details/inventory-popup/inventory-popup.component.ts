import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-inventory-popup',
  templateUrl: './inventory-popup.component.html',
  styleUrls: ['./inventory-popup.component.scss'],
})
export class InventoryPopupComponent implements OnInit {
  @Input() value;
  @Input() mode;
  slotNumber:boolean = false
  EsimProvider:boolean = false
  ExpiryDate:boolean = false
  Comments:boolean = false
  InventoryForm: FormGroup;
  tableData = [];
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService) { }

  cancelBtn() {
    this.modalController.dismiss();
  }
  submitBtn() {
   
}


  SlotNumberForm() {
    this.InventoryForm = this.formBuilder.group({
      SlotNumber:['',Validators.required],
      EsimProvider: [''],
      Expirydate: [''],
      Comments: ['']
    })
  }
  EsimProviderForm() {
    this.InventoryForm = this.formBuilder.group({
      SlotNumber:['',],
      EsimProvider: ['',Validators.required],
      Expirydate: [''],
      Comments: ['']
    })
  }
  ExpirydateForm() {
    this.InventoryForm = this.formBuilder.group({
      SlotNumber:['',],
      EsimProvider: [''],
      Expirydate: ['',Validators.required],
      Comments: ['']
    })
  }
  CommentsForm() {
    this.InventoryForm = this.formBuilder.group({
      SlotNumber:['',],
      EsimProvider: [''],
      Expirydate: [''],
      Comments: ['',Validators.required]
    })
  }

  ngOnInit() {
     if (this.value) {
      if(this.mode == "Slot"){
        this.SlotNumberForm()
        this.slotNumber =true;
        this.EsimProvider =false;
        this.ExpiryDate =false;
        this.Comments =false;
           this.InventoryForm.patchValue({
            SlotNumber:this.value.SlotNumber,  
            EsimProvider:this.value.EsimProvider,
            ExpiryDate:this.value.ExpiryDate,  
            Comments:this.value.Comments,          
         });
        }
        else if(this.mode == "Esim Provider"){
          this.EsimProviderForm()
          this.slotNumber =false;
          this.EsimProvider =true;
          this.ExpiryDate =false;
          this.Comments =false;
          this.InventoryForm.patchValue({
            SlotNumber:this.value.SlotNumber,  
            EsimProvider:this.value.EsimProvider,
            ExpiryDate:this.value.ExpiryDate,  
            Comments:this.value.Comments,     
         });
        }
        else if(this.mode == "Expiry Date"){
          this.ExpirydateForm()
          this.slotNumber =false;
          this.EsimProvider =false;
          this.ExpiryDate =true;
          this.Comments =false;
          this.InventoryForm.patchValue({
            SlotNumber:this.value.SlotNumber,  
            EsimProvider:this.value.EsimProvider,
            ExpiryDate:this.value.ExpiryDate,  
            Comments:this.value.Comments,
         });
        }
        else{
          this.CommentsForm()
          this.slotNumber =false;
          this.EsimProvider =false;
          this.ExpiryDate =false;
          this.Comments =true;
          this.InventoryForm.patchValue({
            SlotNumber:this.value.SlotNumber,  
            EsimProvider:this.value.EsimProvider,
            ExpiryDate:this.value.ExpiryDate,  
            Comments:this.value.Comments,    
         });
        }
         }
  }
}
