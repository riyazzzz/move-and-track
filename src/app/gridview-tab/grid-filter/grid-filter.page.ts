import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-grid-filter',
  templateUrl: './grid-filter.page.html',
  styleUrls: ['./grid-filter.page.scss'],
})
export class GridFilterPage implements OnInit {
  subscription: any;

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private menuController: MenuController
  ) { }
  getBack(final){
    if(final == 'close'){
      localStorage.removeItem('modalFilterData')
    }
    this.modalController.dismiss();
  }
  ionViewWillLeave(){
    this.subscription.unsubscribe(); 
  }
  ngOnInit() {
    this.subscription = this.platform.backButton.subscribe(async ()=>{ 
      if(this.menuController.isOpen()){
        this.menuController.close()
      }
    });
  }

}
