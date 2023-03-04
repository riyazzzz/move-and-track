import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  subscription: any;
  appName: string;

  constructor(
    private platform: Platform,
    private menuController: MenuController
  ) { }
  async ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(async ()=>{ 
      if(this.menuController.isOpen()){
        this.menuController.close()
      }
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe(); 
  }
  
  ngOnInit() {
    this.appName =  app.appName
  }

}
