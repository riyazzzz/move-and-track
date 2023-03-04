import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input} from '@angular/core';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { ModalController,AlertController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from 'src/environments/environment';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-enable-additional',
  templateUrl: './enable-additional.component.html',
  styleUrls: ['./enable-additional.component.scss'],
})
export class EnableAdditionalComponent implements OnInit {
  dateInput:String;
  @Input() value;
  data:any;
  multiple=false;
  myPlatform: any;
  isDeleteShow: any = true;
  enableLogin:FormGroup;
   companyDetail: { branchID: string; companyID: string; userId: string; };
   url: string;
  type2=['Disable','Enable']
  checked: boolean;
  date;
  serviceName: string;
  
  
   constructor(private modalController: ModalController,private alertController:AlertController,
     private formBuilder: FormBuilder, 
     private ajaxService:AjaxService,
     private http:HttpClient,
     private commonService:CommonService,
     public platform: Platform,
   ) { 
       
     }
   async closeModal() {
     this.modalController.dismiss();
   }

    createForm(){
     this.enableLogin = this.formBuilder.group({
      type:['', Validators.required ],
      fromDate: ['',Validators.required],
       toDate: ['',],
      reason: ['', Validators.required],
     });
    }
    editForm(){
      if (this.value) {
        if (this.value.submit == "available") {
         this.serviceName = "available";
        this.enableLogin.patchValue({
          type:this.value.type,
           fromDate:this.value.fromDate,
           toDate:this.value.toDate,
           reason:this.value.reason,
          
           });
          }
           }

    }

    
    onSubmit(type){
      const companyDetail = {
        branchID: localStorage.getItem('corpId'),
        companyID: localStorage.getItem('corpId'),
        userId: localStorage.getItem('userName')
      }
      if(this.serviceName != 'available'){
     const data =  {
            "companyId":companyDetail.companyID,
            "branchId":companyDetail.branchID,
            "schoolDateType":this.enableLogin.value.type,
            "schoolDateReason":this.enableLogin.value.reason,
            "fromDate":this.enableLogin.value.fromDate,
            "toDate":this.enableLogin.value.toDate,
            "mode":"New"
          }
          Object.keys(data).forEach((key) => (data[key] == null || data[key] == "") && delete data[key])
          const url = serverUrl.web + '/schoolEnableDisable/addschooldisabledate'
            this.ajaxService.ajaxPostWithString(url, data).subscribe(res => {
              if (res === "Success") {
                this.commonService.presentToast('Added succesfully');
                this.enableLogin.reset();
                this.modalController.dismiss();
              }
          })
      }
     else if(this.serviceName == 'available'){
           const data =  { 
            "id":this.value.id,
            "fromDate":this.enableLogin.value.fromDate,
            "toDate":this.enableLogin.value.toDate,
            "type":this.enableLogin.value.type,
            "reason":this.enableLogin.value.reason
          }
          Object.keys(data).forEach((key) => (data[key] == null || data[key] == "") && delete data[key]) 
          const url = serverUrl.web + '/schoolEnableDisable/updateschooldisabledate'
            this.ajaxService.ajaxPostWithString(url, data).subscribe(res => {
              if (JSON.parse(res).message === "Updated Successfully") {
                this.modalController.dismiss();
                this.commonService.presentToast('Updated Successfully')
              }
          })
      
       }

    }
  async delete() {
    if (this.value) {
      const alert = await this.alertController.create({
        header: 'Delete',
        backdropDismiss: false,
        message: "Are you sure you want to delete!",
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Ok',
          handler: data => {
            var details = { 
              "companyId":localStorage.getItem('corpId'),
              "branchId": localStorage.getItem('corpId'),
              };
            const deleteData = { "tagID": this.value.operatorID, "compnyID": this.companyDetail.companyID, "branchID": this.companyDetail.branchID, "companyNme": this.companyDetail.userId }
            const url = serverUrl.web + '/schoolEnableDisable/deleteschooldisabledate?id='+this.value.id;
            this.ajaxService.ajaxDeleteWithBody(url, details).subscribe(res => {
              if (res.statusText == "OK") {
                this.commonService.presentToast("Deleted successfully");
                this.enableLogin.reset();
                this.modalController.dismiss();
                } else {
                this.commonService.presentToast("Try again")
              }

            })
          }
        }]
      });
      await alert.present();
    }
  }


                                                                                                                                                                                                                                                                                                                                                                                                                        
    
   ngOnInit(){
this.myPlatform = this.platform.platforms()[0]
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
     this.companyDetail = {
       branchID: localStorage.getItem('corpId'),
       companyID: localStorage.getItem('corpId'),
       userId: localStorage.getItem('userName')
     }
     this.createForm();
     this.editForm();
     var date = new Date();
     var month = ('0' + ( 1 +date.getMonth())).slice(-2)
     var day = ('0' + date.getDate()).slice(-2)
     var year = date.getFullYear();
     var currentDate = [ year + "-" + month + "-" + day  ]
     
    
}

}

