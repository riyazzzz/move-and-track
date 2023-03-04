import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl, app } from '../../../environments/environment';
@Component({
  selector: 'app-odometer-history',
  templateUrl: './odometer-history.page.html',
  styleUrls: ['./odometer-history.page.scss'],
})
export class OdometerHistoryPage implements OnInit {
selectedVin:any;
  constructor(
    private modalController: ModalController,
    private location: Location,
    private ajaxService: AjaxService
  ) { }
details;
  closeModel() {
    this.location.back();
  }
  ionViewWillEnter() {
    console.log('as')
  }
getDatas(){
  const url = serverUrl.web + '/device/new/odometerdetails?vin='+ this.selectedVin
  this.ajaxService.ajaxGet(url).subscribe(res=>{
this.details = res.odometer
  })
}
  ngOnInit() {
    setTimeout(()=>{
      this.selectedVin = JSON.parse(localStorage.getItem('selectedVin')).vin
      console.log(this.selectedVin)
      this.getDatas();
    },1000)
    
    
  }

}
