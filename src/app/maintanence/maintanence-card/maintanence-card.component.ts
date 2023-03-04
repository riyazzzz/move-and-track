import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from '../../../environments/environment';
import { Platform } from '@ionic/angular';
import { MaintanenceFormComponent } from '../maintanence-form/maintanence-form.component';

@Component({
  selector: 'app-maintanence-card',
  templateUrl: './maintanence-card.component.html',
  styleUrls: ['./maintanence-card.component.scss'],
})
export class MaintanenceCardComponent implements OnInit {
    detail: any;
    newDetail: any;

  constructor(
    private modalController: ModalController,
    private ajaxService:AjaxService,
    private commonService:CommonService,
    public platform: Platform) { }
    getDatas(){
        const companyDetail = {
          branchID: localStorage.getItem('corpId'),
          companyID: localStorage.getItem('corpId'),
          userId: localStorage.getItem('userName')
      }
       
      var datas={"companyID":companyDetail.companyID,"branchID":companyDetail.userId,"eventId":"all"}
      var url2= serverUrl.web +'/api/vts/company/branch/assets/maintenance/'+JSON.stringify(datas); 
      this.ajaxService.ajaxGet(url2).subscribe(res =>{
          console.log(res);   
          this.detail=res;
          this.newDetail = this.detail.map(item => {
            return Object.keys(item).map(key => {
                if (!item[key]) {
                    item[key] = "-NA-"
                    // console.log(item)
                    return item
                }
            })
        })
       })
    }
    ngAfterViewInit() {
       this.getDatas();
      }
      async openModel() {
        const modal = await this.modalController.create({
          component:MaintanenceFormComponent,
          });
          modal.onDidDismiss().then(()=>{
                this.getDatas();
            } )
        return await modal.present(); 
      }
    
    async editMode(selectedCard){
      if(selectedCard){
      
        const modal = await this.modalController.create({
          component:MaintanenceFormComponent,
          componentProps: {
            value: selectedCard
          }
        });
       return await modal.present();
      
      }
        else{
          this.commonService.presentToast('Please select a row to edit');
          return "";
         
        }
    
    }
  ngOnInit() {}

}
