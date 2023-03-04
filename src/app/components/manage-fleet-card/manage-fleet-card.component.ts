import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { serverUrl } from 'src/environments/environment';
import { FleetFormComponent } from '../fleet-form/fleet-form.component';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
    selector: 'app-manage-fleet-card',
    templateUrl: './manage-fleet-card.component.html',
    styleUrls: ['./manage-fleet-card.component.scss'],
})
export class ManageFleetCardComponent implements OnInit {
    selectedCard: any;
    detail: any;
    datas: any;
    pdfdatas: any;
    newDetail: any;
    details: any;


    constructor(private modalController: ModalController,
        private ajaxService: AjaxService) { }
    async openModel() {
        const modal = await this.modalController.create({
            component: FleetFormComponent,
            cssClass: 'custome_fleet'
        });
        modal.onDidDismiss().then(() => {
            this.getDatas();
        })
        return await modal.present();
    }

    ngAfterViewInit(){
        this.getDatas();
    }
    async editMode(selectedCard) {
        console.log(selectedCard);
        if(selectedCard){
        selectedCard["submit"] ="available";
        const modal = await this.modalController.create({
            component: FleetFormComponent,
            cssClass: 'custome_fleet',
            componentProps: {
                value: selectedCard
            }
        });
        modal.onDidDismiss().then(() => {
            this.getDatas();
        })
            return await modal.present();
      }
    }
    

    getDatas(){
        const companyDetail = {
          branchID: localStorage.getItem('corpId'),
          companyID: localStorage.getItem('corpId'),
          userId: localStorage.getItem('userName')
        }
        var data=JSON.stringify(
        {"Data":[{"Name":"vehicleDisplay","Where":"v.companyId='"+companyDetail.companyID+"' AND v.branchId='"+companyDetail.branchID+"' AND vhu.userId='"+companyDetail.userId+"' AND v.status IS NULL AND ( v.iconUrl NOT IN ('Supervisor','Workshop') OR v.iconUrl IS NULL ) GROUP BY v.vin","SubQuery":"y","Header":{"Action":"gridViewChart", "Entity":"FixMe!"}}]} );
    //    var url=serverUrl.web + '/api/dcgrid/javascript';
    //     this.ajaxService.ajaxPostWithBody(url, data).subscribe(res =>{
    //     this.details=JSON.parse(res.datavalues);
    //     console.log(this.details);
    //     })
     var url2= serverUrl.web +'/api/vts/company/assets/info/'+companyDetail.companyID+'/'+companyDetail.userId+'';  
        this.ajaxService.ajaxGet(url2).subscribe(res =>{
          console.log(res);   
          this.detail=res;
          this.newDetail = this.detail.map(item => {
            return Object.keys(item).map(key => {
                if (!item[key]) {
                    item[key] = "-NA-"
                    return item
                }
            })
        })
        })
    }
      
 ngOnInit() {
        this.getDatas();
    }

}
